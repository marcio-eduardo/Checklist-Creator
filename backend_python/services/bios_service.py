import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
import pandas as pd
import pdfplumber
import re
from database import get_db, BiosItem
from pydantic import BaseModel, Field
from openpyxl.utils import get_column_letter

router = APIRouter()

class BiosResponse(BaseModel):
    sku: str
    descricao: str
    pep: str
    codigo_bios: str = Field(serialization_alias="codigoBios")
    versao_bios: str = Field(serialization_alias="versaoBios")
    raw_data: str = Field(serialization_alias="rawData")

    class Config:
        from_attributes = True

class BiosDetails(BiosResponse):
    pass

@router.get("/all", response_model=List[BiosResponse])
def get_all_bios(db: Session = Depends(get_db)):
    return db.query(BiosItem).all()

@router.get("/details/{sku}", response_model=BiosDetails)
def get_bios_details(sku: str, db: Session = Depends(get_db)):
    item = db.query(BiosItem).filter(BiosItem.sku == sku).first()
    if not item:
        return BiosDetails(
            sku=sku,
            descricao="SKU não encontrado na base interna. Por favor, importe a lista de BIOS em Configurações.",
            pep="",
            codigo_bios="",
            versao_bios="",
            raw_data=""
        )
    return item

@router.get("/{sku}")
def get_bios_version(sku: str, db: Session = Depends(get_db)):
    item = db.query(BiosItem).filter(BiosItem.sku == sku).first()
    if not item:
        return "SKU não encontrado na base de dados (Verifique se a lista foi importada)."
    return item.versao_bios

def extract_bios_data_from_row(row_list: List[str]):
    """
    Robust strategy to extract SKU, Desc, PEP, Code, Version from a list of strings.
    Uses 'Double Anchor' Regex strategy on the full joined string to handle split tokens.
    """
    found_sku = row_list[0].split()[0]
    
    # 0. Clean row tokens to avoid 'None' ghosts (extra safety)
    clean_tokens = [t for t in row_list[1:] if t and t.lower() != 'none' and t.lower() != 'nan']
    
    # 1. Join full text to handle split columns
    full_text = " ".join(clean_tokens)
    
    # Defaults
    descricao = ""
    pep = ""
    codigo_bios = ""
    versao_bios = ""

    # Strategy: Find Code Anchor (11xxxxxx, allowing spaces)
    # Regex: 1 followed by 1 followed by 6 digits, allowing optional spaces between them.
    # Pattern: 1\s*1\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d
    code_pattern = re.compile(r"1\s*1\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d")
    
    # Find all matches, usually the last one is the BIOS code if multiple exist (unlikely)
    matches = list(code_pattern.finditer(full_text))
    
    if matches:
        # Take the valid match (ensure it has 8 digits when stripped)
        valid_match = None
        for m in reversed(matches):
            clean_code = m.group(0).replace(" ", "").replace(".", "")
            if len(clean_code) == 8:
                valid_match = m
                codigo_bios = clean_code
                break
        
        if valid_match:
            code_start = valid_match.start()
            code_end = valid_match.end()
            
            # Text segments
            text_before_code = full_text[:code_start]
            text_after_code = full_text[code_end:]
            
            versao_bios = text_after_code.strip()
            
            # Now Find PEP Anchor in text_before_code
            # PEP starts with 'H(\d)-' or 'SEMPEP' (allowing spaces anywhere logic)
            # We look for the LAST occurrence of this pattern in the text_before_code
            pep_start_pattern = re.compile(r"(H\s*\d+\s*-|S\s*E\s*M\s*P\s*E\s*P)", re.IGNORECASE)
            pep_matches = list(pep_start_pattern.finditer(text_before_code))
            
            if pep_matches:
                last_pep = pep_matches[-1]
                pep_start_idx = last_pep.start()
                
                # PEP is everything from start_idx to the end of text_before_code (closest to BIOS Code)
                raw_pep = text_before_code[pep_start_idx:]
                # Clean split chars like "H3-021 3" -> "H3-0213" and "SEM PEP" -> "SEMPEP"
                pep = raw_pep.replace(" ", "").strip()
                
                # Description is everything before PEP
                descricao = text_before_code[:pep_start_idx].strip()
            else:
                # No PEP found?
                # Heuristic: Maybe Description is everything?
                descricao = text_before_code.strip()
            
            return found_sku, descricao, pep, codigo_bios, versao_bios

    # Fallback: If no regex match (should be rare given the User's rule), try simple list logic?
    # Or just return whatever we can guess.
    
    return found_sku, descricao, pep, codigo_bios, versao_bios

@router.post("/upload")
async def upload_bios_pdf(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Por favor, selecione um arquivo PDF.")

    try:
        all_rows = []
        
        with pdfplumber.open(file.file) as pdf:
            for page in pdf.pages:
                # Use "text" strategy for better column detection
                table = page.extract_table({
                    "vertical_strategy": "text",
                    "horizontal_strategy": "text",
                    "snap_tolerance": 4,
                })
                
                if table:
                    for row in table:
                        # Clean cells
                        clean_row = [cell.strip().replace('\u00A0', ' ') if cell else "" for cell in row]
                        # Skip empty rows
                        if not any(clean_row):
                            continue
                        all_rows.append(clean_row)

        if not all_rows:
            return "Erro: Nenhuma tabela encontrada no PDF."

        # Create DataFrame
        # Find max columns to name them properly
        max_cols = max(len(row) for row in all_rows) if all_rows else 0
        cols = [f"Col{i}" for i in range(max_cols)]
        
        df = pd.DataFrame(all_rows, columns=cols)
        
        # Save to Excel for Debugging with Auto-Adjusted Columns
        debug_filename = "bios_debug.xlsx"
        try:
            with pd.ExcelWriter(debug_filename, engine='openpyxl') as writer:
                df.to_excel(writer, index=False, sheet_name='Sheet1')
                worksheet = writer.sheets['Sheet1']
                for i, col in enumerate(df.columns):
                    # Calculate max length of data in column (or header length)
                    series = df[col].astype(str)
                    max_len = max(
                        series.map(len).max() if not series.empty else 0,
                        len(str(col))
                    ) + 2 # Add padding
                    
                    col_letter = get_column_letter(i + 1)
                    worksheet.column_dimensions[col_letter].width = max_len
            print(f"DEBUG: Saved extraction to {debug_filename}")
        except Exception as exc:
            print(f"DEBUG: Failed to save debug excel: {exc}")
            # Fallback if openpyxl fails
            df.to_excel("bios_debug_fallback.xlsx", index=False)

        items_to_save = []
        
        # Process DataFrame rows
        for index, row in df.iterrows():
            row_list = [str(val).strip() for val in row.values if str(val).strip() != 'nan' and str(val).strip() != '' and str(val).strip() != 'None']
            
            # Skip empty or header rows
            if not row_list: 
                continue
            if len(row_list) > 0 and "SKU" in row_list[0].upper():
                continue
            if len(row_list) > 1 and "DESCRIÇÃO" in row_list[1].upper():
                continue

            # Basic Validation
            found_sku = row_list[0].split()[0]
            if len(found_sku) < 3 or not found_sku[0].isdigit():
                continue

            # Use Shared Parsing Logic
            found_sku, descricao, pep, codigo_bios, versao_bios = extract_bios_data_from_row(row_list)

            raw_data_line = " | ".join(row_list)
            
            item = BiosItem(
                sku=found_sku,
                descricao=descricao,
                pep=pep,
                codigo_bios=codigo_bios,
                versao_bios=versao_bios,
                raw_data=raw_data_line
            )
            items_to_save.append(item)

        if items_to_save:
            # Deduplicate by SKU
            unique_items = {item.sku: item for item in items_to_save}
            final_list = list(unique_items.values())
            
            db.query(BiosItem).delete()
            db.add_all(final_list)
            db.commit()
            return f"Sucesso! {len(final_list)} itens de BIOS importados. (Verifique 'bios_debug.xlsx' na pasta do projeto)"
        else:
            return "Erro: Nenhuma linha válida identificada."

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Erro ao processar: {str(e)}")

@router.post("/upload_excel")
async def upload_bios_excel(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith('.xlsx'):
         raise HTTPException(status_code=400, detail="Por favor, selecione um arquivo Excel (.xlsx).")

    try:
        # Read Excel, header=None to ensure we process the first row if it's data (or filter if it's header)
        df = pd.read_excel(file.file, header=None)
        
        items_to_save = []
        
        # Iterate over all rows
        for index, row in df.iterrows():
            # Clean and convert to string list
            row_list = [str(val).strip() for val in row.values if str(val).strip() != 'nan' and str(val).strip() != '' and str(val).strip() != 'None']
            
            if not row_list:
                continue

            # Filtering Headers
            # Filter generic "Col0", "Col1" if present
            if len(row_list) > 0 and "COL0" in str(row_list[0]).upper():
                continue
            # Filter PDF Headers "SKU", "Descrição"
            if len(row_list) > 0 and "SKU" in str(row_list[0]).upper():
                continue
            if len(row_list) > 1 and "DESCRIÇÃO" in str(row_list[1]).upper():
                continue

            # Basic Validation: SKU must be present and valid
            found_sku = row_list[0].split()[0]
            if len(found_sku) < 3 or not found_sku[0].isdigit():
                continue

            # Use Shared Parsing Logic
            found_sku, descricao, pep, codigo_bios, versao_bios = extract_bios_data_from_row(row_list)

            raw_data_line = " | ".join(row_list)
            
            item = BiosItem(
                sku=found_sku,
                descricao=descricao,
                pep=pep,
                codigo_bios=codigo_bios,
                versao_bios=versao_bios,
                raw_data=raw_data_line
            )
            items_to_save.append(item)

        if items_to_save:
            # Deduplicate by SKU
            unique_items = {item.sku: item for item in items_to_save}
            final_list = list(unique_items.values())
            
            db.query(BiosItem).delete()
            db.add_all(final_list)
            db.commit()
            return f"Sucesso! {len(final_list)} itens importados via Excel."
        else:
            return "Erro: Nenhuma linha válida encontrada no Excel."

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Erro ao processar Excel: {str(e)}")

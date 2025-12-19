from sqlalchemy import create_engine, text
import sys

db_path = "checklist.db"
engine = create_engine(f"sqlite:///{db_path}")

with engine.connect() as conn:
    result = conn.execute(text("SELECT * FROM bios_items WHERE sku = '1504417'"))
    row = result.fetchone()
    if row:
        print("SKU:", row.sku)
        print("Desc:", row.descricao)
        print("PEP:", row.pep)
        print("Cod:", row.codigo_bios)
        print("Ver:", row.versao_bios)
        print("RAW:", row.raw_data)
    else:
        print("SKU not found")

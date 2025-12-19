# Walkthrough - Projeto Checklist Suporte

## Visão Geral

Configurei um sistema completo com Backend (Java/Spring Boot) e Frontend (React/Vite) para gerar checklists de suporte técnico padronizados.

## Componentes Criados

### Backend (Spring Boot)

- **Porta**: 8080
- **Endpoint**: `POST /api/checklist/generate`
- **Funcionalidade**: Recebe JSON com dados do suporte e retorna string formatada.

### Frontend (React + Tailwind v4)

- **Porta**: 5173 (Dev)
- **Estilo**: Tailwind CSS v4 configurado.
- **Formulário**: Captura todos os campos solicitados (Bios, Voltagens, etc.).
- **Saída**: Exibe o resultado formatado com botão para copiar.

## Como Executar

### 1. Iniciar Backend

Abra um terminal em `backend/`:

```
mvn spring-boot:run
```

### 2. Iniciar Frontend

Abra um terminal em `frontend/`:

```
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173/) para usar o aplicativo.





Vamos organizar essas informações: 

Coluna 1: SKU: 1503709 
Coluna 2: Descrição do equipamento: POSITIVO MASTER D810 - SEFAZ-DF
Coluna 3: PEP: H3-02168
Coluna 4: Código da Bios: 11121824 
Coluna 5: Versão da Bios: 0420.X SEM AMI



Como deve ser exibido: 

- SKU: 1503709 
  Descrição do equipamento: POSITIVO MASTER D810 - SEFAZ-DF
  PEP: H3-02168
  Código da Bios: 11121824 
  Versão da Bios: 0420.X SEM AMI



Como esta organizado no pdf: 

| SKU     | Descrição do equipamento:       | PEP:          | Código da Bios: | Versão da Bios: |
| ------- | ------------------------------- | ------------- | --------------- | --------------- |
| 1503709 | POSITIVO MASTER D810 - SEFAZ-DF | PEP: H3-02168 | 11121824        | 0420.X SEM AMI  |

1503709 POSITIVO MASTER D810 - SEFAZ-DF H3-02168 11121824 0420.X SEM AMI

Eu preciso da informação da coluna 5!



# Walkthrough - Python Backend (FastAPI)

We have successfully migrated the backend from Java Spring Boot to Python FastAPI.

## Changes Completed

- **New Backend Location**: `checklist/backend_python`
- **Framework**: FastAPI + Uvicorn
- **Database**: SQLite (`checklist.db`)
- **PDF Parsing**: `pdfplumber` (replicates Java logic strategies)
- **Frontend Integration**: Updated all API calls to port `8000`.

## How to Run the New Backend

1. Navigate to the `backend_python` directory:

   ```
   cd backend_python
   ```

2. (Optional) Create a virtual environment:

   ```
   python -m venv venv
   
   .\venv\Scripts\activate
   ```

3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Run the server:

   ```
   uvicorn main:app --reload
   ```

   The server will start at `http://localhost:8000`.

## Verification

- **Swagger UI**: Access `http://localhost:8000/docs` to see and test all API endpoints.

- Frontend

  : Launch the frontend (

  ```
  npm run dev
  ```

  ) and test:

  - Searching for BIOS (should return "SKU não encontrado..." if DB empty).
  - Importing BIOS PDF (Use the same PDF as before).
  - Generating Checklist output.


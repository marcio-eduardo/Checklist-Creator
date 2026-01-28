# Walkthrough - Python Backend (FastAPI)

We have successfully migrated the backend from Java Spring Boot to Python FastAPI.

## Changes Completed
- **New Backend Location**: `checklist/backend_python`
- **Framework**: FastAPI + Uvicorn
- **Database**: SQLite (`checklist.db`)
- **PDF Parsing**: `pdfplumber` (replicates Java logic strategies)
- **Frontend Integration**: Updated all API calls to port `8000`.

## How to Run the New Backend

1.  Navigate to the `backend_python` directory:
    ```bash
    cd backend_python
    ```

2.  (Optional) Create a virtual environment:
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```
    The server will start at `http://localhost:8000`.

## Verification
- **Swagger UI**: Access `http://localhost:8000/docs` to see and test all API endpoints.
- **Frontend**: Launch the frontend (`npm run dev`) and test:
    - Searching for BIOS (should return "SKU não encontrado..." if DB empty).
    - Importing BIOS PDF (Use the same PDF as before).
    - Generating Checklist output.

## Desktop Application Build (Standalone)

We have packaged the entire application (Python Backend + React Frontend) into a single executable file.

### Build Details
- **Frontend**: Built to static files (`frontend/dist`).
- **Backend**: Configured to serve these static files.
- **Packaging**: Used `PyInstaller` to bundle everything.

### How to Use
1.  **Locate the Executable**:
    `backend_python/dist/ChecklistApp.exe`
2.  **Run**:
    Double-click `ChecklistApp.exe`. It will launch a console window (server log) and start the server.
3.  **Access**:
    Open your browser to `http://localhost:8000`.
4.  **Database**:
    The application will look for `checklist.db` in the same folder as the `.exe`. If you have existing data, copy your `checklist.db` to the `dist` folder.

## Native Desktop Application (Preferred)

We have created a version that runs as a true desktop program, without opening your web browser.

### How to Use
1.  **Locate the Executable**:
    `backend_python/dist/ChecklistApp_Native.exe`
2.  **Run**:
    Double-click `ChecklistApp_Native.exe`.
3.  **Result**:
    A window titled "Checklist Suporte" will open. This is the entire application running self-contained.
4.  **Database**:
    As always, keep `checklist.db` in the same folder as the `.exe`.

## Hybrid Android Deployment (Cloud + Client)

To run on Android, we use a hybrid approach: The backend runs in the Cloud, and the App runs on the phone connecting to it.

### Step 1: Deploy Backend to Cloud (Render)
1.  **Upload to GitHub**: Push the `backend_python` folder (or the whole project) to a private GitHub repository.
2.  **Create Service**: Go to [render.com](https://render.com), create a "Web Service".
3.  **Connect Repo**: Select your repository.
4.  **Settings**:
    - **Root Directory**: `backend_python`
    - **Build Command**: `pip install -r requirements.txt`
    - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
    - **Python Version**: 3.11.0 (Detected automatically via runtime.txt)
5.  **Deploy**: Click "Create Web Service". Wait for it to detect "Live".
6.  **Copy URL**: Copy your new URL (e.g., `https://checklist-app.onrender.com`).

### Step 2: Configure Android App
1.  **Update Config**: Open `frontend/.env` on your PC.
2.  **Set URL**: Change `VITE_API_URL` to your Render URL:
    ```
    VITE_API_URL=https://checklist-app.onrender.com
    ```
3.  **Rebuild**:
    ```bash
    cd frontend
    npm run build
    npx cap copy
    ```

### Step 3: Generate APK
1.  **Open Android Studio**:
    ```bash
    npx cap open android
    ```
2.  **Build**: In Android Studio, go to menu **Build > Build Bundle(s) / APK(s) > Build APK**.
3.  **Install**: Transfer the `.apk` file to your phone and install!

## 🛑 Continuando Amanhã (Próximos Passos)

Paramos aqui. Para finalizar o app Android, você precisa fazer estes passos manuais:

1.  [ ] **GitHub**: Subir o código do projeto para um repositório seu.
2.  [ ] **Render**: Criar conta e conectar seu GitHub para colocar o Python online.
3.  [ ] **Frontend**: Atualizar o arquivo `.env` com o link do Render.
4.  [ ] **APK**: Abrir Android Studio (`npx cap open android`) e gerar o arquivo final.

Tudo já está configurado no código, é só executar/hospedar! 🚀

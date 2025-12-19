from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.bios_service import router as bios_router
from services.checklist_service import router as checklist_router
from database import init_db

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
import sys

app = FastAPI(title="Checklist Backend")

origins = [
    "http://localhost:5173",
    "http://localhost:8080",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(bios_router, prefix="/api/checklist/bios", tags=["BIOS"])
app.include_router(checklist_router, prefix="/api/checklist", tags=["Checklist"])

# Serve Static Files (Frontend) - Support for PyInstaller
if getattr(sys, 'frozen', False):
    # Running as executable
    base_path = sys._MEIPASS
    frontend_dist = os.path.join(base_path, "frontend", "dist")
else:
    # Running as script
    frontend_dist = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if os.path.exists(frontend_dist):
    print(f"DEBUG: Frontend dist found at: {frontend_dist}")
    print(f"DEBUG: Directory contents: {os.listdir(frontend_dist)}")
    
    # Mount assets (if they exist in dist/assets)
    if os.path.exists(os.path.join(frontend_dist, "assets")):
        app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")
    
    # Explicit Root Route
    @app.get("/")
    async def serve_root():
        return FileResponse(os.path.join(frontend_dist, "index.html"))

    # Catch-all route for SPA (Single Page Application)
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # API requests are already handled by routers above
        # If file exists in dist (e.g. favicon.ico), serve it
        file_path = os.path.join(frontend_dist, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        
        # Otherwise serve index.html
        return FileResponse(os.path.join(frontend_dist, "index.html"))
else:
    print(f"DEBUG: Frontend dist NOT found at: {frontend_dist}")
    @app.get("/")
    def read_root():
        return {"message": "Backend running only. Frontend dist not found. Run 'npm run build' in frontend folder."}

@app.post("/api/checklist/shutdown")
def shutdown_server():
    print("Shutting down server...")
    os._exit(0)
    return {"message": "Server shutting down"}

if __name__ == "__main__":
    import uvicorn
    import webbrowser
    
    # Fix for PyInstaller --noconsole mode (where stdout/stderr are None)
    if sys.stdout is None:
        sys.stdout = open(os.devnull, "w")
    if sys.stderr is None:
        sys.stderr = open(os.devnull, "w")

    # Auto-open browser
    webbrowser.open("http://127.0.0.1:8000")
    
    # Use 127.0.0.1 loopback for local desktop app security (instead of 0.0.0.0)
    # use_colors=False prevents another potential isatty check issue
    uvicorn.run(app, host="127.0.0.1", port=8000, use_colors=False)

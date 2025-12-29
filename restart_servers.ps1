
# Kill any existing node (Next.js) or python (Uvicorn) processes
Get-Process -Name "node", "python", "uvicorn" -ErrorAction SilentlyContinue | Stop-Process -Force

# Wait a moment for ports to clear
Start-Sleep -Seconds 2

# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; uvicorn src.main:app --reload"

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

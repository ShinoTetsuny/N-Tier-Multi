from app.core.config import settings
from app.core.application import create_app
from app.api.v1 import api_router
from app.db.mongodb import MongoDB

app = create_app()

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def startup_db_client():
    await MongoDB.connect_to_database()

@app.on_event("shutdown")
async def shutdown_db_client():
    await MongoDB.close_database_connection()

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3003)

from fastapi import FastAPI
from app.core.middleware import add_cors_middleware
from app.weather.routes import router

app = FastAPI(
	title="Weather API", 
	version="1.0.0",
	docs_url="/docs",
  redoc_url="/redoc"
)

add_cors_middleware(app)

app.include_router(router, prefix="/api", tags=["Weather"])


@app.get("/")
async def root():
	return {"message": "Weather API is running!"}

if __name__ == "__main__":
	import uvicorn
	uvicorn.run(app, host="0.0.0.0", port=8000)
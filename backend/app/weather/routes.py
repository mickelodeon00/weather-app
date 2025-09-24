from fastapi import APIRouter
from app.weather.service import WeatherService
from app.weather.models import WeatherAPIResponse

router = APIRouter()
service = WeatherService()


@router.get("/weather/{city}", response_model=WeatherAPIResponse)
async def get_weather(city: str):
  return await service.get_current_weather(city)

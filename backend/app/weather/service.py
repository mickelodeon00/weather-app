import httpx
from app.core.config import settings
from app.weather.models import WeatherAPIResponse


import httpx
from fastapi import HTTPException
from app.core.config import settings
from app.weather.models import WeatherAPIResponse


class WeatherService:
  def __init__(self, api_key: str = settings.WEATHER_API_KEY, base_url: str = settings.WEATHER_API_BASE_URL):
    self.api_key = api_key
    self.base_url = base_url

  async def get_current_weather(self, city: str) -> WeatherAPIResponse:
    """Fetch current weather data for a given city."""
    url = f"{self.base_url}/current.json"
    params = {"key": self.api_key, "q": city.strip()}

    async with httpx.AsyncClient(timeout=30) as client:
      try:
        response = await client.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        return WeatherAPIResponse(
          location=data["location"],
          current={
              "temp_c": data["current"]["temp_c"],
              "humidity": data["current"]["humidity"],
              "wind_kph": data["current"]["wind_kph"],
              "condition": data["current"]["condition"]["text"],
          },
        )
      

      except httpx.HTTPStatusError as e:
        if e.response.status_code == 400:
          raise HTTPException(status_code=404, detail=f"City '{city}' not found")
        else:
          raise HTTPException(status_code=500, detail="Weather service error")
      
      except Exception:
        raise HTTPException(status_code=500, detail="Service temporarily unavailable")


import pytest
import respx
from httpx import Response
from fastapi import HTTPException
from app.weather.service import WeatherService


@pytest.mark.asyncio
async def test_weather_service_success():
  """Test successful weather data retrieval"""
  service = WeatherService(api_key="fake")

  mock_data = {
    "location": {
      "name": "Paris",
      "region": "",
      "country": "FR",
      "lat": 48.85,
      "lon": 2.35,
      "localtime": "2025-09-22T12:00:00"
    },
    "current": {
      "temp_c": 20.0,
      "humidity": 55,
      "wind_kph": 12.0,
      "condition": {"text": "Sunny"}
    }
  }

  with respx.mock:
    respx.get("http://api.weatherapi.com/v1/current.json").mock(
      return_value=Response(200, json=mock_data)
    )
    result = await service.get_current_weather("Paris")

  # Assertions
  assert result.location.name == "Paris"
  assert result.current.temp_c == 20.0
  assert result.current.condition == "Sunny"



@pytest.mark.asyncio
async def test_weather_service_city_not_found():
  service = WeatherService(api_key="fake")

  with respx.mock:
    respx.get("http://api.weatherapi.com/v1/current.json").mock(
        return_value=Response(404, json={"error": "No matching location"})
    )

    with pytest.raises(HTTPException) as exc:
      await service.get_current_weather("InvalidCity")

  assert exc.value.status_code == 404  
  assert exc.value.detail == "City 'InvalidCity' not found"


@pytest.mark.asyncio
async def test_weather_service_server_error():
  service = WeatherService(api_key="fake")

  with respx.mock:
    respx.get("http://api.weatherapi.com/v1/current.json").mock(
      return_value=Response(500, json={"error": "Server error"})
    )

    with pytest.raises(HTTPException) as exc:
      await service.get_current_weather("Paris")

  assert exc.value.status_code == 500  


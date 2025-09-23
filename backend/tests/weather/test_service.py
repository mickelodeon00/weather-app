import pytest
import respx
from httpx import AsyncClient, Response
from fastapi import status
from app.main import app
from app.weather.service import WeatherService

@pytest.mark.asyncio
async def test_weather_service_success():
    service = WeatherService(api_key="fake")
    mock_data = {
        "location": {"name": "Paris", "region": "", "country": "FR", "lat": 48.85, "lon": 2.35, "localtime": "2025-09-22T12:00:00"},
        "current": {"temp_c": 20.0, "humidity": 55, "wind_kph": 12.0, "condition": {"text": "Sunny"}}
    }
    with respx.mock:
        respx.get("http://api.weatherapi.com/v1/current.json").mock(return_value=Response(200, json=mock_data))
        result = await service.get_current_weather("Paris")
    assert result.location.name == "Paris"
    assert result.current.temp_c == 20.0
    assert result.current.condition == "Sunny"

@pytest.mark.asyncio
async def test_weather_service_errors():
    service = WeatherService(api_key="fake")
    with respx.mock:
        # City not found
        respx.get("http://api.weatherapi.com/v1/current.json").mock(return_value=Response(400, json={"error": "No matching location"}))
        with pytest.raises(Exception) as exc:
            await service.get_current_weather("InvalidCity")
        assert "City 'InvalidCity' not found" in str(exc.value)
        # Generic server error
        respx.get("http://api.weatherapi.com/v1/current.json").mock(return_value=Response(500, json={"error": "Server error"}))
        with pytest.raises(Exception) as exc:
            await service.get_current_weather("Paris")
        assert "Weather service error" in str(exc.value)

# @pytest.mark.asyncio
# async def test_weather_route(monkeypatch):
#     async def fake_get_current_weather(city: str):
#         return {"location": {"name": city, "region": "", "country": "Testland", "lat": 0.0, "lon": 0.0, "localtime": "2025-09-22T10:00:00"},
#                 "current": {"temp_c": 25.0, "humidity": 40, "wind_kph": 15.0, "condition": "Clear"}}
#     monkeypatch.setattr(WeatherService, "get_current_weather", fake_get_current_weather)
#     async with AsyncClient(app=app, base_url="http://test") as ac:
#         response = await ac.get("/weather/Lagos")
#     assert response.status_code == status.HTTP_200_OK
#     data = response.json()
#     assert data["location"]["name"] == "Lagos"
#     assert data["current"]["condition"] == "Clear"

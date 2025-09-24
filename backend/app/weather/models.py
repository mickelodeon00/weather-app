from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class WeatherLocation(BaseModel):
  name: str
  region: str
  country: str
  lat: float
  lon: float
  localtime: datetime


class WeatherCurrent(BaseModel):
  temp_c: float = Field(..., description="Temperature in Celsius")
  humidity: int = Field(..., ge=0, le=100, description="Humidity percentage")
  wind_kph: float = Field(..., description="Wind speed in km/h")
  condition: str = Field(..., description="Weather condition")


class WeatherAPIResponse(BaseModel):
  location: WeatherLocation
  current: WeatherCurrent
from typing import List, Union
from pydantic import field_validator, ConfigDict
from pydantic_settings import BaseSettings



class Settings(BaseSettings):
  WEATHER_API_KEY: str 
  WEATHER_API_BASE_URL: str = "http://api.weatherapi.com/v1"
  
  API_PREFIX: str = "/api"
  DEBUG: bool = False
  ALLOWED_ORIGINS: str = ""


  @field_validator("ALLOWED_ORIGINS")
  @classmethod
  def split_allowed_origins(cls, v: str) -> List[str]:
    return v.split(",") if v else []

  
  model_config = ConfigDict(env_file=".env")


settings = Settings()
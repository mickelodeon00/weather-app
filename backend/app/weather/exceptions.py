class WeatherAPIError(Exception):
  """Raised when the weather API returns an error."""


class WeatherServiceError(Exception):
  """Raised for unexpected internal errors in WeatherService."""

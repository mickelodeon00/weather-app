export interface WeatherData {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    localtime: string
  }
  current: {
    temp_c: number
    humidity: number
    wind_kph: number
    condition: string
  }
}

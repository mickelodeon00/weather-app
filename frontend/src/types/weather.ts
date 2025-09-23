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

// export interface WeatherData {
//   city: string
//   temperature: number
//   humidity: number
//   windSpeed: number
//   condition: string
//   country: string
// }
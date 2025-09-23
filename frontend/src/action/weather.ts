import type { WeatherData } from "@/types/weather";
import baseAxios from "@/utils/axios";
// import axios from "axios";



export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const { data } = await baseAxios.get<WeatherData>(`/weather/${city}`);
  return data;
};

// export const fetchWeather = async (city: string): Promise<WeatherData> => {
//   try {
//     const { data } = await baseAxios.get<WeatherData>(`/weather/${city}`);
//     return data;
//   } catch (error: any) {
//     if (axios.isAxiosError(error) && error.response) {
//       const status = error.response.status;
//       const message = error.response.data?.detail || error.message;

//       // Feature-specific error handling
//       throw { status, message };
//     }

//     // Network or unexpected error
//     throw { status: 500, message: 'Service temporarily unavailable' };
//   }
// };
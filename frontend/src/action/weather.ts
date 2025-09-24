import type { WeatherData } from "@/types/weather";
import baseAxios from "@/lib/axios";
import { AxiosError } from 'axios';
export type SafeResult<T> =
  | [T, null]
  | [null, AxiosError];

/**
 * Wrap any async function call and return a tuple: [result, error]
 * @param fn A function that returns a Promise<T>
 */
export async function safe<T>(fn: () => Promise<T>): Promise<SafeResult<T>> {
  try {
    const result = await fn();
    return [result, null];
  } catch (err) {
    return [null, err as AxiosError];
  }
}



export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const [data, error] = await safe(() => baseAxios.get<WeatherData>(`/weather/${city}`))
  if (error) {
    if (error.response?.status === 404) {
      throw new Error('City not found. Please check the city name and try again');
    }

    if (error.response?.status === 500) {
      throw new Error('Weather service is currently unavailable. Please try again later');
    }

    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later');
    }

    if (error.code === 'ECONNABORTED' || error.code === 'TIMEOUT') {
      throw new Error('Request timeout. Please check your connection and try again');
    }

    if (!error.response) {
      throw new Error('Network error. Please check your internet connection');
    }

    throw new Error('Failed to fetch weather data. Please try again');
  }


  return data.data

};


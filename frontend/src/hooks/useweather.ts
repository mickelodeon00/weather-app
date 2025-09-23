import { fetchWeather } from "@/action/weather";
// import baseAxios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

// export interface WeatherData {
//   location: {
//     name: string;
//     region: string;
//     country: string;
//   };
//   current: {
//     temp_c: number;
//     humidity: number;
//     wind_kph: number;
//     condition: string;
//   };
// }

// const fetchWeather = async (city: string) => {
//   const { data } = await baseAxios.get<WeatherData>(`/weather/${city}`);
//   return data;
// };

export const useWeather = (city: string) => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: !!city,
  });
};
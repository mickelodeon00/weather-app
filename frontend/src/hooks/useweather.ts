import { fetchWeather } from "@/action/weather";
import { useQuery } from "@tanstack/react-query";



export const useWeather = (city: string) => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: !!city,
  });
};
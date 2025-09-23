import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import {
  // Thermometer, 
  Droplets,
  Wind,
  MapPin,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow
} from "lucide-react";
import type { WeatherData } from "@/types/weather";

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear'))
      return <Sun className="h-16 w-16 text-yellow-400" />;
    if (conditionLower.includes('rain'))
      return <CloudRain className="h-16 w-16 text-blue-500" />;
    if (conditionLower.includes('snow'))
      return <CloudSnow className="h-16 w-16 text-blue-200" />;
    if (conditionLower.includes('cloud'))
      return <Cloud className="h-16 w-16 text-gray-400" />;
    return <Cloud className="h-16 w-16 text-primary" />;
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return "text-red-500";
    if (temp >= 25) return "text-orange-500";
    if (temp >= 20) return "text-yellow-500";
    if (temp >= 15) return "text-green-500";
    if (temp >= 10) return "text-blue-500";
    if (temp >= 0) return "text-cyan-500";
    return "text-purple-500";
  };

  const getWeatherBackground = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear'))
      return "bg-gradient-to-br from-yellow-100 to-orange-100";
    if (conditionLower.includes('rain'))
      return "bg-gradient-to-br from-blue-100 to-gray-200";
    if (conditionLower.includes('cloud'))
      return "bg-gradient-to-br from-gray-100 to-blue-100";
    if (conditionLower.includes('snow'))
      return "bg-gradient-to-br from-blue-50 to-white";
    return "bg-gradient-to-br from-blue-50 to-gray-100";
  };

  const tempColor = getTemperatureColor(data.current.temp_c);
  const weatherBg = getWeatherBackground(data.current.condition);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className={`${weatherBg} border-0 shadow-2xl overflow-hidden`}>
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">
              {data.location.name}, {data.location.country}
            </span>
          </div>

          <div className="flex justify-center mb-4">
            {getWeatherIcon(data.current.condition)}
          </div>

          <CardTitle className="text-3xl font-bold text-foreground mb-2">
            {data.current.condition}
          </CardTitle>

          <div className="space-y-2">
            <div className={`text-7xl font-black ${tempColor} drop-shadow-lg`}>
              {Math.round(data.current.temp_c)}°
            </div>
            <div className="text-lg text-muted-foreground">
              Feels like {Math.round((data.current.temp_c * 9) / 5 + 32)}°F
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Droplets className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-medium">Humidity</div>
                  <div className="text-2xl font-bold text-foreground">{data.current.humidity}%</div>
                  <div className="text-xs text-muted-foreground">
                    {data.current.humidity > 70 ? "High" : data.current.humidity > 40 ? "Moderate" : "Low"}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-gray-100">
                  <Wind className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-medium">Wind Speed</div>
                  <div className="text-2xl font-bold text-foreground">{data.current.wind_kph}</div>
                  <div className="text-xs text-muted-foreground">
                    km/h • {data.current.wind_kph > 25 ? "Strong" : data.current.wind_kph > 10 ? "Moderate" : "Light"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherCard;
import WeatherCard from "@/components/weather/weather-card";
import { useWeather } from "@/hooks/useweather";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, MapPin, AlertCircle, Cloud } from "lucide-react";

const Home: React.FC = () => {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const { data, isLoading, isError, error } = useWeather(searchCity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      setSearchCity(city.trim());
    }
  };

  return (
    <>
      {/* Search Form */}
      <div className="mb-12">
        <Card className="max-w-md mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name..."
                  className="pl-12 h-12 text-base border-gray-200 focus:border-primary bg-white"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || !city.trim()}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? "Searching..." : "Get Weather"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Loading State */}
      {isLoading && (
        <Card className="max-w-2xl mx-auto shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin">
                  <Cloud className="h-12 w-12 text-primary" />
                </div>
              </div>
              <Skeleton className="h-8 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
              <Skeleton className="h-20 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {isError && (
        <Alert className="max-w-md mx-auto mb-6 border-red-200 bg-red-50/80 backdrop-blur-sm">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700 font-medium">
            {error.message || "Unable to fetch weather data. Please check the city name and try again."}
          </AlertDescription>
        </Alert>
      )}

      {/* Weather Data */}
      {data && !isLoading && !isError && (
        <div className="animate-in fade-in-50 duration-700 slide-in-from-bottom-4">
          <WeatherCard data={data} />
        </div>
      )}

      {/* Empty State */}
      {!data && !isLoading && !isError && (
        <div className="text-center py-16">
          <div className="p-6 rounded-full bg-gradient-to-br from-primary/10 to-blue-600/10 w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
            <Cloud className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">Ready to check the weather?</h3>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Enter a city name above to get started with your personalized weather forecast with visual
            interpretation.
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
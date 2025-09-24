import { fetchWeather } from '@/action/weather';
import WeatherCard from '@/components/weather/weather-card';
import baseAxios from '@/lib/axios';
import { render } from '@testing-library/react';



const mockWeatherData = {
  location: {
    name: 'London',
    country: 'UK',
    region: 'England',
    lat: 51.5074,
    lon: -0.1278,
    localtime: '2024-01-15 14:30'
  },
  current: {
    temp_c: 25,
    humidity: 60,
    wind_kph: 15,
    condition: 'Sunny'
  }
};

describe('WeatherCard', () => {
  test('displays weather data correctly', () => {
    const { container } = render(<WeatherCard data={mockWeatherData} />);
    const header = container.querySelector('#header')
    const content = container.querySelector('#content')

    expect(header).toHaveTextContent('London, UK');
    expect(header).toHaveTextContent('25°')
    expect(header).toHaveTextContent('Sunny')
    expect(content).toHaveTextContent('60%')
    expect(content).toHaveTextContent('15')
  });

  test('displays correct humidity level', () => {
    const highHumidityData = {
      ...mockWeatherData,
      current: { ...mockWeatherData.current, humidity: 80 }
    };

    const { container } = render(<WeatherCard data={highHumidityData} />);
    const content = container.querySelector('#content')

    expect(content).toHaveTextContent('80%')
    expect(content).toHaveTextContent('High')
  });

  test('displays correct wind speed level', () => {
    const strongWindData = {
      ...mockWeatherData,
      current: { ...mockWeatherData.current, wind_kph: 30 }
    };

    const { container } = render(<WeatherCard data={strongWindData} />);

    expect(container).toHaveTextContent('30')
    expect(container).toHaveTextContent('Strong')
  });

  test('displays rainy weather correctly', () => {
    const rainyData = {
      ...mockWeatherData,
      current: { ...mockWeatherData.current, condition: 'Light Rain' }
    };

    const { container } = render(<WeatherCard data={rainyData} />);
    const header = container.querySelector('#header')

    expect(header).toHaveTextContent('Light Rain')
  });
});



jest.mock("@/utils/axios");
const mockedAxios = baseAxios as jest.Mocked<typeof baseAxios>;

describe("fetchWeather", () => {
  it("returns data on success", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { temp: 25, city: "Lagos" } });

    const result = await fetchWeather("Lagos");
    expect(result).toEqual({ temp: 25, city: "Lagos" });
  });

  it("throws error on 404", async () => {
    mockedAxios.get.mockRejectedValueOnce({ response: { status: 404 } });

    await expect(fetchWeather("Nowhere")).rejects.toThrow("City not found");
  });

  it("throws error on 500 server error", async () => {
    mockedAxios.get.mockRejectedValueOnce({ response: { status: 500 } });
    await expect(fetchWeather("Lagos")).rejects.toThrow("Weather service is currently unavailable");
  });

  it("throws error on network failure", async () => {
    mockedAxios.get.mockRejectedValueOnce({ message: 'Network Error' });
    await expect(fetchWeather("Lagos")).rejects.toThrow("Network error");
  });

  it("throws generic error for other status codes", async () => {
    mockedAxios.get.mockRejectedValueOnce({ response: { status: 400 } });
    await expect(fetchWeather("Lagos")).rejects.toThrow("Failed to fetch weather data");
  });
});



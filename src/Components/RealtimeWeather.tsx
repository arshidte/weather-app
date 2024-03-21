import { useEffect, useState } from "react";
import axios from "axios";
import { WEATHER_API_KEY } from "../Constants";

interface RealtimeWeatherProps {
  latitude: number;
  longitude: number;
  location: string;
}

const RealtimeWeather: React.FC<RealtimeWeatherProps> = ({
  latitude,
  longitude,
  location,
}) => {
  const [weather, setWeather] = useState({
    temperature: 0,
    humidity: 0,
    windDirection: 0,
    windSpeed: 0,
  });
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Fetch realtime weather data
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.tomorrow.io/v4/weather/realtime?location=${
            location.length > 0 ? location : `${latitude},${longitude}`
          }&apikey=${WEATHER_API_KEY}`,
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        // Set state
        setWeather({
          temperature: res.data.data.values.temperature,
          humidity: res.data.data.values.humidity,
          windDirection: res.data.data.values.windDirection,
          windSpeed: res.data.data.values.windSpeed,
        });
      } catch (error) {
        console.error(`Error fetching weather data: ${error}`);
        setShowError(true);
      }
    };

    // Call fetch data function
    fetchData();

    // Fetch data every 1 minute
    const interval = setInterval(fetchData, 10000);
    return () => {
      clearInterval(interval);
      setWeather({
        temperature: 0,
        humidity: 0,
        windDirection: 0,
        windSpeed: 0,
      });
      setShowError(false);
    };
  }, [latitude, longitude, location]);

  return (
    <>
      {weather && !showError && (
        <>
          {
            <>
              <h3 className="text-xl">Temperature: {weather.temperature}</h3>
              <h4 className="text-md">Humidity: {weather.humidity}</h4>
              <h4 className="text-md">
                Wind Direction: {weather.windDirection}
              </h4>
              <h4 className="text-md">Wind Speed: {weather.windSpeed}</h4>
            </>
          }
        </>
      )}
      {showError && (
        <p className="text-sm text-red-600 text-center my-2">
          Error fetching weather data
        </p>
      )}
    </>
  );
};

export default RealtimeWeather;

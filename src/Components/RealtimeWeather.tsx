import { useEffect, useState } from "react";
import axios from "axios";
import { WEATHER_API_KEY } from "../Constants";

interface RealtimeWeatherProps {
  latitude: number;
  longitude: number;
}

const RealtimeWeather: React.FC<RealtimeWeatherProps> = ({
  latitude,
  longitude,
}) => {
  const [weather, setWeather] = useState({
    temperature: 0,
    humidity: 0,
    windDirection: 0,
    windSpeed: 0,
  });

  useEffect(() => {
    // Fetch realtime weather data
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${WEATHER_API_KEY}`,
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        setWeather({
          temperature: res.data.values.temperature,
          humidity: res.data.values.humidity,
          windDirection: res.data.values.windDirection,
          windSpeed: res.data.values.windSpeed,
        });
        console.log(res);
      } catch (error) {
        console.error(`Error fetching weather data: ${error}`);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return (
    <>
      {weather && (
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
    </>
  );
};

export default RealtimeWeather;

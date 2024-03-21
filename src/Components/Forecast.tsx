import { useEffect, useState } from "react";
import axios from "axios";
import { WEATHER_API_KEY } from "../Constants";

interface RealtimeWeatherProps {
  latitude: number;
  longitude: number;
  location: string;
  timeRange: String;
}

const Forecast: React.FC<RealtimeWeatherProps> = ({
  latitude,
  longitude,
  location,
  timeRange,
}) => {
  const [data, setData] = useState<any>();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Fetch realtime weather data
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.tomorrow.io/v4/weather/forecast?location=${
            location.length > 0 ? location : `${latitude},${longitude}`
          }&timesteps=${timeRange}&apikey=${WEATHER_API_KEY}`,
          {
            headers: {
              accept: "application/json",
            },
          }
        );

        // Based on time range, set data
        if (timeRange === "1h") {
          setData(res.data.timelines.hourly);
        } else {
          setData(res.data.timelines.daily);
        }
      } catch (error) {
        console.error(`Error fetching weather data: ${error}`);
        setShowError(true);
      }
    };

    fetchData();

    return () => {
      setData("");
      setShowError(false);
    };
  }, [latitude, longitude, location, timeRange]);

  // Format date
  const formatDate = (date: any) => {
    if (date) {
      const dt = new Date(date);
      const month =
        dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
      const day = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
      const hours = dt.getHours() % 12 || 12;
      const minutes = (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes();
      const am_pm = dt.getHours() >= 12 ? "PM" : "AM";
      const time = hours + ":" + minutes + " " + am_pm;
      return day + "/" + month + "/" + dt.getFullYear() + " " + time;
    }
    return "";
  };

  return (
    <>
      {data &&
        data.map((weather: any) => (
          <>
            <h3 className="text-sm my-2">
              Date/Time: {formatDate(weather.time)}
            </h3>
            <h3 className="text-xl">
              {timeRange === "1h"
                ? `Temperature: ${weather.values.temperature}`
                : `Average Temperature: ${weather.values.temperatureAvg}`}
            </h3>
            <h4 className="text-md">
              {timeRange === "1h"
                ? `Humidity: ${weather.values.humidity}`
                : `Average Humidity: ${weather.values.humidityAvg}`}
            </h4>
            <h4 className="text-md">
              {timeRange === "1h"
                ? `Wind Direction: ${weather.values.windDirection}`
                : `Average Wind Direction: ${weather.values.windDirectionAvg}`}
            </h4>
            {timeRange === "1h"
              ? `Wind Speed: ${weather.values.windSpeed}`
              : `Average Wind Speed: ${weather.values.windSpeedAvg}`}
          </>
        ))}
      {showError && (
        <p className="text-sm text-red-600 text-center my-2">
          Error fetching weather data
        </p>
      )}
    </>
  );
};

export default Forecast;

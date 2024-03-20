import { useEffect } from "react";
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
        console.log(res);
        
      } catch (error) {
        console.error(`Error fetching weather data: ${error}`);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return <></>;
};

export default RealtimeWeather;

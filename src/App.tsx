import { useEffect, useState } from "react";
import "./App.css";
import RealtimeWeather from "./Components/RealtimeWeather";
import Forecast from "./Components/Forecast";

function App() {
  const [location, setLocation] = useState("");
  const [submitLoc, setSubmitLoc] = useState("");
  const [timeRange, setTimeRange] = useState("1h");

  const [selectService, setSelectService] = useState("realtime");

  console.log(timeRange);

  // Get geoLocation
  const [geoLocation, setGeoLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  // geoLocation error
  const [geoError, setGeoError] = useState("");

  // geoLocation loading
  const [geoLoading, setGeoLoading] = useState(true);

  // Fetch geo location inorder to fetch location based weather data
  useEffect(() => {
    const fetchGeoLocation = () => {
      if (!navigator.geolocation) {
        setGeoError("Geolocation is not supported by your browser");
        setGeoLoading(false);
        return;
      }

      // Fetching geolocation
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setGeoLocation({ latitude, longitude });
          setGeoLoading(false);
        },
        (err) => {
          setGeoError(`Error retrieving location: ${err.message}`);
          setGeoLoading(false);
        }
      );
    };

    fetchGeoLocation();
  }, []);

  const handleRealtimeBtn = () => {
    setSelectService("realtime");
  };

  const handleForecastBtn = () => {
    setSelectService("forecast");
  };

  const submitLocation = (e: any) => {
    e.preventDefault();

    // Remove comma and space from location
    const optimizedLocation = location.replace(/,| /g, "");
    setSubmitLoc(optimizedLocation);
  };

  return (
    <>
      <div className="bg-gray-900 min-h-screen w-screen flex justify-center items-center">
        <div className="bg-white shadow-md rounded-3xl p-6 my-5">
          {/* Location search */}
          <div>
            <form className="flex">
              <input
                type="text"
                placeholder="Enter your location"
                onChange={(e) => setLocation(e.target.value)}
                className="border-2 border-gray-300 rounded-md p-1 mr-2"
              />
              <button
                onClick={submitLocation}
                className="p-2 text-white rounded-md text-xs bg-slate-700"
              >
                Submit
              </button>
            </form>
            {geoError && <div className="text-red-500 text-xs">{geoError}</div>}
            {location === "" && geoLocation && (
              <div className="text-green-500 text-xs">
                Latitude: {geoLocation.latitude}, Longitude:{" "}
                {geoLocation.longitude}
              </div>
            )}
          </div>
          {/* Location search */}

          {/* Buttons */}
          <div className="flex my-5 justify-between">
            <button
              className={`py-1 px-2 text-white rounded-md text-xs ${
                selectService == "realtime" ? "bg-slate-700" : "bg-slate-500"
              }`}
              onClick={handleRealtimeBtn}
            >
              RealTime Weather
            </button>
            <button
              className={`py-1 px-2 text-white rounded-md text-xs ${
                selectService == "forecast" ? "bg-slate-700" : "bg-slate-500"
              }`}
              onClick={handleForecastBtn}
            >
              Weather Forecast
            </button>
          </div>
          {/* Buttons */}

          {/* Display loading indicator if still loading */}
          {geoLoading && <div>Loading...</div>}

          {/* Realtime weather component */}
          {selectService === "realtime" &&
            ((geoLocation.latitude !== 0 && geoLocation.longitude !== 0) ||
              location !== "") && (
              <RealtimeWeather
                latitude={geoLocation.latitude}
                longitude={geoLocation.longitude}
                location={submitLoc}
              />
            )}
          {selectService == "forecast" && (
            <>
              <div className="text-xs mb-1">
                Time Range:{" "}
                <select
                  className="border-2 border-gray-300 rounded-md mr-2"
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="1h">Hourly</option>
                  <option value="1d">Daily</option>
                </select>
              </div>
              {((geoLocation.latitude !== 0 && geoLocation.longitude !== 0) ||
                location !== "") && (
                <Forecast
                  latitude={geoLocation.latitude}
                  longitude={geoLocation.longitude}
                  location={submitLoc}
                  timeRange={timeRange}
                />
              )}
            </>
          )}
          {/* Realtime weather component */}
        </div>
      </div>
    </>
  );
}

export default App;

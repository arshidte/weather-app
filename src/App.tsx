import { useEffect, useState } from "react";
import "./App.css";
import RealtimeWeather from "./Components/RealtimeWeather";

// interface GeoLocation {
//   latitude: number;
//   longitude: number;
// }

function App() {
  const [location, setLocation] = useState("");

  // Get geoLocation
  const [geoLocation, setGeoLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  // geoLocation error
  const [geoError, setGeoError] = useState("");

  // Fetch geo location inorder to fetch location based weather data
  useEffect(() => {
    const fetchGeoLocation = () => {
      if (!navigator.geolocation) {
        setGeoError("Geolocation is not supported by your browser");
        return;
      }

      // Fetching geolocation
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setGeoLocation({ latitude, longitude });
        },
        (err) => {
          setGeoError(`Error retrieving location: ${err.message}`);
        }
      );
    };

    fetchGeoLocation();
  }, []);

  // Function to fetch geolocation

  return (
    <>
      <div className="bg-gray-900 h-screen w-screen flex justify-center items-center">
        <div className="bg-white shadow-md rounded-3xl p-6">
          {/* Location search */}
          <div>
            <form action="">
              <input
                type="text"
                placeholder="Enter your location"
                onChange={(e) => setLocation(e.target.value)}
                className="border-2 border-gray-300 rounded-md p-1 mr-2"
              />

              <button
                className="bg-slate-500 p-1 text-white rounded-md"
                type="submit"
              >
                Submit
              </button>
            </form>
            {geoError && <div className="text-red-500 text-xs">{geoError}</div>}
            {geoLocation && (
              <div className="text-green-500 text-xs">
                Latitude: {geoLocation.latitude}, Longitude:{" "}
                {geoLocation.longitude}
              </div>
            )}
          </div>
          {/* Location search */}

          {/* Realtime weather component */}
          {geoLocation.latitude !== 0 && geoLocation.longitude !== 0 && (
            <RealtimeWeather
              latitude={geoLocation.latitude}
              longitude={geoLocation.longitude}
            />
          )}
          {/* Realtime weather component */}
        </div>
      </div>
    </>
  );
}

export default App;

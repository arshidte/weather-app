# Weather App

This web application using React provides realtime weather data along with weather forecast based on time range.
You can fetch data based on geo location or location name.

## Coding structure
`App.tsx` is the entry point of the application. It renders the location input box, buttons to fetch realtime weather and forecast components.
Realtime weather component receive geo location(latitude and longitude) and search location and forecast weather component receive geo location(latitude and longitude), search location and time range.
The datas fetched in component from the API are temperature, humidity, wind direction and wind speed.
When it comes to daily time range of forecast, average of these are fetched.

Geo location fetched using `navigator.geolocation.getCurrentPosition`

## Installation

- Clone the repository
- Install packages using `npm install`
- Run application using `npm run dev`

## Libraries used

- Vite for installation
- Axios for API calls
- Tailwind CSS for styling

## Configuration

- Constants.ts has the API key
- Data may not fetch sometimes due to API rate limit. In that case change the API key

## Contact Information
Arshid Diyan TE
Phone: 7012394800
Email: geo.arshid@gmail.com
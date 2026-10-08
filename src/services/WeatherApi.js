const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeather(city) {
  const locationResponse = await fetch(
    `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
  );

  if (!locationResponse.ok) {
    throw new Error("Unable to search for this city.");
  }

  const locationData = await locationResponse.json();

  if (!locationData.results || locationData.results.length === 0) {
    throw new Error("City not found. Please try another city.");
  }

  const location = locationData.results[0];

  const weatherResponse = await fetch(
    `${WEATHER_URL}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&timezone=auto`,
  );

  if (!weatherResponse.ok) {
    throw new Error("Unable to fetch weather data.");
  }

  const weatherData = await weatherResponse.json();

  return {
    city: location.name,
    country: location.country,
    temperature: weatherData.current.temperature_2m,
    feelsLike: weatherData.current.apparent_temperature,
    humidity: weatherData.current.relative_humidity_2m,
    windSpeed: weatherData.current.wind_speed_10m,
    weatherCode: weatherData.current.weather_code,
    isDay: weatherData.current.is_day,
  };
}
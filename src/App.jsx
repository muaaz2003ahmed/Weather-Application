import { useState } from "react";
import {
  FaCloudSun,
  FaTint,
  FaWind,
  FaTemperatureHigh,
} from "react-icons/fa";
import SearchBar from "./components/SearchBar";
import { getWeather } from "./services/weatherApi";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const data = await getWeather(city);

      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background Effects */}

      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      {/* Navbar */}

      <header className="relative border-b border-white/10 bg-white/[0.03] backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a
            href="/"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <FaCloudSun className="text-2xl text-blue-400" />

            <span>
              Weather<span className="text-blue-400">App</span>
            </span>
          </a>

          <span className="text-md font-bold text-slate-300">
            Muaaz Ahmed
          </span>
        </nav>
      </header>

      {/* Main Content */}

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center px-6 py-20">
        <div className="mb-10 text-center">
          <p className="mb-4 text-md font-semibold uppercase tracking-[0.2em] text-blue-400">
            Weather Forecast Application
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Check the{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Current{" "}
            </span>Weather
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-slate-400">
            Search for any city and get the latest weather
            information instantly.
          </p>
        </div>

        <SearchBar
          onSearch={handleSearch}
          loading={loading}
        />

        {/* Error */}

        {error && (
          <div className="mt-8 rounded-xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Weather Card */}

        {weather && (
          <div className="mt-12 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
                  Current Weather
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {weather.city}
                </h2>

                <p className="mt-1 text-slate-400">
                  {weather.country}
                </p>
              </div>

              <div className="text-center sm:text-right">
                <FaCloudSun className="mx-auto text-6xl text-blue-400 sm:ml-auto sm:mr-0" />

                <p className="mt-3 text-5xl font-extrabold">
                  {Math.round(weather.temperature)}°C
                </p>

                <p className="mt-1 text-slate-400">
                  Feels like {Math.round(weather.feelsLike)}°C
                </p>
              </div>
            </div>

            {/* Weather Details */}

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <FaTint className="text-xl text-blue-400" />

                <p className="mt-3 text-sm text-slate-400">
                  Humidity
                </p>

                <p className="mt-1 text-xl font-bold">
                  {weather.humidity}%
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <FaWind className="text-xl text-cyan-400" />

                <p className="mt-3 text-sm text-slate-400">
                  Wind Speed
                </p>

                <p className="mt-1 text-xl font-bold">
                  {weather.windSpeed} km/h
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <FaTemperatureHigh className="text-xl text-purple-400" />

                <p className="mt-3 text-sm text-slate-400">
                  Feels Like
                </p>

                <p className="mt-1 text-xl font-bold">
                  {Math.round(weather.feelsLike)}°C
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}

        {!weather && !error && !loading && (
          <div className="mt-16 text-center text-slate-500">
            <FaCloudSun className="mx-auto mb-4 text-6xl text-blue-400/40" />

            <p>Search for a city to see the weather.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
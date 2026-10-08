import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!city.trim()) {
      return;
    }

    onSearch(city.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-2 shadow-2xl backdrop-blur-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-300">
        <FaSearch />
      </div>

      <input
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Search for a city..."
        className="min-w-0 flex-1 bg-transparent px-2 text-white outline-none placeholder:text-slate-400"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;
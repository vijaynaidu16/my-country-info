import React, { useState } from "react";
import { Button } from "./ui/button";

export interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
    svg?: string;
  };
  population: number;
  currencies: {
    [currencyCode: string]: {
      name: string;
      symbol: string;
    };
  };
  region: string;
  capital: string[];
}

const Card = () => {
  const [data, setData] = useState<Country[]>([]);
  const [error, setError] = useState<number | null>(null);
  const [country, setCountry] = useState<string>("");

  const fetchCountryData = async (region: string) => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${region}?fields=name,flags,population,currencies,region,capital`
      );
      if (!res.ok) {
        setData([]);
        setError(500);
        return;
      }
      const json: Country[] = await res.json();
      setData(json);
      setError(null);
      console.log(json);
    } catch {
      setData([]);
      setError(404);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCountryData(country);
    setCountry("");
  };

  return (
    <div className="flex justify-center flex-col items-center min-h-svh">
      <h1 className="Honk mb-10 text-4xl sm:text-6xl md:text-6xl lg:text-8xl ">fetch The World </h1>
      {error ? (
        <div>
          <h1>Error 401</h1>
        </div>
      ) : data.length > 0 ? (
        <div className="w-full overflow-x-auto scrollbar-hide">

        <div className="flex gap-10 mx-4 lg:flex-nowrap justify-center">
          {data.map((c) => (
            <div
            key={c.name.common}
            className="min-w-[320px] max-w-sm h-[420px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 text-center space-y-4 hover:scale-[1.02] transition-transform duration-300"
            >
              <h1 className="font-bold text-3xl text-white Honk">
                {c.name.common}
              </h1>
              <img
                src={c.flags.png}
                alt={c.name.common}
                className="w-32 h-20 mx-auto rounded shadow-md object-cover"
                />
              <p className="text-white text-lg">
                <span className="font-semibold">Population:</span>{" "}
                {c.population.toLocaleString()}
              </p>
              <p className="text-white">
                <span className="font-semibold">Region:</span> {c.region}
              </p>
              <p className="text-white">
                <span className="font-semibold">Capital:</span>{" "}
                {c.capital?.join(", ") || "N/A"}
              </p>
            </div>
          ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl Bricolage-Grotesque">Search your country</h1>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col mt-10">
        <input
          type="text"
          className="border border-white "
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default Card;

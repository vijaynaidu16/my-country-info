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
  const [country, setCountry] = useState<string>("");

  const fetchCountryData = async(country: string) => {
     const res = await fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,flags,population,currencies,region,capital`
  );
  const json: Country[] = await res.json();
  setData(json);
  }
  
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  fetchCountryData(country);
}
  
// setCountry("india");
  return (
    <div className="flex justify-center items-center min-h-svh">
        <form onSubmit={handleSubmit} className=" border border-white">
          <input type="text" className="outlined" value={country} onChange={(e) => setCountry(e.target.value.trim())} />
          <Button type="submit">Send</Button>
        </form>
          {
            data.map((c) => (
              <div key={c.name.common}>
                <h1>{c.name.common}</h1>
                <img src={c.flags.png} alt={c.name.common} />
                <p>{c.population}</p>
                <p>{c.region}</p>
                <p>{c.capital}</p>
              </div>
            ))
          }
    </div>
  )
}

export default Card;
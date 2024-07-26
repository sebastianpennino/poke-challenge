import { useSearchParams } from "@remix-run/react";
import { useDeferredValue, useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { PokemonTGGEpxansions, PokemonType } from "@prisma/client";

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(() => {
    return searchParams.get("q") ?? ""
  });

  const deferredQuery = useDeferredValue(query);

  const [expansion, setExpansion] = useState(() => {
    return searchParams.get("expansion") ?? ""
  });

  const deferredExpa = useDeferredValue(expansion);

  const [cardType, setCardType] = useState(() => {
    return searchParams.get("type") ?? ""
  });

  const deferredType = useDeferredValue(cardType);

  useEffect(() => {
    const updatedParams = {
      q: deferredQuery,
      ...(deferredExpa ? { expansion: deferredExpa } : {}),
      ...(deferredType ? { type: deferredType } : {})
    }
    setSearchParams(updatedParams);
  }, [deferredQuery, deferredExpa, deferredType, setSearchParams]);

  const updateParams = () => {
    const updatedParams = {
      q: deferredQuery,
      ...(deferredExpa ? { expansion: deferredExpa } : {}),
      ...(deferredType ? { type: deferredType } : {})
    }
    setSearchParams(updatedParams);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 p-2 bg-cyan-600">
      <input
        type="text"
        value={query}
        placeholder="Search cards..."
        className="border rounded-lg p-2 w-full sm:w-auto"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            updateParams();
          }
        }}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
      <Dropdown
        label="Expansion..."
        options={Object.values(PokemonTGGEpxansions)}
        selected={expansion}
        onSelect={(value) => setExpansion(value as PokemonTGGEpxansions)}
      />
      <Dropdown
        label="Type..."
        options={Object.values(PokemonType)}
        selected={cardType}
        onSelect={(value) => setCardType(value as PokemonType)}
      />
      {/* 
      <button
        onClick={() => { updateParams() }}
        tabIndex={0}
        className="bg-green-500 text-white p-2 px-4 rounded-lg"
      >
        Apply Filters
      </button>
      */}
      <button
        onClick={() => {
          setQuery("");
          setExpansion("");
          setCardType("");
          setSearchParams({
            q: ""
          });
        }}
        className="bg-gray-500 text-white p-2 px-4 rounded-lg"
      >
        Reset Filters
      </button>
    </div>
  );
}

export default SearchBar;

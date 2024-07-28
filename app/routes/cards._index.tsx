import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { PokemonCard } from "~/components/PokeCard";
import {
  getAllCardsWithFilters,
  PokemonTGGEpxansions,
  PokemonType,
} from "~/models/card.server";
import { requireUserId } from "~/session.server";
import { fetchAllPokemonPics } from "~/utils/picture.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(userId, "userId not found");

  let url = new URL(request.url);
  let queryParams = url.searchParams;

  // Access specific query parameters
  let q = queryParams.get("q") || "";
  let expansion = queryParams.get("expansion") as PokemonTGGEpxansions;
  let type = queryParams.get("type") as PokemonType;

  const updatedParams = {
    ...(q ? { q } : {}),
    ...(expansion ? { expansion } : {}),
    ...(type ? { type } : {}),
  };

  try {
    const cardItems = await getAllCardsWithFilters(updatedParams);
    const cardTitles = cardItems.map((card) => card.title);
    const cardImages = await fetchAllPokemonPics(cardTitles);
    const filtered = Object.keys(updatedParams).length > 0;
    return json({ cardItems, cardImages, filtered });
  } catch (error) {
    console.error(`Error fetching cards: ${error}`);
    return json(
      { cardItems: [], cardImages: [], filtered: false },
      { status: 500 },
    );
  }
};

export default function CardList() {
  const data = useLoaderData<typeof loader>();
  const { cardItems, cardImages, filtered } = data;

  return (
    <div className="bg-blue-200 h-full inset-0 bg-gradient-to-t from-white from-2%">
      {cardItems ? (
        <>
          {cardItems.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="p-4 text-center text-black">
                {filtered
                  ? "There's no cards matching your filters"
                  : "No cards yet, create a new one using the '+' button"}
              </p>
            </div>
          ) : (
            <div className="container mx-auto p-4">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {cardItems.map((card, idx) => {
                  if (!card) return null;
                  return (
                    <Link to={`/cards/${card.id}`} key={card.id}>
                      <PokemonCard
                        expansion={card.expansion}
                        hp={card.hp}
                        key={card.id}
                        rarity={card.rarity}
                        title={card.title}
                        type={card.type}
                        weakness={null}
                        resistance={null}
                        src={cardImages[idx]}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="p-4 text-center text-black">Loading...</p>
        </div>
      )}
    </div>
  );
}

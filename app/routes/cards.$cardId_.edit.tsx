import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getCardById } from "~/models/card.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.cardId, "cardId not found");
  const card = await getCardById({ id: params.cardId });
  if (!card) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ card });
};

// NOT IMPLEMENTED YET
export default function CardEdition() {
  const data = useLoaderData<typeof loader>();
  const { card } = data;

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <h1 className="text-3xl font-bold text-center p-8 text-red-500">
        Card Edition - Not implemented yet
      </h1>
      <p>Name: {card.title}</p>
      <p>ID: {card.id}</p>
      <p>Type: {card.type}</p>
      <p>Expansion: {card.expansion}</p>
      <p>HP: {card.hp}</p>
      <p>rarity: {card.rarity}</p>
      <p>resistance: {card.resistance}</p>
      <p>weakness: {card.weakness}</p>
    </div>
  );
}

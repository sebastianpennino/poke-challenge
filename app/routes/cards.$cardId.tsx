import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useActionData,
  useLoaderData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";
import { ErrorMessage } from "~/components/Error";
import { NotFoundMessage } from "~/components/NotFound";
import { PokemonCard } from "~/components/PokeCard";
import { deleteCardById, getAllCards, getCardById, simulateBattle, analyzeCardType, PokemonType, Rarity } from "~/models/card.server";
import { requireUserId } from "~/session.server";
import { typeToBgClass, typeToTextClass } from "~/utils/pokemonColor";
import cx from 'classnames';
import Modal from "~/components/Modal";
import { sleep } from "~/utils/sleep";
import { getPokemonPicFromExternalAPI } from "~/utils/pokemonPic.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.cardId, "cardId not found");

  try {
    const cardItems = await getAllCards();
    const card = await getCardById({ id: params.cardId });
    if (!card) {
      throw new Error("Card not found");
    }
    const cardImage = await getPokemonPicFromExternalAPI(card.title);

    return json({ card, cardImage, cardItems });
  } catch (error) {
    if (error instanceof Error) {
      throw new Response(error.message, { status: 500 });
    } else {
      throw new Response("An unexpected error occurred", { status: 500 });
    }
  }
};

export const action: ActionFunction = async ({ params, request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const actionType = formData.get('actionType');
  const oponentId = (formData.get('oponentId') ?? '') as string;

  invariant(params.cardId, "cardId not found");

  switch (actionType) {

    // Usage of the analyze function
    case 'analyze':
      try {
        const card = await getCardById({ id: params.cardId });

        if (!card || !card.type) {
          throw new Error("Card data not found");
        }

        const analysis = await analyzeCardType(card.type);
        const isEmptyWeak = analysis.weakAgainst.length === 0;
        const isEmptyStrong = analysis.strongAgainst.length === 0;
        const text = `
          ${card.title} is weak against: 
          ${isEmptyWeak ? 'no results' : analysis.weakAgainst.map(c => c.title).join(', ')}. 
          And strong against: 
          ${isEmptyStrong ? 'no results' : analysis.strongAgainst.map(c => c.title).join(', ')}.
        `

        // Adding dramatic delay
        await sleep(1500);

        return json({ success: true, message: text, raw: analysis }, { status: 200 });
      } catch (error) {
        console.error(error);
        return json({ success: false, message: "Error analyzing card" }, { status: 500 });
      }

    // Usage of the simulateBattle 
    case 'battle':
      try {
        const attacker = await getCardById({ id: params.cardId });
        const defender = await getCardById({ id: oponentId });

        if (!attacker || !defender) {
          throw new Error("Card data not found");
        }

        const result = await simulateBattle(
          { id: params.cardId, type: attacker.type },
          { hp: defender.hp, weakness: defender.weakness, resistance: defender.resistance }
        );
        const report = `Battling with ${defender.title} resulted in a ${result ? 'win' : 'loss'}`;

        // Adding dramatic delay
        await sleep(1500);

        return json({ success: true, message: report }, { status: 200 });
      } catch (error) {
        console.error(error);
        return json({ success: false, message: "Error battling opponents" }, { status: 500 });
      }

    case 'delete':
      try {
        await deleteCardById({ id: params.cardId, userId });
        return redirect("/cards");
      } catch (error) {
        console.error(error);
        return json({ success: false, message: "Error deleting card" }, { status: 500 });
      }

    default:
      // Handle unknown action -> Error page
      console.error('Unknown action type:', actionType);
      throw new Error(`Unknown action type: ${actionType}`);
  }
};

export default function CardDetailPage() {
  const data = useLoaderData<typeof loader>();
  const { card, cardImage, cardItems } = data;
  const bgClass = typeToBgClass(card.type);
  const textClass = typeToTextClass(card.type);

  const actionData = useActionData<typeof action>();   // Get the action data from the submission
  const navigation = useNavigation();   // Track the form submission state

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // Open the modal when there's a success message
  useEffect(() => {
    if (actionData?.success !== undefined) {
      setIsModalOpen(true);
    }
  }, [actionData]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen battle-page-bg sm:my-12 md:my-0">

      <div className="md:flex-1 flex flex-col items-center justify-center md:scale-125">
        <div className="flex flex-col items-center justify-center">

          {/* Pokemon card */}
          <PokemonCard
            expansion={card.expansion}
            hp={card.hp}
            key={card.id}
            rarity={card.rarity}
            title={card.title}
            type={card.type}
            attacks={card.attacks}
            resistance={card.resistance}
            weakness={card.weakness}
            src={cardImage}
          />

          {/* Additional actions */}
          <div className={cx('w-full max-w-md p-4 rounded-lg shadow-md mt-4', bgClass, textClass)}>
            <details data-testid="pokemon-card-additional-actions">
              <summary className="font-bold cursor-pointer">
                Additional Actions
              </summary>
              <div className="space-x-4 mt-4 text-sm">
                {showConfirm ? (
                  <div className="inline-block">
                    <span>Are you sure?</span>
                    <button className="bg-blue-700 text-white px-4 py-2 rounded ml-2" onClick={() => setShowConfirm(false)}>
                      No
                    </button>
                    <Form method="post" className="inline-block ml-2">
                      <input type="hidden" name="actionType" value="delete" />
                      <button className="bg-red-700 text-white px-4 py-2 rounded" disabled={navigation.state === "submitting"} type="submit" data-testid="delete-action">
                        {navigation.state === "submitting" ? "Deleting..." : "⚠️ Yes"}
                      </button>
                    </Form>
                  </div>
                ) : (
                  <>
                    {/* TODO: some day will do it, currently it's outside of the scope of the challenge */}
                    {/* 
                    <Link to={`/cards/${card.id}/edit`} className="inline-block">
                      <button className="bg-blue-700 text-white px-4 py-2 rounded" data-testid="edit-action">Edit</button>
                    </Link>
                    */}
                    <Form method="post" className="inline-block ml-2">
                      <input type="hidden" name="actionType" value="analyze" />
                      <button className="bg-green-700 text-white px-4 py-2 rounded" disabled={navigation.state === "submitting"} type="submit" data-testid="delete-action">
                        {navigation.formData?.get("actionType") === "analyze" && navigation.state === "submitting" ? "Analyzing..." : "Analyze oponents"}
                      </button>
                    </Form>
                    <button
                      className="bg-red-700 text-white px-4 py-2 rounded"
                      onClick={() => setShowConfirm(true)}
                      data-testid="delete-button"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </details>
          </div>

        </div>
      </div>

      <div className="my-4 md:mx-4">
        <div className={cx('flex items-center justify-center w-12 h-12 lg:w-24 lg:h-24 rounded-full text-xl font-bold', bgClass, textClass)} >
          VS
        </div>
      </div>

      <div className="md:flex-1 flex flex-col items-center justify-center">
        {/* Select an opponent */}
        <Form method="post" className="flex flex-col items-center space-y-4">
          <input type="hidden" name="actionType" value="battle" />
          <div className="w-full">
            <label htmlFor="oponentId" className="block text-lg font-medium text-gray-700 mb-2">Battle with:</label>
            <select
              id="oponentId"
              name="oponentId"
              value={selectedOption}
              onChange={handleSelectChange}
              className="block w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-400"
              data-testid="select-opponent"
            >
              <option value="">Select an opponent</option>
              {cardItems.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.title} (HP: {card.hp}) ({card.type.toLocaleLowerCase()})
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={!selectedOption}
            data-testid="battle-action"
            className="w-full py-4 px-6 text-lg font-bold text-white bg-gradient-to-r from-green-400 to-red-500 rounded-lg shadow-lg hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            {navigation.formData?.get("actionType") === "battle" && navigation.state === "submitting" ? "Simulating Battle..." : "Battle!"}
          </button>
        </Form>
      </div>

      {/* Modal with messages from the actions */}
      <Modal
        isOpen={isModalOpen}
        mode={actionData?.success ? "success" : "error"}
        onClose={() => setIsModalOpen(false)}
      >
        <p>{actionData?.message}</p>
      </Modal>

    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (error instanceof Error) {
    return <ErrorMessage message={`Something went wrong!: ${error.message}`} />;
  }
  if (!isRouteErrorResponse(error)) {
    return <ErrorMessage message="Unknown Error!" />;
  }
  if (error.status === 404) {
    return <NotFoundMessage message="Card not found!" />
  }
  return <ErrorMessage message={`Something went wrong!: ${error.statusText}`} />;;
}
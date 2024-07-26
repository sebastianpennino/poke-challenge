{/* TODO: some day will do it, currently it's outside of the scope of the challenge */}

import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { createCard, Rarity, PokemonType, PokemonTGGEpxansions, CreateCardArgs } from "~/models/card.server";
import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const defaults: CreateCardArgs = {
    title: "new card",
    hp: 100,
    weakness: PokemonType.BUG,
    resistance: PokemonType.BUG,
    rarity: Rarity.COMMON,
    type: PokemonType.BUG,
    expansion: PokemonTGGEpxansions.BS,
    attacks: [
      {
        name: "attack 1",
        body: "aaa",
        damage: 10,
      }
    ],
    userId
  };

  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { body: null, title: "Title is required" } },
      { status: 400 },
    );
  }

  if (typeof body !== "string" || body.length === 0) {
    return json(
      { errors: { body: "Body is required", title: null } },
      { status: 400 },
    );
  }
  const card = await createCard({ ...defaults, title });

  console.log(`CREATED CARD`, card);

  return redirect(`/cards/${card.id}`);
};


{/* TODO: some day will do it, currently it's outside of the scope of the challenge */}
export default function NewCardPage() {
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col justify-center p-8">
      <h1 className="text-3xl font-bold text-center">New Card</h1>
      <Form
        method="post"
        className="flex flex-col gap-2 w-full"
      >
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Title:</span>
            <input
              ref={titleRef}
              name="title"
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
              aria-invalid={actionData?.errors?.title ? true : undefined}
              aria-errormessage={
                actionData?.errors?.title ? "title-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.title ? (
            <div className="pt-1 text-red-700" id="title-error">
              {actionData.errors.title}
            </div>
          ) : null}
        </div>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Body:</span>
            <textarea
              ref={bodyRef}
              name="body"
              rows={8}
              className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
              aria-invalid={actionData?.errors?.body ? true : undefined}
              aria-errormessage={
                actionData?.errors?.body ? "body-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.body ? (
            <div className="pt-1 text-red-700" id="body-error">
              {actionData.errors.body}
            </div>
          ) : null}
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Save
          </button>
        </div>

      </Form>
    </div>
  );
}
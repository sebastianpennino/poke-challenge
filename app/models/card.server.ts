import type {
  User,
  Card,
  PokemonType,
  Attack,
  PokemonTGGEpxansions,
  Prisma,
} from "@prisma/client";
import { prisma } from "~/db.server";

export type { Card, Attack } from "@prisma/client";
export { Rarity, PokemonType, PokemonTGGEpxansions } from "@prisma/client";

export type CreateCardArgs = Pick<
  Card,
  "title" | "hp" | "weakness" | "resistance" | "rarity" | "type" | "expansion"
> & {
  userId: User["id"];
  attacks: Array<Pick<Attack, "name" | "body" | "damage">>;
};

/**
 * Creates a new card.
 *
 * @param {CreateCardArgs} param
 * @param {string} param.title - The title of the card.
 * @param {number} param.hp - The hit points of the card.
 * @param {string} param.weakness - The weakness of the card.
 * @param {string} param.resistance - The resistance of the card.
 * @param {string} param.rarity - The rarity of the card.
 * @param {PokemonType} param.type - The type of the card.
 * @param {string} param.expansion - The expansion of the card.
 * @param {User["id"]} param.userId - The ID of the user whos calling createCard
 * @param {Array<Pick<Attack, "name" | "body" | "damage">>} param.attacks - The attacks of the card.
 * @return {Promise<Card>} The created card.
 */
export function createCard({
  title,
  hp,
  weakness,
  resistance,
  rarity,
  type,
  expansion,
  userId,
  attacks,
}: CreateCardArgs) {
  // TODO: check for permissions
  return prisma.card.create({
    data: {
      title,
      hp,
      weakness,
      resistance,
      rarity,
      type,
      expansion,
      attacks: {
        create: [...attacks],
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

type CardId = Pick<Card, "id">;
/**
 * Updates an existing card
 *
 * @param {CreateCardArgs & CardId & { userId: User["id"] }} param
 * @param {string} param.title - The title of the card.
 * @param {number} param.hp - The hit points of the card.
 * @param {string} param.weakness - The weakness of the card.
 * @param {string} param.resistance - The resistance of the card.
 * @param {string} param.rarity - The rarity of the card.
 * @param {PokemonType} param.type - The type of the card.
 * @param {string} param.expansion - The expansion of the card.
 * @param {User["id"]} param.userId - The ID of the user whos calling updateCardById
 * @param {Array<Pick<Attack, "name" | "body" | "damage">>} param.attacks - The attacks of the card.
 * @return {Promise<Card>} The updated card.
 */
export function updateCardById({
  id,
  title,
  hp,
  weakness,
  resistance,
  rarity,
  type,
  expansion,
  userId,
}: CreateCardArgs & CardId & { userId: User["id"] }) {
  return prisma.card.update({
    data: {
      title,
      hp,
      weakness,
      resistance,
      rarity,
      type,
      expansion,
    },
    where: { id },
  });
}

/**
 * Get a specific card by its id
 *
 * @param {Object} param - The parameter object
 * @param {string} param.id - The id of the card to retrieve
 * @returns {Promise<Card>} A promise that resolves to the card object
 */
export function getCardById({ id }: CardId) {
  return prisma.card.findFirst({
    select: {
      id: true,
      title: true,
      hp: true,
      weakness: true,
      resistance: true,
      rarity: true,
      type: true,
      attacks: true,
      expansion: true,
    },
    where: { id },
  });
}

/**
 * Get all cards
 *
 * @returns {Promise<Array<Card>>} An array of cards sorted by updatedAt in descending order
 */
export function getAllCards() {
  return prisma.card.findMany({
    select: {
      id: true,
      title: true,
      hp: true,
      rarity: true,
      type: true,
      expansion: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}

/**
 * Get all cards filtered by query, expansion and type
 *
 * @param {{ q?: string; expansion?: PokemonTGGEpxansions; type?: PokemonType }} param
 * @param {string} [param.q] - The query to filter cards by title
 * @param {PokemonTGGEpxansions} [param.expansion] - The expansion to filter cards by
 * @param {PokemonType} [param.type] - The type to filter cards by
 * @returns {Promise<Array<Card>>} An array of cards sorted by updatedAt in descending order
 */
export function getAllCardsWithFilters({
  q,
  expansion,
  type,
}: {
  q?: string;
  expansion?: PokemonTGGEpxansions;
  type?: PokemonType;
}) {
  // Building the filter
  const where: Prisma.CardWhereInput = {};
  if (q) {
    where.title = { contains: q, mode: "insensitive" };
  }
  if (expansion) {
    where.expansion = expansion;
  }
  if (type) {
    where.type = type;
  }
  return prisma.card.findMany({
    where: Object.keys(where).length > 0 ? where : undefined,
    select: {
      id: true,
      title: true,
      hp: true,
      rarity: true,
      type: true,
      expansion: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}

/**
 * Deletes a card by its ID.
 *
 * @param {CardId & {userId: User["id"]}} param - The card ID and the user ID of the card's owner.
 * @param {string} param.id - The ID of the card to be deleted.
 * @param {User["id"]} param.userId - The ID of the user who owns the card.
 * @return {Promise<Prisma.Prisma__CardClient<Card>>} A promise that resolves to the deleted card.
 */
export function deleteCardById({
  id,
  userId,
}: CardId & { userId: User["id"] }) {
  return prisma.card.delete({
    where: { id },
  });
}

/**
 * Simulates a battle between an attacker and a defender.
 *
 * @param {Pick<Card, "id" | "type">} attacker - The attacker card.
 * @param {Pick<Card, "hp" | "weakness" | "resistance">} defender - The defender card.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the attacker wins the battle.
 */
export async function simulateBattle(
  attacker: Pick<Card, "id" | "type">,
  defender: Pick<Card, "hp" | "weakness" | "resistance">,
): Promise<boolean> {
  const availableAttacks = await prisma.card.findFirst({
    select: {
      attacks: true,
    },
    where: { id: attacker.id },
  });

  if (!availableAttacks) {
    // No attacks available -> battle can't be won
    return false;
  }

  // If at least one attack successfully gets the defender to 0 hp in one hit, the battle is won
  const result = availableAttacks.attacks.some((attack) => {
    let baseDamage = attack.damage ?? 0;

    // ASSUMPTION: attacker type determines attack type
    const isWeak = defender.weakness?.includes(attacker.type);

    // ASSUMPTION: attacker type determines attack type
    const isResistant = defender.resistance?.includes(attacker.type);

    // ASSUMPTION: resistance is always "-20" and weakness is always "x2"
    const oneHitResult =
      defender.hp - (baseDamage * (isWeak ? 2 : 1) - (isResistant ? 20 : 0));

    return oneHitResult <= 0;
  });

  return result;
}

/**
 * Analyzes the card type and returns the cards that are weak against it and strong against it.
 *
 * @param {PokemonType} cardType - The type of the card to analyze.
 * @returns {Promise<{ weakAgainst: Array<Pick<Card, "id" | "title">>, strongAgainst: Array<Pick<Card, "id" | "title">> }>} - A promise that resolves to an object containing the cards that are weak against the card type and strong against it.
 */
export async function analyzeCardType(cardType: PokemonType): Promise<{
  weakAgainst: Array<Pick<Card, "id" | "title">>;
  strongAgainst: Array<Pick<Card, "id" | "title">>;
}> {
  // Finds cards with resistance to the card type.
  const weakAgainst = await prisma.card.findMany({
    where: { resistance: cardType },
    select: {
      id: true,
      title: true,
    },
    orderBy: { title: "desc" },
  });

  // Finds cards with weakness to the card type.
  const strongAgainst = await prisma.card.findMany({
    where: { weakness: cardType },
    select: {
      id: true,
      title: true,
    },
    orderBy: { title: "desc" },
  });

  return { weakAgainst, strongAgainst };
}

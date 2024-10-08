import { Attack, Card, PokemonType } from "@prisma/client";
import cx from "classnames";
import { DEFAULT_POKE_IMG } from "~/constants";
import { getPokemonCardTheme } from "~/utils/theme";

type PokeCardProps = Pick<
  Card,
  "title" | "hp" | "type" | "expansion" | "rarity"
> & {
  attacks?: Attack[];
  weakness: PokemonType | null;
  resistance: PokemonType | null;
  src?: string;
};

export const PokemonCard = ({
  title,
  type,
  hp,
  expansion,
  rarity,
  attacks,
  resistance,
  weakness,
  src,
}: PokeCardProps) => {
  const { accentCol, bgCol, borderCol, textCol } = getPokemonCardTheme(type);
  const imgSrc = src || DEFAULT_POKE_IMG;

  return (
    <div
      className={cx(
        "rounded-lg shadow-lg overflow-hidden hover:drop-shadow-glow transition",
        bgCol,
      )}
      data-testid="pokemon-card"
    >
      <div className="p-2">
        <div className="flex justify-between items-center">
          <h2 className={cx("poke-title-normal font-bold lg:text-lg", textCol)}>
            {title}
          </h2>
          <div className="flex items-center space-x-1">
            <p className={cx("text-sm font-semibold lg:text-lg", textCol)}>
              {hp}
            </p>
            <svg
              className={cx(
                "w-4 h-4 lg:w-6 lg:h-6 rounded-full p-1",
                accentCol,
              )}
            >
              {/* TODO: SVG content for each type here */}
            </svg>
          </div>
        </div>
      </div>
      <img
        src={imgSrc}
        alt={title}
        className={cx(
          "w-full h-32 object-cover border-y-4",
          borderCol,
          attacks ? "min-w-48" : "",
        )}
      />
      {attacks && (
        <>
          {weakness && (
            <div className={cx("text-xs border-b-4", borderCol, textCol)}>
              <span className="p-2">Weakness: {weakness} (x2)</span>
            </div>
          )}
          {resistance && (
            <div className={cx("text-xs border-b-4", borderCol, textCol)}>
              <span className="p-2">Resistance: {resistance} (-20)</span>
            </div>
          )}
          <div className={cx("border-b-4", borderCol, textCol)}>
            <span className="p-2">Attacks:</span>
            <ol className="pl-2">
              {attacks.map((attack) => (
                <li className="text-sm italic">
                  - {attack.name} ({attack.damage})
                </li>
              ))}
            </ol>
          </div>
          <div className={cx("border-b-4", borderCol, textCol)}>
            <span className="p-2">Stats:</span>
            <ol className="pl-2">
              <li className="text-sm"> - {type}</li>
              <li className="text-sm"> - {expansion}</li>
              <li className="text-sm"> - {rarity}</li>
            </ol>
          </div>
        </>
      )}
      {!attacks && (
        <ol className="p-2 mt-2 lg:mt-4">
          <li className={cx("text-sm", textCol)}>{type}</li>
          <li className={cx("text-sm", textCol)}>{expansion}</li>
          <li className={cx("text-sm", textCol)}>{rarity}</li>
        </ol>
      )}
    </div>
  );
};

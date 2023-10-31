import type { GameDifficulty } from "~/routes/_index";

type Props = GameDifficulty & {
  current: string;
  setCurrentDifficulty: (diff: GameDifficulty) => void;
};

function SelectDifficulty({
  difficulty,
  sprite,
  cardsPerDeck,
  cardsPerTurn,

  current,
  setCurrentDifficulty,
}: Props) {
  const isSelected = difficulty === current;

  return (
    <label
      htmlFor={difficulty}
      onClick={() =>
        setCurrentDifficulty({ difficulty, cardsPerDeck, cardsPerTurn })
      }
      className={`${
        isSelected && "scale-110 drop-shadow-sm shadow-zinc-700 "
      } shadow-lg select-none cursor-pointer  bg-gradient-to-t from-green-700 to-green-800  p-2 sm:p-3 rounded-lg flex sm:flex-col justify-center items-center brightness-90 transition-all hover:brightness-100 `}
    >
      <input
        type="radio"
        name="difficulty"
        value={`${difficulty},${cardsPerDeck},${cardsPerTurn}`}
        id={difficulty}
        className="hidden"
        defaultChecked={difficulty === "Easy"}
      />

      <img
        src={sprite}
        alt="Sprite of a Pokemon"
        className="w-[5rem] sm:w-[7rem] mb-2 contrast-125"
      ></img>
      <div className="sm:text-center p-2">
        <h1
          className={`${
            isSelected && "text-cyan-900 font-bold"
          } text-3xl tracking-tight`}
        >
          {difficulty}
        </h1>
        <p className="font-thin">
          <span className="font-bold">- {cardsPerTurn}</span> cards per turn
        </p>
        <p className="font-thin">
          <span className="font-bold">- {cardsPerDeck}</span> cards per deck
        </p>
      </div>
    </label>
  );
}

export default SelectDifficulty;

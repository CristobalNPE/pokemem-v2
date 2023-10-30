import type { MetaFunction } from "@remix-run/node";
import { NavLink, useNavigate } from "@remix-run/react";
import { useState } from "react";
import Logo from "~/assets/PokeMemLogo.png";
import CharmanderSprite from "~/assets/char1.png";
import CharmeleonSprite from "~/assets/char2.png";
import CharizardSprite from "~/assets/char3.png";
import SelectDifficulty from "~/components/SelectDifficulty";

export const meta: MetaFunction = () => {
  return [
    { title: "PokeMem" },
    { name: "description", content: "Play Memorize with Pokemon cards!" },
  ];
};

export type GameDifficulty = {
  difficulty: string;
  sprite?: string;
  cardsPerTurn: number;
  cardsPerDeck: number;
};

export default function Index() {
  const difficulties: GameDifficulty[] = [
    {
      difficulty: "Easy",
      sprite: CharmanderSprite,
      cardsPerTurn: 4,
      cardsPerDeck: 20,
    },
    {
      difficulty: "Normal",
      sprite: CharmeleonSprite,
      cardsPerTurn: 6,
      cardsPerDeck: 30,
    },
    {
      difficulty: "Hard",
      sprite: CharizardSprite,
      cardsPerTurn: 8,
      cardsPerDeck: 40,
    },
  ];

  const [currentDifficulty, setCurrentDifficulty] = useState<GameDifficulty>(
    difficulties[0]
  );
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-[100dvh]  ">
      <div className="h-[100dvh] w-fit justify-center sm:h-auto flex flex-col items-center gap-5 mx-auto p-4 sm:p-12">
        <img
          className="mx-auto sm:pt-6 w-[30rem] brightness-125 "
          src={Logo}
          alt="PokeMem Logo"
        />

        <div className="flex sm:flex-row flex-col gap-4 sm:gap-8 my-4 sm:my-8">
          {difficulties.map((diff) => (
            <SelectDifficulty
              key={diff.difficulty}
              {...diff}
              current={currentDifficulty.difficulty}
              setCurrentDifficulty={setCurrentDifficulty}
            />
          ))}
        </div>
        <button
          onClick={() => {
            alert(JSON.stringify(currentDifficulty));
            navigate("game")
          }}
          className="btn  btn-layered-3d btn-layered-3d--blue text-xl"
        >
          Play
        </button>
       
      </div>
    </div>
  );
}
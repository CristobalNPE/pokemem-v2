import type { MetaFunction } from "@remix-run/node";
import Logo from "~/assets/PokeMemLogo.png";
import PichuSprite from "~/assets/pichuSprite.png";
import PikachuSprite from "~/assets/pikachuSprite.png";
import RaichuSprite from "~/assets/raichuSprite.png";
import SelectDifficulty from "~/components/SelectDifficulty";

export const meta: MetaFunction = () => {
  return [
    { title: "PokeMem" },
    { name: "description", content: "Play Memorize with Pokemon cards!" },
  ];
};

export type GameDifficulty = {
  difficulty: string;
  sprite: string;
  cardsPerTurn: number;
  cardsPerDeck: number;
};

export default function Index() {
  const difficulties: GameDifficulty[] = [
    {
      difficulty: "Fácil",
      sprite: PichuSprite,
      cardsPerTurn: 4,
      cardsPerDeck: 20,
    },
    {
      difficulty: "Normal",
      sprite: PikachuSprite,
      cardsPerTurn: 6,
      cardsPerDeck: 30,
    },
    {
      difficulty: "Difícil",
      sprite: RaichuSprite,
      cardsPerTurn: 8,
      cardsPerDeck: 40,
    },
  ];

  return (
    <div className="grid place-content-center min-h-[100dvh] ">
      <div className="flex flex-col items-center gap-5 bg-zinc-800 bg-texture-2 bg-blend-multiply ring-8 ring-zinc-800 bg-repeat min-w-md mx-auto p-8 rounded-lg">
        <img
          className="mx-auto py-12 w-[30rem] brightness-125 hover:brightness-150 hover:scale-105 transition-all cursor-pointer"
          src={Logo}
          alt="PokeMem Logo"
        />
        <button className="btn btn-layered-3d btn-layered-3d--blue text-xl">
          Comenzar Juego
        </button>

        <div className="flex sm:flex-row flex-col gap-8 mt-12">
          {difficulties.map((diff) => (
            <SelectDifficulty key={diff.difficulty} {...diff} />
          ))}
        </div>
      </div>
    </div>
  );
}

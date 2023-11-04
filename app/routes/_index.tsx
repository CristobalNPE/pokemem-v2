import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { motion } from "framer-motion";
import { useState } from "react";
import Logo from "~/assets/PokeMemLogo.png";
import CharmanderSprite from "~/assets/char1.png";
import CharmeleonSprite from "~/assets/char2.png";
import CharizardSprite from "~/assets/char3.png";
import SelectDifficulty from "~/components/SelectDifficulty";
import { gameSettings } from "~/cookies.server";

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

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="flex justify-center items-center min-h-[100dvh]  ">
      <div className="h-[100dvh] w-fit justify-center sm:h-auto flex flex-col items-center gap-5 mx-auto p-4 sm:p-12">
        <motion.img
          initial={{
            scale: 3,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 3,
            type: "spring",
          }}
          className="mx-auto sm:pt-6 w-[30rem] brightness-125 "
          src={Logo}
          alt="PokeMem Logo"
        />

        <motion.div
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            delay: 1.5,
            duration: 1,
            type: "tween",
          }}
        >
          <Form
            id="difficultySelect"
            method="post"
            className="flex sm:flex-row flex-col gap-4 sm:gap-8 my-4 sm:my-8"
          >
            {difficulties.map((diff) => (
              <SelectDifficulty
                key={diff.difficulty}
                {...diff}
                current={currentDifficulty.difficulty}
                setCurrentDifficulty={setCurrentDifficulty}
              />
            ))}
          </Form>
        </motion.div>
        <motion.button
          initial={{
            y: 500,
            scale: 1.5,
          }}
          animate={{
            y: 0,
            scale: 1,
          }}
          transition={{
            delay: 2,
            duration: 1,
            type: "tween",
          }}
          form="difficultySelect"
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading && "brightness-75 "
          }btn  btn-layered-3d btn-layered-3d--blue text-xl`}
        >
          {isLoading ? "Loading ... " : "Play"}
        </motion.button>
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await gameSettings.parse(cookieHeader)) || {};
  const data = await request.formData();

  const difficultyInfo = data.get("difficulty");
  const [difficulty, cardsPerDeck, cardsPerTurn]: string[] = difficultyInfo
    ? difficultyInfo.toString().split(",")
    : [];

  cookie.score = 0;
  cookie.difficulty = difficulty;
  cookie.cardsPerDeck = cardsPerDeck;
  cookie.cardsPerTurn = cardsPerTurn;

  return redirect("game", {
    headers: {
      "Set-Cookie": await gameSettings.serialize(cookie),
    },
  });
}

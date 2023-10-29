import { useState } from "react";
import type { GameDifficulty } from "~/routes/_index";

type Props = GameDifficulty & {};

function SelectDifficulty({
  difficulty,
  sprite,
  cardsPerDeck,
  cardsPerTurn,
}: Props) {
  return (
    <div className="cursor-pointer bg-texture-3 bg-green-900 bg-blend-overlay p-3 rounded-lg flex sm:flex-col justify-center items-center brightness-90 transition-all hover:brightness-100 hover:scale-105">
      <img
        src={sprite}
        alt="Sprite of a Pokemon"
        className="w-[7rem] mb-2"
      ></img>
      <div className="sm:text-center p-2">
        <h1 className="text-3xl font-black tracking-tight ">{difficulty}</h1>
        <p className="font-thin">
          {" "}
          <span className="font-bold">- {cardsPerTurn}</span> cartas por turno
        </p>
        <p className="font-thin">
          {" "}
          <span className="font-bold">- {cardsPerDeck}</span> cartas por mazo
        </p>
      </div>
    </div>
  );
}

export default SelectDifficulty;

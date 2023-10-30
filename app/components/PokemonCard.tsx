import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

type Props = {
  id: number;
  name: string;
  sprite: string;
  storePokemonId: (id: number) => void;
};

function PokemonCard({ id, name, sprite, storePokemonId }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = sprite;
    image.onload = () => {
      setLoading(false);
    };
  }, [sprite]);

  return (
    <Tilt tiltReverse>
      <article
        onClick={() => storePokemonId(id)}
        className="select-none hover:scale-105 hover:brightness-110  brightness-90 transition-all duration-700 cursor-pointer h-[20rem] w-[15rem] bg-texture-1 bg-zinc-500  bg-blend-multiply p-2 rounded-xl flex flex-col justify-between items-center gap-2"
      >
        {loading && (
          <div className="text-white text-xl bg-gradient-to-r from-green-700 to-green-800 w-full rounded-lg py-5 h-[16.5rem]" />
        )}
        <img
          src={sprite}
          alt={`Sprite of ${name}`}
          className={`${
            loading && "hidden "
          } " bg-gradient-to-r from-green-700 to-green-800 w-full rounded-lg py-5 h-[15rem]"`}
        />
        <h1 className="text-xl capitalize font-bold">{name}</h1>
      </article>
    </Tilt>
  );
}

export default PokemonCard;

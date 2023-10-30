import Tilt from "react-parallax-tilt";

type Props = {
  id: number;
  name: string;
  sprite: string;
};

function PokemonCard({ id, name, sprite }: Props) {
  return (
    <Tilt tiltReverse>
      <article className="cursor-pointer max-w-[15rem] bg-texture-1 bg-zinc-500  bg-blend-multiply p-2 rounded-xl flex flex-col justify-center items-center gap-2">
        <img
          src={sprite}
          alt={`Sprite of ${name}`}
          className="bg-gradient-to-r from-green-700 to-green-800 rounded-lg py-5"
        />
        <h1 className="text-2xl capitalize font-bold">{name}</h1>
      </article>
    </Tilt>
  );
}

export default PokemonCard;

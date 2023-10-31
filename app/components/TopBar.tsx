import { NavLink } from "@remix-run/react";
import { HelpCircle, MonitorPlay } from "lucide-react";
import Logo from "~/assets/PokeMemLogo.png";
type Props = {
  score: number;
  difficulty: string;
};

function Topbar({ score, difficulty }: Props) {
  return (
    <nav className="flex flex-row sticky top-0 z-20 justify-between bg-green-900/10  items-center px-5  py-2 backdrop-blur-md h-[10rem] gap-1 sm:gap-12 rounded-b-xl">
      <div className="sm:flex-row  grow gap-8 flex flex-col items-center">
        <div className="flex gap-4 sm:gap-12   justify-between items-center ">
          <NavLink to="/">
            <img
              className="w-[12rem] h-[3rem] sm:w-[15rem] sm:h-[5rem] brightness-125 "
              src={Logo}
              alt="PokeMem Logo"
            />
          </NavLink>
        </div>

        <div className="flex justify-between gap-5 sm:flex-col ring-4 ring-green-700 p-2 sm:p-4 min-w-[12rem] rounded-lg bg-green-700/20 mx-auto">
          <h1 className="text-xl font-bold">Score: {score}</h1>
          <h1 className="text-xl font-bold">
            <span className="hidden sm:inline">Difficulty:</span> {difficulty}
          </h1>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row  gap-5 justify-center w-fit  items-center ">
        <button
          aria-label="Disable sound"
          className="bg-zinc-800 p-4 rounded-full hover:bg-zinc-900 hover:brightness-110 transition-all w-fit"
        >
          <MonitorPlay size={28} color="#ffffff" strokeWidth={2.5} />
        </button>

        <button
          aria-label="Disable sound"
          className="bg-zinc-800 p-4 rounded-full hover:bg-zinc-900 hover:brightness-110 transition-all w-fit"
        >
          <HelpCircle size={28} color="#ffffff" strokeWidth={2.5} />
        </button>
      </div>
    </nav>
  );
}

export default Topbar;

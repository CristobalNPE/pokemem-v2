import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { gameSettings } from "~/cookies.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await gameSettings.parse(cookieHeader)) || {};

  return json({
    difficulty: cookie.difficulty,
    cardsPerDeck: cookie.cardsPerDeck,
    cardsPerTurn: cookie.cardsPerTurn,
  });
}

export default function Game() {
  const difficultyData = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-5xl font-bold">Game Page</h1>
      <h1 className="text-5xl font-bold">{difficultyData.difficulty}</h1>
      <h1 className="text-5xl font-bold">{difficultyData.cardsPerDeck}</h1>
      <h1 className="text-5xl font-bold">{difficultyData.cardsPerTurn}</h1>
    </>
  );
}

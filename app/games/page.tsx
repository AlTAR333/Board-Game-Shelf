import type { Metadata } from "next";
import { GameList } from "@/components/game-list";
import { getGames } from "@/lib/games";

export const metadata: Metadata = {
  title: "Games",
  description: "The full catalogue of board games in the collection",
};

// Rendered on each request, so that loading.tsx also shows under npm start
export const dynamic = "force-dynamic";

export default async function GamesPage() {
  const games = await getGames();

  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Games</h1>
      <p className="mt-2 text-sm">{games.length} games in the collection</p>
      <GameList games={games} />
    </main>
  );
}

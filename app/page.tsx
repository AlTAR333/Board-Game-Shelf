import Link from "next/link";
import { GameList } from "@/components/game-list";
import { getGames, getSessions } from "@/lib/games";

export default async function Home() {
  const games = await getGames();
  const sessions = await getSessions();

  const latestGames = games.slice(-3).reverse();
  const latestSessions = sessions.slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Board Game Shelf</h1>
      <p className="mt-2">
        My board game collection, with the rules in a nutshell and the results of our game nights.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Latest games added</h2>
      <GameList games={latestGames} />
      <Link href="/games" className="mt-4 inline-block underline">
        See all games
      </Link>

      <h2 className="mt-8 text-xl font-semibold">Latest play sessions</h2>
      <ul className="mt-4 space-y-2">
        {latestSessions.map((session) => {
          const game = games.find((g) => g.slug === session.gameSlug);
          return (
            <li key={session.id} className="text-sm">
              {session.playedAt} ·{" "}
              <Link href={`/games/${session.gameSlug}`} className="underline">
                {game?.title ?? session.gameSlug}
              </Link>{" "}
              · winner: {session.winner}
            </li>
          );
        })}
      </ul>
    </main>
  );
}

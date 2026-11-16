import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGame, getGames, getSessions } from "@/lib/games";

// Only the slugs returned by generateStaticParams exist: any other slug is a 404
export const dynamicParams = false;

// Runs at build time: one HTML page per game
export async function generateStaticParams() {
  const games = await getGames();
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/games/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGame(slug);
  if (!game) return {};
  return { title: game.title, description: game.description };
}

export default async function GamePage({ params }: PageProps<"/games/[slug]">) {
  const { slug } = await params;
  const game = await getGame(slug);
  if (!game) notFound();

  const sessions = await getSessions(game.slug);
  const lastWinner = sessions.length > 0 ? sessions[0].winner : null;

  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold">{game.title}</h1>
      <p className="mt-2">
        {game.year} · {game.minPlayers}-{game.maxPlayers} players · {game.minutes} min
      </p>
      <p className="mt-4">{game.description}</p>

      <h2 className="mt-8 text-xl font-semibold">Rules in a nutshell</h2>
      <p className="mt-2">{game.rulesSummary}</p>

      <h2 className="mt-8 text-xl font-semibold">Play history</h2>
      <p className="mt-2 text-sm">
        Played {sessions.length} {sessions.length === 1 ? "time" : "times"}
        {lastWinner ? ` · last winner: ${lastWinner}` : ""}
      </p>
      {sessions.length === 0 ? (
        <p className="mt-2">No play session recorded yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {sessions.map((session) => (
            <li key={session.id} className="rounded border p-4">
              <p className="font-semibold">{session.playedAt}</p>
              <p className="text-sm">Players: {session.players}</p>
              <p className="text-sm">Winner: {session.winner}</p>
              {session.notes ? <p className="mt-1 text-sm">{session.notes}</p> : null}
            </li>
          ))}
        </ul>
      )}

      <Link href="/games" className="mt-6 inline-block underline">
        Back to all games
      </Link>
    </main>
  );
}

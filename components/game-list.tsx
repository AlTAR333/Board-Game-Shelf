import Link from "next/link";
import type { Game } from "@/lib/games";

export function GameList({ games }: { games: Game[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {games.map((game) => (
        <li key={game.slug} className="rounded border p-4">
          <h2 className="font-semibold">
            <Link href={`/games/${game.slug}`} className="hover:underline">
              {game.title} ({game.year})
            </Link>
          </h2>
          <p className="text-sm">
            {game.minPlayers}-{game.maxPlayers} players · {game.minutes} min
          </p>
        </li>
      ))}
    </ul>
  );
}

import games from "@/data/games.json";
import sessions from "@/data/sessions.json";

export type Game = {
  slug: string;
  title: string;
  year: number;
  minPlayers: number;
  maxPlayers: number;
  minutes: number;
  description: string;
  rulesSummary: string;
};

// One Game has many PlaySessions (linked by gameSlug).
// In Milestone 3, gameSlug becomes the foreign key gameId in Prisma.
export type PlaySession = {
  id: number;
  gameSlug: string;
  playedAt: string;
  players: string;
  winner: string;
  notes: string;
};

// Simulates a slow database query (1 second)
export async function getGames(): Promise<Game[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return games;
}

// The slug comes from the URL, so it is always a string
export async function getGame(slug: string): Promise<Game | undefined> {
  const all = await getGames();
  return all.find((game) => game.slug === slug);
}

// Newest first
export async function getSessions(gameSlug?: string): Promise<PlaySession[]> {
  const list: PlaySession[] = gameSlug
    ? sessions.filter((s) => s.gameSlug === gameSlug)
    : sessions;
  return [...list].sort((a, b) => b.playedAt.localeCompare(a.playedAt));
}

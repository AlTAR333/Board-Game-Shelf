// Nested layout: wraps /games and every page below it, such as /games/catan.
export default function GamesLayout({ children }: LayoutProps<"/games">) {
  return (
    <>
      <aside aria-label="Games section" className="mx-auto w-full max-w-2xl px-8 pt-6">
        <p className="rounded bg-zinc-100 px-3 py-2 text-sm dark:bg-zinc-800">
          The collection: every game has its own page with the rules and the play history.
        </p>
      </aside>
      {children}
    </>
  );
}

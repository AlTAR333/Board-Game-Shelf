// Shown at once while a page of /games waits for its data
export default function GamesLoading() {
  return (
    <p role="status" className="mx-auto w-full max-w-2xl p-8">
      Loading the games...
    </p>
  );
}

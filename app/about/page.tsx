import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "What Board Game Shelf is and how to use it",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-2">
        Board Game Shelf is a public catalogue of a board game collection. Each game has a page
        with its rules summary and the history of the play sessions: who played, and who won.
      </p>
      <p className="mt-2">
        It is built with Next.js for the Full-Stack Frameworks and Server-Side Rendering course.
      </p>
    </main>
  );
}

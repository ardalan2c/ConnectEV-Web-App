import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-slate-600 mt-2">Check the URL or return to the homepage.</p>
      <Link className="inline-flex mt-6 rounded-2xl bg-accent text-slate-950 px-6 py-3" href="/">Go home</Link>
    </div>
  );
}


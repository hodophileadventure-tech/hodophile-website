import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-6 py-16">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-4 font-serif text-5xl font-semibold text-stone-950">That journey is not here.</h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">Use one of these routes to continue exploring Hodophile Adventures.</p>
      <nav aria-label="Helpful links" className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="bg-[#fcc000] px-5 py-3 text-sm font-semibold text-black">Back home</Link>
        <Link href="/destinations" className="border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900">Destinations</Link>
        <Link href="/tours" className="border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900">Tours</Link>
        <Link href="/contact-us" className="border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900">Contact</Link>
      </nav>
    </main>
  );
}
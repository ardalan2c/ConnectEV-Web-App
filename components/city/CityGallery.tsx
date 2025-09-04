import Image from "next/image";

export function CityGallery({ photos }: { photos: { src: string; alt: string }[] }) {
  if (!photos || photos.length === 0) return null;
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Recent Work in Your Area</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map((p) => (
          <div key={p.src} className="relative h-40 md:h-56 rounded-xl overflow-hidden border border-black/10 bg-white">
            <Image src={p.src} alt={p.alt} fill sizes="(min-width:768px) 33vw, 50vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
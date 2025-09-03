import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const metadata = { title: "Condo Letter Generator" };

async function createLetter(formData: FormData) {
  "use server";
  const payload = {
    owner: formData.get("owner") as string,
    unit: formData.get("unit") as string,
    spot: formData.get("spot") as string,
    building: formData.get("building") as string,
    charger: formData.get("charger") as string,
    lec: formData.get("lec") as string,
  };
  const query = new URLSearchParams(payload as any).toString();
  const url = `/tools/condo-letter/download?${query}`;
  try {
    await prisma.document.create({ data: { type: "condo_letter", url, metadataJson: payload as any } });
  } catch {}
  revalidatePath("/admin/leads");
  return url;
}

export default function CondoLetterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Condo Letter Generator</h1>
      <form action={createLetter} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="owner" required placeholder="Owner" className="h-11 rounded-2xl border border-black/10 px-3" />
        <input name="unit" required placeholder="Unit" className="h-11 rounded-2xl border border-black/10 px-3" />
        <input name="spot" required placeholder="Parking spot" className="h-11 rounded-2xl border border-black/10 px-3" />
        <input name="building" required placeholder="Building" className="h-11 rounded-2xl border border-black/10 px-3" />
        <input name="charger" required placeholder="Charger model" className="h-11 rounded-2xl border border-black/10 px-3" />
        <input name="lec" required placeholder="LEC license" className="h-11 rounded-2xl border border-black/10 px-3" />
        <div className="md:col-span-2">
          <button className="rounded-2xl bg-accent text-slate-950 px-6 py-3 font-medium">Generate</button>
        </div>
      </form>
    </div>
  );
}


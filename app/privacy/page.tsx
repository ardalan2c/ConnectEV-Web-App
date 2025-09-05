export const metadata = { title: "Privacy", description: "How we handle your contact details, addresses, and panel photos." };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Privacy</h1>
      <div className="rounded-2xl border border-black/10 p-4 space-y-3 text-sm text-slate-700">
        <p>We collect only what’s needed to provide quotes, schedule service, and communicate about your project. Contact details and address information are used to prepare estimates and book visits. Panel photos are used to assess capacity and ensure code compliance.</p>
        <p>Third‑party providers are used server‑side for email, SMS, analytics, and file storage. Keys are never exposed on the client. You can request deletion of your data at any time.</p>
      </div>
    </div>
  );
}

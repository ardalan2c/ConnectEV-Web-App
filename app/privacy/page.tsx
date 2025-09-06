import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ConnectEV Inc.",
  description: "Privacy policy for ConnectEV Inc. EV charger installation services.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-gray max-w-none">
        <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
          <p className="text-gray-700 leading-relaxed">
            We collect only what's needed to provide quotes, schedule service, and communicate about your project. 
            Contact details and address information are used to prepare estimates and book visits. Panel photos are 
            used to assess capacity and ensure code compliance.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Third-party providers are used server-side for email, SMS, analytics, and file storage. Keys are never 
            exposed on the client. You can request deletion of your data at any time by contacting us.
          </p>
        </div>
      </div>
    </main>
  );
}


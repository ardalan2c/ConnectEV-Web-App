"use client";
import * as React from "react";
import { AddressAutocomplete } from "./AddressAutocomplete";
import { PhotoDropzone } from "./PhotoDropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PriceBandCard } from "@/components/common/PriceBandCard";
import { AvailabilityPicker } from "@/components/common/AvailabilityPicker";
import { env } from "@/lib/env";
import { estimatePriceBand, clampBand } from "@/lib/pricing";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

export function QuoteWizard() {
  const [step, setStep] = React.useState<Step>(0);
  const [address, setAddress] = React.useState<{ description: string; placeId?: string } | null>(null);
  const [runLength, setRunLength] = React.useState(10);
  const [photos, setPhotos] = React.useState<File[]>([]);
  const [chargerType, setChargerType] = React.useState<string>("Tesla");
  const [extras, setExtras] = React.useState({ pedestal: false, trenchingMeters: 0, drywallRepair: false, loadMgmtDevice: false });
  const [contact, setContact] = React.useState({ first: "", last: "", email: "", phone: "", casl: false });
  const band = clampBand(estimatePriceBand(runLength, extras));

  const next = () => setStep((s) => Math.min(5, (s + 1) as Step));
  const back = () => setStep((s) => Math.max(0, (s - 1) as Step));

  async function submitLead() {
    const fd = new FormData();
    fd.set("address", address?.description || "");
    fd.set("placeId", address?.placeId || "");
    fd.set("runLengthMeters", String(runLength));
    fd.set("chargerType", chargerType);
    fd.set("extrasJson", JSON.stringify(extras));
    fd.set("firstName", contact.first);
    fd.set("lastName", contact.last);
    fd.set("email", contact.email);
    fd.set("phone", contact.phone);
    fd.set("caslConsent", String(contact.casl));
    photos.forEach((p, i) => fd.append("photos", p, p.name || `photo-${i}.jpg`));
    const res = await fetch("/api/leads", { method: "POST", body: fd });
    if (res.ok) {
      // Optionally notify Slack on new leads
      next();
    } else {
      alert("Failed to submit");
    }
  }

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6">
      <div className="font-semibold text-lg mb-4">Instant Quote</div>
      {step === 0 && (
        <div className="space-y-4">
          <Label htmlFor="address">1) Address</Label>
          <AddressAutocomplete onSelect={(p) => setAddress(p)} />
          <div className="flex justify-end gap-2"><Button onClick={next} disabled={!address}>Next</Button></div>
        </div>
      )}
      {step === 1 && (
        <div className="space-y-4">
          <Label>2) Run length</Label>
          <input aria-label="Run length" type="range" min={1} max={30} value={runLength} onChange={(e) => setRunLength(parseInt(e.target.value))} className="w-full" />
          <div className="text-sm text-slate-600">{runLength} m</div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={back}>Back</Button>
            <Button onClick={next}>Next</Button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <Label>3) Panel photos</Label>
          <PhotoDropzone onFiles={setPhotos} maxFiles={3} />
          <div className="text-xs text-slate-500">Three required: door open, main breaker, label.</div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={back}>Back</Button>
            <Button onClick={next} disabled={photos.length < 3}>Next</Button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <Label>Charger type</Label>
          <select aria-label="Charger type" className="h-11 w-full rounded-2xl border border-black/10 px-3" value={chargerType} onChange={(e) => setChargerType(e.target.value)}>
            {["Tesla", "FLO", "ChargePoint", "Emporia", "Grizzl-E", "NEMA 14-50"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={extras.pedestal} onChange={(e) => setExtras({ ...extras, pedestal: e.target.checked })} /> Pedestal</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={extras.drywallRepair} onChange={(e) => setExtras({ ...extras, drywallRepair: e.target.checked })} /> Drywall repair</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={extras.loadMgmtDevice} onChange={(e) => setExtras({ ...extras, loadMgmtDevice: e.target.checked })} /> Load management device</label>
            <label className="flex items-center gap-2 text-sm">Trenching (m) <Input type="number" min={0} value={extras.trenchingMeters} onChange={(e) => setExtras({ ...extras, trenchingMeters: parseInt(e.target.value || "0") })} /></label>
          </fieldset>
          <PriceBandCard min={band.min} max={band.max} />
          <div className="flex justify-between">
            <Button variant="outline" onClick={back}>Back</Button>
            <Button onClick={next}>Next</Button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="space-y-4">
          <Label>Contact</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input placeholder="First name" value={contact.first} onChange={(e) => setContact({ ...contact, first: e.target.value })} />
            <Input placeholder="Last name" value={contact.last} onChange={(e) => setContact({ ...contact, last: e.target.value })} />
            <Input placeholder="Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
            <Input placeholder="Phone" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={contact.casl} onChange={(e) => setContact({ ...contact, casl: e.target.checked })} /> I agree to receive updates related to this quote</label>
          <div className="flex justify-between">
            <Button variant="outline" onClick={back}>Back</Button>
            <Button onClick={submitLead} disabled={!contact.email || !contact.phone}>Submit</Button>
          </div>
        </div>
      )}
      {step === 5 && (
        <div className="space-y-4 text-center">
          <div className="text-lg font-semibold">Estimated price: ${(band.min/100).toLocaleString(undefined,{maximumFractionDigits:0})}–${(band.max/100).toLocaleString(undefined,{maximumFractionDigits:0})} + HST</div>
          <p className="text-sm text-slate-600">Earliest dates shown below.</p>
          <div className="max-w-md mx-auto">
            <PriceBandCard min={band.min} max={band.max} />
          </div>
          <div className="max-w-md mx-auto">
            <AvailabilityPicker />
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button>{env.featureUseCalendly ? "Book via Calendly" : "Book virtual consult"}</Button>
            <Button variant="outline">Book site visit</Button>
            {env.stripePaymentLink && (
              <Button asChild variant="outline">
                <a href={env.stripePaymentLink} target="_blank" rel="noreferrer">Pay refundable deposit</a>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

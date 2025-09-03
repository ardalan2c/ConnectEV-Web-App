"use client";
import * as React from "react";
import { AddressAutocomplete } from "./AddressAutocomplete";
import { PhotoDropzone } from "./PhotoDropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CASL_CONSENT_LABEL } from "@/lib/legal/casl";
import { LAUNCH_CONFIG } from "@/lib/config/launch";
import { computePriceBand } from "@/lib/pricing/adders";

type Step = 1 | 2 | 3 | 4; // Simple 3-step + result

export function QuoteWizard() {
  const [step, setStep] = React.useState<Step>(1);
  const [formData, setFormData] = React.useState({
    // Step 1: Contact + Address + CASL
    firstName: "",
    lastName: "", 
    email: "",
    phone: "",
    address: null as { description: string; placeId?: string } | null,
    caslConsent: false,
    
    // Step 2: Run length + toggles
    runLengthMeters: 10,
    exteriorPenetration: false,
    finishedWalls: false,
    
    // Step 3: Panel photos
    photos: [] as File[]
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const nextStep = () => setStep((s) => Math.min(4, (s + 1) as Step));
  const prevStep = () => setStep((s) => Math.max(1, (s - 1) as Step));

  // Calculate price band for display
  const priceBand = React.useMemo(() => {
    return computePriceBand({
      runLengthMeters: formData.runLengthMeters,
      exteriorPenetration: formData.exteriorPenetration,
      finishedWalls: formData.finishedWalls
    });
  }, [formData.runLengthMeters, formData.exteriorPenetration, formData.finishedWalls]);

  async function submitLead() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const fd = new FormData();
      fd.set("address", formData.address?.description || "");
      fd.set("placeId", formData.address?.placeId || "");
      fd.set("runLengthMeters", String(formData.runLengthMeters));
      fd.set("chargerType", "Level-2"); // Simple mode
      fd.set("extrasJson", JSON.stringify({
        exteriorPenetration: formData.exteriorPenetration,
        finishedWalls: formData.finishedWalls
      }));
      fd.set("firstName", formData.firstName);
      fd.set("lastName", formData.lastName);
      fd.set("email", formData.email);
      fd.set("phone", formData.phone);
      fd.set("caslConsent", String(formData.caslConsent));
      
      formData.photos.forEach((photo, i) => {
        fd.append("photos", photo, photo.name || `panel-photo-${i + 1}.jpg`);
      });

      const res = await fetch("/api/leads", { method: "POST", body: fd });
      if (res.ok) {
        nextStep(); // Go to result screen
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      alert("Sorry, there was an error submitting your quote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const canGoToStep2 = formData.firstName && formData.lastName && formData.email && formData.phone && formData.address && formData.caslConsent;
  const canGoToStep3 = true; // No validation needed for step 2
  const canSubmit = formData.photos.length >= 3;

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg">Instant Quote</h2>
        <div className="text-sm text-slate-500">
          Step {step} of 3
        </div>
      </div>

      {/* Step 1: Contact + Address + CASL */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">Contact & Address</Label>
            <p className="text-sm text-slate-600 mt-1">We'll use this to provide accurate pricing and scheduling.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <Input 
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                placeholder="John"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <Input 
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                placeholder="Smith"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="(416) 555-1234"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Installation address</Label>
            <AddressAutocomplete 
              onSelect={(address) => setFormData({...formData, address})}
              className="mt-1"
            />
          </div>

          <label className="flex items-start gap-3 text-sm">
            <input 
              type="checkbox" 
              checked={formData.caslConsent}
              onChange={(e) => setFormData({...formData, caslConsent: e.target.checked})}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>{CASL_CONSENT_LABEL}</span>
          </label>

          <div className="flex justify-end pt-4">
            <Button onClick={nextStep} disabled={!canGoToStep2} size="lg">
              Next: Run length
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Run length + Toggles */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">Installation details</Label>
            <p className="text-sm text-slate-600 mt-1">Help us estimate the scope of work.</p>
          </div>

          <div>
            <Label htmlFor="runLength">Cable run length: {formData.runLengthMeters}m</Label>
            <input 
              id="runLength"
              type="range" 
              min={3} 
              max={30} 
              value={formData.runLengthMeters}
              onChange={(e) => setFormData({...formData, runLengthMeters: parseInt(e.target.value)})}
              className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>3m</span>
              <span>30m</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Additional requirements</Label>
            <label className="flex items-center gap-3 text-sm">
              <input 
                type="checkbox" 
                checked={formData.exteriorPenetration}
                onChange={(e) => setFormData({...formData, exteriorPenetration: e.target.checked})}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600"
              />
              <span>Exterior wall penetration required</span>
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input 
                type="checkbox" 
                checked={formData.finishedWalls}
                onChange={(e) => setFormData({...formData, finishedWalls: e.target.checked})}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600"
              />
              <span>Finished walls (drywall repair needed)</span>
            </label>
          </div>

          {/* Price preview */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="text-center">
              <div className="text-lg font-semibold text-emerald-600">
                Estimated: ${priceBand.min.toLocaleString()}–${priceBand.max.toLocaleString()} + HST
              </div>
              <p className="text-sm text-slate-600 mt-1">Final price confirmed after panel photos</p>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={prevStep}>Back</Button>
            <Button onClick={nextStep} size="lg">
              Next: Panel photos
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Panel photos */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">Panel photos</Label>
            <p className="text-sm text-slate-600 mt-1">Upload 3 photos of your electrical panel for accurate pricing.</p>
          </div>

          <PhotoDropzone 
            onFiles={(photos) => setFormData({...formData, photos})}
            maxFiles={3}
          />
          
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="text-sm">
              <div className="font-medium text-blue-900 mb-2">Required photos:</div>
              <ul className="text-blue-800 space-y-1">
                <li>1. Panel door open (full view)</li>
                <li>2. Main breaker showing amperage</li> 
                <li>3. Inside panel label/sticker</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={prevStep}>Back</Button>
            <Button 
              onClick={submitLead} 
              disabled={!canSubmit || isSubmitting}
              size="lg"
            >
              {isSubmitting ? "Submitting..." : "Get My Quote"}
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Result screen */}
      {step === 4 && (
        <div className="space-y-6 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald-600 mb-2">
              ${priceBand.min.toLocaleString()}–${priceBand.max.toLocaleString()} + HST
            </div>
            <p className="text-slate-600">Estimated installation cost</p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <h3 className="font-semibold text-green-900 mb-3">What happens next?</h3>
            <div className="text-sm text-green-800 space-y-2 text-left">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-900 text-xs font-medium">1</div>
                <span>We'll review your panel photos (usually within 15 minutes)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-900 text-xs font-medium">2</div>
                <span>Text/email you the confirmed price and available dates</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-900 text-xs font-medium">3</div>
                <span>Schedule your 15-minute virtual consultation</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="min-w-[200px]">
              Book 15-min virtual check
            </Button>
            <Button variant="outline" size="lg" className="min-w-[200px]">
              We'll text you in ~15 min
            </Button>
          </div>
        </div>
      )}

      {/* Mobile keyboard spacer */}
      <div className="h-16 sm:h-0"></div>
    </div>
  );
}

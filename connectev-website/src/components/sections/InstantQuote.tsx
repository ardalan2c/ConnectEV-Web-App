"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, FileText, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { generateEstimate } from '@/lib/utils';

interface FormData {
  propertyType: string;
  chargerBrand: string;
  electricalService: string;
  distance: string;
  mountingType: string;
  buildingName?: string;
  suiteNumber?: string;
  propertyManagerEmail?: string;
  preferredTiming: string;
  fullName: string;
  email: string;
  phone: string;
  postalCode: string;
  consent: boolean;
  files: File[];
}

const initialFormData: FormData = {
  propertyType: '',
  chargerBrand: '',
  electricalService: '',
  distance: '',
  mountingType: '',
  buildingName: '',
  suiteNumber: '',
  propertyManagerEmail: '',
  preferredTiming: '',
  fullName: '',
  email: '',
  phone: '',
  postalCode: '',
  consent: false,
  files: []
};

export function InstantQuote() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [estimate, setEstimate] = useState<{ min: number; max: number; disclaimer: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type === 'application/pdf';
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });
    
    handleInputChange('files', [...formData.files, ...validFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    handleInputChange('files', newFiles);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    if (!formData.chargerBrand) newErrors.chargerBrand = 'Charger brand is required';
    if (!formData.electricalService) newErrors.electricalService = 'Electrical service is required';
    if (!formData.distance) newErrors.distance = 'Distance is required';
    if (!formData.mountingType) newErrors.mountingType = 'Mounting type is required';
    if (!formData.preferredTiming) newErrors.preferredTiming = 'Preferred timing is required';
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.consent) newErrors.consent = 'Consent is required';

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Generate estimate
      const estimateResult = generateEstimate(formData);
      setEstimate(estimateResult);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would normally send the data to your API
      console.log('Form submitted:', formData);

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && estimate) {
    return (
      <section id="instant-quote" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="font-sora font-bold text-3xl text-gray-900">
                Quote Submitted Successfully!
              </h2>
              <p className="text-lg text-gray-600">
                Thank you {formData.fullName}! We've received your quote request.
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-green-500/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="font-sora font-bold text-2xl text-gray-900 mb-4">
                Your Estimated Range
              </h3>
              <div className="text-4xl font-bold text-primary mb-2">
                ${estimate.min.toLocaleString()} - ${estimate.max.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {estimate.disclaimer}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-sora font-semibold text-xl text-gray-900">
                What happens next?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                  <div className="font-semibold text-gray-900">Review</div>
                  <div className="text-sm text-gray-600">We'll review your details within 2 hours</div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                  <div className="font-semibold text-gray-900">Contact</div>
                  <div className="text-sm text-gray-600">We'll call to discuss your project</div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                  <div className="font-semibold text-gray-900">Schedule</div>
                  <div className="text-sm text-gray-600">Book your virtual assessment</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="focus-ring"
              >
                <a href="https://calendly.com/connectev-assessment" target="_blank" rel="noopener noreferrer">
                  Book Virtual Assessment
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData(initialFormData);
                  setEstimate(null);
                }}
                className="focus-ring"
              >
                Submit Another Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="instant-quote" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-sora font-bold text-3xl lg:text-4xl text-gray-900">
            Get Your Instant Quote
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about your project and get an estimated price range in minutes. 
            No commitment required.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Property Details */}
            <div className="space-y-6">
              <h3 className="font-sora font-semibold text-xl text-gray-900">
                Property Details
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Property Type *
                  </label>
                  <Select onValueChange={(value) => handleInputChange('propertyType', value)}>
                    <SelectTrigger className={errors.propertyType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhome">Townhome</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.propertyType && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.propertyType}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Preferred Charger Brand *
                  </label>
                  <Select onValueChange={(value) => handleInputChange('chargerBrand', value)}>
                    <SelectTrigger className={errors.chargerBrand ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select charger brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tesla">Tesla</SelectItem>
                      <SelectItem value="chargepoint">ChargePoint</SelectItem>
                      <SelectItem value="flo">FLO</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.chargerBrand && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.chargerBrand}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Electrical Service *
                  </label>
                  <Select onValueChange={(value) => handleInputChange('electricalService', value)}>
                    <SelectTrigger className={errors.electricalService ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select electrical service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60A">60A</SelectItem>
                      <SelectItem value="100A">100A</SelectItem>
                      <SelectItem value="200A">200A</SelectItem>
                      <SelectItem value="unsure">Unsure</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.electricalService && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.electricalService}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Panel to Parking Distance *
                  </label>
                  <Select onValueChange={(value) => handleInputChange('distance', value)}>
                    <SelectTrigger className={errors.distance ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="≤10m">≤10 meters</SelectItem>
                      <SelectItem value="10-20m">10-20 meters</SelectItem>
                      <SelectItem value="20-30m">20-30 meters</SelectItem>
                      <SelectItem value=">30m">>30 meters</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.distance && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.distance}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Mounting & Run Type *
                </label>
                <Select onValueChange={(value) => handleInputChange('mountingType', value)}>
                  <SelectTrigger className={errors.mountingType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select mounting type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indoor-garage">Indoor Garage</SelectItem>
                    <SelectItem value="outdoor-wall">Outdoor Wall Mount</SelectItem>
                    <SelectItem value="trenching-needed">Trenching Needed</SelectItem>
                    <SelectItem value="surface-conduit">Surface Conduit</SelectItem>
                    <SelectItem value="concealed-wiring">Concealed Wiring</SelectItem>
                  </SelectContent>
                </Select>
                {errors.mountingType && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.mountingType}
                  </p>
                )}
              </div>

              {/* Condo-specific fields */}
              {formData.propertyType === 'condo' && (
                <div className="grid md:grid-cols-3 gap-6 p-4 bg-blue-50 rounded-lg">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Building Name
                    </label>
                    <Input
                      value={formData.buildingName}
                      onChange={(e) => handleInputChange('buildingName', e.target.value)}
                      placeholder="Building name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Suite Number
                    </label>
                    <Input
                      value={formData.suiteNumber}
                      onChange={(e) => handleInputChange('suiteNumber', e.target.value)}
                      placeholder="Suite #"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Property Manager Email
                    </label>
                    <Input
                      type="email"
                      value={formData.propertyManagerEmail}
                      onChange={(e) => handleInputChange('propertyManagerEmail', e.target.value)}
                      placeholder="manager@building.com"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* File Upload */}
            <div className="space-y-6">
              <h3 className="font-sora font-semibold text-xl text-gray-900">
                Upload Photos & Documents
              </h3>
              <p className="text-sm text-gray-600">
                Upload photos of your electrical panel, parking spot, and run path. 
                JPG, PNG, or PDF files up to 10MB each. Photos help us provide accurate quotes.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <label className="cursor-pointer">
                    <span className="text-primary font-medium hover:text-primary/80">
                      Click to upload files
                    </span>
                    <span className="text-gray-600"> or drag and drop</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    JPG, PNG, PDF up to 10MB each
                  </p>
                </div>
              </div>

              {formData.files.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Uploaded Files:</h4>
                  <div className="space-y-2">
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {file.type.startsWith('image/') ? (
                            <ImageIcon className="w-5 h-5 text-blue-500" />
                          ) : (
                            <FileText className="w-5 h-5 text-red-500" />
                          )}
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-500">
                            ({(file.size / 1024 / 1024).toFixed(1)} MB)
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Timing & Contact */}
            <div className="space-y-6">
              <h3 className="font-sora font-semibold text-xl text-gray-900">
                Timing & Contact Information
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Preferred Timing *
                </label>
                <Select onValueChange={(value) => handleInputChange('preferredTiming', value)}>
                  <SelectTrigger className={errors.preferredTiming ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select preferred timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">ASAP</SelectItem>
                    <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
                {errors.preferredTiming && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.preferredTiming}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="John Smith"
                    className={errors.fullName ? 'border-red-500' : ''}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(647) 607-2739"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Postal Code *
                  </label>
                  <Input
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder="M5V 3A8"
                    className={errors.postalCode ? 'border-red-500' : ''}
                  />
                  {errors.postalCode && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Consent */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={formData.consent}
                  onCheckedChange={(checked) => handleInputChange('consent', checked as boolean)}
                  className={errors.consent ? 'border-red-500' : ''}
                />
                <div className="space-y-1">
                  <label className="text-sm text-gray-700 leading-relaxed">
                    I consent to ConnectEV Inc. contacting me about my EV charger installation project. 
                    I understand that my information will be used in accordance with the{' '}
                    <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                  </label>
                  {errors.consent && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.consent}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                size="xl"
                disabled={isSubmitting}
                className="w-full focus-ring"
              >
                {isSubmitting ? 'Processing...' : 'Get My Instant Quote'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
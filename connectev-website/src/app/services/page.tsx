import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Home, Building, Factory, Zap, Wrench, Shield, Settings, Smartphone } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EV Charger Installation Services',
  description: 'Professional EV charger installation services across the GTA. Residential, condo, commercial installations with permits and warranty included.',
};

const services = [
  {
    id: 'residential',
    icon: Home,
    title: 'Residential EV Charger Installation',
    description: 'Complete home charging solutions for driveways and garages',
    outcomes: [
      'Level 2 charging (25-40 miles per hour)',
      'Tesla Wall Connector, ChargePoint Home, or FLO Home',
      'Indoor or outdoor installation options',
      'Smart charging features and scheduling'
    ],
    included: [
      'Site assessment and load calculation',
      'Electrical permit and ESA filing',
      'All materials and labor',
      'Circuit breaker and disconnect switch',
      'Conduit and wiring up to 50 feet',
      'Wall mounting and weatherproofing',
      'Final inspection and testing',
      '1-year workmanship warranty'
    ],
    addOns: [
      'Extended conduit runs (per foot)',
      'Trenching for underground runs',
      'Panel upgrades (60A to 100A/200A)',
      'Load management devices',
      'Smart home integration'
    ],
    timeline: '3-7 days from permit approval',
    startingPrice: '$1,200'
  },
  {
    id: 'condo',
    icon: Building,
    title: 'Condo / Strata / Townhome Installs',
    description: 'Multi-unit installations with load sharing and board approval assistance',
    outcomes: [
      'Board-approved installation packages',
      'Load sharing and management systems',
      'Individual or shared metering options',
      'Compliance with building electrical capacity'
    ],
    included: [
      'Board presentation materials',
      'Load calculation and capacity analysis',
      'Electrical permit and approvals',
      'Load management device installation',
      'Individual metering (if required)',
      'Coordination with property management',
      'Final documentation package',
      '1-year workmanship warranty'
    ],
    addOns: [
      'Multiple unit installations',
      'Dedicated transformer upgrades',
      'Advanced load management systems',
      'RFID access control',
      'Usage monitoring and reporting'
    ],
    timeline: '2-4 weeks (including approvals)',
    startingPrice: '$1,800'
  },
  {
    id: 'commercial',
    icon: Factory,
    title: 'Commercial / Fleet / Workplace',
    description: 'Workplace charging with access control and payment systems',
    outcomes: [
      'Multi-port charging pedestals',
      'RFID or app-based access control',
      'Payment processing integration',
      'Fleet management capabilities'
    ],
    included: [
      'Site design and layout planning',
      'Electrical infrastructure assessment',
      'Commercial-grade equipment',
      'Access control system setup',
      'Payment processing integration',
      'User management platform',
      'Ongoing support and maintenance',
      '2-year commercial warranty'
    ],
    addOns: [
      'Solar integration',
      'Battery storage systems',
      'Advanced analytics and reporting',
      'Custom branding and signage',
      'Expanded warranty coverage'
    ],
    timeline: '2-6 weeks (project dependent)',
    startingPrice: '$3,500'
  },
  {
    id: 'panel-upgrades',
    icon: Zap,
    title: 'Panel Upgrades & Load Calculations',
    description: 'Electrical service upgrades to support EV charging',
    outcomes: [
      'Service upgrades (60A to 100A/200A)',
      'Panel replacement and modernization',
      'Load calculations and demand analysis',
      'Code compliance and safety improvements'
    ],
    included: [
      'Electrical load assessment',
      'Service entrance evaluation',
      'New panel and breaker installation',
      'Grounding and bonding upgrades',
      'ESA permit and inspection',
      'Code compliance verification',
      'Load letter for utility company',
      '1-year workmanship warranty'
    ],
    addOns: [
      'Whole-home surge protection',
      'Generator transfer switch',
      'Smart panel monitoring',
      'Additional circuits and outlets'
    ],
    timeline: '1-2 weeks',
    startingPrice: '$2,500'
  },
  {
    id: 'trenching',
    icon: Wrench,
    title: 'Trenching & Conduit Runs',
    description: 'Underground and concealed wiring for clean installations',
    outcomes: [
      'Underground conduit installation',
      'Concrete coring and patching',
      'Landscape restoration',
      'Weather-resistant connections'
    ],
    included: [
      'Site marking and utility locates',
      'Hand digging and trenching',
      'Conduit and wire installation',
      'Concrete patching and restoration',
      'Landscape repair and seeding',
      'Waterproof connections',
      'Final cleanup and inspection',
      '1-year workmanship warranty'
    ],
    addOns: [
      'Decorative concrete finishes',
      'Interlocking stone restoration',
      'Additional utility runs',
      'Landscape enhancement'
    ],
    timeline: '1-3 days',
    startingPrice: '$800'
  },
  {
    id: 'maintenance',
    icon: Settings,
    title: 'Maintenance, Troubleshooting & Repairs',
    description: 'Ongoing support and repair services for existing installations',
    outcomes: [
      'Preventive maintenance programs',
      'Troubleshooting and diagnostics',
      'Repair and replacement services',
      'Performance optimization'
    ],
    included: [
      'Annual safety inspection',
      'Connection tightening and cleaning',
      'Software updates and configuration',
      'Performance testing and verification',
      'Detailed maintenance report',
      'Priority service scheduling',
      'Parts and labor warranty',
      '24/7 emergency support'
    ],
    addOns: [
      'Extended maintenance contracts',
      'Remote monitoring setup',
      'Upgrade consultations',
      'Fleet management services'
    ],
    timeline: 'Same day or next day',
    startingPrice: '$150'
  },
  {
    id: 'permits',
    icon: Shield,
    title: 'Permits, ESA Inspections & Compliance',
    description: 'Complete permit handling and regulatory compliance',
    outcomes: [
      'ESA electrical permits',
      'Municipal building permits',
      'Utility interconnection approvals',
      'Code compliance verification'
    ],
    included: [
      'Permit application and filing',
      'Technical drawings and specifications',
      'ESA inspection scheduling',
      'Code compliance verification',
      'Utility coordination',
      'Final approval documentation',
      'Certificate of completion',
      'Ongoing compliance support'
    ],
    addOns: [
      'Expedited permit processing',
      'Additional inspection services',
      'Compliance consulting',
      'Documentation packages'
    ],
    timeline: '3-10 business days',
    startingPrice: '$200'
  },
  {
    id: 'smart-setup',
    icon: Smartphone,
    title: 'Smart Charger Setup & App Onboarding',
    description: 'Complete setup and training for smart charging features',
    outcomes: [
      'Mobile app configuration',
      'Scheduling and automation setup',
      'Energy monitoring and reporting',
      'Integration with home systems'
    ],
    included: [
      'Mobile app installation and setup',
      'WiFi network configuration',
      'Charging schedule programming',
      'Energy monitoring setup',
      'User account creation',
      'Feature demonstration and training',
      'Troubleshooting guide',
      'Ongoing app support'
    ],
    addOns: [
      'Smart home integration',
      'Solar system integration',
      'Advanced automation setup',
      'Multi-user configuration'
    ],
    timeline: '1-2 hours',
    startingPrice: '$100'
  }
];

const brands = [
  {
    name: 'Tesla',
    description: 'Wall Connector Gen 3 with WiFi connectivity and mobile app control',
    pros: ['Fastest charging for Tesla vehicles', 'Sleek design', 'Easy mobile app control'],
    cons: ['Tesla-specific connector', 'Higher cost for non-Tesla adapters']
  },
  {
    name: 'ChargePoint',
    description: 'Home Flex with universal J1772 connector and smart features',
    pros: ['Universal compatibility', 'Flexible amperage settings', 'Comprehensive app'],
    cons: ['Larger physical footprint', 'Subscription for advanced features']
  },
  {
    name: 'FLO',
    description: 'Canadian-made chargers with robust construction and local support',
    pros: ['Canadian company', 'Rugged construction', 'Local support'],
    cons: ['Limited smart features', 'Higher upfront cost']
  }
];

export default function ServicesPage() {
  const scrollToQuote = () => {
    const quoteSection = document.getElementById('instant-quote');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on home page, navigate to home page with hash
      window.location.href = '/#instant-quote';
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sora font-bold text-4xl lg:text-5xl text-gray-900 mb-6">
            EV Charger Installation Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Professional installation services for every type of property across the Greater Toronto Area. 
            Licensed, insured, and warranty-backed installations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={scrollToQuote} size="lg" className="focus-ring">
              Get Instant Quote
            </Button>
            <Button variant="outline" size="lg" asChild className="focus-ring">
              <a href="tel:+16476072739">Call (647) 607-2739</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className="scroll-mt-24">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-sora font-bold text-2xl text-gray-900">
                          {service.title}
                        </h2>
                        <p className="text-primary font-medium">
                          Starting at {service.startingPrice}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-600">
                      {service.description}
                    </p>

                    <div className="space-y-4">
                      <h3 className="font-sora font-semibold text-lg text-gray-900">
                        What You Get:
                      </h3>
                      <ul className="space-y-2">
                        {service.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Timeline: {service.timeline}</span>
                      </div>
                    </div>

                    <Button onClick={scrollToQuote} className="focus-ring">
                      Get Quote for This Service
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="font-sora font-semibold text-lg text-gray-900 mb-4">
                        What's Included:
                      </h3>
                      <ul className="space-y-2">
                        {service.included.map((item, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h3 className="font-sora font-semibold text-lg text-gray-900 mb-4">
                        Popular Add-Ons:
                      </h3>
                      <ul className="space-y-2">
                        {service.addOns.map((addon, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{addon}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {index < services.length - 1 && (
                  <div className="border-b border-gray-200 mt-16"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charger Brands */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-sora font-bold text-3xl lg:text-4xl text-gray-900">
              Charger Brands We Install
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're certified installers for the top EV charger brands
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="font-sora font-bold text-xl text-gray-900 mb-4">
                  {brand.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {brand.description}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                    <ul className="space-y-1">
                      {brand.pros.map((pro, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">Considerations:</h4>
                    <ul className="space-y-1">
                      {brand.cons.map((con, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <div className="w-4 h-4 border border-orange-400 rounded-full mr-2 mt-0.5 flex-shrink-0"></div>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-sora font-bold text-3xl lg:text-4xl mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get your instant quote and join 500+ satisfied customers across the GTA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={scrollToQuote} variant="secondary" size="lg" className="focus-ring">
              Get Instant Quote
            </Button>
            <Button variant="outline" size="lg" asChild className="focus-ring border-white text-white hover:bg-white hover:text-primary">
              <a href="tel:+16476072739">Call (647) 607-2739</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
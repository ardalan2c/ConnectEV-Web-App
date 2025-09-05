import { Hero } from '@/components/sections/Hero';
import { InstantQuote } from '@/components/sections/InstantQuote';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Shield, Award, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Residential',
    description: 'Home EV charger installation for driveways and garages',
    features: ['Tesla Wall Connector', 'ChargePoint Home', 'FLO Home'],
    href: '/services#residential'
  },
  {
    title: 'Condo/Strata',
    description: 'Multi-unit installations with load sharing and board approval',
    features: ['Load Management', 'Board Packages', 'Metering Solutions'],
    href: '/services#condo'
  },
  {
    title: 'Commercial/Fleet',
    description: 'Workplace charging with access control and payment systems',
    features: ['Multi-Port Pedestals', 'RFID Access', 'Payment Integration'],
    href: '/services#commercial'
  }
];

const whyConnectEV = [
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description: 'ECRA/ESA #7010248 certified with full WSIB coverage'
  },
  {
    icon: Clock,
    title: 'Same-Week Installation',
    description: 'Fast turnaround with most installs completed within a week'
  },
  {
    icon: CheckCircle,
    title: 'Transparent Pricing',
    description: 'No hidden fees, upfront quotes with detailed breakdowns'
  },
  {
    icon: Award,
    title: 'Code Compliant',
    description: 'All installations meet Ontario electrical code requirements'
  },
  {
    icon: Star,
    title: '1-Year Warranty',
    description: 'Comprehensive workmanship warranty on all installations'
  },
  {
    icon: CheckCircle,
    title: '5-Star Service',
    description: 'Rated excellent by 500+ satisfied customers across the GTA'
  }
];

const howItWorks = [
  {
    step: '1',
    title: 'Get Quote',
    description: 'Upload photos and get your estimated price range instantly'
  },
  {
    step: '2', 
    title: 'Virtual Assessment',
    description: 'Quick video call to review your project and confirm details'
  },
  {
    step: '3',
    title: 'Permit & Schedule',
    description: 'We handle ESA permits and schedule your installation'
  },
  {
    step: '4',
    title: 'Install & Inspect',
    description: 'Professional installation with final inspection and testing'
  }
];

const featuredInstalls = [
  {
    title: 'Tesla Model Y - Mississauga',
    description: 'Wall Connector installation with 50ft conduit run',
    image: '/api/placeholder/400/300'
  },
  {
    title: 'ChargePoint Home - Toronto Condo',
    description: 'Load-managed installation with board approval',
    image: '/api/placeholder/400/300'
  },
  {
    title: 'FLO Commercial - Vaughan Office',
    description: '4-port pedestal with RFID access control',
    image: '/api/placeholder/400/300'
  }
];

const serviceAreas = [
  'Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham',
  'Richmond Hill', 'Oakville', 'Burlington', 'Pickering', 'Ajax',
  'Whitby', 'Oshawa'
];

export default function HomePage() {
  return (
    <>
      <Hero />
      
      {/* Service Snapshot */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-sora font-bold text-3xl lg:text-4xl text-gray-900">
              EV Charger Installation Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional installation for every type of property across the GTA
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <h3 className="font-sora font-bold text-xl text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link href={service.href}>
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ConnectEV */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-sora font-bold text-3xl lg:text-4xl text-gray-900">
              Why Choose ConnectEV
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Licensed professionals delivering fast, reliable EV charger installation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyConnectEV.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-sora font-semibold text-lg text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-sora font-bold text-3xl lg:text-4xl text-gray-900">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From quote to completion in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="font-sora font-semibold text-lg text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instant Quote Widget */}
      <InstantQuote />

      {/* Featured Installs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-sora font-bold text-3xl lg:text-4xl text-gray-900">
              Featured Installations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Recent projects across the Greater Toronto Area
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredInstalls.map((install, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Project Photo</span>
                </div>
                <div className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-gray-900 mb-2">
                    {install.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {install.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Rebates & Financing Teaser */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-sora font-bold text-3xl lg:text-4xl mb-4">
            Rebates & Financing Available
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We help you navigate available rebates and financing options to make 
            your EV charger installation more affordable.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/rebates">
              Learn About Rebates
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-sora font-bold text-3xl lg:text-4xl text-gray-900">
              Serving the Greater Toronto Area
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional EV charger installation across these communities
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                {area}
              </span>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Check Service Availability
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-sora font-bold text-4xl lg:text-5xl mb-6">
            Ready to Go Electric?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get your instant quote and join 500+ satisfied customers across the GTA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                const quoteSection = document.getElementById('instant-quote');
                if (quoteSection) {
                  quoteSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              size="xl"
              className="focus-ring min-h-[56px]"
            >
              Get Your Quote Now
            </Button>
            <Button
              variant="outline"
              size="xl"
              asChild
              className="focus-ring min-h-[56px] border-white text-white hover:bg-white hover:text-gray-900"
            >
              <a href="tel:+16476072739">
                Call (647) 607-2739
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
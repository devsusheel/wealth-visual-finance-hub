import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Home,
  RefreshCw,
  Building2,
  Car,
  Calculator,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Home,
      title: 'Home Loans',
      description:
        "Whether you're a first-time buyer or upgrading, we have the perfect home loan for you.",
      features: [
        'First Home Buyer Programs',
        'Owner Occupier Loans',
        'Investment Property Loans',
        'Low Deposit Options',
        'Fixed & Variable Rates',
      ],
      link: '/services/home-loans',
    },
    {
      icon: RefreshCw,
      title: 'Refinancing',
      description:
        'Save money and unlock equity with our competitive refinancing options.',
      features: [
        'Lower Interest Rates',
        'Debt Consolidation',
        'Cash Out Refinancing',
        'No Exit Fees*',
        'Fast Processing',
      ],
      link: '/services/refinancing',
    },
    {
      icon: Building2,
      title: 'Commercial Loans',
      description:
        'Grow your business with our flexible commercial financing solutions.',
      features: [
        'Business Equipment Finance',
        'Commercial Property Loans',
        'Working Capital',
        'Asset Finance',
        'SMSF Lending',
      ],
      link: '/services/commercial-loans',
    },
    {
      icon: Car,
      title: 'Car Loans',
      description:
        'Drive away with competitive auto financing for new and used vehicles.',
      features: [
        'New Car Loans',
        'Used Car Loans',
        'Motorcycle Loans',
        'Boat Loans',
        'Quick Approval',
      ],
      link: '/services/car-loans',
    },
  ];

  const processSteps = [
    { step: '1', title: 'Application', description: 'Complete our simple online application or speak with our experts' },
    { step: '2', title: 'Assessment', description: 'We review your application and find the best loan options for you' },
    { step: '3', title: 'Approval', description: 'Get pre-approved and receive your loan terms and conditions' },
    { step: '4', title: 'Settlement', description: 'Finalize your loan and move into your new home or purchase' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#678E19] via-green-700 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calculator className="h-16 w-16 text-[#EDA208] mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Our Financial Services</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Comprehensive mortgage and finance solutions tailored to your unique needs. From first homes
            to investment properties, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="flex flex-col h-full hover:shadow-xl transition-shadow">
                <div className="h-2 bg-gradient-to-r from-[#678E19] to-green-500" />
                <CardHeader className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#678E19] to-green-500 rounded-lg flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">{service.title}</CardTitle>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>

                <CardContent className="flex flex-col flex-1">
                  <ul className="flex-1 space-y-3 mb-6">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={service.link} className="mt-auto">
                    <Button className="w-full py-3 font-semibold">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, fast, and transparent loan process</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#678E19] to-green-500 flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {i < processSteps.length - 1 && (
                  <ArrowRight className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 text-gray-300 h-6 w-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-[#678E19] to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl font-bold">Why Choose Our Services?</h2>
          <p className="text-xl text-green-100">We're committed to making your financial goals a reality</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-green-700 rounded-lg space-y-4">
              <Calculator className="h-12 w-12 text-[#EDA208] mx-auto" />
              <h3 className="text-xl font-semibold">Expert Advice</h3>
              <p className="text-green-200">Professional mortgage brokers with years of experience</p>
            </div>
            <div className="p-6 bg-green-700 rounded-lg space-y-4">
              <Users className="h-12 w-12 text-[#EDA208] mx-auto" />
              <h3 className="text-xl font-semibold">Personalized Service</h3>
              <p className="text-green-200">Tailored solutions that fit your unique situation</p>
            </div>
            <div className="p-6 bg-green-700 rounded-lg space-y-4">
              <CheckCircle className="h-12 w-12 text-[#EDA208] mx-auto" />
              <h3 className="text-xl font-semibold">Proven Results</h3>
              <p className="text-green-200">Thousands of successful loan approvals and happy customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#EDA208] to-yellow-500 text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-800">
            Get in touch with our experts today and discover how we can help you achieve your financial goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">Get Pre-Approved</Button>
            </Link>

            <Link to="/calculators">
              <Button size="lg" variant="outline" className="border-[#678E19] text-[#678E19] hover:bg-[#678E19] hover:text-white">
                Calculate Payments
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;

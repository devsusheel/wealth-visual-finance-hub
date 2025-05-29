
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, Building2, Car, Calculator, Users, CheckCircle, ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Home Loans",
      description: "Whether you're a first-time buyer or upgrading, we have the perfect home loan for you.",
      features: [
        "First Home Buyer Programs",
        "Owner Occupier Loans",
        "Investment Property Loans",
        "Low Deposit Options",
        "Fixed & Variable Rates"
      ]
    },
    {
      icon: RefreshCw,
      title: "Refinancing",
      description: "Save money and unlock equity with our competitive refinancing options.",
      features: [
        "Lower Interest Rates",
        "Debt Consolidation",
        "Cash Out Refinancing",
        "No Exit Fees*",
        "Fast Processing"
      ]
    },
    {
      icon: Building2,
      title: "Commercial Loans",
      description: "Grow your business with our flexible commercial financing solutions.",
      features: [
        "Business Equipment Finance",
        "Commercial Property Loans",
        "Working Capital",
        "Asset Finance",
        "SMSF Lending"
      ]
    },
    {
      icon: Car,
      title: "Car Loans",
      description: "Drive away with competitive auto financing for new and used vehicles.",
      features: [
        "New Car Loans",
        "Used Car Loans",
        "Motorcycle Loans",
        "Boat Loans",
        "Quick Approval"
      ]
    }
  ];

  const process = [
    {
      step: "1",
      title: "Application",
      description: "Complete our simple online application or speak with our experts"
    },
    {
      step: "2",
      title: "Assessment",
      description: "We review your application and find the best loan options for you"
    },
    {
      step: "3",
      title: "Approval",
      description: "Get pre-approved and receive your loan terms and conditions"
    },
    {
      step: "4",
      title: "Settlement",
      description: "Finalize your loan and move into your new home or purchase"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#678E19] via-green-700 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Calculator className="h-16 w-16 text-brand-yellow mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">Our Financial Services</h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Comprehensive mortgage and finance solutions tailored to your unique needs. 
              From first homes to investment properties, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 flex flex-col h-full">
                <div className="h-2 bg-gradient-to-r from-[#678E19] to-green-500"></div>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#678E19] to-green-500 rounded-lg flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">{service.title}</CardTitle>
                  </div>
                  <p className="text-gray-600 text-lg">{service.description}</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-[#678E19] to-green-500 hover:from-green-700 hover:to-green-600 text-white">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, fast, and transparent loan process</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-[#678E19] to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-gray-300 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-[#678E19] to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Services?</h2>
            <p className="text-xl text-green-100">We're committed to making your financial goals a reality</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-green-700 rounded-lg">
              <Calculator className="h-12 w-12 text-brand-yellow mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Advice</h3>
              <p className="text-green-200">Professional mortgage brokers with years of experience</p>
            </div>
            <div className="text-center p-6 bg-green-700 rounded-lg">
              <Users className="h-12 w-12 text-brand-yellow mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
              <p className="text-green-200">Tailored solutions that fit your unique situation</p>
            </div>
            <div className="text-center p-6 bg-green-700 rounded-lg">
              <CheckCircle className="h-12 w-12 text-brand-yellow mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-green-200">Thousands of successful loan approvals and happy customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-yellow to-yellow-500 text-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-800 mb-8">
            Get in touch with our experts today and discover how we can help you achieve your financial goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#678E19] hover:bg-green-700 text-white px-8 py-3">
              Get Pre-Approved
            </Button>
            <Button size="lg" variant="outline" className="border-[#678E19] text-[#678E19] hover:bg-[#678E19] hover:text-white px-8 py-3">
              Calculate Payments
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Star, Users, Calculator, Shield, Clock, TrendingUp, Home, RefreshCw, Building2, Car } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Calculator,
      title: "Smart Calculators",
      description: "Advanced financial calculators to help you make informed decisions"
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Bank-level security with trusted financial partnerships"
    },
    {
      icon: Clock,
      title: "Fast Approval",
      description: "Quick processing with pre-approval in as little as 24 hours"
    },
    {
      icon: TrendingUp,
      title: "Best Rates",
      description: "Competitive interest rates and flexible terms"
    }
  ];

  const services = [
    {
      icon: Home,
      title: "Home Loans",
      description: "First home buyers to investment properties with competitive rates",
      features: ["First Home Buyer Programs", "Investment Loans", "Low Deposit Options"],
      link: "/services/home-loans"
    },
    {
      icon: RefreshCw,
      title: "Refinancing",
      description: "Save money with better rates and unlock your home's equity",
      features: ["Lower Interest Rates", "Cash Out Options", "Debt Consolidation"],
      link: "/services/refinancing"
    },
    {
      icon: Building2,
      title: "Commercial",
      description: "Business and commercial financing for growth and expansion",
      features: ["Equipment Finance", "Commercial Property", "Working Capital"],
      link: "/services/commercial-loans"
    },
    {
      icon: Car,
      title: "Car Loans",
      description: "Competitive auto financing for new and used vehicles",
      features: ["New & Used Cars", "Quick Approval", "Flexible Terms"],
      link: "/services/car-loans"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "First Home Buyer",
      content: "FinanceHub made buying my first home so easy! The calculator helped me understand exactly what I could afford.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Refinancing Customer",
      content: "Saved thousands on my mortgage by refinancing through FinanceHub. Their service is outstanding!",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Investment Property",
      content: "Professional service and competitive rates. They helped me build my property portfolio.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with House Background */}
      <section className="relative bg-gradient-to-br from-[#678E19] via-green-700 to-green-800 text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=6000&q=80')`
          }}
        ></div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
                Your Dream Home
                <span className="block text-[#EDA208]">Starts Here</span>
              </h1>
              <p className="text-xl text-green-100">
                Get the best mortgage rates and expert financial advice. 
                Professional guidance to secure your perfect home loan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary">
                  Free Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/services">
                  <Button size="lg" variant="outline-white">
                    Explore Our Services
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#EDA208]">$2B+</div>
                  <div className="text-green-200">Loans Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#EDA208]">10K+</div>
                  <div className="text-green-200">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#EDA208]">4.9★</div>
                  <div className="text-green-200">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#678E19] mb-4">Why Choose FinanceHub?</h2>
            <p className="text-xl text-gray-600">We make home financing simple, fast, and affordable</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-[#678E19] to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-[#678E19]">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#678E19]">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive financial solutions for every need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-white border-2 border-gray-100 hover:border-[#678E19] hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#678E19] to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-[#678E19] text-2xl group-hover:text-green-700 transition-colors">{service.title}</CardTitle>
                      <p className="text-gray-600 mt-2">{service.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <ul className="space-y-3 mb-6 flex-grow">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3 text-gray-700">
                        <CheckCircle className="h-5 w-5 text-[#EDA208] flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={service.link} className="mt-auto">
                    <Button className="w-full font-semibold group-hover:shadow-lg transition-all py-3">
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" variant="default" className="font-semibold px-8 py-4">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#678E19] mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real stories from real customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-[#EDA208] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-[#678E19]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Fixed button styling */}
      <section className="py-20 bg-gradient-to-r from-[#EDA208] to-yellow-600 text-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers who chose FinanceHub for their home loans</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" className="font-semibold">
              Apply Now
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline-dark" className="font-semibold">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

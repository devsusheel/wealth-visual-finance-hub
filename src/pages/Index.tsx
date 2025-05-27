
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
      color: "from-blue-600 to-cyan-500",
      link: "/services/home-loans"
    },
    {
      icon: RefreshCw,
      title: "Refinancing",
      description: "Save money with better rates and unlock your home's equity",
      features: ["Lower Interest Rates", "Cash Out Options", "Debt Consolidation"],
      color: "from-blue-600 to-cyan-500",
      link: "/services/refinancing"
    },
    {
      icon: Building2,
      title: "Commercial",
      description: "Business and commercial financing for growth and expansion",
      features: ["Equipment Finance", "Commercial Property", "Working Capital"],
      color: "from-blue-600 to-cyan-500",
      link: "/services/commercial-loans"
    },
    {
      icon: Car,
      title: "Car Loans",
      description: "Competitive auto financing for new and used vehicles",
      features: ["New & Used Cars", "Quick Approval", "Flexible Terms"],
      color: "from-blue-600 to-cyan-500",
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
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white">
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
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your Dream Home
                <span className="block text-cyan-300">Starts Here</span>
              </h1>
              <p className="text-xl text-blue-100">
                Get the best mortgage rates and expert financial advice. 
                Professional guidance to secure your perfect home loan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3">
                  Free Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/services">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3">
                    Explore Our Services
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-300">$2B+</div>
                  <div className="text-blue-200">Loans Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-300">10K+</div>
                  <div className="text-blue-200">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-300">4.9★</div>
                  <div className="text-blue-200">Customer Rating</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose FinanceHub?</h2>
            <p className="text-xl text-gray-600">We make home financing simple, fast, and affordable</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
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
      <section className="py-20 bg-gradient-to-r from-blue-900 to-cyan-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-blue-100">Comprehensive financial solutions for every need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-blue-800 border-0 hover:bg-blue-700 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center`}>
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                  </div>
                  <p className="text-blue-200">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-blue-100">
                        <CheckCircle className="h-4 w-4 text-cyan-300" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={service.link}>
                    <Button className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 group-hover:shadow-lg transition-all`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real stories from real customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers who chose FinanceHub for their home loans</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              Apply Now
            </Button>
            <Link to="/contact">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3">
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

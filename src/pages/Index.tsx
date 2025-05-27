
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoanCalculator from "@/components/LoanCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Star, Users, Calculator, Shield, Clock, TrendingUp } from "lucide-react";
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
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your Dream Home
                <span className="block text-cyan-300">Starts Here</span>
              </h1>
              <p className="text-xl text-blue-100">
                Get the best mortgage rates and expert financial advice. 
                Use our advanced calculators to plan your perfect home loan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3">
                  Get Pre-Approved
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3">
                  Calculate Payments
                </Button>
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
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                  <div className="text-center text-gray-800">
                    <Calculator className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Quick Calculator</h3>
                    <p className="text-gray-600">Get instant loan estimates</p>
                  </div>
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

      {/* Calculator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mortgage Calculator</h2>
            <p className="text-xl text-gray-600">Calculate your mortgage payments and explore different scenarios</p>
          </div>
          <LoanCalculator />
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-cyan-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-blue-100">Comprehensive financial solutions for every need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-blue-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Home Loans</h3>
              <p className="text-blue-200">First home buyers to investment properties</p>
            </div>
            <div className="text-center p-6 bg-blue-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Refinancing</h3>
              <p className="text-blue-200">Save money with better rates</p>
            </div>
            <div className="text-center p-6 bg-blue-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Commercial</h3>
              <p className="text-blue-200">Business and commercial financing</p>
            </div>
            <div className="text-center p-6 bg-blue-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Car Loans</h3>
              <p className="text-blue-200">Competitive auto financing</p>
            </div>
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
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                Contact Us
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

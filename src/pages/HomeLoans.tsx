
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, CheckCircle, ArrowRight, Users, Calculator, Clock } from "lucide-react";

const HomeLoans = () => {
  const loanTypes = [
    {
      title: "First Home Buyer",
      description: "Special programs and incentives for first-time home buyers",
      features: ["Lower deposit options", "Government grants", "Stamp duty savings", "Expert guidance"]
    },
    {
      title: "Owner Occupier",
      description: "Competitive rates for your primary residence",
      features: ["Best market rates", "Flexible repayment options", "Offset accounts", "Redraw facilities"]
    },
    {
      title: "Investment Property",
      description: "Build your property portfolio with investor-friendly loans",
      features: ["Interest-only options", "Tax benefits", "Portfolio lending", "Rental income assessment"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Home className="h-16 w-16 text-cyan-300 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">Home Loans</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Make your dream home a reality with our comprehensive range of home loan solutions. 
              From first-time buyers to seasoned investors, we have the perfect loan for you.
            </p>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Types of Home Loans</h2>
            <p className="text-xl text-gray-600">Choose the loan that fits your situation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loanTypes.map((loan, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{loan.title}</CardTitle>
                  <p className="text-gray-600">{loan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {loan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Home Loans?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Calculator className="h-8 w-8 text-cyan-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Competitive Rates</h3>
                    <p className="text-gray-600">Access to exclusive rates from our panel of trusted lenders.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-8 w-8 text-cyan-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Fast Approval</h3>
                    <p className="text-gray-600">Quick processing with pre-approval in as little as 24 hours.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="h-8 w-8 text-cyan-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                    <p className="text-gray-600">Dedicated mortgage specialists to guide you through the process.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Take the first step towards homeownership. Our experts are ready to help you find the perfect loan.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeLoans;

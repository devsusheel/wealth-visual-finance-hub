
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, CheckCircle, TrendingDown, Shield, ArrowRight } from "lucide-react";

const HomeLoans = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Home className="h-16 w-16 text-cyan-300 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">Home Loans</h1>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
              Make your homeownership dreams a reality. From first home buyers to investment properties, 
              we offer competitive rates and personalized service to get you the keys to your new home.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Home Loans?</h2>
            <p className="text-xl text-gray-600">Competitive rates, expert guidance, and personalized service</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <TrendingDown className="h-12 w-12 text-cyan-500 mx-auto mb-4" />
                <CardTitle>Competitive Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Access to the best rates in the market with flexible terms that suit your budget.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-cyan-500 mx-auto mb-4" />
                <CardTitle>Expert Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Professional mortgage brokers to guide you through every step of the process.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-cyan-500 mx-auto mb-4" />
                <CardTitle>Fast Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Quick processing and pre-approval to give you confidence when making offers.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Ready to Buy Your Dream Home?</h2>
          <p className="text-xl mb-8">Get pre-approved and start your home buying journey today</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
            Apply for Home Loan
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeLoans;

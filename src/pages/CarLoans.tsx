
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, CheckCircle, Clock, DollarSign, ArrowRight } from "lucide-react";

const CarLoans = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-green to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Car className="h-16 w-16 text-brand-yellow mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">Car Loans</h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Drive away with your dream car today. Our competitive auto financing options 
              make it easy to get behind the wheel of your next vehicle.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Car Loans?</h2>
            <p className="text-xl text-gray-600">Fast approval, competitive rates, and flexible terms</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-brand-green mx-auto mb-4" />
                <CardTitle>Quick Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Get approved in minutes and drive away today with our fast processing.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-brand-green mx-auto mb-4" />
                <CardTitle>Competitive Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Enjoy low interest rates and flexible repayment terms that fit your budget.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-brand-green mx-auto mb-4" />
                <CardTitle>Simple Process</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Minimal paperwork and straightforward application process.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-yellow to-yellow-500 text-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Ready to Drive?</h2>
          <p className="text-xl mb-8 text-gray-800">Get pre-approved for your car loan and start shopping with confidence</p>
          <Button size="lg" className="bg-brand-green hover:bg-green-700 text-white px-8 py-3 font-semibold">
            Apply for Car Loan
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CarLoans;

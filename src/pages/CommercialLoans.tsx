
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Briefcase, TrendingUp, Users, ArrowRight } from "lucide-react";

const CommercialLoans = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#678E19] via-green-700 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Building2 className="h-16 w-16 text-[#EDA208] mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">Commercial Loans</h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Fuel your business growth with our comprehensive commercial financing solutions. 
              From equipment purchases to property acquisitions, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Commercial Finance Solutions</h2>
            <p className="text-xl text-gray-600">Tailored financing for every business need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <Briefcase className="h-8 w-8 text-[#678E19] mb-2" />
                <CardTitle>Equipment Finance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Finance business equipment and machinery with competitive rates and flexible terms.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <Building2 className="h-8 w-8 text-[#678E19] mb-2" />
                <CardTitle>Commercial Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Secure commercial real estate for your business operations or investment portfolio.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-[#678E19] mb-2" />
                <CardTitle>Working Capital</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Maintain healthy cash flow with our working capital solutions and business lines of credit.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#EDA208] to-yellow-500 text-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
         <h2 className="text-4xl font-bold mb-4 text-gray-900">Grow Your Business</h2>
          <p className="text-xl mb-8 text-gray-800">Get the funding you need to take your business to the next level</p>
          <Button size="lg" variant="secondary" className="px-8 py-3 font-semibold">
            Apply for Commercial Finance
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommercialLoans;

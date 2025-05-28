
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingDown, PiggyBank, Home, ArrowRight } from "lucide-react";

const Refinancing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-green to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <RefreshCw className="h-16 w-16 text-brand-yellow mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">Refinancing</h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Save thousands on your mortgage with better rates and terms. 
              Our refinancing solutions help you reduce payments and unlock equity.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits of Refinancing</h2>
            <p className="text-xl text-gray-600">Discover how refinancing can improve your financial position</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <TrendingDown className="h-12 w-12 text-brand-green mx-auto mb-4" />
                <CardTitle>Lower Interest Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Secure a better rate and reduce your monthly payments significantly.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <PiggyBank className="h-12 w-12 text-brand-green mx-auto mb-4" />
                <CardTitle>Access Equity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Unlock your home's equity for renovations, investments, or debt consolidation.</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardHeader>
                <Home className="h-12 w-12 text-brand-green mx-auto mb-4" />
                <CardTitle>Better Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Switch to loans with better features like offset accounts and redraw facilities.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-yellow to-yellow-500 text-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Start Saving Today</h2>
          <p className="text-xl mb-8 text-gray-800">Find out how much you could save by refinancing your home loan</p>
          <Button size="lg" className="bg-brand-green hover:bg-green-700 text-white px-8 py-3 font-semibold">
            Get Refinancing Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Refinancing;

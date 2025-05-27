
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoanCalculator from "@/components/LoanCalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, PiggyBank, CreditCard, Building, Clock, RefreshCw, Home } from "lucide-react";

const Calculators = () => {
  const calculatorTypes = [
    {
      icon: Calculator,
      title: "Loan Repayment Calculator",
      description: "Calculate your monthly, fortnightly, or weekly loan payments based on amount, rate, and term.",
      isActive: true
    },
    {
      icon: TrendingUp,
      title: "Loan Comparison Calculator",
      description: "Compare different loan options side by side to find the best deal for you."
    },
    {
      icon: PiggyBank,
      title: "Extra Repayment Calculator",
      description: "See how extra payments can save you thousands and reduce your loan term."
    },
    {
      icon: RefreshCw,
      title: "Mortgage Switching Calculator",
      description: "Calculate potential savings when switching to a new mortgage provider."
    },
    {
      icon: CreditCard,
      title: "Interest Only Calculator",
      description: "Calculate interest-only payments and total loan costs over time."
    },
    {
      icon: Building,
      title: "Borrowing Power Calculator",
      description: "Determine how much you can borrow based on your income and expenses."
    },
    {
      icon: Clock,
      title: "Repayment Time Calculator",
      description: "Find out how long it will take to pay off your loan with different payment amounts."
    },
    {
      icon: Home,
      title: "Affordability Calculator",
      description: "Calculate what price range you can afford for your next property purchase."
    }
  ];

  const tips = [
    {
      title: "Compare Payment Frequencies",
      description: "Making fortnightly payments instead of monthly can save thousands in interest."
    },
    {
      title: "Consider Extra Payments",
      description: "Even small extra payments can significantly reduce your loan term."
    },
    {
      title: "Shop Around for Rates",
      description: "A difference of 0.5% in interest rate can save tens of thousands over time."
    },
    {
      title: "Factor in All Costs",
      description: "Remember to include fees, insurance, and maintenance in your calculations."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Financial Calculators</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Make informed financial decisions with our comprehensive suite of calculators. 
              Plan your mortgage, compare loans, and understand your borrowing capacity.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Types Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Calculator</h2>
            <p className="text-lg text-gray-600">Select from our range of specialized financial calculators</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {calculatorTypes.map((calc, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  calc.isActive ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                }`}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                    calc.isActive ? 'bg-blue-600' : 'bg-gradient-to-r from-blue-600 to-cyan-500'
                  }`}>
                    <calc.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">{calc.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">{calc.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Calculator Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoanCalculator />
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial Tips</h2>
            <p className="text-lg text-gray-600">Smart strategies to save money on your loans</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tips.map((tip, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Use Our Calculators</h2>
            <p className="text-lg text-gray-600">Get the most accurate results with these simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter Your Details</h3>
              <p className="text-gray-600">Input your loan amount, interest rate, and loan term using our interactive sliders or manual entry.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Adjust Parameters</h3>
              <p className="text-gray-600">Fine-tune your payment frequency and explore different scenarios to find what works best for you.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Results</h3>
              <p className="text-gray-600">Get instant calculations showing your payments, total interest, and payment comparisons.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-lg text-yellow-800">Important Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700">
                The calculators on this website are for illustrative purposes only and are based on the information you provide. 
                The results are estimates and should not be considered as definitive financial advice. Actual loan terms, 
                interest rates, and fees may vary based on your individual circumstances and lender requirements. 
                For personalized financial advice, please consult with one of our qualified mortgage brokers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Calculators;

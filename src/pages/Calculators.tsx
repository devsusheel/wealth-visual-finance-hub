
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeLoanCalculator from "@/components/HomeLoanCalculator";
import RepaymentCalculator from "@/components/RepaymentCalculator";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Calculator as CalcIcon, Home, Clock, DollarSign, Percent } from "lucide-react";

const Calculators = () => {
  const [activeCalculator, setActiveCalculator] = useState("home-loan");

  const calculatorMenu = [
    { id: "home-loan", label: "Home Loan Calculator", icon: Home },
    { id: "repayment-period", label: "How Long To Repay Calculator", icon: Clock },
    { id: "borrowing-power", label: "Borrowing Power Calculator", icon: DollarSign },
    { id: "comparison", label: "Loan Comparison Calculator", icon: Percent },
  ];

  const renderActiveCalculator = () => {
    switch (activeCalculator) {
      case "home-loan":
        return <HomeLoanCalculator />;
      case "repayment-period":
        return (
          <section className="py-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#678E19] mb-4">How Long To Repay Calculator</h2>
              <p className="text-lg text-gray-600">Calculate how long it will take to repay your loan with a specific monthly payment.</p>
            </div>
            <RepaymentCalculator />
          </section>
        );
      case "borrowing-power":
        return (
          <section className="py-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#678E19] mb-4">Borrowing Power Calculator</h2>
              <p className="text-lg text-gray-600">Find out how much you could potentially borrow based on your income and expenses.</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-[#678E19] to-green-600 text-white text-center py-12">
                <CardContent>
                  <CalcIcon className="h-16 w-16 mx-auto mb-4 text-[#EDA208]" />
                  <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
                  <p className="text-green-100">We're working on this calculator to help you determine your borrowing capacity.</p>
                </CardContent>
              </Card>
            </div>
          </section>
        );
      case "comparison":
        return (
          <section className="py-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#678E19] mb-4">Loan Comparison Calculator</h2>
              <p className="text-lg text-gray-600">Compare different loan options to find the best deal for your needs.</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-[#678E19] to-green-600 text-white text-center py-12">
                <CardContent>
                  <CalcIcon className="h-16 w-16 mx-auto mb-4 text-[#EDA208]" />
                  <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
                  <p className="text-green-100">We're developing this tool to help you compare different loan options side by side.</p>
                </CardContent>
              </Card>
            </div>
          </section>
        );
      default:
        return <HomeLoanCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#678E19] to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Financial Calculators</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Use our comprehensive suite of calculators to make informed financial decisions
          </p>
        </div>
      </section>

      {/* Calculator Menu */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {calculatorMenu.map((calculator) => (
              <button
                key={calculator.id}
                onClick={() => setActiveCalculator(calculator.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  activeCalculator === calculator.id
                    ? "border-[#678E19] bg-green-50 text-[#678E19]"
                    : "border-gray-200 hover:border-[#678E19] hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <calculator.icon className={`h-6 w-6 ${
                    activeCalculator === calculator.id ? "text-[#678E19]" : "text-gray-500"
                  }`} />
                  <span className="font-medium">{calculator.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Calculator */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderActiveCalculator()}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Calculators;

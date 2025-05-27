
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Percent, Calendar, Calculator } from "lucide-react";

const HomeLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    calculatePayment();
  }, [loanAmount, interestRate, loanTerm]);

  const calculatePayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                   (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    setMonthlyPayment(payment);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Loan Calculator</h2>
          <p className="text-xl text-gray-600">Calculate your monthly repayments easily with our interactive tool.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Calculator Controls */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600 flex items-center">
                  <Calculator className="h-6 w-6 mr-2" />
                  Loan Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Loan Amount */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-cyan-500" />
                      <span className="text-lg font-medium">Loan Amount</span>
                    </div>
                    <span className="text-xl font-bold text-cyan-500">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    max={2000000}
                    min={50000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>$50K</span>
                    <span>$2M</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Percent className="h-5 w-5 text-cyan-500" />
                      <span className="text-lg font-medium">Interest Rate</span>
                    </div>
                    <span className="text-xl font-bold text-cyan-500">
                      {interestRate.toFixed(1)}%
                    </span>
                  </div>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    max={10}
                    min={2}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>2%</span>
                    <span>10%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-cyan-500" />
                      <span className="text-lg font-medium">Loan Term</span>
                    </div>
                    <span className="text-xl font-bold text-cyan-500">
                      {loanTerm} Years
                    </span>
                  </div>
                  <Slider
                    value={[loanTerm]}
                    onValueChange={(value) => setLoanTerm(value[0])}
                    max={30}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>5 years</span>
                    <span>30 years</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3">
                  Explore More Financial Calculators
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white h-full">
              <CardHeader>
                <CardTitle className="text-white text-xl">Your Estimated Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-cyan-400 rounded-lg p-6 text-center">
                  <p className="text-blue-900 font-medium mb-2">Approx Monthly</p>
                  <p className="text-3xl font-bold text-blue-900">
                    {formatCurrency(monthlyPayment)}
                  </p>
                </div>

                <div className="bg-blue-700 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-cyan-300 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-blue-100 text-sm">
                      This is an estimated figure only and may vary. For a complete personalized assessment, contact us.
                    </p>
                  </div>
                </div>

                <Button className="w-full bg-cyan-400 hover:bg-cyan-300 text-blue-900 font-semibold py-3">
                  Contact Us Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLoanCalculator;

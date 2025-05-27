
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(25);
  const [paymentFrequency, setPaymentFrequency] = useState("fortnightly");
  
  const [results, setResults] = useState({
    payment: 0,
    totalInterest: 0,
    totalPayment: 0,
    monthlyPayment: 0,
    fortnightlyPayment: 0,
    weeklyPayment: 0
  });

  useEffect(() => {
    calculatePayments();
  }, [loanAmount, interestRate, loanTerm, paymentFrequency]);

  const calculatePayments = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Monthly payment calculation
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    
    // Calculate different frequencies
    const fortnightlyPayment = monthlyPayment * 12 / 26;
    const weeklyPayment = monthlyPayment * 12 / 52;
    
    let currentPayment = monthlyPayment;
    if (paymentFrequency === "fortnightly") currentPayment = fortnightlyPayment;
    if (paymentFrequency === "weekly") currentPayment = weeklyPayment;

    setResults({
      payment: currentPayment,
      totalInterest,
      totalPayment,
      monthlyPayment,
      fortnightlyPayment,
      weeklyPayment
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Sidebar - Calculator Options */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="bg-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Choose Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="p-3 bg-blue-700 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-2">
                <Calculator className="h-4 w-4" />
                <span>Loan Repayment Calculator</span>
              </div>
            </div>
            <div className="p-3 hover:bg-blue-700 rounded-lg cursor-pointer">
              <span>Loan Comparison Calculator</span>
            </div>
            <div className="p-3 hover:bg-blue-700 rounded-lg cursor-pointer">
              <span>Extra Repayment Calculator</span>
            </div>
            <div className="p-3 hover:bg-blue-700 rounded-lg cursor-pointer">
              <span>Mortgage Switching Calculator</span>
            </div>
            <div className="p-3 hover:bg-blue-700 rounded-lg cursor-pointer">
              <span>Interest Only Mortgage Calculator</span>
            </div>
            <div className="p-3 hover:bg-blue-700 rounded-lg cursor-pointer">
              <span>Borrowing Power Calculator</span>
            </div>
            <div className="p-3 hover:bg-blue-700 rounded-lg cursor-pointer">
              <span>How Long to Repay Calculator</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-100 mb-4">
              Our financial experts are here to help you understand your options.
            </p>
            <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
              Contact Us
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Calculator */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 text-2xl">Loan Repayment Calculator</CardTitle>
            <p className="text-gray-600">Calculate your loan repayments based on loan amount, interest rate, and term.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Loan Amount */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-cyan-500" />
                <Label className="text-lg font-medium">Loan Amount</Label>
                <span className="ml-auto text-xl font-bold text-cyan-500">
                  {formatCurrency(loanAmount)}
                </span>
              </div>
              <Slider
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
                max={2000000}
                min={10000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>$10,000</span>
                <span>$2,000,000</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Percent className="h-5 w-5 text-cyan-500" />
                <Label className="text-lg font-medium">Interest Rate</Label>
                <span className="ml-auto text-xl font-bold text-cyan-500">
                  {interestRate.toFixed(2)}%
                </span>
              </div>
              <Slider
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
                max={15}
                min={1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Loan Term */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-cyan-500" />
                <Label className="text-lg font-medium">Loan Term</Label>
                <span className="ml-auto text-xl font-bold text-cyan-500">
                  {loanTerm} Years
                </span>
              </div>
              <Slider
                value={[loanTerm]}
                onValueChange={(value) => setLoanTerm(value[0])}
                max={30}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1 year</span>
                <span>30 years</span>
              </div>
            </div>

            {/* Payment Frequency */}
            <div className="space-y-3">
              <Label className="text-lg font-medium">Payment Frequency</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={paymentFrequency === "monthly" ? "default" : "outline"}
                  onClick={() => setPaymentFrequency("monthly")}
                  className={paymentFrequency === "monthly" ? "bg-gray-600" : ""}
                >
                  Monthly
                </Button>
                <Button
                  variant={paymentFrequency === "fortnightly" ? "default" : "outline"}
                  onClick={() => setPaymentFrequency("fortnightly")}
                  className={paymentFrequency === "fortnightly" ? "bg-cyan-500" : ""}
                >
                  Fortnightly
                </Button>
                <Button
                  variant={paymentFrequency === "weekly" ? "default" : "outline"}
                  onClick={() => setPaymentFrequency("weekly")}
                  className={paymentFrequency === "weekly" ? "bg-gray-600" : ""}
                >
                  Weekly
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 text-xl">Your Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">
                  {paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1)} Payment
                </p>
                <p className="text-3xl font-bold text-cyan-500">
                  {formatCurrency(results.payment)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-2">Total Interest</p>
                <p className="text-3xl font-bold text-cyan-500">
                  {formatCurrency(results.totalInterest)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-2">Total Payment</p>
                <p className="text-3xl font-bold text-cyan-500">
                  {formatCurrency(results.totalPayment)}
                </p>
              </div>
            </div>

            {/* Payment Comparison */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Payment Comparison</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monthly:</span>
                  <span className="font-medium">{formatCurrency(results.monthlyPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fortnightly:</span>
                  <span className="font-medium">{formatCurrency(results.fortnightlyPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Weekly:</span>
                  <span className="font-medium">{formatCurrency(results.weeklyPayment)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <p>The information generated by the calculator is for illustrative purposes only, based on the assumptions and inputs provided. Results are estimates and should not be considered definitive financial advice. For personalized guidance, please consult a qualified mortgage broker to assess your unique financial situation.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoanCalculator;

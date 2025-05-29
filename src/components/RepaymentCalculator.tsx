
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Percent, Calculator } from "lucide-react";

const RepaymentCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [monthlyPayment, setMonthlyPayment] = useState(3000);
  const [repaymentPeriod, setRepaymentPeriod] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateRepaymentPeriod();
  }, [loanAmount, interestRate, monthlyPayment]);

  const calculateRepaymentPeriod = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const payment = monthlyPayment;
    
    if (payment <= principal * monthlyRate || payment <= 0) {
      setRepaymentPeriod(0);
      setTotalInterest(0);
      return;
    }
    
    const months = Math.log(1 + (principal * monthlyRate) / payment) / 
                  Math.log(1 + monthlyRate) * -1;
    
    const calculatedMonths = Math.ceil(months);
    const totalPaid = payment * calculatedMonths;
    const interestPaid = totalPaid - principal;
    
    setRepaymentPeriod(calculatedMonths);
    setTotalInterest(interestPaid);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPeriod = (months: number) => {
    if (months === 0) return "Payment too low";
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${months} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years ${remainingMonths} months`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Calculator Controls */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-2xl text-[#678E19] flex items-center">
              <Calculator className="h-6 w-6 mr-2" />
              How Long To Repay Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Loan Amount */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-[#678E19]" />
                  <span className="text-lg font-medium">Loan Amount</span>
                </div>
                <span className="text-xl font-bold text-[#678E19]">
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
                  <Percent className="h-5 w-5 text-[#678E19]" />
                  <span className="text-lg font-medium">Interest Rate</span>
                </div>
                <span className="text-xl font-bold text-[#678E19]">
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

            {/* Monthly Payment */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-[#678E19]" />
                  <span className="text-lg font-medium">Monthly Payment</span>
                </div>
                <span className="text-xl font-bold text-[#678E19]">
                  {formatCurrency(monthlyPayment)}
                </span>
              </div>
              <Slider
                value={[monthlyPayment]}
                onValueChange={(value) => setMonthlyPayment(value[0])}
                max={10000}
                min={500}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>$500</span>
                <span>$10K</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <div className="lg:col-span-1">
        <Card className="bg-gradient-to-br from-[#678E19] to-green-600 text-white h-full">
          <CardHeader>
            <CardTitle className="text-white text-xl">Repayment Period</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-[#EDA208] rounded-lg p-6 text-center">
              <p className="text-black font-medium mb-2">Time to Repay</p>
              <p className="text-2xl font-bold text-black">
                {formatPeriod(repaymentPeriod)}
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-green-700 rounded-lg p-4">
                <div className="text-sm text-green-100 mb-1">Total Interest</div>
                <div className="text-lg font-bold text-white">
                  {formatCurrency(totalInterest)}
                </div>
              </div>
              
              <div className="bg-green-700 rounded-lg p-4">
                <div className="text-sm text-green-100 mb-1">Total Amount Paid</div>
                <div className="text-lg font-bold text-white">
                  {formatCurrency(loanAmount + totalInterest)}
                </div>
              </div>
            </div>

            <div className="bg-green-700 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-[#EDA208] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-green-100 text-sm">
                  This calculation assumes a fixed interest rate and consistent monthly payments.
                </p>
              </div>
            </div>

            <Button variant="secondary" className="w-full font-semibold py-3">
              Get Professional Advice
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RepaymentCalculator;

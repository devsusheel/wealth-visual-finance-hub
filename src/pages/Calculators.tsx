// pages/Calculator.tsx

import { useState, useEffect, FormEvent, FC } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator as CalcIcon, DollarSign, Percent, Calendar } from "lucide-react";

const Calculator: FC = () => {
  const [activeCalculator, setActiveCalculator] = useState("loan-repayment");

  // Loan inputs & results
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(25);
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");
  const [results, setResults] = useState({
    payment: 0,
    totalInterest: 0,
    totalPayment: 0,
    monthlyPayment: 0,
    fortnightlyPayment: 0,
    weeklyPayment: 0,
  });

  // Recalculate on change
  useEffect(() => {
    const p = loanAmount;
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;
    const monthly =
      p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = monthly * n;
    const totalInt = totalPay - p;
    const fortnightly = (monthly * 12) / 26;
    const weekly = (monthly * 12) / 52;
    let pay = monthly;
    if (paymentFrequency === "fortnightly") pay = fortnightly;
    if (paymentFrequency === "weekly") pay = weekly;
    setResults({
      payment: pay,
      totalInterest: totalInt,
      totalPayment: totalPay,
      monthlyPayment: monthly,
      fortnightlyPayment: fortnightly,
      weeklyPayment: weekly,
    });
  }, [loanAmount, interestRate, loanTerm, paymentFrequency]);

  // Format USD
  const fmt = (amt: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amt);

  // Function to render different calculators
  const renderCalculator = () => {
    switch (activeCalculator) {
      case "loan-repayment":
        return (
          <>
            <CardHeader className="pb-6 px-8 pt-8">
              <CardTitle className="text-[#678E19] text-2xl font-bold mb-2">
                Loan Repayment Calculator
              </CardTitle>
              <p className="text-gray-600 text-base">
                Calculate your loan repayments based on loan amount, interest rate, and term.
              </p>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="h-5 w-5 mr-3 text-[#678E19]" />
                    <Label className="text-base font-medium">Loan Amount</Label>
                  </div>
                  <span className="text-[#678E19] font-bold text-lg">
                    {fmt(loanAmount)}
                  </span>
                </div>
                <div className="mb-3">
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(v) => setLoanAmount(v[0])}
                    min={10000}
                    max={2000000}
                    step={1000}
                    className="[&>div]:h-2 [&>div>div]:h-2 [&>div>div>div]:h-4 [&>div>div>div]:w-4 [&>div>div>div]:bg-[#678E19] [&>div]:bg-gray-200"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$10,000</span>
                  <span>$2,000,000</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-700">
                    <Percent className="h-5 w-5 mr-3 text-[#678E19]" />
                    <Label className="text-base font-medium">Interest Rate</Label>
                  </div>
                  <span className="text-[#678E19] font-bold text-lg">
                    {interestRate.toFixed(1)}%
                  </span>
                </div>
                <div className="mb-3">
                  <Slider
                    value={[interestRate]}
                    onValueChange={(v) => setInterestRate(v[0])}
                    min={1}
                    max={15}
                    step={0.1}
                    className="[&>div]:h-2 [&>div>div]:h-2 [&>div>div>div]:h-4 [&>div>div>div]:w-4 [&>div>div>div]:bg-[#678E19] [&>div]:bg-gray-200"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-3 text-[#678E19]" />
                    <Label className="text-base font-medium">Loan Term</Label>
                  </div>
                  <span className="text-[#678E19] font-bold text-lg">
                    {loanTerm} Years
                  </span>
                </div>
                <div className="mb-3">
                  <Slider
                    value={[loanTerm]}
                    onValueChange={(v) => setLoanTerm(v[0])}
                    min={1}
                    max={30}
                    step={1}
                    className="[&>div]:h-2 [&>div>div]:h-2 [&>div>div>div]:h-4 [&>div>div>div]:w-4 [&>div>div>div]:bg-[#678E19] [&>div]:bg-gray-200"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>

              {/* Payment Frequency */}
              <div>
                <Label className="text-base font-medium text-gray-700 mb-4 block">Payment Frequency</Label>
                <div className="flex rounded-lg overflow-hidden border border-gray-300">
                  {["monthly", "fortnightly", "weekly"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setPaymentFrequency(f)}
                      className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
                        paymentFrequency === f
                          ? "bg-[#678E19] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </>
        );

      case "loan-comparison":
        const loan1Results = calculateLoanComparison(loan1);
        const loan2Results = calculateLoanComparison(loan2);
        const initialDiff = loan1Results.initialPayment - loan2Results.initialPayment;
        const ongoingDiff = loan1Results.ongoingPayment - loan2Results.ongoingPayment;
        const costDiff = loan1Results.totalCost - loan2Results.totalCost;
        
        return (
          <>
            <CardHeader className="pb-6 px-8 pt-8">
              <CardTitle className="text-[#678E19] text-2xl font-bold mb-2">
                Loan Comparison Calculator
              </CardTitle>
              <p className="text-gray-600 text-base">
                Compare different loan options side by side to find the best deal.
              </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Loan 1 */}
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Loan 1</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-700">Loan Amount ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 250000"
                        value={loan1.amount}
                        onChange={(e) => setLoan1({...loan1, amount: Number(e.target.value)})}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Loan Term (Years)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 30"
                        value={loan1.term}
                        onChange={(e) => setLoan1({...loan1, term: Number(e.target.value)})}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Introductory Rate (% Annual)</Label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 4.5"
                        value={loan1.introRate}
                        onChange={(e) => setLoan1({...loan1, introRate: Number(e.target.value)})}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Introductory Period (Months)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 24"
                        value={loan1.introPeriod}
                        onChange={(e) => setLoan1({...loan1, introPeriod: Number(e.target.value)})}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Ongoing Rate (% Annual)</Label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 5.5"
                        value={loan1.ongoingRate}
                        onChange={(e) => setLoan1({...loan1, ongoingRate: Number(e.target.value)})}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Upfront Fee ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 500"
                        value={loan1.upfrontFee}
                        onChange={(e) => setLoan1({...loan1, upfrontFee: Number(e.target.value)})}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Monthly Fee ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 10"
                        value={loan1.monthlyFee}
                        onChange={(e) => setLoan1({...loan1, monthlyFee: Number(e.target.value)})}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Loan 2 */}
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Loan 2</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-700">Loan Amount ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 250000"
                        value={loan2.amount}
                        onChange={(e) => setLoan2({...loan2, amount: Number(e.target.value)})}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Loan Term (Years)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 30"
                        value={loan2.term}
                        onChange={(e) => setLoan2({...loan2, term: Number(e.target.value)})}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Introductory Rate (% Annual)</Label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 4.5"
                        value={loan2.introRate}
                        onChange={(e) => setLoan2({...loan2, introRate: Number(e.target.value)})}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Introductory Period (Months)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 24"
                        value={loan2.introPeriod}
                        onChange={(e) => setLoan2({...loan2, introPeriod: Number(e.target.value)})}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Ongoing Rate (% Annual)</Label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 5.5"
                        value={loan2.ongoingRate}
                        onChange={(e) => setLoan2({...loan2, ongoingRate: Number(e.target.value)})}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Upfront Fee ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 500"
                        value={loan2.upfrontFee}
                        onChange={(e) => setLoan2({...loan2, upfrontFee: Number(e.target.value)})}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Monthly Fee ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 10"
                        value={loan2.monthlyFee}
                        onChange={(e) => setLoan2({...loan2, monthlyFee: Number(e.target.value)})}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Results */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-600 mb-4">Comparison Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Loan 1</h4>
                    <div className="space-y-1 text-sm">
                      <div>Initial Monthly Payment: <span className="font-semibold">{fmt(loan1Results.initialPayment)}</span></div>
                      <div>Ongoing Monthly Payment: <span className="font-semibold">{fmt(loan1Results.ongoingPayment)}</span></div>
                      <div>Total Cost: <span className="font-semibold">{fmt(loan1Results.totalCost)}</span></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Loan 2</h4>
                    <div className="space-y-1 text-sm">
                      <div>Initial Monthly Payment: <span className="font-semibold">{fmt(loan2Results.initialPayment)}</span></div>
                      <div>Ongoing Monthly Payment: <span className="font-semibold">{fmt(loan2Results.ongoingPayment)}</span></div>
                      <div>Total Cost: <span className="font-semibold">{fmt(loan2Results.totalCost)}</span></div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-800 mb-3">Comparison Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div>Initial Monthly Payment Difference: <span className="font-semibold">{fmt(Math.abs(initialDiff))}</span></div>
                    <div>Ongoing Monthly Payment Difference: <span className="font-semibold">{fmt(Math.abs(ongoingDiff))}</span></div>
                    <div className="bg-green-100 p-3 rounded mt-3">
                      <span className="text-green-800">
                        {costDiff === 0 ? "Both loans cost the same" : 
                         costDiff > 0 ? `Loan 2 is cheaper by ${fmt(Math.abs(costDiff))}` : 
                         `Loan 1 is cheaper by ${fmt(Math.abs(costDiff))}`} over the loan term
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        );

      case "extra-repayment":
        return (
          <>
            <CardHeader className="pb-6 px-8 pt-8">
              <CardTitle className="text-[#678E19] text-2xl font-bold mb-2">
                Extra Repayment Calculator
              </CardTitle>
              <p className="text-gray-600 text-base">
                See how extra repayments can save you money and reduce your loan term.
              </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Loan Amount ($)</Label>
                  <input
                    type="number"
                    placeholder="e.g., 300000"
                    value={extraRepayment.loanAmount}
                    onChange={(e) => setExtraRepayment({...extraRepayment, loanAmount: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Interest Rate (%)</Label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 5.5"
                    value={extraRepayment.interestRate}
                    onChange={(e) => setExtraRepayment({...extraRepayment, interestRate: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Loan Term (Years)</Label>
                  <input
                    type="number"
                    placeholder="e.g., 30"
                    value={extraRepayment.loanTerm}
                    onChange={(e) => setExtraRepayment({...extraRepayment, loanTerm: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-4 block">Payment Frequency</Label>
                  <div className="flex rounded-lg overflow-hidden border border-gray-300">
                    {["monthly", "fortnightly", "weekly"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setExtraRepayment({...extraRepayment, paymentFrequency: f})}
                        className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
                          extraRepayment.paymentFrequency === f
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Start After (Years)</Label>
                  <input
                    type="number"
                    placeholder="0"
                    value={extraRepayment.startAfter}
                    onChange={(e) => setExtraRepayment({...extraRepayment, startAfter: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Extra Monthly Repayment ($)</Label>
                  <input
                    type="number"
                    placeholder="e.g., 200"
                    value={extraRepayment.extraMonthlyPayment}
                    onChange={(e) => setExtraRepayment({...extraRepayment, extraMonthlyPayment: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium text-base transition-colors">
                  Calculate Savings
                </button>
              </div>
            </CardContent>
          </>
        );

      case "mortgage-switching":
        return (
          <>
            <CardHeader className="pb-6 px-8 pt-8">
              <CardTitle className="text-[#678E19] text-2xl font-bold mb-2">
                Mortgage Refinance Calculator
              </CardTitle>
              <p className="text-gray-600 text-base">
                Calculate the potential savings from switching your mortgage.
              </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-8">
                {/* Current Loan Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Loan Details</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Loan Amount ($)</Label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={currentLoan.amount}
                        onChange={(e) => setCurrentLoan({...currentLoan, amount: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Current Interest Rate (%)</Label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Enter amount"
                        value={currentLoan.currentRate}
                        onChange={(e) => setCurrentLoan({...currentLoan, currentRate: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Loan Term (Years)</Label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={currentLoan.term}
                        onChange={(e) => setCurrentLoan({...currentLoan, term: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Regular Loan Fee ($)</Label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={currentLoan.regularFee}
                        onChange={(e) => setCurrentLoan({...currentLoan, regularFee: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Final Payout Fee ($)</Label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={currentLoan.finalPayoutFee}
                        onChange={(e) => setCurrentLoan({...currentLoan, finalPayoutFee: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* New Refinance Loan Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">New Refinance Loan Details</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Introductory Term (Years)</Label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={newLoan.introTerm}
                        onChange={(e) => setNewLoan({...newLoan, introTerm: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Introductory Interest Rate (%)</Label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Enter amount"
                        value={newLoan.introRate}
                        onChange={(e) => setNewLoan({...newLoan, introRate: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Revert to Standard Rate (%)</Label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Enter amount"
                        value={newLoan.revertRate}
                        onChange={(e) => setNewLoan({...newLoan, revertRate: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">New Loan Regular Fee ($)</Label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={newLoan.regularFee}
                        onChange={(e) => setNewLoan({...newLoan, regularFee: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Upfront Refinancing Fees ($)</Label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={newLoan.upfrontFees}
                        onChange={(e) => setNewLoan({...newLoan, upfrontFees: Number(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        );

      case "interest-only":
        const ioResults = calculateInterestOnly();
        return (
          <>
            <CardHeader className="pb-6 px-8 pt-8">
              <CardTitle className="text-[#678E19] text-2xl font-bold mb-2">
                Interest Only Mortgage Calculator
              </CardTitle>
              <p className="text-gray-600 text-base">
                Calculate your monthly payments for an interest-only mortgage and compare with principal & interest repayments.
              </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Loan Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      placeholder="e.g., 400000"
                      value={interestOnly.loanAmount}
                      onChange={(e) => setInterestOnly({...interestOnly, loanAmount: Number(e.target.value)})}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-base"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Interest Rate (%)</Label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 5.5"
                    value={interestOnly.interestRate}
                    onChange={(e) => setInterestOnly({...interestOnly, interestRate: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-4 block">Payment Frequency</Label>
                  <div className="flex rounded-lg overflow-hidden border border-gray-300">
                    {["monthly", "fortnightly", "weekly"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setInterestOnly({...interestOnly, paymentFrequency: f})}
                        className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
                          interestOnly.paymentFrequency === f
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Interest Only Period (Years)</Label>
                  <input
                    type="number"
                    placeholder="e.g., 5"
                    value={interestOnly.interestOnlyPeriod}
                    onChange={(e) => setInterestOnly({...interestOnly, interestOnlyPeriod: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Total Loan Term (Years)</Label>
                  <input
                    type="number"
                    placeholder="e.g., 30"
                    value={interestOnly.totalLoanTerm}
                    onChange={(e) => setInterestOnly({...interestOnly, totalLoanTerm: Number(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
              </div>

              {/* Payment Comparison */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-600 mb-6">Payment Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm mb-2">Monthly Interest Only Payment</p>
                    <p className="text-blue-600 text-2xl font-bold">{fmt(ioResults.interestOnlyPayment)}/monthly</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm mb-2">Monthly Principal & Interest Payment</p>
                    <p className="text-blue-600 text-2xl font-bold">{fmt(ioResults.principalInterestPayment)}/monthly</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        );

      case "borrowing-power":
        return (
          <>
            <CardHeader className="pb-6 px-8 pt-8">
              <CardTitle className="text-[#678E19] text-2xl font-bold mb-2">
                Borrowing Power Calculator
              </CardTitle>
              <p className="text-gray-600 text-base">
                Find out how much you could potentially borrow based on your income and expenses.
              </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-medium text-gray-700 mb-2 block">Annual Income ($)</Label>
                    <input
                      type="number"
                      placeholder="e.g., 80000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium text-gray-700 mb-2 block">Monthly Expenses ($)</Label>
                    <input
                      type="number"
                      placeholder="e.g., 3000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-medium text-gray-700 mb-2 block">Interest Rate (%)</Label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g., 5.5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium text-gray-700 mb-2 block">Loan Term (Years)</Label>
                    <input
                      type="number"
                      placeholder="e.g., 30"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Deposit Amount ($)</Label>
                  <input
                    type="number"
                    placeholder="e.g., 50000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                
                <button className="w-full bg-[#678E19] hover:bg-[#5a7916] text-white py-3 px-6 rounded-lg font-medium text-base transition-colors">
                  Calculate Borrowing Power
                </button>
                
                <div className="mt-6 p-6 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600 text-sm mb-2">Estimated Borrowing Power</p>
                  <p className="text-[#678E19] text-3xl font-bold">$0</p>
                  <p className="text-gray-500 text-sm mt-2">Enter your details above to calculate</p>
                </div>
              </div>
            </CardContent>
          </>
        );

      case "repayment-time":
        return (
          <>
            <CardHeader className="pb-6 px-8 pt-8">
              <CardTitle className="text-[#678E19] text-2xl font-bold mb-2">
                How Long to Repay Calculator
              </CardTitle>
              <p className="text-gray-600 text-base">
                Calculate how long it will take to repay your loan with your current payments.
              </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Current Loan Balance ($)</Label>
                  <input
                    type="number"
                    placeholder="e.g., 400000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Interest Rate (%)</Label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 5.5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Monthly Payment ($)</Label>
                  <input
                    type="number"
                    placeholder="e.g., 2500"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                
                <button className="w-full bg-[#678E19] hover:bg-[#5a7916] text-white py-3 px-6 rounded-lg font-medium text-base transition-colors">
                  Calculate Repayment Time
                </button>
                
                <div className="mt-6 p-6 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600 text-sm mb-2">Time to Pay Off Loan</p>
                  <p className="text-[#678E19] text-3xl font-bold">0 Years, 0 Months</p>
                  <p className="text-gray-500 text-sm mt-2">Enter your details above to calculate</p>
                </div>
              </div>
            </CardContent>
          </>
        );

      default:
        return null;
    }
  };
  const menu = [
    { id: "loan-repayment", label: "Loan Repayment Calculator" },
    { id: "loan-comparison", label: "Loan Comparison Calculator" },
    { id: "extra-repayment", label: "Extra Repayment Calculator" },
    { id: "mortgage-switching", label: "Mortgage Switching Calculator" },
    { id: "interest-only", label: "Interest Only Mortgage Calculator" },
    { id: "borrowing-power", label: "Borrowing Power Calculator" },
    { id: "repayment-time", label: "How Long to Repay Calculator" },
  ];

  // Loan comparison state
  const [loan1, setLoan1] = useState({
    amount: 250000,
    term: 30,
    introRate: 4.5,
    introPeriod: 24,
    ongoingRate: 5.5,
    upfrontFee: 500,
    monthlyFee: 10,
  });
  
  const [loan2, setLoan2] = useState({
    amount: 250000,
    term: 30,
    introRate: 4.5,
    introPeriod: 24,
    ongoingRate: 5.5,
    upfrontFee: 500,
    monthlyFee: 10,
  });

  // Extra repayment state
  const [extraRepayment, setExtraRepayment] = useState({
    loanAmount: 300000,
    interestRate: 5.5,
    loanTerm: 30,
    paymentFrequency: "monthly",
    startAfter: 0,
    extraMonthlyPayment: 200,
  });

  // Mortgage switching state
  const [currentLoan, setCurrentLoan] = useState({
    amount: 0,
    currentRate: 0,
    term: 0,
    regularFee: 0,
    finalPayoutFee: 0,
  });

  const [newLoan, setNewLoan] = useState({
    introTerm: 0,
    introRate: 0,
    revertRate: 0,
    regularFee: 0,
    upfrontFees: 0,
  });

  // Interest only state
  const [interestOnly, setInterestOnly] = useState({
    loanAmount: 400000,
    interestRate: 5.5,
    paymentFrequency: "monthly",
    interestOnlyPeriod: 5,
    totalLoanTerm: 30,
  });

  // Calculation functions
  const calculateLoanComparison = (loan) => {
    const p = loan.amount;
    const introMonthlyRate = loan.introRate / 100 / 12;
    const ongoingMonthlyRate = loan.ongoingRate / 100 / 12;
    const totalMonths = loan.term * 12;
    const introMonths = loan.introPeriod;
    
    // Initial payment calculation
    const initialPayment = p * (introMonthlyRate * Math.pow(1 + introMonthlyRate, totalMonths)) / 
                          (Math.pow(1 + introMonthlyRate, totalMonths) - 1);
    
    // Ongoing payment calculation
    const remainingBalance = p * Math.pow(1 + introMonthlyRate, introMonths) - 
                           initialPayment * ((Math.pow(1 + introMonthlyRate, introMonths) - 1) / introMonthlyRate);
    const remainingMonths = totalMonths - introMonths;
    const ongoingPayment = remainingBalance * (ongoingMonthlyRate * Math.pow(1 + ongoingMonthlyRate, remainingMonths)) / 
                          (Math.pow(1 + ongoingMonthlyRate, remainingMonths) - 1);
    
    const totalCost = (initialPayment * introMonths) + (ongoingPayment * remainingMonths) + 
                     loan.upfrontFee + (loan.monthlyFee * totalMonths);
    
    return {
      initialPayment: initialPayment || 0,
      ongoingPayment: ongoingPayment || 0,
      totalCost: totalCost || 0,
    };
  };

  const calculateInterestOnly = () => {
    const p = interestOnly.loanAmount;
    const monthlyRate = interestOnly.interestRate / 100 / 12;
    const interestOnlyMonths = interestOnly.interestOnlyPeriod * 12;
    const totalMonths = interestOnly.totalLoanTerm * 12;
    const principalMonths = totalMonths - interestOnlyMonths;
    
    // Interest only payment
    const interestOnlyPayment = p * monthlyRate;
    
    // Principal & interest payment after interest-only period
    const principalInterestPayment = p * (monthlyRate * Math.pow(1 + monthlyRate, principalMonths)) / 
                                   (Math.pow(1 + monthlyRate, principalMonths) - 1);
    
    return {
      interestOnlyPayment: interestOnlyPayment || 0,
      principalInterestPayment: principalInterestPayment || 0,
    };
  };
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "Home Loan",
    message: "",
    verification: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleContactChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (parseInt(contact.verification) !== 10) {
      setError("Verification answer is incorrect.");
      return;
    }
    alert(`Message sent for ${contact.name}`);
    setContact({
      name: "",
      email: "",
      phone: "",
      loanType: "Home Loan",
      message: "",
      verification: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#E6F2FE]">
      <Navbar />

      {/* Hero - More proportional */}
      <section className="bg-[#678E19] text-white py-12 mb-12">
        <div className="max-w-[1600px] mx-auto text-center px-8">
          <h1 className="text-4xl font-bold mb-3">Loan Calculators</h1>
          <p className="text-lg">
            Estimate your repayments, compare options, and plan your borrowing.
          </p>
        </div>
      </section>

      {/* Better proportioned grid with appropriate spacing */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-8 mb-16">
        {/* Sidebar (3/12) - Compact like reference */}
        <Card className="shadow-lg col-span-3 h-fit">
          <CardHeader className="bg-[#678E19] py-4">
            <CardTitle className="text-white text-lg font-semibold">Choose Calculator</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {menu.map((item) => {
              const isActive = activeCalculator === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveCalculator(item.id)}
                  className={`flex items-center px-4 py-3 border-b cursor-pointer transition-all ${
                    isActive ? "bg-[#EDA208]/20 border-l-4 border-l-[#678E19]" : "hover:bg-gray-50"
                  }`}
                >
                  <CalcIcon className="h-4 w-4 text-[#678E19] mr-3 flex-shrink-0" />
                  <span
                    className={`text-sm ${
                      isActive ? "text-[#678E19] font-medium" : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Main Calculator & Results (6/12) */}
        <div className="space-y-8 col-span-6">
          {/* Dynamic Calculator Content */}
          <Card className="shadow-lg">
            {renderCalculator()}
          </Card>

          {/* Results - Only show for loan-repayment calculator */}
          {activeCalculator === "loan-repayment" && (
            <Card className="shadow-lg">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-[#678E19] text-lg font-bold">Your Results</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    {
                      label:
                        paymentFrequency.charAt(0).toUpperCase() +
                        paymentFrequency.slice(1) +
                        " Payment",
                      value: results.payment,
                    },
                    { label: "Total Interest", value: results.totalInterest },
                    { label: "Total Payment", value: results.totalPayment },
                  ].map((it, i) => (
                    <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-600 text-xs mb-2 font-medium">{it.label}</p>
                      <p className="text-[#678E19] text-lg font-bold">
                        {fmt(it.value)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-bold text-gray-800 mb-3 text-sm">
                    Payment Comparison
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-xs">Monthly:</span>
                      <span className="font-semibold text-sm">{fmt(results.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-xs">Fortnightly:</span>
                      <span className="font-semibold text-sm">{fmt(results.fortnightlyPayment)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-xs">Weekly:</span>
                      <span className="font-semibold text-sm">{fmt(results.weeklyPayment)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Form (3/12) - Compact like reference */}
        <Card className="shadow-lg col-span-3 h-fit">
          <CardHeader className="bg-[#678E19] py-4">
            <CardTitle className="text-white text-lg font-semibold">Need More Details?</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label className="text-gray-700 text-sm mb-1 block">Name *</Label>
                <input
                  name="name"
                  value={contact.name}
                  onChange={handleContactChange}
                  required
                  className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#678E19] focus:border-transparent"
                />
              </div>
              <div>
                <Label className="text-gray-700 text-sm mb-1 block">Email *</Label>
                <input
                  name="email"
                  value={contact.email}
                  onChange={handleContactChange}
                  type="email"
                  required
                  className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#678E19] focus:border-transparent"
                />
              </div>
              <div>
                <Label className="text-gray-700 text-sm mb-1 block">Phone</Label>
                <input
                  name="phone"
                  value={contact.phone}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#678E19] focus:border-transparent"
                />
              </div>
              <div>
                <Label className="text-gray-700 text-sm mb-1 block">Loan Type</Label>
                <select
                  name="loanType"
                  value={contact.loanType}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#678E19] focus:border-transparent"
                >
                  <option>Home Loan</option>
                  <option>Refinancing</option>
                  <option>Investment Loan</option>
                </select>
              </div>
              <div>
                <Label className="text-gray-700 text-sm mb-1 block">Message *</Label>
                <textarea
                  name="message"
                  value={contact.message}
                  onChange={handleContactChange}
                  rows={3}
                  required
                  className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#678E19] focus:border-transparent resize-none"
                />
              </div>
              <div>
                <Label className="text-gray-700 text-sm mb-1 block">
                  Verification: What is 8 + 2? *
                </Label>
                <input
                  name="verification"
                  value={contact.verification}
                  onChange={handleContactChange}
                  required
                  className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#678E19] focus:border-transparent"
                />
              </div>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-[#EDA208] hover:bg-[#d39a07] text-black py-2 text-sm font-semibold rounded mt-4"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Calculator;
import { useState, useEffect, FormEvent, FC } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator as CalcIcon, DollarSign, Percent, Calendar } from "lucide-react";
import emailjs from '@emailjs/browser';

const Calculator: FC = () => {
  const [activeCalculator, setActiveCalculator] = useState("loan-repayment");

  // Loan Repayment state
  const [loanAmount, setLoanAmount] = useState(10000); // Minimum for slider
  const [interestRate, setInterestRate] = useState(1); // Minimum for slider
  const [loanTerm, setLoanTerm] = useState(1); // Minimum for slider
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");
  const [results, setResults] = useState({
    payment: 0,
    totalInterest: 0,
    totalPayment: 0,
    monthlyPayment: 0,
    fortnightlyPayment: 0,
    weeklyPayment: 0,
  });

  // Loan Comparison state
  const [loan1, setLoan1] = useState({
    amount: "",
    term: "",
    introRate: "",
    introPeriod: "",
    ongoingRate: "",
    upfrontFee: "",
    monthlyFee: "",
  });

  const [loan2, setLoan2] = useState({
    amount: "",
    term: "",
    introRate: "",
    introPeriod: "",
    ongoingRate: "",
    upfrontFee: "",
    monthlyFee: "",
  });

  // Extra Repayment state
  const [extraRepayment, setExtraRepayment] = useState({
    loanAmount: "",
    interestRate: "",
    loanTerm: "",
    paymentFrequency: "monthly",
    startAfter: "",
    extraMonthlyPayment: "",
  });

  const [extraRepaymentResults, setExtraRepaymentResults] = useState({
    originalTerm: 0,
    newTerm: 0,
    interestSaved: 0,
    calculated: false,
  });

  // Mortgage Switching state
  const [currentLoan, setCurrentLoan] = useState({
    amount: "",
    currentRate: "",
    term: "",
    regularFee: "",
    finalPayoutFee: "",
  });

  const [newLoan, setNewLoan] = useState({
    introTerm: "",
    introRate: "",
    revertRate: "",
    regularFee: "",
    upfrontFees: "",
  });

  const [switchingResults, setSwitchingResults] = useState({
    currentCost: 0,
    newCost: 0,
    savings: 0,
    calculated: false,
  });

  // Interest Only state
  const [interestOnly, setInterestOnly] = useState({
    loanAmount: "",
    interestRate: "",
    paymentFrequency: "monthly",
    interestOnlyPeriod: "",
    totalLoanTerm: "",
  });

  // Borrowing Power state
  const [borrowingPower, setBorrowingPower] = useState({
    annualIncome: "",
    monthlyExpenses: "",
    interestRate: "",
    loanTerm: "",
    deposit: "",
  });

  const [borrowingResults, setBorrowingResults] = useState({
    borrowingPower: 0,
    calculated: false,
  });

  // Repayment Time state
  const [repaymentTime, setRepaymentTime] = useState({
    currentBalance: "",
    interestRate: "",
    monthlyPayment: "",
  });

  const [repaymentResults, setRepaymentResults] = useState({
    years: 0,
    months: 0,
    totalInterest: 0,
    calculated: false,
  });

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "Home Loan",
    message: "",
    verification: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Format USD
  const fmt = (amt: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amt);

  // Input validation
  const validatePositive = (value: number | string, field: string): string | null => {
    const num = Number(value);
    if (isNaN(num) || num <= 0) return `${field} must be a positive number.`;
    return null;
  };

  // Loan Repayment calculation
  useEffect(() => {
    const errors = [
      validatePositive(loanAmount, "Loan Amount"),
      validatePositive(interestRate, "Interest Rate"),
      validatePositive(loanTerm, "Loan Term"),
    ].filter((e) => e !== null);

    if (errors.length > 0) {
      setResults({
        payment: 0,
        totalInterest: 0,
        totalPayment: 0,
        monthlyPayment: 0,
        fortnightlyPayment: 0,
        weeklyPayment: 0,
      });
      return;
    }

    const p = loanAmount;
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;
    const monthly = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) || 0;
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

  // Loan Comparison calculation
  const calculateLoanComparison = (loan) => {
    const errors = [
      validatePositive(loan.amount, "Loan Amount"),
      validatePositive(loan.term, "Loan Term"),
      validatePositive(loan.introRate, "Introductory Rate"),
      validatePositive(loan.introPeriod, "Introductory Period"),
      validatePositive(loan.ongoingRate, "Ongoing Rate"),
      validatePositive(loan.upfrontFee, "Upfront Fee"),
      validatePositive(loan.monthlyFee, "Monthly Fee"),
    ].filter((e) => e !== null);

    if (errors.length > 0 || Number(loan.introPeriod) > Number(loan.term) * 12) {
      return { initialPayment: 0, ongoingPayment: 0, totalCost: 0 };
    }

    const p = Number(loan.amount);
    const introMonthlyRate = Number(loan.introRate) / 100 / 12;
    const ongoingMonthlyRate = Number(loan.ongoingRate) / 100 / 12;
    const totalMonths = Number(loan.term) * 12;
    const introMonths = Number(loan.introPeriod);

    const initialPayment =
      p * (introMonthlyRate * Math.pow(1 + introMonthlyRate, totalMonths)) /
      (Math.pow(1 + introMonthlyRate, totalMonths) - 1) || 0;

    const remainingBalance =
      p * Math.pow(1 + introMonthlyRate, introMonths) -
      initialPayment *
        ((Math.pow(1 + introMonthlyRate, introMonths) - 1) / introMonthlyRate);
    const remainingMonths = totalMonths - introMonths;
    const ongoingPayment =
      remainingBalance *
        (ongoingMonthlyRate * Math.pow(1 + ongoingMonthlyRate, remainingMonths)) /
      (Math.pow(1 + ongoingMonthlyRate, remainingMonths) - 1) || 0;

    const totalCost =
      initialPayment * introMonths +
      ongoingPayment * remainingMonths +
      Number(loan.upfrontFee) +
      Number(loan.monthlyFee) * totalMonths;

    return {
      initialPayment,
      ongoingPayment,
      totalCost,
    };
  };

  // Extra Repayment calculation
  useEffect(() => {
    const errors = [
      validatePositive(extraRepayment.loanAmount, "Loan Amount"),
      validatePositive(extraRepayment.interestRate, "Interest Rate"),
      validatePositive(extraRepayment.loanTerm, "Loan Term"),
      validatePositive(extraRepayment.extraMonthlyPayment, "Extra Monthly Payment"),
      validatePositive(extraRepayment.startAfter, "Start After"),
      Number(extraRepayment.startAfter) >= Number(extraRepayment.loanTerm)
        ? "Start After must be less than Loan Term"
        : null,
    ].filter((e) => e !== null);

    if (errors.length > 0) {
      setExtraRepaymentResults({
        originalTerm: 0,
        newTerm: 0,
        interestSaved: 0,
        calculated: false,
      });
      return;
    }

    const p = Number(extraRepayment.loanAmount);
    const r = Number(extraRepayment.interestRate) / 100 / 12;
    const n = Number(extraRepayment.loanTerm) * 12;
    const startAfterMonths = Number(extraRepayment.startAfter) * 12;
    const extra = Number(extraRepayment.extraMonthlyPayment);

    // Original loan payment
    const monthlyPayment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) || 0;
    const originalTotalInterest = monthlyPayment * n - p;

    // Balance after startAfter period
    let balance = p;
    for (let i = 0; i < startAfterMonths; i++) {
      balance = balance * (1 + r) - monthlyPayment;
      if (balance <= 0) break;
    }

    // Calculate new term with extra payments
    const newPayment = monthlyPayment + extra;
    const monthlyInterest = balance * r;
    if (newPayment <= monthlyInterest) {
      setExtraRepaymentResults({
        originalTerm: 0,
        newTerm: 0,
        interestSaved: 0,
        calculated: false,
      });
      return;
    }

    const newPayments = Math.ceil(
      -Math.log(1 - (r * balance) / newPayment) / Math.log(1 + r)
    );
    const newTermMonths = startAfterMonths + newPayments;
    const newTotalInterest =
      monthlyPayment * startAfterMonths + newPayment * newPayments - p;

    setExtraRepaymentResults({
      originalTerm: n / 12,
      newTerm: newTermMonths / 12,
      interestSaved: originalTotalInterest - newTotalInterest,
      calculated: true,
    });
  }, [extraRepayment]);

  // Mortgage Switching calculation
  useEffect(() => {
    const errors = [
      validatePositive(currentLoan.amount, "Current Loan Amount"),
      validatePositive(currentLoan.currentRate, "Current Interest Rate"),
      validatePositive(currentLoan.term, "Current Loan Term"),
      validatePositive(currentLoan.regularFee, "Regular Fee"),
      validatePositive(currentLoan.finalPayoutFee, "Final Payout Fee"),
      validatePositive(newLoan.introRate, "Introductory Rate"),
      validatePositive(newLoan.revertRate, "Revert Rate"),
      validatePositive(newLoan.introTerm, "Introductory Term"),
      validatePositive(newLoan.regularFee, "New Regular Fee"),
      validatePositive(newLoan.upfrontFees, "Upfront Fees"),
      Number(newLoan.introTerm) >= Number(currentLoan.term)
        ? "Introductory Term must be less than Current Loan Term"
        : null,
    ].filter((e) => e !== null);

    if (errors.length > 0) {
      setSwitchingResults({
        currentCost: 0,
        newCost: 0,
        savings: 0,
        calculated: false,
      });
      return;
    }

    const p = Number(currentLoan.amount);
    const rCurrent = Number(currentLoan.currentRate) / 100 / 12;
    const rIntro = Number(newLoan.introRate) / 100 / 12;
    const rRevert = Number(newLoan.revertRate) / 100 / 12;
    const n = Number(currentLoan.term) * 12;
    const introMonths = Number(newLoan.introTerm) * 12;

    // Current loan cost
    const currentPayment =
      p * (rCurrent * Math.pow(1 + rCurrent, n)) / (Math.pow(1 + rCurrent, n) - 1) || 0;
    const currentTotalCost =
      currentPayment * n +
      Number(currentLoan.regularFee) * n +
      Number(currentLoan.finalPayoutFee);

    // New loan cost
    const introPayment =
      p * (rIntro * Math.pow(1 + rIntro, n)) / (Math.pow(1 + rIntro, n) - 1) || 0;
    const balanceAfterIntro =
      p * Math.pow(1 + rIntro, introMonths) -
      introPayment * ((Math.pow(1 + rIntro, introMonths) - 1) / rIntro);
    const remainingMonths = n - introMonths;
    const revertPayment =
      balanceAfterIntro *
        (rRevert * Math.pow(1 + rRevert, remainingMonths)) /
      (Math.pow(1 + rRevert, remainingMonths) - 1) || 0;
    const newTotalCost =
      introPayment * introMonths +
      revertPayment * remainingMonths +
      Number(newLoan.regularFee) * n +
      Number(newLoan.upfrontFees);

    setSwitchingResults({
      currentCost: currentTotalCost,
      newCost: newTotalCost,
      savings: currentTotalCost - newTotalCost,
      calculated: true,
    });
  }, [currentLoan, newLoan]);

  // Interest Only calculation
  const calculateInterestOnly = () => {
    const errors = [
      validatePositive(interestOnly.loanAmount, "Loan Amount"),
      validatePositive(interestOnly.interestRate, "Interest Rate"),
      validatePositive(interestOnly.interestOnlyPeriod, "Interest Only Period"),
      validatePositive(interestOnly.totalLoanTerm, "Total Loan Term"),
      Number(interestOnly.interestOnlyPeriod) > Number(interestOnly.totalLoanTerm)
        ? "Interest Only Period cannot exceed Total Loan Term"
        : null,
    ].filter((e) => e !== null);

    if (errors.length > 0) {
      return { interestOnlyPayment: 0, principalInterestPayment: 0 };
    }

    const p = Number(interestOnly.loanAmount);
    const monthlyRate = Number(interestOnly.interestRate) / 100 / 12;
    const interestOnlyMonths = Number(interestOnly.interestOnlyPeriod) * 12;
    const totalMonths = Number(interestOnly.totalLoanTerm) * 12;
    const principalMonths = totalMonths - interestOnlyMonths;

    const interestOnlyPayment = p * monthlyRate;
    const principalInterestPayment =
      p * (monthlyRate * Math.pow(1 + monthlyRate, principalMonths)) /
      (Math.pow(1 + monthlyRate, principalMonths) - 1) || 0;

    return {
      interestOnlyPayment,
      principalInterestPayment,
    };
  };

  // Borrowing Power calculation
  useEffect(() => {
    const errors = [
      validatePositive(borrowingPower.annualIncome, "Annual Income"),
      validatePositive(borrowingPower.monthlyExpenses, "Monthly Expenses"),
      validatePositive(borrowingPower.interestRate, "Interest Rate"),
      validatePositive(borrowingPower.loanTerm, "Loan Term"),
      validatePositive(borrowingPower.deposit, "Deposit"),
    ].filter((e) => e !== null);

    if (errors.length > 0) {
      setBorrowingResults({ borrowingPower: 0, calculated: false });
      return;
    }

    const monthlyIncome = Number(borrowingPower.annualIncome) / 12;
    const availableIncome = monthlyIncome - Number(borrowingPower.monthlyExpenses);
    const dtiRatio = 0.35; // Max 35% of income for repayments
    const maxPayment = availableIncome * dtiRatio;
    const r = Number(borrowingPower.interestRate) / 100 / 12;
    const n = Number(borrowingPower.loanTerm) * 12;
    const loanAmount = (maxPayment * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n)) || 0;
    const totalBorrowing = loanAmount + Number(borrowingPower.deposit);

    setBorrowingResults({
      borrowingPower: totalBorrowing,
      calculated: true,
    });
  }, [borrowingPower]);

  // Repayment Time calculation
  useEffect(() => {
    const errors = [
      validatePositive(repaymentTime.currentBalance, "Current Loan Balance"),
      validatePositive(repaymentTime.interestRate, "Interest Rate"),
      validatePositive(repaymentTime.monthlyPayment, "Monthly Payment"),
    ].filter((e) => e !== null);

    if (errors.length > 0) {
      setRepaymentResults({ years: 0, months: 0, totalInterest: 0, calculated: false });
      return;
    }

    const P = Number(repaymentTime.currentBalance);
    const r = Number(repaymentTime.interestRate) / 100 / 12;
    const M = Number(repaymentTime.monthlyPayment);

    const monthlyInterest = P * r;
    if (M <= monthlyInterest) {
      setRepaymentResults({ years: 0, months: 0, totalInterest: 0, calculated: false });
      return;
    }

    const numerator = -Math.log(1 - (r * P) / M);
    const denominator = Math.log(1 + r);
    const totalPayments = Math.ceil(numerator / denominator);

    const years = Math.floor(totalPayments / 12);
    const months = totalPayments % 12;
    const totalPaid = M * totalPayments;
    const totalInterest = totalPaid - P;

    setRepaymentResults({
      years,
      months,
      totalInterest,
      calculated: true,
    });
  }, [repaymentTime]);

  const handleContactChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  console.log("Form submitted!");
  setError(null);

  // Validate required fields
  if (!contact.name || !contact.email || !contact.message || !contact.verification) {
    setError("Please fill in all required fields.");
    console.log("Validation failed: Required fields missing");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contact.email)) {
    setError("Please enter a valid email address.");
    console.log("Validation failed: Invalid email");
    return;
  }

  // Verify the answer to 8 + 2
  const verificationAnswer = parseInt(contact.verification);
  console.log("Verification answer:", verificationAnswer);
  if (isNaN(verificationAnswer) || verificationAnswer !== 10) {
    setError("Please enter a valid number. The correct answer is 10.");
    console.log("Verification failed:", contact.verification);
    return;
  }

  // Prepare the form data to match your EmailJS template
  const formData = {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    loanType: contact.loanType,
    message: contact.message,
  };
  console.log("Form data:", formData);

  // Send the email using EmailJS
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
  const userId = import.meta.env.VITE_EMAILJS_USER_ID || "";
  console.log("EmailJS credentials:", { serviceId, templateId, userId });

  emailjs
  .send(serviceId, templateId, formData, userId)
  .then(
    (result) => {
      console.log("User email sent successfully:", result.text);
      setFormSubmitted(true); // Correct: Called in a function, not JSX
      setContact({
        name: "",
        email: "",
        phone: "",
        loanType: "Home Loan",
        message: "",
        verification: "",
      });
    },
    (error) => {
      console.error("Failed to send user email:", error.text);
      setError("Failed to send message. Please try again later.");
    }
  );

  }


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
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="h-5 w-5 mr-3 text-[#678E19]" />
                    <Label className="text-base font-medium">Loan Amount</Label>
                  </div>
                  <span className="text-[#678E19] font-bold text-lg">{fmt(loanAmount)}</span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={(v) => setLoanAmount(v[0])}
                  min={10000}
                  max={2000000}
                  step={1000}
                  className="[&>div]:h-2 [&>div>div]:h-2 [&>div>div>div]:h-4 [&>div>div>div]:w-4 [&>div>div>div]:bg-[#678E19] [&>div]:bg-gray-200"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$10,000</span>
                  <span>$2,000,000</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-700">
                    <Percent className="h-5 w-5 mr-3 text-[#678E19]" />
                    <Label className="text-base font-medium">Interest Rate</Label>
                  </div>
                  <span className="text-[#678E19] font-bold text-lg">{interestRate.toFixed(1)}%</span>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={(v) => setInterestRate(v[0])}
                  min={1}
                  max={15}
                  step={0.1}
                  className="[&>div]:h-2 [&>div>div]:h-2 [&>div>div>div]:h-4 [&>div>div>div]:w-4 [&>div>div>div]:bg-[#678E19] [&>div]:bg-gray-200"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1%</span>
                  <span>15%</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-3 text-[#678E19]" />
                    <Label className="text-base font-medium">Loan Term</Label>
                  </div>
                  <span className="text-[#678E19] font-bold text-lg">{loanTerm} Years</span>
                </div>
                <Slider
                  value={[loanTerm]}
                  onValueChange={(v) => setLoanTerm(v[0])}
                  min={1}
                  max={30}
                  step={1}
                  className="[&>div]:h-2 [&>div>div]:h-2 [&>div>div>div]:h-4 [&>div>div>div]:w-4 [&>div>div>div]:bg-[#678E19] [&>div]:bg-gray-200"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>
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

      case "loan-comparison": {
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
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Loan 1</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-700">Loan Amount ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 250000"
                        value={loan1.amount}
                        onChange={(e) => setLoan1({ ...loan1, amount: e.target.value })}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Loan Term (Years)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 30"
                        value={loan1.term}
                        onChange={(e) => setLoan1({ ...loan1, term: e.target.value })}
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
                        onChange={(e) => setLoan1({ ...loan1, introRate: e.target.value })}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Introductory Period (Months)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 24"
                        value={loan1.introPeriod}
                        onChange={(e) => setLoan1({ ...loan1, introPeriod: e.target.value })}
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
                        onChange={(e) => setLoan1({ ...loan1, ongoingRate: e.target.value })}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Upfront Fee ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 500"
                        value={loan1.upfrontFee}
                        onChange={(e) => setLoan1({ ...loan1, upfrontFee: e.target.value })}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Monthly Fee ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 10"
                        value={loan1.monthlyFee}
                        onChange={(e) => setLoan1({ ...loan1, monthlyFee: e.target.value })}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Loan 2</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-700">Loan Amount ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 250000"
                        value={loan2.amount}
                        onChange={(e) => setLoan2({ ...loan2, amount: e.target.value })}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Loan Term (Years)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 30"
                        value={loan2.term}
                        onChange={(e) => setLoan2({ ...loan2, term: e.target.value })}
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
                        onChange={(e) => setLoan2({ ...loan2, introRate: e.target.value })}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Introductory Period (Months)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 24"
                        value={loan2.introPeriod}
                        onChange={(e) => setLoan2({ ...loan2, introPeriod: e.target.value })}
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
                        onChange={(e) => setLoan2({ ...loan2, ongoingRate: e.target.value })}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Upfront Fee ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 500"
                        value={loan2.upfrontFee}
                        onChange={(e) => setLoan2({ ...loan2, upfrontFee: e.target.value })}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700">Monthly Fee ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 10"
                        value={loan2.monthlyFee}
                        onChange={(e) => setLoan2({ ...loan2, monthlyFee: e.target.value })}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-600 mb-4">Comparison Results</h3>
                {loan1Results.totalCost > 0 && loan2Results.totalCost > 0 ? (
                  <>
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
                  </>
                ) : (
                  <p className="text-center text-gray-500">Enter valid details for both loans to compare</p>
                )}
              </div>
            </CardContent>
          </>
        );
      }

      case "extra-repayment": {
        const monthlyInterest = Number(extraRepayment.loanAmount) * (Number(extraRepayment.interestRate) / 100 / 12);
        const monthlyPayment =
          Number(extraRepayment.loanAmount) *
          ((Number(extraRepayment.interestRate) / 100 / 12) *
            Math.pow(1 + Number(extraRepayment.interestRate) / 100 / 12, Number(extraRepayment.loanTerm) * 12)) /
          (Math.pow(1 + Number(extraRepayment.interestRate) / 100 / 12, Number(extraRepayment.loanTerm) * 12) - 1) || 0;
        const isPaymentTooLow =
          monthlyPayment + Number(extraRepayment.extraMonthlyPayment) <= monthlyInterest &&
          Number(extraRepayment.extraMonthlyPayment) > 0;

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
                    onChange={(e) => setExtraRepayment({ ...extraRepayment, loanAmount: e.target.value })}
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
                    onChange={(e) => setExtraRepayment({ ...extraRepayment, interestRate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Loan Term (Years)</Label>
                  <input
                    type="number"
                    placeholder="e.g., 30"
                    value={extraRepayment.loanTerm}
                    onChange={(e) => setExtraRepayment({ ...extraRepayment, loanTerm: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-4 block">Payment Frequency</Label>
                  <div className="flex rounded-lg overflow-hidden border border-gray-300">
                    {["monthly", "fortnightly", "weekly"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setExtraRepayment({ ...extraRepayment, paymentFrequency: f })}
                        className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
                          extraRepayment.paymentFrequency === f
                            ? "bg-[#678E19] text-white"
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
                    placeholder="e.g., 0"
                    value={extraRepayment.startAfter}
                    onChange={(e) => setExtraRepayment({ ...extraRepayment, startAfter: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Extra Monthly Repayment ($)</Label>
                  <input
                    type="number"
                    placeholder="e.g., 200"
                    value={extraRepayment.extraMonthlyPayment}
                    onChange={(e) => setExtraRepayment({ ...extraRepayment, extraMonthlyPayment: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                  {isPaymentTooLow && (
                    <p className="text-red-600 text-sm mt-1">
                      Total payment must be higher than {fmt(monthlyInterest)} to cover interest
                    </p>
                  )}
                </div>
                <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Results</h3>
                  {extraRepaymentResults.calculated && !isPaymentTooLow ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-gray-600 text-sm mb-2">Original Loan Term</p>
                          <p className="text-[#678E19] text-xl font-bold">{extraRepaymentResults.originalTerm} Years</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600 text-sm mb-2">New Loan Term</p>
                          <p className="text-[#678E19] text-xl font-bold">{extraRepaymentResults.newTerm.toFixed(1)} Years</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 text-sm mb-2">Interest Saved</p>
                        <p className="text-[#678E19] text-xl font-bold">{fmt(extraRepaymentResults.interestSaved)}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">
                      {isPaymentTooLow ? "Payment too low to repay loan" : "Enter valid details to calculate"}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </>
        );
      }

      case "mortgage-switching": {
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
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Loan Details</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Loan Amount ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 300000"
                        value={currentLoan.amount}
                        onChange={(e) => setCurrentLoan({ ...currentLoan, amount: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Current Interest Rate (%)</Label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 6.0"
                        value={currentLoan.currentRate}
                        onChange={(e) => setCurrentLoan({ ...currentLoan, currentRate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Loan Term (Years)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 25"
                        value={currentLoan.term}
                        onChange={(e) => setCurrentLoan({ ...currentLoan, term: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Regular Loan Fee ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 10"
                        value={currentLoan.regularFee}
                        onChange={(e) => setCurrentLoan({ ...currentLoan, regularFee: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Final Payout Fee ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 300"
                        value={currentLoan.finalPayoutFee}
                        onChange={(e) => setCurrentLoan({ ...currentLoan, finalPayoutFee: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">New Refinance Loan Details</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Introductory Term (Years)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 2"
                        value={newLoan.introTerm}
                        onChange={(e) => setNewLoan({ ...newLoan, introTerm: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Introductory Interest Rate (%)</Label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 4.5"
                        value={newLoan.introRate}
                        onChange={(e) => setNewLoan({ ...newLoan, introRate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Revert to Standard Rate (%)</Label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 5.5"
                        value={newLoan.revertRate}
                        onChange={(e) => setNewLoan({ ...newLoan, revertRate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">New Loan Regular Fee ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 8"
                        value={newLoan.regularFee}
                        onChange={(e) => setNewLoan({ ...newLoan, regularFee: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-700 mb-1 block">Upfront Refinancing Fees ($)</Label>
                      <input
                        type="number"
                        placeholder="e.g., 600"
                        value={newLoan.upfrontFees}
                        onChange={(e) => setNewLoan({ ...newLoan, upfrontFees: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Refinancing Results</h3>
                  {switchingResults.calculated ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-gray-600 text-sm mb-2">Current Loan Total Cost</p>
                          <p className="text-[#678E19] text-xl font-bold">{fmt(switchingResults.currentCost)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600 text-sm mb-2">New Loan Total Cost</p>
                          <p className="text-[#678E19] text-xl font-bold">{fmt(switchingResults.newCost)}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 text-sm mb-2">Potential Savings</p>
                        <p className="text-[#678E19] text-xl font-bold">{fmt(switchingResults.savings)}</p>
                        <p className="text-sm mt-2">
                          {switchingResults.savings > 0
                            ? `Refinancing could save you ${fmt(switchingResults.savings)}`
                            : switchingResults.savings < 0
                            ? `Refinancing would cost an additional ${fmt(Math.abs(switchingResults.savings))}`
                            : "No cost difference"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">Enter valid details to calculate</p>
                  )}
                </div>
              </div>
            </CardContent>
          </>
        );
      }

      case "interest-only": {
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
                      onChange={(e) => setInterestOnly({ ...interestOnly, loanAmount: e.target.value })}
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
                    onChange={(e) => setInterestOnly({ ...interestOnly, interestRate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-4 block">Payment Frequency</Label>
                  <div className="flex rounded-lg overflow-hidden border border-gray-300">
                    {["monthly", "fortnightly", "weekly"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setInterestOnly({ ...interestOnly, paymentFrequency: f })}
                        className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
                          interestOnly.paymentFrequency === f
                            ? "bg-[#678E19] text-white"
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
                    onChange={(e) => setInterestOnly({ ...interestOnly, interestOnlyPeriod: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Total Loan Term (Years)</Label>
                  <input
                    type="number"
                    placeholder="e.g., 30"
                    value={interestOnly.totalLoanTerm}
                    onChange={(e) => setInterestOnly({ ...interestOnly, totalLoanTerm: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-600 mb-6">Payment Comparison</h3>
                  {ioResults.interestOnlyPayment > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <p className="text-gray-600 text-sm mb-2">Monthly Interest Only Payment</p>
                        <p className="text-[#678E19] text-2xl font-bold">{fmt(ioResults.interestOnlyPayment)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 text-sm mb-2">Monthly Principal & Interest Payment</p>
                        <p className="text-[#678E19] text-2xl font-bold">{fmt(ioResults.principalInterestPayment)}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">Enter valid details to calculate</p>
                  )}
                </div>
              </div>
            </CardContent>
          </>
        );
      }

      case "borrowing-power": {
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
                      value={borrowingPower.annualIncome}
                      onChange={(e) => setBorrowingPower({ ...borrowingPower, annualIncome: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium text-gray-700 mb-2 block">Monthly Expenses ($)</Label>
                    <input
                      type="number"
                      placeholder="e.g., 3000"
                      value={borrowingPower.monthlyExpenses}
                      onChange={(e) => setBorrowingPower({ ...borrowingPower, monthlyExpenses: e.target.value })}
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
                      value={borrowingPower.interestRate}
                      onChange={(e) => setBorrowingPower({ ...borrowingPower, interestRate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium text-gray-700 mb-2 block">Loan Term (Years)</Label>
                    <input
                      type="number"
                      placeholder="e.g., 30"
                      value={borrowingPower.loanTerm}
                      onChange={(e) => setBorrowingPower({ ...borrowingPower, loanTerm: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Deposit Amount ($)</Label>
                  <input
                    type="number"
                    placeholder="e.g., 50000"
                    value={borrowingPower.deposit}
                    onChange={(e) => setBorrowingPower({ ...borrowingPower, deposit: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                <div className="mt-6 p-6 bg-gray-50 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Borrowing Power</h3>
                  {borrowingResults.calculated ? (
                    <div>
                      <p className="text-gray-600 text-sm mb-2">Estimated Borrowing Power</p>
                      <p className="text-[#678E19] text-3xl font-bold">{fmt(borrowingResults.borrowingPower)}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Enter valid details to calculate</p>
                  )}
                </div>
              </div>
            </CardContent>
          </>
        );
      }

      case "repayment-time": {
        const monthlyInterest = Number(repaymentTime.currentBalance) * (Number(repaymentTime.interestRate) / 100 / 12);
        const isPaymentTooLow = Number(repaymentTime.monthlyPayment) <= monthlyInterest && Number(repaymentTime.monthlyPayment) > 0;

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
                    value={repaymentTime.currentBalance}
                    onChange={(e) => setRepaymentTime({ ...repaymentTime, currentBalance: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Interest Rate (%)</Label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 5.5"
                    value={repaymentTime.interestRate}
                    onChange={(e) => setRepaymentTime({ ...repaymentTime, interestRate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-700 mb-2 block">Monthly Payment ($)</Label>
                  <input
                    type="number"
                    placeholder="e.g., 2500"
                    value={repaymentTime.monthlyPayment}
                    onChange={(e) => setRepaymentTime({ ...repaymentTime, monthlyPayment: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                  />
                  {isPaymentTooLow && (
                    <p className="text-red-600 text-sm mt-1">
                      Monthly payment must be higher than {fmt(monthlyInterest)} to cover interest
                    </p>
                  )}
                </div>
                <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">Results</h3>
                  {repaymentResults.calculated && !isPaymentTooLow ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-gray-600 text-sm mb-2">Time to Pay Off Loan</p>
                        <p className="text-[#678E19] text-3xl font-bold">
                          {repaymentResults.years} Years, {repaymentResults.months} Months
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-gray-600 text-sm">Total Interest Paid</p>
                          <p className="text-[#678E19] text-xl font-bold">{fmt(repaymentResults.totalInterest)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600 text-sm">Total Amount Paid</p>
                          <p className="text-[#678E19] text-xl font-bold">
                            {fmt(Number(repaymentTime.currentBalance) + repaymentResults.totalInterest)}
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-blue-800 text-sm">
                          Monthly Interest: {fmt(monthlyInterest)} | Principal Payment: {fmt(Number(repaymentTime.monthlyPayment) - monthlyInterest)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">
                      {isPaymentTooLow ? "Payment too low to repay loan" : "Enter valid details to calculate"}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </>
        );
      }

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

  return (
    <div className="min-h-screen bg-[#E6F2FE]">
      <Navbar />
      <section className="bg-[#678E19] text-white py-12 mb-12">
        <div className="max-w-[1600px] mx-auto text-center px-8">
          <h1 className="text-4xl font-bold mb-3">Loan Calculators</h1>
          <p className="text-lg">
            Estimate your repayments, compare options, and plan your borrowing.
          </p>
        </div>
      </section>
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-8 mb-16">
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
                    className={`text-sm ${isActive ? "text-[#678E19] font-medium" : "text-gray-700"}`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <div className="space-y-8 col-span-6">
          <Card className="shadow-lg">{renderCalculator()}</Card>
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
                      <p className="text-[#678E19] text-lg font-bold">{fmt(it.value)}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-bold text-gray-800 mb-3 text-sm">Payment Comparison</p>
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
        <Card className="shadow-lg col-span-3 h-fit">
          <CardHeader className="bg-[#678E19] py-4">
            <CardTitle className="text-white text-lg font-semibold">Need More Details?</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {formSubmitted ? (
              <div className="text-center">
              <h3 className="text-lg font-semibold text-[#678E19] mb-2">
                Thank You, {contact.name}!
              </h3>
                <p className="text-gray-600 text-sm mb-4">
              Your message has been sent successfully. We’ll get back to you soon.
              </p>
              <Button
                onClick={() => setFormSubmitted(false)}
                className="bg-[#EDA208] hover:bg-[#d39a07] text-black py-2 text-sm font-semibold rounded"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
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
                  <Label className="text-gray-700 text-sm mb-1 block">Verification: What is 8 + 2? *</Label>
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
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};


export default Calculator;

import { useState, useEffect, FormEvent, FC } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon, DollarSign, Percent, Calendar } from "lucide-react";

const LoanCalculator: FC = () => {
  const [activeCalculator, setActiveCalculator] = useState("loan-repayment");
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

  useEffect(() => {
    const p = loanAmount;
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;
    const monthly =
      p * (r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);
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

  const fmt = (amt: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amt);

  const menu = [
    { id: "loan-repayment", label: "Loan Repayment Calculator" },
    { id: "loan-comparison", label: "Loan Comparison Calculator" },
  ];

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "Home Loan",
    message: "",
    verification: "",
  });
  const [error, setError] = useState<string | null>(null);

  const onChangeContact = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmitContact = (e: FormEvent) => {
    e.preventDefault();
    if (parseInt(contact.verification) !== 10) {
      setError("Incorrect sum");
      return;
    }
    alert("Message sent!");
    setContact({
      name: "",
      email: "",
      phone: "",
      loanType: "Home Loan",
      message: "",
      verification: "",
    });
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#E6F2FE]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#678E19] text-white py-8 mb-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-3xl font-semibold text-white">Loan Calculators</h1>
          <p className="mt-2 text-green-100">Estimate repayments, compare options, plan borrowing.</p>
        </div>
      </section>

      {/* 1/3/1 grid */}
      <div className="calculator-grid mb-12">
        {/* Sidebar */}
        <div className="calculator-sidebar">
          <div className="calculator-sidebar-header">
            <h2 className="font-semibold text-white">Choose Calculator</h2>
          </div>
          {menu.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveCalculator(item.id)}
              className={`calculator-menu-item ${
                activeCalculator === item.id ? "active" : ""
              }`}
            >
              <CalcIcon className="h-5 w-5 text-[#678E19] mr-2" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main Calculator */}
        <Card className="calculator-panel">
          <CardHeader>
            <CardTitle className="text-[#678E19] text-xl">
              Loan Repayment Calculator
            </CardTitle>
            <p className="text-gray-600">
              Calculate repayments based on amount, rate, and term.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Loan Amount */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center text-gray-700">
                  <DollarSign className="h-5 w-5 text-[#678E19] mr-2" />
                  <Label>Loan Amount</Label>
                </div>
                <span className="text-[#678E19] font-semibold">
                  {fmt(loanAmount)}
                </span>
              </div>
              <Slider
                value={[loanAmount]}
                onValueChange={(v) => setLoanAmount(v[0])}
                min={10000}
                max={2000000}
                step={1000}
                className="calculator-slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>$10K</span>
                <span>$2M</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center text-gray-700">
                  <Percent className="h-5 w-5 text-[#678E19] mr-2" />
                  <Label>Interest Rate</Label>
                </div>
                <span className="text-[#678E19] font-semibold">
                  {interestRate.toFixed(1)}%
                </span>
              </div>
              <Slider
                value={[interestRate]}
                onValueChange={(v) => setInterestRate(v[0])}
                min={1}
                max={15}
                step={0.1}
                className="calculator-slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Loan Term */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 text-[#678E19] mr-2" />
                  <Label>Loan Term</Label>
                </div>
                <span className="text-[#678E19] font-semibold">
                  {loanTerm} Years
                </span>
              </div>
              <Slider
                value={[loanTerm]}
                onValueChange={(v) => setLoanTerm(v[0])}
                min={1}
                max={30}
                step={1}
                className="calculator-slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 year</span>
                <span>30 years</span>
              </div>
            </div>

            {/* Payment Frequency */}
            <div className="mb-6">
              <Label className="text-gray-700 mb-2 block">Payment Frequency</Label>
              <div className="grid grid-cols-3 gap-2">
                {["weekly", "fortnightly", "monthly"].map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setPaymentFrequency(freq)}
                    className={`px-3 py-2 rounded text-sm capitalize transition-colors ${
                      paymentFrequency === freq
                        ? "bg-[#678E19] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="bg-[#678E19] text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Calculated Payment</h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#EDA208] mb-1">
                  {fmt(results.payment)}
                </div>
                <div className="text-sm opacity-90 capitalize">
                  {paymentFrequency} Payment
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <div className="opacity-75">Total Interest</div>
                  <div className="font-semibold">{fmt(results.totalInterest)}</div>
                </div>
                <div>
                  <div className="opacity-75">Total Payment</div>
                  <div className="font-semibold">{fmt(results.totalPayment)}</div>
                </div>
              </div>
            </div>

            <Button className="w-full bg-[#EDA208] hover:bg-[#EDA208]/90 text-black font-semibold py-3">
              Explore More Financial Calculators
            </Button>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="calculator-panel">
          <CardHeader className="calculator-sidebar-header">
            <h2 className="text-white font-semibold">Need More Details?</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmitContact} className="space-y-4">
              <div>
                <Label className="text-gray-700">Name *</Label>
                <input
                  name="name"
                  value={contact.name}
                  onChange={onChangeContact}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <Label className="text-gray-700">Email *</Label>
                <input
                  type="email"
                  name="email"
                  value={contact.email}
                  onChange={onChangeContact}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <Label className="text-gray-700">Phone</Label>
                <input
                  name="phone"
                  value={contact.phone}
                  onChange={onChangeContact}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <Label className="text-gray-700">Loan Type</Label>
                <select
                  name="loanType"
                  value={contact.loanType}
                  onChange={onChangeContact}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option>Home Loan</option>
                  <option>Car Loan</option>
                  <option>Personal Loan</option>
                  <option>Business Loan</option>
                </select>
              </div>
              <div>
                <Label className="text-gray-700">Message</Label>
                <textarea
                  name="message"
                  value={contact.message}
                  onChange={onChangeContact}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <Label className="text-gray-700">Verification: What is 8 + 2? *</Label>
                <input
                  name="verification"
                  value={contact.verification}
                  onChange={onChangeContact}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-[#EDA208] hover:bg-[#EDA208]/90 text-black font-semibold py-2"
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

export default LoanCalculator;

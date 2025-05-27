import { useState, useEffect, FormEvent, FC } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
    // add more if needed
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
      <section className="bg-[var(--brand-green)] text-white py-8 mb-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-3xl font-semibold">Loan Calculators</h1>
          <p className="mt-2">Estimate repayments, compare options, plan borrowing.</p>
        </div>
      </section>

      {/* 1/3/1 grid */}
      <div className="calculator-grid mb-12">
        {/* Sidebar */}
        <div className="calculator-sidebar">
          <div className="calculator-sidebar-header">
            <h2 className="font-semibold">Choose Calculator</h2>
          </div>
          {menu.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveCalculator(item.id)}
              className={`calculator-menu-item ${
                activeCalculator === item.id ? "active" : ""
              }`}
            >
              <CalcIcon className="h-5 w-5 text-[var(--brand-green)] mr-2" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main Calculator */}
        <Card className="calculator-panel">
          <CardHeader>
            <CardTitle className="text-[var(--brand-green)] text-xl">
              Loan Repayment Calculator
            </CardTitle>
            <p className="text-gray-600">
              Calculate repayments based on amount, rate, and term.
            </p>
          </CardHeader>
          <CardContent>
            {/* Loan Amount */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center text-gray-700">
                  <DollarSign className="h-5 w-5 text-[var(--brand-green)] mr-2" />
                  <Label>Loan Amount</Label>
                </div>
                <span className="text-[var(--brand-green)] font-semibold">
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
              </div>
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
                <Label>Name *</Label>
                <input
                  name="name"
                  onChange={onChangeContact}
                  className="mt-1 block w-full rounded-md border-gray-300"
                  required
                />
              </div>
              <div>
                <Label>Email *</Label>
                <input
                  type="email"
                  name="email"
                  onChange={onChangeContact}
                  className="mt-1 block w-full rounded-md border-gray-300"
                  required
                />
              </div>
              <div>
                <Label>Phone</Label>
                <input
                  name="phone"
                  onChange={onChangeContact}
                  className="mt-1 block w-full rounded-md border-gray-300"
                />
              </div>
              <div>
                <Label>Verification: What is 8 + 2? *</Label>
                <input
                  name="verification"
                  onChange={onChangeContact}
                  className="mt-1 block w-full rounded-md border-gray-300"
                  required
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <button
                type="submit"
                className="btn-brand-yellow w-full py-2 rounded"
              >
                Send Message
              </button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default LoanCalculator;

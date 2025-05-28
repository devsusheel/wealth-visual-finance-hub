
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, Home, DollarSign, FileText, Clock, Phone, Mail } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      icon: Home,
      title: "Home Loans",
      color: "from-blue-600 to-cyan-500",
      questions: [
        {
          question: "What deposit do I need to buy a home?",
          answer: "Generally, you'll need at least a 5% deposit, but having 20% or more helps you avoid Lenders Mortgage Insurance (LMI). Some first home buyer schemes allow deposits as low as 2%. We can help you understand what options are available based on your situation."
        },
        {
          question: "How much can I borrow for a home loan?",
          answer: "Your borrowing capacity depends on your income, expenses, deposit, and credit history. Most lenders will allow you to borrow up to 6-8 times your annual income, but this varies. Use our borrowing power calculator or speak with our brokers for a personalized assessment."
        },
        {
          question: "What's the difference between fixed and variable rates?",
          answer: "Fixed rates stay the same for a set period (typically 1-5 years), providing payment certainty. Variable rates can change with market conditions, potentially going up or down. Many borrowers choose a split loan with both fixed and variable portions."
        },
        {
          question: "How long does the home loan approval process take?",
          answer: "Pre-approval typically takes 1-3 business days, while full approval can take 1-2 weeks after you've found a property. The timeline depends on the lender, your financial situation, and how quickly you provide required documents."
        }
      ]
    },
    {
      icon: DollarSign,
      title: "Rates & Fees",
      color: "from-green-600 to-emerald-500",
      questions: [
        {
          question: "What fees should I expect when getting a home loan?",
          answer: "Common fees include application fees ($300-$600), valuation fees ($300-$600), settlement fees ($150-$300), and legal fees ($800-$1,500). Some lenders waive application fees for competitive packages. We'll provide a full breakdown of all costs upfront."
        },
        {
          question: "What is Lenders Mortgage Insurance (LMI)?",
          answer: "LMI protects the lender if you default on your loan. It's typically required when borrowing more than 80% of the property value. LMI can cost thousands but can be added to your loan. Some professions qualify for LMI waivers even with smaller deposits."
        },
        {
          question: "How often do interest rates change?",
          answer: "Variable rates can change at any time, though most lenders only adjust them monthly. Fixed rates are set when you take the loan but can change for new applications. We monitor rate movements and can advise when it might be beneficial to switch."
        },
        {
          question: "Can I negotiate my interest rate?",
          answer: "Yes! Interest rates are often negotiable, especially if you have a strong financial position, large deposit, or are bringing multiple products to the lender. As mortgage brokers, we can negotiate on your behalf to secure better rates."
        }
      ]
    },
    {
      icon: FileText,
      title: "Application Process",
      color: "from-purple-600 to-indigo-500",
      questions: [
        {
          question: "What documents do I need for a home loan application?",
          answer: "You'll typically need: payslips (last 2-3), tax returns (2 years), bank statements (3 months), employment contracts, identification documents, and details of assets/liabilities. Self-employed applicants need additional documentation including BAS statements and accountant-prepared financials."
        },
        {
          question: "Can I get a home loan if I'm self-employed?",
          answer: "Yes! Self-employed borrowers have many options, including low-doc loans and alternative documentation loans. You'll typically need 1-2 years of business financials and may face different criteria. We specialize in self-employed lending and can help navigate these options."
        },
        {
          question: "What happens if my application is declined?",
          answer: "Don't worry - a decline from one lender doesn't mean all will decline. Different lenders have different criteria. We'll review why it was declined, address any issues, and approach other suitable lenders. Often, it's about finding the right lender for your situation."
        },
        {
          question: "Do I need to use a mortgage broker?",
          answer: "While not required, brokers offer several advantages: access to multiple lenders, expert guidance, negotiation power, and ongoing support. Our services are typically free to you as we're paid by the lender. We can often secure better deals than going direct."
        }
      ]
    },
    {
      icon: Clock,
      title: "Refinancing",
      color: "from-orange-600 to-red-500",
      questions: [
        {
          question: "When should I consider refinancing?",
          answer: "Consider refinancing if: rates have dropped 0.5%+ below your current rate, your circumstances have improved, you want to access equity, or you're unhappy with your current lender's service. We can run a cost-benefit analysis to determine if it's worthwhile."
        },
        {
          question: "What costs are involved in refinancing?",
          answer: "Refinancing costs typically include: discharge fees ($150-$400), application fees ($0-$600), valuation fees ($300-$600), legal fees ($800-$1,500), and possible LMI if borrowing more. We'll calculate if the savings outweigh these costs."
        },
        {
          question: "How long does refinancing take?",
          answer: "Refinancing typically takes 2-6 weeks from application to settlement. This includes loan processing, valuation, legal work, and settlement coordination. We'll manage the entire process to ensure a smooth transition between lenders."
        },
        {
          question: "Can I refinance if my property has decreased in value?",
          answer: "It depends on your current loan-to-value ratio and equity position. If your property has declined but you still have equity, refinancing may be possible. We can assess your situation and find lenders willing to work with your circumstances."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Find answers to common questions about mortgages, home loans, and our services. 
              Can't find what you're looking for? Our experts are here to help.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg bg-white text-gray-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try different search terms or browse our categories below.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <Card className="overflow-hidden">
                    <div className={`h-1 bg-gradient-to-r ${category.color}`}></div>
                    <CardHeader className="bg-white">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                          <category.icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-2xl text-gray-900">{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="bg-white p-0">
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, index) => (
                          <AccordionItem key={index} value={`${categoryIndex}-${index}`} className="px-6">
                            <AccordionTrigger className="text-left text-lg font-medium py-6 hover:text-blue-600">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 pb-6">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Our mortgage experts are here to help you with personalized advice and answers to your specific questions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-center space-x-3 p-4 bg-blue-700 rounded-lg">
                  <Phone className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Call Us</div>
                    <div className="text-blue-200">1800 FINANCE</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3 p-4 bg-blue-700 rounded-lg">
                  <Mail className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Email Us</div>
                    <div className="text-blue-200">help@financehub.com</div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                  Book a Free Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Tips</h2>
            <p className="text-lg text-gray-600">Essential advice for home loan success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="font-semibold mb-2">Save for a Bigger Deposit</h3>
                <p className="text-sm text-gray-600">A larger deposit means better rates and no LMI</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold mb-2">Check Your Credit Score</h3>
                <p className="text-sm text-gray-600">A good credit score opens more loan options</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="font-semibold mb-2">Get Pre-Approved</h3>
                <p className="text-sm text-gray-600">Know your budget before you start shopping</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-semibold mb-2">Use a Broker</h3>
                <p className="text-sm text-gray-600">Access to more lenders and better deals</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;

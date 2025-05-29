
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
      color: "from-[#678E19] to-green-500",
      questions: [
        {
          question: "What deposit do I need to buy a home?",
          answer: "Generally, you'll need at least a 5% deposit, but having 20% or more helps you avoid Lenders Mortgage Insurance (LMI). Some first home buyer schemes allow deposits as low as 2%."
        },
        {
          question: "How much can I borrow for a home loan?",
          answer: "Your borrowing capacity depends on your income, expenses, deposit, and credit history. Most lenders will allow you to borrow up to 6-8 times your annual income."
        },
        {
          question: "What's the difference between fixed and variable rates?",
          answer: "Fixed rates stay the same for a set period (typically 1-5 years), providing payment certainty. Variable rates can change with market conditions."
        }
      ]
    },
    {
      icon: DollarSign,
      title: "Rates & Fees",
      color: "from-[#EDA208] to-yellow-500",
      questions: [
        {
          question: "What fees should I expect when getting a home loan?",
          answer: "Common fees include application fees ($300-$600), valuation fees ($300-$600), settlement fees ($150-$300), and legal fees ($800-$1,500)."
        },
        {
          question: "What is Lenders Mortgage Insurance (LMI)?",
          answer: "LMI protects the lender if you default on your loan. It's typically required when borrowing more than 80% of the property value."
        },
        {
          question: "Can I negotiate my interest rate?",
          answer: "Yes! Interest rates are often negotiable, especially if you have a strong financial position. We can negotiate on your behalf to secure better rates."
        }
      ]
    },
    {
      icon: FileText,
      title: "Application Process",
      color: "from-green-600 to-[#678E19]",
      questions: [
        {
          question: "What documents do I need for a home loan application?",
          answer: "You'll typically need: payslips (last 2-3), tax returns (2 years), bank statements (3 months), employment contracts, and identification documents."
        },
        {
          question: "Can I get a home loan if I'm self-employed?",
          answer: "Yes! Self-employed borrowers have many options, including low-doc loans. You'll typically need 1-2 years of business financials."
        },
        {
          question: "What happens if my application is declined?",
          answer: "A decline from one lender doesn't mean all will decline. We'll review why it was declined and approach other suitable lenders."
        }
      ]
    },
    {
      icon: Clock,
      title: "Refinancing",
      color: "from-yellow-600 to-[#EDA208]",
      questions: [
        {
          question: "When should I consider refinancing?",
          answer: "Consider refinancing if rates have dropped 0.5%+ below your current rate, your circumstances have improved, or you want to access equity."
        },
        {
          question: "What costs are involved in refinancing?",
          answer: "Refinancing costs include discharge fees ($150-$400), application fees ($0-$600), valuation fees ($300-$600), and legal fees ($800-$1,500)."
        },
        {
          question: "How long does refinancing take?",
          answer: "Refinancing typically takes 2-6 weeks from application to settlement, including loan processing, valuation, and legal work."
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
      <section className="bg-gradient-to-br from-[#678E19] via-green-700 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="h-16 w-16 text-brand-yellow mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">Frequently Asked Questions</h1>
            <p className="text-xl text-white max-w-3xl mx-auto mb-8 leading-relaxed drop-shadow-md">
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
            <div className="space-y-8">
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
                            <AccordionTrigger className="text-left text-lg font-medium py-6 hover:text-[#678E19]">
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
          <Card className="bg-gradient-to-r from-[#678E19] to-green-600 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-xl text-green-100 mb-8">
                Our mortgage experts are here to help you with personalized advice and answers to your specific questions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center justify-center space-x-3 p-4 bg-green-700 rounded-lg">
                  <Phone className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Call Us</div>
                    <div className="text-green-200">1800 FINANCE</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3 p-4 bg-green-700 rounded-lg">
                  <Mail className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Email Us</div>
                    <div className="text-green-200">help@financehub.com</div>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-brand-yellow hover:bg-yellow-600 text-black px-8 py-3 font-semibold">
                Book a Free Consultation
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;

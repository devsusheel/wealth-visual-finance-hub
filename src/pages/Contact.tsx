import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, MessageSquare, Calendar, Users, CheckCircle, Calculator } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", loanType: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "1800 FINANCE"],
      color: "from-blue-600 to-cyan-500"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@financehub.com", "support@financehub.com"],
      color: "from-green-600 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Finance Street", "New York, NY 10001"],
      color: "from-purple-600 to-indigo-500"
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 8AM-6PM", "Sat: 9AM-3PM"],
      color: "from-orange-600 to-red-500"
    }
  ];

  const services = [
    {
      icon: Users,
      title: "Free Consultation",
      description: "Get expert advice tailored to your financial situation"
    },
    {
      icon: Calculator,
      title: "Loan Pre-Approval",
      description: "Fast pre-approval to strengthen your property offers"
    },
    {
      icon: MessageSquare,
      title: "Ongoing Support",
      description: "Dedicated support throughout your loan journey"
    },
    {
      icon: Calendar,
      title: "Flexible Appointments",
      description: "Meet at our office, your home, or online"
    }
  ];

  const testimonials = [
    {
      name: "Jennifer Wu",
      role: "First Home Buyer",
      content: "The team at FinanceHub made buying our first home stress-free. Their expertise saved us thousands!"
    },
    {
      name: "Robert Martinez",
      role: "Property Investor",
      content: "Professional service and competitive rates. They've helped me finance multiple investment properties."
    },
    {
      name: "Lisa Thompson",
      role: "Refinancing Customer",
      content: "Excellent communication throughout the refinancing process. Highly recommend their services!"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ready to take the next step? Our mortgage experts are here to help you 
              achieve your property goals with personalized advice and competitive rates.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 mb-1">{detail}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <Card>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="loanType">Loan Type</Label>
                        <Select value={formData.loanType} onValueChange={(value) => setFormData({ ...formData, loanType: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select a loan type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="home-loan">Home Loan</SelectItem>
                            <SelectItem value="refinancing">Refinancing</SelectItem>
                            <SelectItem value="investment">Investment Property</SelectItem>
                            <SelectItem value="commercial">Commercial Loan</SelectItem>
                            <SelectItem value="car-loan">Car Loan</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="mt-1"
                        placeholder="Tell us about your financing needs..."
                      />
                    </div>

                    <div className="text-sm text-gray-500">
                      <p>* Required fields</p>
                      <p>By submitting this form, you agree to our privacy policy and terms of service.</p>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 py-3">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Services & Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Can Help</h2>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <service.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Contact CTA */}
              <Card className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                  <p className="text-cyan-100 mb-6">
                    Speak with one of our mortgage experts right now. 
                    We're here to answer your questions and get you started.
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                      Call Now: 1800 FINANCE
                    </Button>
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600">
                      Book Online Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">Real feedback from real customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-green-600 font-medium">Verified Customer</span>
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
            <p className="text-lg text-gray-600">We'd love to meet you in person</p>
          </div>
          <Card className="overflow-hidden">
            <div className="h-96 bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">FinanceHub Office</h3>
                <p className="text-gray-600">123 Finance Street, New York, NY 10001</p>
                <p className="text-sm text-gray-500 mt-2">Free parking available</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

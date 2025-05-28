import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, Shield, Heart, Target, Eye, CheckCircle } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Integrity",
      description: "We build lasting relationships through honest, transparent communication and ethical business practices."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Every decision we make is guided by what's best for our customers and their financial wellbeing."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from customer service to finding the best loan solutions."
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "Our collaborative approach ensures you benefit from our collective expertise and experience."
    }
  ];

  const stats = [
    { number: "$2.5B+", label: "Loans Processed" },
    { number: "12,000+", label: "Happy Customers" },
    { number: "15+", label: "Years Experience" },
    { number: "4.9/5", label: "Customer Rating" }
  ];

  const team = [
    {
      name: "Sarah Mitchell",
      role: "Managing Director",
      experience: "15+ years",
      description: "Leading the team with extensive experience in mortgage broking and financial services."
    },
    {
      name: "Michael Johnson",
      role: "Senior Broker",
      experience: "12+ years",
      description: "Specializing in complex lending solutions and commercial finance arrangements."
    },
    {
      name: "Emily Chen",
      role: "First Home Buyer Specialist",
      experience: "8+ years",
      description: "Helping first home buyers navigate the property market with confidence."
    },
    {
      name: "David Rodriguez",
      role: "Investment Property Expert",
      experience: "10+ years",
      description: "Assisting investors build their property portfolios with strategic financing."
    }
  ];

  const achievements = [
    "Licensed Mortgage Broker (Credit License #123456)",
    "Member of Mortgage & Finance Association Australia",
    "Winner of Best Customer Service Award 2023",
    "Certified Financial Planning Professional",
    "Over $2.5 billion in successful loan settlements"
  ];

  return (
    <div className="min-h-screen bg-white text-black">

      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--brand-green)] via-[var(--brand-green)] to-[var(--brand-yellow)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About FinanceHub</h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              We're passionate about helping Australians achieve their property dreams through 
              expert mortgage advice and personalized financial solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-[var(--brand-yellow)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-black">
                <p>Founded in 2009, FinanceHub began with a simple mission: to make home financing accessible, transparent, and stress-free for every Australian family.</p>
                <p>What started as a small team of dedicated mortgage brokers has grown into one of Australia's most trusted financial services companies, helping over 12,000 families secure their dream homes.</p>
                <p>Today, we continue to innovate and evolve, leveraging technology and deep industry expertise to provide our customers with the best possible outcomes.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--brand-green)]/40 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-[var(--brand-yellow)]/20 rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-3xl font-bold text-[var(--brand-green)]">{stat.number}</div>
                      <div className="text-black">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[var(--brand-yellow)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* <Card className="bg-[var(--brand-green)] text-white"> */}

            <Card className="bg-white text-black border-2 border-[var(--brand-green)]">
               <CardHeader>
                <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 text-[var(--brand-green)]" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
                </CardHeader>
               <CardContent>

                <p className="text-lg">To empower Australians to achieve their property and financial goals through expert advice, innovative solutions, and exceptional service.</p>
              </CardContent>
            </Card>

            <Card className="bg-white text-black border-2 border-[var(--brand-yellow)]">
            <CardHeader>
            <div className="flex items-center space-x-3">
            <Eye className="h-8 w-8 text-[var(--brand-yellow)]" />
            <CardTitle className="text-2xl">Our Vision</CardTitle>
            </div>
            </CardHeader>
            <CardContent>
                <p className="text-lg text-black">To be Australia's most trusted and innovative mortgage broking company, making home ownership accessible to all Australians.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-[var(--brand-green)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Our Values</h2>
            <p className="text-xl text-black">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <Card key={idx} className="text-center bg-white hover:shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-[var(--brand-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-black">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-[var(--brand-yellow)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Meet Our Team</h2>
            <p className="text-xl text-black">Experienced professionals dedicated to your success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <Card key={idx} className="bg-white hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-[var(--brand-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-lg text-black">{member.name}</CardTitle>
                  <p className="text-[var(--brand-green)] font-medium">{member.role}</p>
                  <p className="text-sm text-black">{member.experience}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-black text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-[var(--brand-green)]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Our Achievements</h2>
            <p className="text-xl text-black">Recognition and credentials that demonstrate our expertise</p>
          </div>
          <Card className="bg-white">
            <CardContent className="pt-8">
              <ul className="space-y-4">
                {achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-[var(--brand-green)] flex-shrink-0" />
                    <span className="text-black">{ach}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[var(--brand-yellow)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Why Choose FinanceHub?</h2>
            <p className="text-xl text-black">The difference that makes us Australia's preferred mortgage broker</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg">
              <Shield className="h-12 w-12 text-[var(--brand-green)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-black">Fully Licensed & Insured</h3>
              <p className="text-black">Complete peace of mind with full licensing and professional indemnity insurance</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <Users className="h-12 w-12 text-[var(--brand-green)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-black">Personal Service</h3>
              <p className="text-black">Dedicated brokers who get to know you and your unique financial situation</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <Award className="h-12 w-12 text-[var(--brand-green)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-black">Award-Winning Service</h3>
              <p className="text-black">Recognized for excellence in customer service and industry innovation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--brand-green)]/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-black mb-4">Ready to Work With Us?</h2>
          <p className="text-xl text-black mb-8">Join thousands of satisfied customers who have trusted FinanceHub with their home financing needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-brand-green px-8 py-3">Get Started Today</Button>
            <Button size="lg" variant="outline" className="border-[var(--brand-green)] text-[var(--brand-green)] hover:bg-[var(--brand-green)]/10 px-8 py-3">Contact Our Team</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

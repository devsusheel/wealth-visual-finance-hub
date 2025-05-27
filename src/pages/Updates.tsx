
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, DollarSign, Home, Building2, ArrowRight, Clock } from "lucide-react";

const Updates = () => {
  const latestNews = [
    {
      category: "Interest Rates",
      title: "RBA Holds Cash Rate at 4.35% - What This Means for Your Mortgage",
      excerpt: "The Reserve Bank of Australia has maintained the cash rate at 4.35% in their latest meeting. We break down the implications for current and prospective homeowners.",
      date: "November 15, 2024",
      readTime: "5 min read",
      badge: "Hot",
      badgeColor: "bg-red-500"
    },
    {
      category: "First Home Buyers",
      title: "New Government Grants Available for First Home Buyers in 2024",
      excerpt: "Discover the latest government incentives and grants available to help first home buyers enter the property market with reduced deposits and stamp duty concessions.",
      date: "November 12, 2024",
      readTime: "7 min read",
      badge: "New",
      badgeColor: "bg-green-500"
    },
    {
      category: "Market Update",
      title: "Property Market Trends: Q4 2024 Analysis",
      excerpt: "Our comprehensive analysis of the current property market trends, including median prices, auction clearance rates, and regional variations across Australia.",
      date: "November 8, 2024",
      readTime: "10 min read",
      badge: "Trending",
      badgeColor: "bg-blue-500"
    }
  ];

  const marketUpdates = [
    {
      icon: TrendingUp,
      title: "Property Prices",
      value: "+2.3%",
      description: "National median house prices up 2.3% this quarter",
      trend: "up"
    },
    {
      icon: DollarSign,
      title: "Average Rate",
      value: "6.24%",
      description: "Current average variable mortgage rate",
      trend: "stable"
    },
    {
      icon: Home,
      title: "First Home Buyers",
      value: "32%",
      description: "Share of first home buyers in the market",
      trend: "up"
    },
    {
      icon: Building2,
      title: "Investment Loans",
      value: "28%",
      description: "Proportion of new investment property loans",
      trend: "down"
    }
  ];

  const recentArticles = [
    {
      title: "5 Tips for Getting Pre-Approved Faster",
      category: "Home Loans",
      date: "November 10, 2024",
      readTime: "4 min"
    },
    {
      title: "Refinancing vs. Switching: What's the Difference?",
      category: "Refinancing",
      date: "November 5, 2024",
      readTime: "6 min"
    },
    {
      title: "Investment Property Loans: A Complete Guide",
      category: "Investment",
      date: "November 1, 2024",
      readTime: "12 min"
    },
    {
      title: "Understanding SMSF Property Purchases",
      category: "SMSF",
      date: "October 28, 2024",
      readTime: "8 min"
    },
    {
      title: "Green Home Loans: Financing Sustainable Properties",
      category: "Sustainability",
      date: "October 25, 2024",
      readTime: "5 min"
    }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return "↗️";
    if (trend === "down") return "↘️";
    return "→";
  };

  const getTrendColor = (trend: string) => {
    if (trend === "up") return "text-green-600";
    if (trend === "down") return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Latest Updates</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay informed with the latest market trends, interest rate updates, 
              and mortgage industry news that could impact your financial decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Overview</h2>
            <p className="text-lg text-gray-600">Key metrics and trends in the Australian property market</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketUpdates.map((update, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <update.icon className="h-8 w-8 text-blue-600" />
                    <span className={`text-2xl ${getTrendColor(update.trend)}`}>
                      {getTrendIcon(update.trend)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-gray-900 mb-1">{update.title}</h3>
                  <div className={`text-2xl font-bold mb-2 ${getTrendColor(update.trend)}`}>
                    {update.value}
                  </div>
                  <p className="text-sm text-gray-600">{update.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured News</h2>
            <p className="text-lg text-gray-600">Important updates that could affect your mortgage decisions</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {latestNews.map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-blue-600 to-cyan-500"></div>
                  <Badge className={`absolute top-4 left-4 ${article.badgeColor} text-white`}>
                    {article.badge}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{article.readTime}</span>
                  </div>
                  <Badge variant="outline" className="w-fit mb-2">
                    {article.category}
                  </Badge>
                  <CardTitle className="text-xl leading-tight">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <Button variant="outline" className="w-full">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Articles</h2>
              <div className="space-y-6">
                {recentArticles.map((article, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline">{article.category}</Badge>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{article.readTime}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                            {article.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {article.date}
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 ml-4 cursor-pointer hover:text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Stay Updated</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-4">
                    Get the latest market updates and mortgage news delivered to your inbox.
                  </p>
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    Subscribe to Newsletter
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="#" className="block text-blue-600 hover:underline">Current Interest Rates</a>
                  <a href="#" className="block text-blue-600 hover:underline">First Home Buyer Guide</a>
                  <a href="#" className="block text-blue-600 hover:underline">Refinancing Calculator</a>
                  <a href="#" className="block text-blue-600 hover:underline">Government Grants</a>
                  <a href="#" className="block text-blue-600 hover:underline">Investment Property Tips</a>
                </CardContent>
              </Card>

              {/* Contact CTA */}
              <Card className="bg-cyan-50 border-cyan-200">
                <CardHeader>
                  <CardTitle className="text-cyan-800">Need Personal Advice?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cyan-700 mb-4">
                    Speak with our mortgage experts for personalized guidance.
                  </p>
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                    Book a Consultation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Updates;

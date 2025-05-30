
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calculator, Home, Building2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Calculators", href: "/calculators", icon: Calculator },
    { name: "About Us", href: "/about" },
    { name: "Latest Updates", href: "/updates" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const serviceItems = [
    { name: "Home Loans", href: "/services/home-loans" },
    { name: "Refinancing", href: "/services/refinancing" },
    { name: "Commercial Loans", href: "/services/commercial-loans" },
    { name: "Car Loans", href: "/services/car-loans" },
    { name: "All Services", href: "/services" },
  ];

  const isActive = (href: string) => location.pathname === href;
  const isServicesActive = () => location.pathname.startsWith('/services');

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/f574e7ef-1fd3-47d3-b5eb-6b5e82c3e9a5.png" 
                alt="OzPro Finance Logo" 
                className="h-18 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <span key={item.name} className="flex items-center">
                <Link
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-[#678E19] text-white"
                      : "text-gray-700 hover:text-[#678E19] hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>

                {/* Insert Services dropdown right after Home */}
                {item.name === 'Home' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ml-2 ${
                          isServicesActive()
                            ? "bg-[#678E19] text-white"
                            : "text-gray-700 hover:text-[#678E19] hover:bg-gray-50"
                        }`}
                      >
                        <span>Services</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white border shadow-lg z-[100]">
                      {serviceItems.map((service) => (
                        <DropdownMenuItem key={service.name} asChild>
                          <Link
                            to={service.href}
                            className="w-full px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer text-gray-700 hover:text-[#678E19]"
                          >
                            {service.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </span>
            ))}

            <Button className="ml-4 bg-[#EDA208] hover:bg-[#EDA208]/90 text-black font-semibold">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#678E19]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? "bg-[#678E19] text-white"
                      : "text-gray-700 hover:text-[#678E19] hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <div className="text-gray-500 text-sm font-medium mb-2">Services</div>
                {serviceItems.map((service) => (
                  <Link
                    key={service.name}
                    to={service.href}
                    className="block px-3 py-1 text-sm text-gray-600 hover:text-[#678E19]"
                    onClick={() => setIsOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

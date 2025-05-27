
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/f574e7ef-1fd3-47d3-b5eb-6b5e82c3e9a5.png" 
                alt="OzPro Finance Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400">
              Your trusted partner for mortgage and finance solutions. Making homeownership dreams come true.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-brand-yellow cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-brand-yellow cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-brand-yellow cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-brand-yellow cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-yellow">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/calculators" className="text-gray-400 hover:text-white transition-colors">Calculators</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-yellow">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/home-loans" className="text-gray-400 hover:text-white transition-colors">Home Loans</Link></li>
              <li><Link to="/services/refinancing" className="text-gray-400 hover:text-white transition-colors">Refinancing</Link></li>
              <li><Link to="/services/commercial-loans" className="text-gray-400 hover:text-white transition-colors">Commercial Loans</Link></li>
              <li><Link to="/services/car-loans" className="text-gray-400 hover:text-white transition-colors">Car Loans</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-yellow">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-brand-green" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-brand-green" />
                <span className="text-gray-400">info@ozprofinance.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-brand-green" />
                <span className="text-gray-400">123 Finance St, Sydney NSW 2000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 OzPro Finance. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-analytics-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center gap-2 font-bold text-2xl">
                <span className="text-white">Genexel</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6">
              Pioneering genomic diagnostics specialists with expertise in identifying drug resistance mechanisms. We help healthcare providers make better treatment decisions through advanced resistance testing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/articles" className="text-gray-300 hover:text-white transition-colors">Articles</Link>
              </li>
              <li>
                <Link to="/reports" className="text-gray-300 hover:text-white transition-colors">Reports</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/data-analysis" className="text-gray-300 hover:text-white transition-colors">Data Analysis</Link>
              </li>
              <li>
                <Link to="/services/research-publications" className="text-gray-300 hover:text-white transition-colors">Research Publications</Link>
              </li>
              <li>
                <Link to="/services/custom-reports" className="text-gray-300 hover:text-white transition-colors">Bespoke Reports</Link>
              </li>
              <li>
                <Link to="/services/consultancy" className="text-gray-300 hover:text-white transition-colors">Consultancy</Link>
              </li>
              <li>
                <Link to="/services/workshops" className="text-gray-300 hover:text-white transition-colors">Workshops</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-6">Get In Touch</h3>
            <address className="not-italic text-gray-300 mb-4">
              <p>167-169 Great Portland Street</p>
              <p>London</p>
              <p>England</p>
              <p>W1W 5PF</p>
            </address>
            <p className="text-gray-300 mb-2">
              <span className="font-medium">Email:</span> enquiries@genexel.com
            </p>
            <p className="text-gray-300">
              <span className="font-medium">Tel:</span> +44 (0) 1234 567890
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Genexel Analytics Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

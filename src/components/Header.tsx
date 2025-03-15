
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "Reports", path: "/reports" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-bold text-2xl text-genexel-700"
        >
          <span className="text-genexel-800">Genexel</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-genexel-600",
                location.pathname === link.path 
                  ? "text-genexel-700" 
                  : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            variant="default" 
            size="sm" 
            className="ml-4 bg-genexel-600 hover:bg-genexel-700 text-white"
          >
            Client Login
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-genexel-700" />
          ) : (
            <Menu className="h-6 w-6 text-genexel-700" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-container md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-md shadow-md animate-fade-in">
          <nav className="container mx-auto py-4 px-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "py-2 px-4 text-base font-medium transition-colors hover:bg-genexel-50 rounded-md",
                  location.pathname === link.path 
                    ? "text-genexel-700 bg-genexel-50" 
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              variant="default" 
              className="mt-2 bg-genexel-600 hover:bg-genexel-700 text-white w-full"
            >
              Client Login
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;


import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-genexel-700">
          <span className="text-genexel-800">Genexel</span> Analytics
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-genexel-600 ${
              isActive('/') ? 'text-genexel-700' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/articles" 
            className={`text-sm font-medium transition-colors hover:text-genexel-600 ${
              isActive('/articles') ? 'text-genexel-700' : 'text-muted-foreground'
            }`}
          >
            Articles
          </Link>
          <Link 
            to="/reports" 
            className={`text-sm font-medium transition-colors hover:text-genexel-600 ${
              isActive('/reports') ? 'text-genexel-700' : 'text-muted-foreground'
            }`}
          >
            Reports
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors hover:text-genexel-600 ${
              isActive('/about') ? 'text-genexel-700' : 'text-muted-foreground'
            }`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`text-sm font-medium transition-colors hover:text-genexel-600 ${
              isActive('/contact') ? 'text-genexel-700' : 'text-muted-foreground'
            }`}
          >
            Contact
          </Link>
          <Button 
            variant="default" 
            size="sm" 
            className="ml-4 bg-genexel-600 hover:bg-genexel-700 text-white"
            onClick={() => console.log("Client login clicked")}
          >
            Client Login
          </Button>
        </div>
      </div>
    </nav>
  );
}

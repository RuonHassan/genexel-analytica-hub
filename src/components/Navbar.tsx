import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg">
          Genexel Analytics
        </Link>
        
        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link to="/articles">Articles</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/reports">Reports</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin">Admin</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
} 
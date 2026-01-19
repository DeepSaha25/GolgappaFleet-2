import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Menu, X, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo.png";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHome
        ? "bg-background/95 backdrop-blur-md shadow-soft border-b-2 border-foreground/10"
        : "bg-background"
        }`}
    >
      {/* Decorative top line */}
      <div className="h-1 bg-gradient-to-r from-accent via-primary to-accent" />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="GolgappaFleet Logo" className="w-8 h-8 object-contain" />
            <span className="font-display font-bold text-xl text-foreground">
              GolgappaFleet
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${isActiveLink("/")
                ? "bg-accent text-accent-foreground"
                : "text-foreground hover:bg-muted"
                }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${isActiveLink("/menu")
                ? "bg-accent text-accent-foreground"
                : "text-foreground hover:bg-muted"
                }`}
            >
              Menu
            </Link>
            <Link
              to="/auth"
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${isActiveLink("/auth")
                ? "bg-accent text-accent-foreground"
                : "text-foreground hover:bg-muted"
                }`}
            >
              Login
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => toggleCart(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-elevated"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-2 border-b border-border/50">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, 400001</span>
              </div>
              <Link
                to="/"
                className="py-3 text-lg font-display font-bold text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="py-3 text-lg font-display font-bold text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                to="/orders"
                className="py-3 text-lg font-display font-bold text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Orders
              </Link>
              <Link
                to="/auth"
                className="py-3 text-lg font-display font-bold text-primary hover:text-primary/80 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login / Sign Up
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Menu, X, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? "bg-card/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🥟</span>
            <span className="font-display font-bold text-xl text-foreground">
              Golgappa
            </span>
          </Link>

          {/* Location picker - Desktop */}
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            <MapPin className="w-4 h-4" />
            <span>Mumbai, 400001</span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/menu"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/orders"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Orders
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
            </Button>

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
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Button>

            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>

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
            className="md:hidden bg-card border-t border-border"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, 400001</span>
              </div>
              <Link
                to="/menu"
                className="py-2 text-foreground font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                to="/orders"
                className="py-2 text-foreground font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Orders
              </Link>
              <Link
                to="/auth"
                className="py-2 text-foreground font-medium"
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

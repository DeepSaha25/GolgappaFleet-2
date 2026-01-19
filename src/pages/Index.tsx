import { Hero } from "@/components/home/Hero";
import { PickYourBox } from "@/components/home/PickYourBox";
import { PromoBanner } from "@/components/home/PromoBanner";
import { HygieneSection } from "@/components/home/HygieneSection";
import { Header } from "@/components/layout/Header";
import { ProductModal } from "@/components/menu/ProductModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartBar } from "@/components/cart/CartBar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { MenuItem } from "@/types";

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <CartBar />

      {/* Hero Section */}
      <Hero />

      {/* Pick Your Box - Products on Yellow */}
      <PickYourBox onAddClick={handleAddClick} />

      {/* Promo Banner with Stripes */}
      <PromoBanner />

      {/* Hygiene Section */}
      <HygieneSection />

      {/* Footer */}
      <footer className="py-12 bg-foreground text-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🥟</span>
                <span className="font-display font-bold text-xl">GolgappaFleet</span>
              </div>
              <p className="text-sm text-card/70">
                India's first hygienic Golgappa delivery platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-primary">Quick Links</h4>
              <ul className="space-y-2 text-sm text-card/70">
                <li>
                  <Link to="/menu" className="hover:text-card transition-colors">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="hover:text-card transition-colors">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-card transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-primary">Support</h4>
              <ul className="space-y-2 text-sm text-card/70">
                <li>
                  <Link to="/faq" className="hover:text-card transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-card transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-card transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-primary">Contact</h4>
              <ul className="space-y-2 text-sm text-card/70">
                <li>hello@golgappafleet.com</li>
                <li>+91 98765 43210</li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-card/20 mt-8 pt-8 text-center text-sm text-card/50">
            © 2024 GolgappaFleet. Made with ❤️ in India.
          </div>
        </div>
      </footer>

      <ProductModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;

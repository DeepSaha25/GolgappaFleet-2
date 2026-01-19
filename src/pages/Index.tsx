import { Hero } from "@/components/home/Hero";
import { Header } from "@/components/layout/Header";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductModal } from "@/components/menu/ProductModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartBar } from "@/components/cart/CartBar";
import { menuItems } from "@/data/menu";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Truck, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { MenuItem } from "@/types";

const features = [
  {
    icon: Clock,
    title: "30-Min Delivery",
    description: "Fresh and fast, right to your door",
  },
  {
    icon: ShieldCheck,
    title: "100% Hygienic",
    description: "Prepared in spotless kitchens",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Only the finest ingredients",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders above ₹200",
  },
];

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const featuredItems = menuItems.filter((item) =>
    item.tags.includes("bestseller")
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <CartBar />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-primary font-semibold text-sm uppercase tracking-wide"
              >
                Most Loved
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-display font-bold mt-2"
              >
                Bestsellers
              </motion.h2>
            </div>
            <Link to="/menu">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onAddClick={handleAddClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-card">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Craving Golgappa?
            </h2>
            <p className="text-card/70 max-w-md mx-auto mb-8">
              Order now and experience the burst of flavors that will transport
              you to the streets of India.
            </p>
            <Link to="/menu">
              <Button variant="hero" size="xl">
                Order Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🥟</span>
                <span className="font-display font-bold">Golgappa</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Bringing authentic street food flavors to your doorstep.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/menu" className="hover:text-foreground transition-colors">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="hover:text-foreground transition-colors">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/faq" className="hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>hello@golgappa.com</li>
                <li>+91 98765 43210</li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Golgappa. Made with ❤️ in India.
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

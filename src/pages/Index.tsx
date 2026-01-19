import { Hero } from "@/components/home/Hero";
import { PickYourBox } from "@/components/home/PickYourBox";
import { PromoBanner } from "@/components/home/PromoBanner";
import { HygieneSection } from "@/components/home/HygieneSection";
import { HowToSection } from "@/components/home/HowToSection";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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

      {/* How To Section */}
      <HowToSection />
      <Footer />


      <ProductModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;

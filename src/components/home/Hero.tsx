import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

const slides = [
  {
    image: hero1,
    headline: "Crispy. Tangy. Irresistible.",
    tagline: "Experience the authentic taste of street-side Golgappa, delivered fresh to your doorstep.",
  },
  {
    image: hero2,
    headline: "One Bite of Pure Joy",
    tagline: "Handcrafted with love, every puri bursting with flavor.",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 overlay-dark" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-card leading-tight mb-4">
                  {slides[currentSlide].headline}
                </h1>
                <p className="text-lg md:text-xl text-card/80 mb-8 max-w-lg">
                  {slides[currentSlide].tagline}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/menu">
                    <Button variant="hero" size="xl">
                      Order Golgappa
                    </Button>
                  </Link>
                  <Link to="/menu">
                    <Button
                      variant="outline"
                      size="xl"
                      className="border-card/50 text-card hover:bg-card/10 hover:text-card"
                    >
                      Explore Menu
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-1/2 left-4 right-4 z-20 flex justify-between pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="pointer-events-auto text-card hover:bg-card/10 h-12 w-12"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="pointer-events-auto text-card hover:bg-card/10 h-12 w-12"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-card/50 hover:bg-card/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

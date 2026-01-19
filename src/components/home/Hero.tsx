import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Flame, Droplets } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] bg-background overflow-hidden py-12 lg:py-0">
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute top-20 right-[45%] text-2xl animate-float hidden lg:block"
      >
        🌶️
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-32 left-[35%] text-2xl animate-float hidden lg:block"
        style={{ animationDelay: "1s" }}
      >
        🍋
      </motion.div>

      <div className="container mx-auto px-4 h-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm mb-6 shadow-bold"
            >
              <Star className="w-4 h-4" fill="currentColor" />
              No.1 Pani Puri in Town
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-none mb-6">
              <span className="block text-foreground">THE</span>
              <span className="block text-foreground">ULTIMATE</span>
              <span className="relative inline-block">
                <span className="relative z-10 text-accent-foreground bg-accent px-4 py-1 -skew-x-3 inline-block">
                  CRUNCH
                </span>
              </span>
            </h1>

            {/* Description box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border-2 border-foreground p-4 max-w-md mb-8 shadow-bold"
            >
              <p className="text-foreground">
                Experience the explosive taste of authentic, hygiene-first
                Golgappas. Delivered at hyper-speed.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/menu">
                <Button
                  size="xl"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 shadow-bold border-2 border-foreground"
                >
                  ORDER BOX 🥟
                </Button>
              </Link>
              <Link to="/menu">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-card font-bold text-lg px-8"
                >
                  SEE MENU ▶
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 relative"
          >
            {/* Yellow ring background */}
            <div className="relative mx-auto w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
              <div className="absolute inset-0 rounded-full bg-primary border-8 border-primary/30" />
              
              {/* Food plate image */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-foreground/20 shadow-elevated">
                <img
                  src={hero1}
                  alt="Delicious Golgappa platter"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute top-8 right-0 bg-card px-3 py-2 rounded-lg shadow-medium flex items-center gap-2"
              >
                <Flame className="w-5 h-5 text-accent" />
                <div>
                  <span className="font-bold text-sm">Tikha Pani</span>
                  <span className="text-xs text-muted-foreground block">Handle the heat?</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute bottom-16 right-0 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-medium flex items-center gap-2"
              >
                <Droplets className="w-5 h-5" />
                <div>
                  <span className="font-bold text-sm">Pudina Shot</span>
                  <span className="text-xs opacity-80 block">Fresh Mint Blast</span>
                </div>
              </motion.div>

              {/* Decorative chili */}
              <motion.div
                initial={{ opacity: 0, rotate: -30 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 1.1 }}
                className="absolute -top-2 right-4 text-3xl"
              >
                🌶️
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

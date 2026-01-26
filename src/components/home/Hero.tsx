import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Flame, Droplets } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import heroBg from "@/assets/hero-vid.mp4";

export function Hero() {
  return (
    <section
      className="relative min-h-[90vh] overflow-hidden pt-32 pb-12 lg:pt-32 lg:pb-12"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroBg} type="video/mp4" />
      </video>
      <div className="container relative z-10 mx-auto px-4 h-full">
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
              <span className="relative inline-block mt-2">
                {/* Orange Shadow Block */}
                <span className="absolute inset-0 bg-accent transform -skew-x-6 translate-x-2 translate-y-2" />

                {/* Black Background Block */}
                <span className="relative z-10 bg-black px-8 py-2 -skew-x-6 inline-block">
                  <span className="block transform skew-x-6 text-primary font-black tracking-wider text-outline-white text-6xl md:text-7xl lg:text-8xl">
                    CRUNCH
                  </span>
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
        </div>
      </div>
    </section>
  );
}

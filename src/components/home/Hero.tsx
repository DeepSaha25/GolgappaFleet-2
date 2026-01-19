import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Flame, Droplets } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] bg-background overflow-hidden pt-32 pb-12 lg:pt-32 lg:pb-12">
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

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 relative"
          >
            {/* Yellow ring background */}
            <div className="relative mx-auto w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
              <div className="absolute inset-0 rounded-full bg-primary border-4 md:border-8 border-primary/30" />

              {/* Food plate image with wobble */}
              <motion.div
                animate={{
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                }}
                className="absolute inset-8 rounded-full overflow-hidden border-4 border-foreground/20 shadow-elevated"
              >
                <img
                  src={hero1}
                  alt="Delicious Golgappa platter"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Tikha Pani badge - bouncing */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { delay: 0.7, duration: 0.5 },
                  x: { delay: 0.7, duration: 0.5 },
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                  }
                }}
                className="absolute top-4 right-[-10px] md:top-8 md:right-0 bg-card px-3 py-1 md:px-3 md:py-2 rounded-lg shadow-medium flex items-center gap-2"
              >
                <Flame className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                <div>
                  <span className="font-bold text-xs md:text-sm">Tikha Pani</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground block">Handle the heat?</span>
                </div>
              </motion.div>

              {/* Pudina Shot badge - bouncing with delay */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { delay: 0.9, duration: 0.5 },
                  x: { delay: 0.9, duration: 0.5 },
                  y: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                    delay: 0.5,
                  }
                }}
                className="absolute bottom-8 right-[-10px] md:bottom-16 md:right-0 bg-success text-success-foreground px-3 py-1 md:px-4 md:py-2 rounded-lg shadow-medium flex items-center gap-2"
              >
                <Droplets className="w-4 h-4 md:w-5 md:h-5" />
                <div>
                  <span className="font-bold text-xs md:text-sm">Pudina Shot</span>
                  <span className="text-[10px] md:text-xs opacity-80 block">Fresh Mint Blast</span>
                </div>
              </motion.div>

              {/* Decorative chili - near the image, bouncing */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -6, 0],
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{
                  opacity: { delay: 0.8, duration: 0.3 },
                  scale: { delay: 0.8, duration: 0.3 },
                  y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const },
                  rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
                }}
                className="absolute -top-2 right-12 text-3xl"
              >
                🌶️
              </motion.div>

              {/* Decorative lemon - near the image, bouncing */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -6, 0],
                }}
                transition={{
                  opacity: { delay: 1, duration: 0.3 },
                  scale: { delay: 1, duration: 0.3 },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" as const, delay: 0.3 },
                }}
                className="absolute bottom-4 left-4 text-2xl"
              >
                🍋
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

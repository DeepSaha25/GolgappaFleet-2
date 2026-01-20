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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[0.9] mb-6 whitespace-pre-line">
              <span className="block text-foreground">THE ULTIMATE</span>
              <span className="relative inline-block mt-2">
                {/* Orange Shadow Block */}
                <span className="absolute inset-0 bg-accent transform -skew-x-6 translate-x-2 translate-y-2 shadow-lg" />

                {/* Black Background Block */}
                <span className="relative z-10 bg-black px-8 py-2 -skew-x-6 inline-block">
                  <span className="block transform skew-x-6 text-primary font-black tracking-wider text-outline-white text-6xl md:text-7xl lg:text-8xl">
                    CRUNCH
                  </span>
                </span>
              </span>
              <span className="block text-foreground text-3xl md:text-4xl lg:text-5xl mt-2 font-black">
                IN EVERY GOLGAPPA
              </span>
            </h1>

        
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 items-center"
            >
              <Link to="/menu">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0px 0px 0px 0px rgba(255, 210, 63, 0)",
                      "0px 0px 20px 5px rgba(255, 210, 63, 0.4)",
                      "0px 0px 0px 0px rgba(255, 210, 63, 0)",
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Button
                    size="xl"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-black text-xl px-10 h-16 shadow-bold border-2 border-foreground group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      ORDER BOX 🥟
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full duration-500"
                      transition={{ ease: "easeInOut" }}
                    />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/menu">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-foreground/70 hover:text-foreground font-bold text-lg px-8 hover:bg-transparent transition-colors flex items-center gap-2"
                >
                  SEE MENU <span className="text-xl">▶</span>
                </Button>
              </Link>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-4 flex-wrap"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-foreground/5 rounded-full border border-foreground/10">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-accent flex items-center justify-center text-[10px] font-bold">
                      {i === 3 ? "2k+" : "👤"}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground/80 ml-1">
                  ⭐ <span className="font-bold">4.8 rated</span> by 2,000+ lovers
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm font-bold text-foreground/60 uppercase tracking-wider">
                <span className="flex items-center gap-1">🧼 100% Hygienic</span>
                <span>•</span>
                <span className="flex items-center gap-1">🚚 30 min delivery</span>
              </div>
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
            <div className="relative mx-auto w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-primary to-accent border-4 md:border-8 border-primary/30 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-700" />

              {/* Glow effect */}
              <div className="absolute inset-[-10px] rounded-full bg-primary/20 blur-3xl -z-10 animate-pulse" />

              {/* Food plate image with wobble and zoom */}
              <motion.div
                animate={{
                  rotate: [0, 2, 0, -2, 0],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                }}
                className="absolute inset-8 rounded-full overflow-hidden border-4 border-foreground/20 shadow-2xl"
              >
                <img
                  src={hero1}
                  alt="Delicious Golgappa platter"
                  className="w-full h-full object-cover contrast-110 brightness-105"
                />
              </motion.div>

              {/* Tikha Pani badge - bouncing */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
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
                  },
                  scale: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="absolute top-4 right-[-10px] md:top-8 md:right-0 bg-card px-3 py-1 md:px-3 md:py-2 rounded-lg shadow-bold border border-foreground/10 flex items-center gap-2 cursor-pointer z-20 group/badge1"
              >
                <Flame className="w-4 h-4 md:w-5 md:h-5 text-accent group-hover/badge1:scale-125 transition-transform" />
                <div>
                  <span className="font-bold text-xs md:text-sm">Tikha Pani</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground block">Handle the heat?</span>
                </div>
              </motion.div>

              {/* Pudina Shot badge - bouncing with delay */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileHover={{ scale: 1.1, rotate: -2 }}
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
                  },
                  scale: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="absolute bottom-8 right-[-10px] md:bottom-16 md:right-0 bg-success text-success-foreground px-3 py-1 md:px-4 md:py-2 rounded-lg shadow-bold border border-success/20 flex items-center gap-2 cursor-pointer z-20 group/badge2"
              >
                <Droplets className="w-4 h-4 md:w-5 md:h-5 group-hover/badge2:scale-125 transition-transform" />
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
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";

export function PromoBanner() {
  return (
    <section className="py-8">
      {/* Top decorative stripe */}
      <div className="h-2 bg-primary" />
      
      <div className="stripes-orange py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border-2 border-foreground p-8 shadow-bold relative z-10"
            >
              <span className="font-bold text-foreground text-xl">GET UP TO</span>
              <h2 className="text-5xl md:text-6xl font-display font-extrabold text-success my-2">
                50% OFF
              </h2>
              <p className="font-bold text-foreground text-lg mb-6">
                ON YOUR 2 ORDER'S
              </p>
              <Link to="/menu">
                <Button
                  size="lg"
                  className="bg-foreground hover:bg-foreground/90 text-success font-bold text-lg px-8"
                >
                  Order Now
                </Button>
              </Link>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, rotate: 5, x: 50 }}
              whileInView={{ opacity: 1, rotate: 5, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:block relative"
            >
              <div className="bg-card border-2 border-foreground p-3 shadow-bold transform rotate-3">
                <img
                  src={hero1}
                  alt="Delicious Golgappa"
                  className="w-full max-w-sm aspect-square object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom decorative stripe */}
      <div className="h-2 bg-primary" />
    </section>
  );
}

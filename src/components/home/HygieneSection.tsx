import { motion } from "framer-motion";
import { Droplets, Hand, Rocket } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";

const features = [
  {
    icon: Droplets,
    title: "Mineral Water",
    color: "bg-foreground text-primary",
  },
  {
    icon: Hand,
    title: "Contactless",
    color: "bg-foreground text-primary",
  },
  {
    icon: Rocket,
    title: "10 Min Delivery",
    color: "bg-foreground text-primary",
  },
];

export function HygieneSection() {
  return (
    <section className="py-16 bg-background overflow-hidden">
      {/* Top decorative line */}
      <div className="stripes-orange h-12" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* YUM bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -top-4 right-8 z-20 bg-primary px-6 py-3 rounded-full font-display font-extrabold text-foreground text-xl shadow-bold border-2 border-foreground"
            >
              YUM!
            </motion.div>

            {/* Image with tilted frame */}
            <div className="relative mx-auto w-[280px] md:w-[350px]">
              <div className="bg-card border-2 border-foreground rounded-3xl p-4 shadow-bold transform -rotate-3">
                <img
                  src={hero1}
                  alt="Hygienic Golgappa"
                  className="w-full aspect-square object-cover rounded-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-primary mb-2 leading-tight">
              INDIA'S FIRST
            </h2>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-primary mb-8 leading-tight">
              HYGIENIC FLEET
            </h2>

            {/* Description box */}
            <div className="bg-card border-2 border-foreground p-6 shadow-bold mb-8 max-w-lg">
              <p className="text-foreground text-lg">
                We are digitizing the street food experience. No more
                questionable water. Only usage of Mineral Water and gloves,
                delivered to your doorstep.
              </p>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`${feature.color} px-5 py-3 rounded-full font-semibold flex items-center gap-2`}
                >
                  <feature.icon className="w-5 h-5" />
                  {feature.title}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative dots */}
      <div className="h-12 bg-amber-900 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(45 100% 50%) 2px, transparent 2px)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Target, Rocket, SmilePlus } from "lucide-react";
import { Star } from "lucide-react";

const steps = [
  {
    icon: "🎯",
    title: "SELECT YOUR ATTACK",
    description:
      "Choose your weapon of choice: Classic Pani, Vodka Shots, or Chocolate Bombs. Load up the cart.",
    bgColor: "bg-primary",
    textColor: "text-foreground",
    rotate: "-rotate-2",
  },
  {
    icon: "🚀",
    title: "WE FLEET IT",
    description:
      "Our hyper-speed sanitation squad preps your box and races to your location. 10 mins or less.",
    bgColor: "bg-accent",
    textColor: "text-accent-foreground",
    rotate: "rotate-1",
  },
  {
    icon: "🤤",
    title: "CRUNCH TIME",
    description:
      "Receive the box. Assemble the Puri. Pour the Pani. Experience spiritual enlightenment.",
    bgColor: "bg-success",
    textColor: "text-success-foreground",
    rotate: "rotate-2",
  },
];

export function HowToSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Brown background with polka dots */}
      <div
        className="py-20 bg-amber-900"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(45 100% 50% / 0.3) 2px, transparent 2px)`,
          backgroundSize: "24px 24px",
        }}
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Star className="w-5 h-5 text-primary" fill="currentColor" />
              <span className="font-bold text-primary uppercase tracking-wide italic">
                The Game Plan
              </span>
              <Star className="w-5 h-5 text-primary" fill="currentColor" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-card"
              style={{
                textShadow: "3px 3px 0 hsl(30 8% 16%)",
              }}
            >
              HOW TO GOLGAPPA
            </motion.h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative ${step.rotate}`}
              >
                {/* Icon badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 w-14 h-14 bg-foreground rounded-xl flex items-center justify-center text-2xl shadow-bold transform -rotate-6"
                >
                  {step.icon}
                </motion.div>

                {/* Card */}
                <div
                  className={`${step.bgColor} ${step.textColor} p-8 pt-12 rounded-lg shadow-bold min-h-[280px] flex flex-col`}
                  style={{
                    boxShadow: "6px 6px 0 hsl(30 8% 16%)",
                  }}
                >
                  <h3 className="font-display font-extrabold text-xl md:text-2xl text-center mb-4 leading-tight">
                    {step.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-16 h-1 bg-current opacity-40 mx-auto mb-4" />

                  <p className="text-center text-sm md:text-base opacity-90 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

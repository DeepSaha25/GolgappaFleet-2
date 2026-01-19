import { motion } from "framer-motion";
import { Star, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/data/menu";
import type { MenuItem } from "@/types";

interface PickYourBoxProps {
  onAddClick: (item: MenuItem) => void;
}

export function PickYourBox({ onAddClick }: PickYourBoxProps) {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Star className="w-5 h-5 text-foreground" fill="currentColor" />
            <span className="font-bold text-foreground uppercase tracking-wide">
              Our Flavors
            </span>
            <Star className="w-5 h-5 text-foreground" fill="currentColor" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-extrabold text-foreground"
            style={{
              textShadow: "3px 3px 0 hsl(24 100% 50%)",
            }}
          >
            PICK YOUR BOX
          </motion.h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.slice(0, 8).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-medium hover:shadow-elevated transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-bold text-foreground uppercase text-sm">
                    {item.name}
                  </h3>
                  {item.tags.includes("spicy") && (
                    <Flame className="w-4 h-4 text-accent" />
                  )}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">
                    ₹{item.basePrice}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => onAddClick(item)}
                    className="bg-foreground hover:bg-foreground/90 text-card font-semibold text-xs px-4"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

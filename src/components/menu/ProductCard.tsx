import { motion } from "framer-motion";
import { Plus, Flame, Leaf, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MenuItem } from "@/types";

interface ProductCardProps {
  item: MenuItem;
  onAddClick: (item: MenuItem) => void;
}

export function ProductCard({ item, onAddClick }: ProductCardProps) {
  const isSpicy = item.tags.includes("spicy");
  const isBestseller = item.tags.includes("bestseller");
  const isNew = item.tags.includes("new");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {isBestseller && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
              <Star className="w-3 h-3" fill="currentColor" />
              Bestseller
            </span>
          )}
          {isNew && (
            <span className="px-2 py-1 bg-success text-success-foreground text-xs font-semibold rounded-full">
              New
            </span>
          )}
          {isSpicy && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-full">
              <Flame className="w-3 h-3" />
              Spicy
            </span>
          )}
        </div>

        {/* Veg indicator */}
        {item.tags.includes("veg") && (
          <div className="absolute top-3 right-3">
            <div className="w-5 h-5 border-2 border-success rounded flex items-center justify-center bg-card">
              <div className="w-2 h-2 rounded-full bg-success" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-lg text-foreground mb-1">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">
            ₹{item.basePrice}
          </span>
          <Button
            variant="default"
            size="sm"
            onClick={() => onAddClick(item)}
            className="gap-1"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

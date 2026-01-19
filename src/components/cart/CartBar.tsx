import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

export function CartBar() {
  const { totalItems, totalAmount, toggleCart } = useCart();

  if (totalItems === 0) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden"
    >
      <div className="bg-foreground text-card rounded-2xl shadow-elevated p-4 flex items-center justify-between">
        <button
          onClick={() => toggleCart(true)}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <div className="text-left">
            <p className="text-xs text-card/70">{totalItems} items</p>
            <p className="font-bold">₹{totalAmount}</p>
          </div>
        </button>

        <Link to="/checkout">
          <Button variant="hero" size="default" className="gap-2">
            Checkout
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

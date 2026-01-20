import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export function CartDrawer() {
  const { items, isOpen, toggleCart, totalAmount, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[90]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card shadow-elevated z-[90] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-display font-bold text-lg">Your Cart</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleCart(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <img src={logo} alt="Empty Cart" className="h-16 w-auto mb-4 object-contain opacity-80" />
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Looks like you haven't added any delicious golgappas yet!
                  </p>
                  <Link to="/menu" onClick={() => toggleCart(false)}>
                    <Button variant="default">Browse Menu</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const addOnsTotal = item.selectedAddOns.reduce(
                      (sum, a) => sum + a.price,
                      0
                    );
                    const itemTotal =
                      (item.menuItem.basePrice + addOnsTotal) * item.quantity;

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-3 p-3 bg-secondary rounded-xl"
                      >
                        <img
                          src={item.menuItem.imageUrl}
                          alt={item.menuItem.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">
                            {item.menuItem.name}
                          </h4>
                          <p className="text-xs text-muted-foreground capitalize">
                            {item.spiceLevel} spice
                          </p>
                          {item.selectedAddOns.length > 0 && (
                            <p className="text-xs text-muted-foreground truncate">
                              +{item.selectedAddOns.map((a) => a.name).join(", ")}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 bg-card rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium w-4 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <span className="font-semibold text-sm">
                              ₹{itemTotal}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors self-start"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold text-lg">₹{totalAmount}</span>
                </div>
                <Link to="/checkout" onClick={() => toggleCart(false)}>
                  <Button variant="default" size="lg" className="w-full gap-2">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

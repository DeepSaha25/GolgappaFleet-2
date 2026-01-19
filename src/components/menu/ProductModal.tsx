import { useState } from "react";
import { motion } from "framer-motion";
import { X, Minus, Plus, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { MenuItem, SpiceLevel, AddOn } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const spiceLevels: { value: SpiceLevel; label: string; icon?: boolean }[] = [
  { value: "mild", label: "Mild" },
  { value: "medium", label: "Medium" },
  { value: "hot", label: "Hot", icon: true },
  { value: "extra-hot", label: "Extra Hot", icon: true },
];

export function ProductModal({ item, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState<SpiceLevel>(
    item?.spiceLevelDefault || "medium"
  );
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  if (!item) return null;

  const handleAddOnToggle = (addOn: AddOn) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.id === addOn.id)
        ? prev.filter((a) => a.id !== addOn.id)
        : [...prev, addOn]
    );
  };

  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = (item.basePrice + addOnsTotal) * quantity;

  const handleAddToCart = () => {
    addItem(item, quantity, spiceLevel, selectedAddOns, specialInstructions);
    onClose();
    // Reset state
    setQuantity(1);
    setSpiceLevel(item.spiceLevelDefault);
    setSelectedAddOns([]);
    setSpecialInstructions("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-card">
        {/* Image */}
        <div className="relative aspect-video">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-foreground/80 text-card rounded-full hover:bg-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-display">{item.name}</DialogTitle>
            <p className="text-muted-foreground">{item.description}</p>
          </DialogHeader>

          {/* Spice Level */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Spice Level</h4>
            <div className="flex flex-wrap gap-2">
              {spiceLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setSpiceLevel(level.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                    spiceLevel === level.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  {level.icon && <Flame className="w-3 h-3" />}
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          {item.addOns.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Add-ons</h4>
              <div className="space-y-3">
                {item.addOns.map((addOn) => (
                  <label
                    key={addOn.id}
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg cursor-pointer hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedAddOns.some((a) => a.id === addOn.id)}
                        onCheckedChange={() => handleAddOnToggle(addOn)}
                      />
                      <span className="text-sm">{addOn.name}</span>
                    </div>
                    <span className="text-sm font-medium">+₹{addOn.price}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Special Instructions</h4>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special requests? (optional)"
              className="w-full p-3 bg-secondary rounded-lg text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-8 w-8"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-8 w-8"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <Button
              variant="default"
              size="lg"
              onClick={handleAddToCart}
              className="flex-1"
            >
              Add to Cart · ₹{totalPrice}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

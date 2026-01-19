import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  MapPin,
  Plus,
  Check,
  CreditCard,
  Wallet,
  Banknote,
  ArrowLeft,
  Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const savedAddresses = [
  {
    id: "1",
    label: "Home",
    line1: "Flat 42, Marina Heights",
    line2: "Near Sea Link, Worli",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400018",
  },
  {
    id: "2",
    label: "Office",
    line1: "WeWork BKC, 3rd Floor",
    line2: "Bandra Kurla Complex",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400051",
  },
];

const paymentMethods = [
  { id: "upi", name: "UPI", icon: Wallet, description: "Pay via any UPI app" },
  { id: "card", name: "Card", icon: CreditCard, description: "Credit/Debit card" },
  { id: "cod", name: "Cash on Delivery", icon: Banknote, description: "Pay when delivered" },
];

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"address" | "payment" | "confirm">("address");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(savedAddresses[0]?.id || null);
  const [selectedPayment, setSelectedPayment] = useState<string>("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = totalAmount >= 200 ? 0 : 30;
  const finalTotal = totalAmount + deliveryFee;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    navigate("/order-confirmation");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />
        <div className="pt-32 pb-16 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-display font-bold mb-2">Cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some delicious golgappas to continue
          </p>
          <Link to="/menu">
            <Button variant="default">Browse Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </Link>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {["Address", "Payment", "Confirm"].map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    i === ["address", "payment", "confirm"].indexOf(step)
                      ? "bg-primary text-primary-foreground"
                      : i < ["address", "payment", "confirm"].indexOf(step)
                      ? "bg-success text-success-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i < ["address", "payment", "confirm"].indexOf(step) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span className="hidden sm:block ml-2 text-sm font-medium">
                  {s}
                </span>
                {i < 2 && (
                  <div className="w-12 sm:w-24 h-0.5 bg-border mx-2" />
                )}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {step === "address" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-display font-bold mb-6">
                    Delivery Address
                  </h2>

                  <div className="space-y-4 mb-6">
                    {savedAddresses.map((address) => (
                      <label
                        key={address.id}
                        className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedAddress === address.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddress === address.id}
                            onChange={() => setSelectedAddress(address.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="font-semibold">
                                {address.label}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {address.line1}
                              {address.line2 && `, ${address.line2}`}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}

                    <button className="w-full p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground">
                      <Plus className="w-4 h-4" />
                      Add New Address
                    </button>
                  </div>

                  <Button
                    variant="default"
                    size="lg"
                    className="w-full"
                    onClick={() => setStep("payment")}
                    disabled={!selectedAddress}
                  >
                    Continue to Payment
                  </Button>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-display font-bold mb-6">
                    Payment Method
                  </h2>

                  <div className="space-y-4 mb-6">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedPayment === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            checked={selectedPayment === method.id}
                            onChange={() => setSelectedPayment(method.id)}
                          />
                          <method.icon className="w-5 h-5 text-primary" />
                          <div className="flex-1">
                            <span className="font-semibold">{method.name}</span>
                            <p className="text-sm text-muted-foreground">
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Mock Payment Notice */}
                  <div className="p-4 bg-primary/10 rounded-xl mb-6">
                    <p className="text-sm text-primary font-medium">
                      🔒 This is a demo. No real payment will be processed.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setStep("address")}
                    >
                      Back
                    </Button>
                    <Button
                      variant="default"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep("confirm")}
                    >
                      Review Order
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === "confirm" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-display font-bold mb-6">
                    Confirm Your Order
                  </h2>

                  {/* Order Items */}
                  <div className="bg-card rounded-xl p-4 mb-6">
                    <h3 className="font-semibold mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {items.map((item) => {
                        const addOnsTotal = item.selectedAddOns.reduce(
                          (sum, a) => sum + a.price,
                          0
                        );
                        const itemTotal =
                          (item.menuItem.basePrice + addOnsTotal) * item.quantity;

                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-3"
                          >
                            <img
                              src={item.menuItem.imageUrl}
                              alt={item.menuItem.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">
                                {item.menuItem.name} × {item.quantity}
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {item.spiceLevel}
                              </p>
                            </div>
                            <span className="font-semibold">₹{itemTotal}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="bg-card rounded-xl p-4 mb-6">
                    <h3 className="font-semibold mb-2">Delivery Address</h3>
                    {savedAddresses.find((a) => a.id === selectedAddress) && (
                      <p className="text-sm text-muted-foreground">
                        {savedAddresses.find((a) => a.id === selectedAddress)?.line1},{" "}
                        {savedAddresses.find((a) => a.id === selectedAddress)?.city}
                      </p>
                    )}
                  </div>

                  {/* Estimated Time */}
                  <div className="flex items-center gap-3 p-4 bg-success/10 rounded-xl mb-6">
                    <Clock className="w-5 h-5 text-success" />
                    <div>
                      <p className="font-semibold text-success">
                        Estimated Delivery: 25-30 mins
                      </p>
                      <p className="text-sm text-success/80">
                        Your order will be freshly prepared
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setStep("payment")}
                    >
                      Back
                    </Button>
                    <Button
                      variant="default"
                      size="lg"
                      className="flex-1"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : `Place Order · ₹${finalTotal}`}
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-card rounded-xl p-4 sticky top-24">
                <h3 className="font-display font-bold mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Subtotal ({items.length} items)
                    </span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className={deliveryFee === 0 ? "text-success" : ""}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
                {totalAmount < 200 && (
                  <p className="text-xs text-muted-foreground mt-4">
                    Add ₹{200 - totalAmount} more for free delivery!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

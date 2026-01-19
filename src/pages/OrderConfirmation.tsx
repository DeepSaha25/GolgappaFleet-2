import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Check, MapPin, Clock, PartyPopper } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function OrderConfirmationPage() {
  const [orderId] = useState(`GLP${Date.now().toString().slice(-8)}`);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-lg text-center">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15, delay: 0.2 }}
            className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-12 h-12 text-success-foreground" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-4xl mb-4">
              <PartyPopper className="w-10 h-10 mx-auto text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-2">
              Order Placed!
            </h1>
            <p className="text-muted-foreground mb-8">
              Your delicious golgappas are being prepared with love
            </p>

            {/* Order Details */}
            <div className="bg-card rounded-xl p-6 mb-6 text-left">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono font-semibold">{orderId}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                <Clock className="w-5 h-5 text-success" />
                <div>
                  <p className="font-semibold text-success">
                    Estimated: 25-30 mins
                  </p>
                  <p className="text-sm text-success/80">
                    We'll notify you when it's on the way
                  </p>
                </div>
              </div>
            </div>

            {/* Order Status Timeline */}
            <div className="bg-card rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-4 text-left">Order Status</h3>
              <div className="space-y-4">
                {[
                  { status: "Order Placed", time: "Just now", active: true },
                  { status: "Preparing", time: "~5 mins", active: false },
                  { status: "Out for Delivery", time: "~20 mins", active: false },
                  { status: "Delivered", time: "~30 mins", active: false },
                ].map((step, index) => (
                  <div key={step.status} className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.active
                          ? "bg-success text-success-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {step.active ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-sm">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className={step.active ? "font-semibold" : "text-muted-foreground"}>
                        {step.status}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {step.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/orders" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  Track Order
                </Button>
              </Link>
              <Link to="/menu" className="flex-1">
                <Button variant="default" size="lg" className="w-full">
                  Order More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

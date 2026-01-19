import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Package,
  Clock,
  Check,
  ChefHat,
  Truck,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

type OrderStatus = "placed" | "preparing" | "out-for-delivery" | "delivered" | "cancelled";

interface MockOrder {
  id: string;
  date: string;
  status: OrderStatus;
  items: { name: string; qty: number }[];
  total: number;
  eta?: string;
}

// Mock orders data
const mockOrders: MockOrder[] = [
  {
    id: "GLP12345678",
    date: "Today, 2:30 PM",
    status: "out-for-delivery",
    items: [
      { name: "Classic Golgappa", qty: 2 },
      { name: "Dahi Puri", qty: 1 },
    ],
    total: 195,
    eta: "10-15 mins",
  },
  {
    id: "GLP12345670",
    date: "Yesterday, 7:45 PM",
    status: "delivered",
    items: [
      { name: "Pani Puri Combo", qty: 1 },
      { name: "Sev Puri Platter", qty: 1 },
    ],
    total: 200,
  },
  {
    id: "GLP12345665",
    date: "Jan 15, 2024",
    status: "delivered",
    items: [{ name: "Fiery Red Puri", qty: 2 }],
    total: 140,
  },
];

const statusConfig = {
  placed: { icon: Package, label: "Order Placed", color: "text-primary" },
  preparing: { icon: ChefHat, label: "Preparing", color: "text-primary" },
  "out-for-delivery": { icon: Truck, label: "Out for Delivery", color: "text-success" },
  delivered: { icon: Check, label: "Delivered", color: "text-success" },
  cancelled: { icon: Package, label: "Cancelled", color: "text-destructive" },
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");

  const activeOrders = mockOrders.filter(
    (o) => o.status !== "delivered" && o.status !== "cancelled"
  );
  const pastOrders = mockOrders.filter(
    (o) => o.status === "delivered" || o.status === "cancelled"
  );

  const displayedOrders = activeTab === "active" ? activeOrders : pastOrders;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-display font-bold mb-2">Your Orders</h1>
            <p className="text-muted-foreground mb-8">
              Track and manage your golgappa orders
            </p>

            {/* Tabs */}
            <div className="flex bg-secondary rounded-lg p-1 mb-6">
              <button
                onClick={() => setActiveTab("active")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "active"
                    ? "bg-card shadow-soft text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Active ({activeOrders.length})
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "past"
                    ? "bg-card shadow-soft text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Past Orders
              </button>
            </div>

            {/* Orders List */}
            {displayedOrders.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">
                  {activeTab === "active"
                    ? "No active orders"
                    : "No past orders"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {activeTab === "active"
                    ? "Your active orders will appear here"
                    : "Your order history will appear here"}
                </p>
                <Link to="/menu">
                  <Button variant="default">Order Now</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {displayedOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status].icon;
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card rounded-xl p-4 shadow-soft"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-mono text-sm text-muted-foreground">
                            #{order.id}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.date}
                          </p>
                        </div>
                        <div
                          className={`flex items-center gap-1 text-sm font-medium ${
                            statusConfig[order.status].color
                          }`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          {statusConfig[order.status].label}
                        </div>
                      </div>

                      {/* Items */}
                      <div className="mb-3">
                        {order.items.map((item, i) => (
                          <p key={i} className="text-sm">
                            {item.name} × {item.qty}
                          </p>
                        ))}
                      </div>

                      {/* ETA for active orders */}
                      {order.eta && (
                        <div className="flex items-center gap-2 p-2 bg-success/10 rounded-lg mb-3">
                          <Clock className="w-4 h-4 text-success" />
                          <span className="text-sm font-medium text-success">
                            Arriving in {order.eta}
                          </span>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="font-bold">₹{order.total}</span>
                        <div className="flex gap-2">
                          {order.status === "out-for-delivery" && (
                            <>
                              <Button variant="outline" size="sm">
                                <Phone className="w-4 h-4 mr-1" />
                                Call
                              </Button>
                              <Button variant="outline" size="sm">
                                <MapPin className="w-4 h-4 mr-1" />
                                Track
                              </Button>
                            </>
                          )}
                          {order.status === "delivered" && (
                            <Link to="/menu">
                              <Button variant="default" size="sm">
                                Reorder
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Help Section */}
            <div className="mt-8 p-4 bg-secondary rounded-xl">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold">Need Help?</p>
                  <p className="text-sm text-muted-foreground">
                    Contact our support team for any order issues
                  </p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Chat
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

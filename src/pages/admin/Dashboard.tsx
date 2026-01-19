import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Menu,
  X,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  Check,
  Truck,
  ChefHat,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { menuItems } from "@/data/menu";

// Mock order data
const mockOrders = [
  {
    id: "GLP12345678",
    customer: "Rahul Sharma",
    items: ["Classic Golgappa x2", "Dahi Puri x1"],
    total: 195,
    status: "preparing" as const,
    time: "5 mins ago",
  },
  {
    id: "GLP12345677",
    customer: "Priya Patel",
    items: ["Pani Puri Combo x1"],
    total: 120,
    status: "placed" as const,
    time: "10 mins ago",
  },
  {
    id: "GLP12345676",
    customer: "Amit Kumar",
    items: ["Fiery Red Puri x2", "Sev Puri x1"],
    total: 220,
    status: "out-for-delivery" as const,
    time: "25 mins ago",
  },
];

const statusConfig = {
  placed: { label: "Placed", color: "bg-primary", icon: Package },
  preparing: { label: "Preparing", color: "bg-primary", icon: ChefHat },
  "out-for-delivery": { label: "Out for Delivery", color: "bg-success", icon: Truck },
  delivered: { label: "Delivered", color: "bg-success", icon: Check },
};

const stats = [
  { label: "Today's Orders", value: "47", change: "+12%", icon: ShoppingBag },
  { label: "Revenue", value: "₹8,420", change: "+8%", icon: DollarSign },
  { label: "Avg. Order Value", value: "₹179", change: "+3%", icon: TrendingUp },
  { label: "Active Customers", value: "234", change: "+15%", icon: Users },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🥟</span>
          <span className="font-display font-bold">Admin</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-card border-r border-border z-40 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-border hidden lg:flex items-center gap-2">
          <span className="text-2xl">🥟</span>
          <span className="font-display font-bold text-lg">Golgappa Admin</span>
        </div>

        <nav className="p-4 pt-20 lg:pt-4 space-y-1">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "orders", label: "Orders", icon: ShoppingBag, badge: 3 },
            { id: "menu", label: "Menu Items", icon: Package },
            { id: "customers", label: "Customers", icon: Users },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.badge && (
                <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/">
            <Button variant="outline" className="w-full">
              ← Back to Store
            </Button>
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8">
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-2xl font-display font-bold mb-6">Dashboard</h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-card rounded-xl p-4 shadow-soft"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {stat.label}
                      </span>
                      <span className="text-xs text-success font-medium">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Orders */}
              <div className="bg-card rounded-xl shadow-soft">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-display font-bold">Live Orders</h2>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="divide-y divide-border">
                  {mockOrders.map((order) => {
                    const config = statusConfig[order.status];
                    return (
                      <div
                        key={order.id}
                        className="p-4 flex items-center gap-4"
                      >
                        <div
                          className={`w-10 h-10 ${config.color} rounded-full flex items-center justify-center`}
                        >
                          <config.icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-muted-foreground">
                              #{order.id.slice(-6)}
                            </span>
                            <span className="font-semibold">{order.customer}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {order.items.join(", ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{order.total}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.time}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="default" size="sm">
                            Update
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "menu" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-display font-bold">Menu Items</h1>
                <Button variant="default" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
              </div>

              <div className="bg-card rounded-xl shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary">
                      <tr>
                        <th className="text-left p-4 text-sm font-semibold">
                          Item
                        </th>
                        <th className="text-left p-4 text-sm font-semibold">
                          Price
                        </th>
                        <th className="text-left p-4 text-sm font-semibold">
                          Tags
                        </th>
                        <th className="text-left p-4 text-sm font-semibold">
                          Status
                        </th>
                        <th className="text-right p-4 text-sm font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {menuItems.map((item) => (
                        <tr key={item.id} className="hover:bg-secondary/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-semibold">₹{item.basePrice}</td>
                          <td className="p-4">
                            <div className="flex gap-1 flex-wrap">
                              {item.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 bg-secondary text-xs rounded-full capitalize"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                item.isActive
                                  ? "bg-success/10 text-success"
                                  : "bg-destructive/10 text-destructive"
                              }`}
                            >
                              {item.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "orders" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-2xl font-display font-bold mb-6">
                Order Management
              </h1>

              {/* Order Status Filters */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {["All", "Placed", "Preparing", "Out for Delivery", "Delivered"].map(
                  (status) => (
                    <Button
                      key={status}
                      variant={status === "All" ? "default" : "secondary"}
                      size="sm"
                    >
                      {status}
                    </Button>
                  )
                )}
              </div>

              <div className="space-y-4">
                {mockOrders.map((order) => {
                  const config = statusConfig[order.status];
                  return (
                    <div
                      key={order.id}
                      className="bg-card rounded-xl p-4 shadow-soft"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm">#{order.id}</span>
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded-full ${config.color} text-primary-foreground`}
                            >
                              {config.label}
                            </span>
                          </div>
                          <p className="font-semibold">{order.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">₹{order.total}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.time}
                          </p>
                        </div>
                      </div>

                      <div className="bg-secondary rounded-lg p-3 mb-3">
                        <p className="text-sm">{order.items.join(", ")}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button variant="default" size="sm" className="flex-1">
                          Advance Status
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === "customers" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-display font-bold mb-2">
                Customer Management
              </h2>
              <p className="text-muted-foreground">
                Enable Lovable Cloud to access customer data
              </p>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Settings className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-display font-bold mb-2">Settings</h2>
              <p className="text-muted-foreground">
                Configure store settings, delivery areas, and more
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

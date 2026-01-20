import { motion } from "framer-motion";
import {
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Package,
  ChefHat,
  Truck,
  Check,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { mockOrders } from "@/data/orders";

// Mock Stats Data
const stats = [
  {
    label: "Today's Orders",
    value: "47",
    change: "+12%",
    trend: "up",
    icon: ShoppingBag,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    label: "Total Revenue",
    value: "₹8,420",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-500",
    bg: "bg-green-500/10"
  },
  {
    label: "Avg. Order Value",
    value: "₹179",
    change: "-3%",
    trend: "down",
    icon: TrendingUp,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    label: "Active Customers",
    value: "234",
    change: "+15%",
    trend: "up",
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
];

const statusStyles = {
  placed: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  preparing: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
  ready: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
  "out-for-delivery": "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
  delivered: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Download Report</Button>
          <Button>Create Promotion</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${stat.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <h3 className="font-display font-bold text-lg">Recent Orders</h3>
            <Link to="/admin/orders">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          <div className="divide-y divide-border/50">
            {mockOrders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/admin/orders/${order.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'
                    }`}>
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{order.id}</span>
                      <span className="text-xs text-muted-foreground">• {order.timestamp}</span>
                    </div>
                    <p className="text-sm font-medium">{order.customer.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="font-bold text-sm">₹{order.total}</p>
                    <p className="text-xs text-muted-foreground">{order.items.length} Items</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[order.status as keyof typeof statusStyles] || 'bg-gray-100'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Items / Quick Actions */}
        <div className="space-y-8">
          <div className="bg-card border border-border/50 rounded-xl shadow-sm p-6">
            <h3 className="font-display font-bold text-lg mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <ChefHat className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Orders Preparing</span>
                </div>
                <span className="font-bold">{mockOrders.filter(o => o.status === 'preparing').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Out for Delivery</span>
                </div>
                <span className="font-bold">{mockOrders.filter(o => o.status === 'out-for-delivery').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Delivered Today</span>
                </div>
                <span className="font-bold">27</span>
              </div>
            </div>
            <Link to="/admin/orders" className="block mt-6">
              <Button className="w-full">Manage Orders</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

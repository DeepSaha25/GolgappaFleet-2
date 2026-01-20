import { useState } from "react";
import {
    Search,
    Filter,
    Clock,
    MapPin,
    ChevronDown,
    Phone,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { mockOrders, OrderStatus } from "@/data/orders";
import { useNavigate } from "react-router-dom";

const statusConfig: Record<OrderStatus, { label: string; color: string; next: OrderStatus | null }> = {
    placed: { label: "Placed", color: "bg-blue-100 text-blue-700 border-blue-200", next: 'preparing' },
    preparing: { label: "Preparing", color: "bg-orange-100 text-orange-700 border-orange-200", next: 'ready' },
    ready: { label: "Ready", color: "bg-purple-100 text-purple-700 border-purple-200", next: 'out-for-delivery' },
    "out-for-delivery": { label: "Out for Delivery", color: "bg-yellow-100 text-yellow-700 border-yellow-200", next: 'delivered' },
    delivered: { label: "Delivered", color: "bg-green-100 text-green-700 border-green-200", next: null },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700 border-red-200", next: null },
};

export default function AdminOrders() {
    const [orders, setOrders] = useState(mockOrders);
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleStatusUpdate = (e: React.MouseEvent, orderId: string, newStatus: OrderStatus) => {
        e.stopPropagation(); // Prevent card click

        // Mutate the mock data source for persistence across pages
        const orderIndex = mockOrders.findIndex(o => o.id === orderId);
        if (orderIndex >= 0) {
            mockOrders[orderIndex].status = newStatus;
        }

        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        toast.success(`Order ${orderId} updated to ${statusConfig[newStatus].label}`);
    };

    const filteredOrders = orders.filter(order => {
        const matchesStatus = filterStatus === "all" || order.status === filterStatus;
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.phone.includes(searchQuery);
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold">Orders</h1>
                    <p className="text-muted-foreground">Manage and track all customer orders</p>
                </div>
                <div className="flex gap-2">
                    {/* Export button could go here */}
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by Order ID, Name or Phone..."
                        className="pl-9 bg-card"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-[200px]">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="bg-card">
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-muted-foreground" />
                                <SelectValue placeholder="Filter by Status" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Orders</SelectItem>
                            <SelectItem value="placed">Placed</SelectItem>
                            <SelectItem value="preparing">Preparing</SelectItem>
                            <SelectItem value="ready">Ready</SelectItem>
                            <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Kanban / List Board */}
            <div className="grid gap-4">
                {filteredOrders.map((order) => {
                    const config = statusConfig[order.status];

                    return (
                        <div
                            key={order.id}
                            onClick={() => navigate(`/admin/orders/${order.id}`)}
                            className="group bg-card border border-border/50 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden"
                        >
                            {/* Card Hover Effect */}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            <div className="flex flex-col lg:flex-row gap-6 relative z-10">
                                {/* Order Info */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono font-bold text-lg">{order.id}</span>
                                            <Badge variant="outline" className={`${config.color} border`}>
                                                {config.label}
                                            </Badge>
                                        </div>
                                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {order.timestamp}
                                        </span>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">Customer Details</p>
                                            <h4 className="font-semibold">{order.customer.name}</h4>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                <Phone className="w-3 h-3" /> {order.customer.phone}
                                            </div>
                                            <div className="flex items-start gap-2 text-sm text-muted-foreground mt-1">
                                                <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                                                <span className="line-clamp-1">{order.customer.address}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">Order Summary</p>
                                            <ul className="space-y-1">
                                                {order.items.slice(0, 2).map((item, idx) => (
                                                    <li key={idx} className="text-sm flex justify-between">
                                                        <span>{item.quantity}x {item.name}</span>
                                                        <span className="text-muted-foreground">₹{item.price * item.quantity}</span>
                                                    </li>
                                                ))}
                                                {order.items.length > 2 && (
                                                    <li className="text-xs text-muted-foreground pt-1">+ {order.items.length - 2} more items</li>
                                                )}
                                            </ul>
                                            <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold">
                                                <span>Total</span>
                                                <span>₹{order.total}</span>
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1 text-right">
                                                Paid via {order.paymentMethod}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="lg:border-l lg:pl-6 flex flex-col justify-center gap-3 min-w-[200px]">
                                    {config.next && (
                                        <Button
                                            className="w-full gap-2 relative z-20"
                                            size="lg"
                                            onClick={(e) => handleStatusUpdate(e, order.id, config.next!)}
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                            Mark as {statusConfig[config.next].label}
                                        </Button>
                                    )}

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full relative z-20" onClick={(e) => e.stopPropagation()}>
                                                More Actions <ChevronDown className="w-4 h-4 ml-2" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleStatusUpdate(e as any, order.id, 'cancelled'); }} className="text-red-600 focus:text-red-600">
                                                Cancel Order
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); }}>
                                                Print Bill
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); }}>
                                                Contact Customer
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {filteredOrders.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No orders found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
}

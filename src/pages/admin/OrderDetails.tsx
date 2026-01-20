import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    MapPin,
    Phone,
    Mail,
    Clock,
    CreditCard,
    ChefHat,
    Truck,
    CheckCircle2,
    XCircle,
    Package,
    Printer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { mockOrders, OrderStatus } from "@/data/orders";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: any; next: OrderStatus | null }> = {
    placed: { label: "Placed", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Package, next: 'preparing' },
    preparing: { label: "Preparing", color: "bg-orange-100 text-orange-700 border-orange-200", icon: ChefHat, next: 'ready' },
    ready: { label: "Ready", color: "bg-purple-100 text-purple-700 border-purple-200", icon: CheckCircle2, next: 'out-for-delivery' },
    "out-for-delivery": { label: "Out for Delivery", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Truck, next: 'delivered' },
    delivered: { label: "Delivered", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle2, next: null },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700 border-red-200", icon: XCircle, next: null },
};

export default function AdminOrderDetails() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(mockOrders.find(o => o.id === orderId));

    useEffect(() => {
        // Sync with mock data on mount in case it was updated elsewhere
        setOrder(mockOrders.find(o => o.id === orderId));
    }, [orderId]);

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
                <Button onClick={() => navigate('/admin/orders')}>Back to Orders</Button>
            </div>
        );
    }

    const handleStatusUpdate = (newStatus: OrderStatus) => {
        if (!order) return;

        // Mutate the mock data source for persistence
        const orderIndex = mockOrders.findIndex(o => o.id === order.id);
        if (orderIndex >= 0) {
            mockOrders[orderIndex].status = newStatus;
        }

        setOrder({ ...order, status: newStatus });
        toast.success(`Order status updated to ${statusConfig[newStatus].label}`);
    };

    const StatusIcon = statusConfig[order.status].icon;

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/admin/orders">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-display font-bold">Order #{order.id}</h1>
                        <Badge variant="outline" className={`${statusConfig[order.status].color} border px-3 py-1 text-sm rounded-full`}>
                            {statusConfig[order.status].label}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3" /> Placed at {order.timestamp}
                    </p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Printer className="w-4 h-4" /> Print KOT
                    </Button>
                    <div className="w-[180px]">
                        <Select value={order.status} onValueChange={(val) => handleStatusUpdate(val as OrderStatus)}>
                            <SelectTrigger className="bg-primary text-primary-foreground font-medium border-none ring-offset-0 focus:ring-0">
                                <SelectValue placeholder="Update Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(statusConfig).map(([key, config]) => (
                                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column - Order Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-secondary/30 p-4 border-b flex justify-between items-center">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Package className="w-4 h-4 text-muted-foreground" />
                                Order Items
                            </h3>
                            <span className="text-sm text-muted-foreground">{order.items.length} Items</span>
                        </div>
                        <div className="divide-y">
                            {order.items.map((item, index) => (
                                <div key={index} className="p-4 flex justify-between items-start hover:bg-secondary/10 transition-colors">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                                            {item.quantity}x
                                        </div>
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                            {item.customization && (
                                                <p className="text-sm text-muted-foreground">{item.customization}</p>
                                            )}
                                        </div>
                                    </div>
                                    <p className="font-medium">₹{item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>
                        {order.instructions && (
                            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border-t border-yellow-100 dark:border-yellow-900/30">
                                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-500 mb-1">Cooking Instructions</p>
                                <p className="text-sm text-yellow-700 dark:text-yellow-600">"{order.instructions}"</p>
                            </div>
                        )}
                        <div className="bg-secondary/30 p-4 border-t space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Item Total</span>
                                <span>₹{order.subtotal}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Taxes & Charges</span>
                                <span>₹{order.tax}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Delivery Fee</span>
                                <span>₹{order.deliveryFee}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Grand Total</span>
                                <span>₹{order.total}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                                <CreditCard className="w-3 h-3" />
                                Paid via {order.paymentMethod} • <span className={order.paymentStatus === 'paid' ? "text-green-600 font-medium" : "text-orange-600 font-medium capitalize"}>{order.paymentStatus}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Customer Info */}
                <div className="space-y-6">
                    <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-secondary/30 p-4 border-b">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Truck className="w-4 h-4 text-muted-foreground" />
                                Delivery Details
                            </h3>
                        </div>
                        <div className="p-4 space-y-6">
                            <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Customer</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-lg text-secondary-foreground">
                                        {order.customer.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{order.customer.name}</p>
                                        <p className="text-xs text-muted-foreground">Customer since 2024</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Contact Number</p>
                                        <a href={`tel:${order.customer.phone}`} className="text-sm text-primary hover:underline">{order.customer.phone}</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Email Address</p>
                                        <a href={`mailto:${order.customer.email}`} className="text-sm text-primary hover:underline">{order.customer.email}</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Delivery Address</p>
                                        <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                                            {order.customer.address}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <Button className="w-full" variant="outline">
                                View on Map
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

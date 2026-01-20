import { useState } from "react";
import { Save, Store, MapPin, Phone, CreditCard, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminSettings() {
    const [storeStatus, setStoreStatus] = useState(true);
    const [autoAccept, setAutoAccept] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const handleSave = () => {
        toast.success("Settings saved successfully");
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold">Settings</h1>
                    <p className="text-muted-foreground">Manage your store preferences and configurations</p>
                </div>
                <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                </Button>
            </div>

            <div className="grid gap-6">
                {/* Store Status Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Store className="w-5 h-5" /> Store Status
                        </CardTitle>
                        <CardDescription>
                            Control your store's availability and operating hours.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/20">
                            <div className="space-y-0.5">
                                <Label className="text-base">Accepting Orders</Label>
                                <p className="text-sm text-muted-foreground">
                                    Turn off to temporarily stop receiving new orders.
                                </p>
                            </div>
                            <Switch
                                checked={storeStatus}
                                onCheckedChange={setStoreStatus}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/20">
                            <div className="space-y-0.5">
                                <Label className="text-base">Auto-Accept Orders</Label>
                                <p className="text-sm text-muted-foreground">
                                    Automatically accept incoming orders without manual approval.
                                </p>
                            </div>
                            <Switch
                                checked={autoAccept}
                                onCheckedChange={setAutoAccept}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* General Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" /> General Information
                        </CardTitle>
                        <CardDescription>
                            Update your store's contact details and address.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="storeName">Store Name</Label>
                                <Input id="storeName" defaultValue="GolgappaFleet Fleet 1" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Contact Phone</Label>
                                <Input id="phone" defaultValue="+91 98765 43210" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Store Address</Label>
                            <Textarea
                                id="address"
                                defaultValue="Shop 4, Ground Floor, Sunset Heights, Bandra West, Mumbai 400050"
                                rows={3}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Financial Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5" /> Financial Configuration
                        </CardTitle>
                        <CardDescription>
                            Set your delivery fees, packaging charges, and taxes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="deliveryFee">Delivery Fee (₹)</Label>
                                <Input id="deliveryFee" type="number" defaultValue="40" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="packingFee">Tax Rate (%)</Label>
                                <Input id="packingFee" type="number" defaultValue="5" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="minOrder">Min Order Value (₹)</Label>
                                <Input id="minOrder" type="number" defaultValue="150" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="w-5 h-5" /> Notifications
                        </CardTitle>
                        <CardDescription>
                            Manage how you receive order alerts.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Order Sound Alerts</Label>
                                <p className="text-sm text-muted-foreground">
                                    Play a sound when a new order arrives.
                                </p>
                            </div>
                            <Switch
                                checked={notifications}
                                onCheckedChange={setNotifications}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

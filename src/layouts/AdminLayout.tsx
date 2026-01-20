import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import logo from "@/assets/logo.png";
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Settings,
    Menu,
    X,
    LogOut,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
        { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
        { name: "Menu Items", href: "/admin/menu", icon: Package },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    const isActive = (path: string, exact = false) => {
        return exact ? location.pathname === path : location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-secondary/30">
            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Golgappa Fleet" className="h-8 w-auto object-contain" />
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
                className={cn(
                    "fixed top-0 left-0 bottom-0 w-64 bg-background border-r border-border z-40 transform transition-transform duration-300 lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-6 border-b border-border hidden lg:flex items-center gap-3">
                    <img src={logo} alt="Golgappa Fleet" className="h-10 w-auto object-contain" />
                    <div>
                        <h1 className="font-display font-bold text-lg leading-none">Golgappa</h1>
                        <span className="text-xs text-muted-foreground font-medium tracking-wider">FLEET ADMIN</span>
                    </div>
                </div>

                <nav className="p-4 pt-20 lg:pt-6 space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                isActive(item.href, item.exact)
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive(item.href, item.exact) ? "" : "opacity-70")} />
                            {item.name}
                            {isActive(item.href, item.exact) && (
                                <ChevronRight className="w-4 h-4 ml-auto animate-in fade-in slide-in-from-left-1" />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-6 left-4 right-4 space-y-2">
                    <Link to="/">
                        <Button variant="outline" className="w-full justify-start gap-2 border-dashed">
                            <LogOut className="w-4 h-4" />
                            Back to Store
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen transition-all duration-300">
                <div className="p-4 lg:p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

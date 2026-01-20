import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import MenuPage from "./pages/Menu";
import CheckoutPage from "./pages/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmation";
import OrdersPage from "./pages/Orders";
import AuthPage from "./pages/Auth";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminOrderDetails from "./pages/admin/OrderDetails";
import AdminMenu from "./pages/admin/Menu";
import AdminSettings from "./pages/admin/Settings";
import AdminLayout from "./layouts/AdminLayout";
import NotFound from "./pages/NotFound";
import { ChatBot } from "@/components/chat/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <ChatBot />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/:orderId" element={<AdminOrderDetails />} />
              <Route path="menu" element={<AdminMenu />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

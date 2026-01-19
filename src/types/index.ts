// Menu & Products
export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  isActive: boolean;
  tags: string[];
  spiceLevelDefault: SpiceLevel;
  addOns: AddOn[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export type SpiceLevel = "mild" | "medium" | "hot" | "extra-hot";

// Cart
export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  spiceLevel: SpiceLevel;
  selectedAddOns: AddOn[];
  specialInstructions?: string;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}

// Orders
export type OrderStatus = "placed" | "preparing" | "out-for-delivery" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed" | "mock";

export interface Order {
  id: string;
  userId: string;
  addressId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  scheduledAt?: Date;
  estimatedDelivery?: Date;
}

// User & Auth
export type UserRole = "customer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  lat?: number;
  lng?: number;
}

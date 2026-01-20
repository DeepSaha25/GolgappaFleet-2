export type OrderStatus = 'placed' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';

export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    customization?: string;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    coordinates?: { lat: number; lng: number };
}

export interface Order {
    id: string;
    customer: Customer;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    total: number;
    status: OrderStatus;
    timestamp: string;
    paymentMethod: string;
    paymentStatus: 'paid' | 'pending';
    instructions?: string;
}

export const mockOrders: Order[] = [
    {
        id: "GLP-8823",
        customer: {
            id: "CUST-001",
            name: "Rahul Sharma",
            email: "rahul.sharma@example.com",
            phone: "+91 98765 43210",
            address: "B-402, Sunset Heights, Pali Hill, Bandra West, Mumbai, Maharashtra 400050"
        },
        items: [
            { name: "Classic Golgappa (6pcs)", quantity: 2, price: 60, customization: "Medium Spicy" },
            { name: "Dahi Puri", quantity: 1, price: 80 }
        ],
        subtotal: 200,
        tax: 10,
        deliveryFee: 40,
        total: 250,
        status: 'preparing',
        timestamp: "10:45 AM, Today",
        paymentMethod: "UPI",
        paymentStatus: "paid",
        instructions: "Don't put too much sev."
    },
    {
        id: "GLP-8822",
        customer: {
            id: "CUST-002",
            name: "Priya Patel",
            email: "priya.p@example.com",
            phone: "+91 98765 12345",
            address: "12, Green Park Society, Near Metro Station, Andheri East, Mumbai 400069"
        },
        items: [
            { name: "Family Party Pack", quantity: 1, price: 499 }
        ],
        subtotal: 499,
        tax: 25,
        deliveryFee: 0,
        total: 524,
        status: 'placed',
        timestamp: "10:42 AM, Today",
        paymentMethod: "Cash on Delivery",
        paymentStatus: "pending"
    },
    {
        id: "GLP-8821",
        customer: {
            id: "CUST-003",
            name: "Amit Kumar",
            email: "amit.k@example.com",
            phone: "+91 91234 56789",
            address: "Flat 5, Rose Apartments, Juhu Tara Road, Juhu, Mumbai 400049"
        },
        items: [
            { name: "Sev Puri", quantity: 2, price: 70 },
            { name: "Bhel Puri", quantity: 2, price: 60, customization: "Extra Spicy" }
        ],
        subtotal: 260,
        tax: 13,
        deliveryFee: 40,
        total: 313,
        status: 'out-for-delivery',
        timestamp: "10:15 AM, Today",
        paymentMethod: "Credit Card",
        paymentStatus: "paid"
    },
    {
        id: "GLP-8820",
        customer: {
            id: "CUST-004",
            name: "Sneha Gupta",
            email: "sneha.g@example.com",
            phone: "+91 77777 88888",
            address: "Room 101, Crystal Tower, Lokhandwala, Andheri West, Mumbai 400053"
        },
        items: [
            { name: "Ragda Pattice", quantity: 2, price: 90 },
        ],
        subtotal: 180,
        tax: 9,
        deliveryFee: 40,
        total: 229,
        status: 'ready',
        timestamp: "09:30 AM, Today",
        paymentMethod: "UPI",
        paymentStatus: "paid"
    },
];

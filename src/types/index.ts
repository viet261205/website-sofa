export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    img: string;
    toppings: Topping[];
    category: string;
  }
  
  export interface Topping {
    id: number;
    name: string;
    price: number;
  }
  
  export interface Order {
    id: number;
    customerInfo: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    items: OrderItem[];
    status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
    totalAmount: number;
    createdAt: string;
  }
  
  export interface OrderItem {
    productId: string;
    quantity: number;
    toppings: string[];
    note?: string;
  }
  export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    toppings?: Topping[];
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    password: string; // This would be hashed in a real application
  }
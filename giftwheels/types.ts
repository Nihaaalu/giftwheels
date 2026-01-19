
export interface Product {
  id?: number;
  name: string;
  description: string;
  tags: string[]; // comma-separated in UI, stored as array
  price: number;
  stock_quantity: number;
  image_url: string;
  created_at: number;
}

export interface Order {
  id?: number;
  product_id: number;
  product_name: string; // denormalized for admin panel read-only convenience
  customer_name: string;
  phone: string;
  address: string;
  quantity: number;
  order_date: number;
}

export interface ContactMessage {
  id?: number;
  name: string;
  phone: string;
  message: string;
  date: number;
}

export type AdminTab = 'dashboard' | 'orders' | 'products' | 'messages';

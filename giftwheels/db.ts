import { Dexie, type Table } from 'dexie';
import { Product, Order, ContactMessage } from './types';

// Defining the database class extending Dexie
export class GiftWheelsDB extends Dexie {
  products!: Table<Product>;
  orders!: Table<Order>;
  contacts!: Table<ContactMessage>;

  constructor() {
    super('GiftWheelsDB');
    
    // Fix: Using named import for Dexie and ensure instance methods like 'version' are correctly recognized.
    // This resolves the TypeScript error: Property 'version' does not exist on type 'GiftWheelsDB'.
    this.version(2).stores({
      products: '++id, name, created_at',
      orders: '++id, product_id, order_date',
      contacts: '++id, date'
    });
  }
}

// Instantiate the database
export const db = new GiftWheelsDB();

export const seedInitialData = async () => {
  const count = await db.products.count();
  if (count === 0) {
    await db.products.bulkAdd([
      {
        name: 'Porsche 911 GT3 RS',
        description: 'The pinnacle of precision. 1/64 scale model featuring the iconic rear wing and magnesium wheels detail.',
        tags: ['euro', 'porsche', 'track'],
        price: 75.00,
        stock_quantity: 8,
        image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
        created_at: Date.now()
      },
      {
        name: 'Datsun Bluebird 510',
        description: 'Vintage racing heritage. Detailed livery and lowered stance for the classic JDM look.',
        tags: ['jdm', 'classic', 'nissan'],
        price: 45.99,
        stock_quantity: 3,
        image_url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
        created_at: Date.now() - 100000
      }
    ]);
  }
};


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../db';
import { Product, Order, ContactMessage, AdminTab } from '../types';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // Stock Management (Option A)
  const [selectedProductId, setSelectedProductId] = useState<number | ''>('');
  const [newStockValue, setNewStockValue] = useState<number | ''>('');

  // New Product Form (Option B)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    tags: '',
    price: 0,
    stock: 0,
    imageUrl: ''
  });

  const fetchData = async () => {
    // Fix: Fetch all relevant tables from the database including contacts
    const p = await db.products.toArray();
    const o = await db.orders.toArray();
    const m = await db.contacts.toArray();
    setProducts(p.sort((a, b) => (b.id || 0) - (a.id || 0)));
    setOrders(o.sort((a, b) => (b.id || 0) - (a.id || 0)));
    setMessages(m.sort((a, b) => (b.id || 0) - (a.id || 0)));
    setLoading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem('admin_session')) navigate('/admin/login');
    fetchData();
  }, []);

  const handleUpdateExistingStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProductId === '' || newStockValue === '') return;
    
    await db.products.update(Number(selectedProductId), { 
      stock_quantity: Number(newStockValue) 
    });
    
    alert('Database updated successfully.');
    setSelectedProductId('');
    setNewStockValue('');
    fetchData();
  };

  const handleAddNewProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const p: Product = {
      name: newProduct.name,
      description: newProduct.description,
      tags: newProduct.tags.split(',').map(t => t.trim()),
      price: Number(newProduct.price),
      stock_quantity: Number(newProduct.stock),
      image_url: newProduct.imageUrl || 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200',
      created_at: Date.now()
    };
    await db.products.add(p);
    setNewProduct({ name: '', description: '', tags: '', price: 0, stock: 0, imageUrl: '' });
    fetchData();
    alert('Model added to permanent storage.');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div className="min-h-screen bg-primary flex items-center justify-center"><div className="animate-spin h-10 w-10 border-4 border-accent border-t-transparent rounded-full"></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-72 space-y-4">
          <header className="mb-8">
            <h1 className="text-3xl font-black tracking-tighter text-accent italic">GIFTWHEELS</h1>
            <p className="text-[10px] font-bold text-textSecondary uppercase tracking-widest">Management System</p>
          </header>
          <div className="space-y-2">
            {/* Fix: Added 'messages' to the navigation list */}
            {(['dashboard', 'orders', 'products', 'messages'] as AdminTab[]).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left p-4 font-black uppercase tracking-widest text-sm transition-all border-l-4 ${activeTab === tab ? 'bg-secondary border-accent text-white' : 'border-transparent text-textSecondary hover:bg-secondary/50'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-12">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {[
                { label: 'Total Sales', val: orders.length, color: 'text-white' },
                { label: 'Catalog Size', val: products.length, color: 'text-white' },
                { label: 'Out of Stock', val: products.filter(p => p.stock_quantity === 0).length, color: 'text-statusOutOfStock' },
                { label: 'Low Inventory', val: products.filter(p => p.stock_quantity > 0 && p.stock_quantity <= 5).length, color: 'text-statusLowStock' },
              ].map((stat, i) => (
                <div key={i} className="bg-secondary border border-border p-8 rounded-sm">
                  <p className="text-[10px] uppercase font-bold text-textSecondary tracking-[0.2em] mb-4">{stat.label}</p>
                  <p className={`text-5xl font-black ${stat.color}`}>{stat.val}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b border-border pb-4">Recent Transactions</h2>
              <div className="bg-secondary border border-border overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-primary border-b border-border text-[10px] uppercase tracking-widest font-black text-textSecondary">
                    <tr>
                      <th className="p-6">Customer / Contact</th>
                      <th className="p-6">Purchased Item</th>
                      <th className="p-6">Qty</th>
                      <th className="p-6">Shipping Address</th>
                      <th className="p-6">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-6">
                          <p className="font-bold text-white uppercase">{order.customer_name}</p>
                          <p className="text-xs text-accent font-black tracking-widest">{order.phone}</p>
                        </td>
                        <td className="p-6 font-bold uppercase text-textSecondary">{order.product_name}</td>
                        <td className="p-6 text-white font-black">{order.quantity}</td>
                        <td className="p-6 text-xs text-textSecondary max-w-xs">{order.address}</td>
                        <td className="p-6 text-xs text-textSecondary uppercase font-bold">{new Date(order.order_date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders.length === 0 && <div className="p-20 text-center text-textSecondary font-bold italic uppercase">Zero orders in database</div>}
              </div>
            </div>
          )}

          {/* Fix: Added implementation for the 'messages' tab content */}
          {activeTab === 'messages' && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b border-border pb-4">Inquiries</h2>
              <div className="bg-secondary border border-border overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-primary border-b border-border text-[10px] uppercase tracking-widest font-black text-textSecondary">
                    <tr>
                      <th className="p-6">Sender / Phone</th>
                      <th className="p-6">Message Content</th>
                      <th className="p-6">Received</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {messages.map(msg => (
                      <tr key={msg.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-6">
                          <p className="font-bold text-white uppercase">{msg.name}</p>
                          <p className="text-xs text-accent font-black tracking-widest">{msg.phone}</p>
                        </td>
                        <td className="p-6 text-textSecondary text-sm max-w-md whitespace-pre-wrap">{msg.message}</td>
                        <td className="p-6 text-xs text-textSecondary uppercase font-bold">{new Date(msg.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {messages.length === 0 && <div className="p-20 text-center text-textSecondary font-bold italic uppercase">Zero inquiries in database</div>}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-16 animate-in fade-in duration-500">
              {/* Option A: Update Existing */}
              <section className="bg-secondary border border-border p-10">
                <header className="mb-8 border-l-4 border-accent pl-6">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">OPTION A: Update Inventory</h3>
                  <p className="text-textSecondary text-xs uppercase tracking-widest mt-1">Modify stock levels instantly</p>
                </header>
                <form onSubmit={handleUpdateExistingStock} className="flex flex-col md:flex-row gap-6 items-end">
                  <div className="flex-1 w-full">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">Select Model</label>
                    <select 
                      required 
                      className="w-full bg-primary border border-border p-4 text-white uppercase font-bold text-sm focus:border-accent outline-none"
                      value={selectedProductId}
                      onChange={e => setSelectedProductId(Number(e.target.value))}
                    >
                      <option value="">-- Choose Product --</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name} (Current: {p.stock_quantity})</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-48">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">New Stock Level</label>
                    <input 
                      required 
                      type="number" 
                      className="w-full bg-primary border border-border p-4 text-white font-black focus:border-accent outline-none"
                      value={newStockValue}
                      onChange={e => setNewStockValue(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                  </div>
                  <button type="submit" className="w-full md:w-auto bg-white text-black font-black uppercase tracking-[0.2em] px-10 py-4 hover:bg-textSecondary transition-all">SAVE UPDATE</button>
                </form>
              </section>

              {/* Option B: Add New Product */}
              <section className="bg-secondary border border-border p-10">
                <header className="mb-8 border-l-4 border-accent pl-6">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">OPTION B: Add New Model</h3>
                  <p className="text-textSecondary text-xs uppercase tracking-widest mt-1">Populate the digital showroom</p>
                </header>
                <form onSubmit={handleAddNewProduct} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">Product Name</label>
                      <input required type="text" className="w-full bg-primary border border-border p-4 text-white focus:border-accent outline-none font-bold uppercase" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">Description</label>
                      <textarea required rows={4} className="w-full bg-primary border border-border p-4 text-white focus:border-accent outline-none resize-none" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">Retail Price (₹)</label>
                        <input required type="number" step="0.01" className="w-full bg-primary border border-border p-4 text-white focus:border-accent outline-none font-black" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">Initial Stock</label>
                        <input required type="number" className="w-full bg-primary border border-border p-4 text-white focus:border-accent outline-none font-black" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">Tags (comma separated)</label>
                      <input required type="text" placeholder="muscle, limited, ford" className="w-full bg-primary border border-border p-4 text-white focus:border-accent outline-none" value={newProduct.tags} onChange={e => setNewProduct({...newProduct, tags: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">Model Showcase Image</label>
                      <div className="flex flex-col gap-4">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="text-xs text-textSecondary file:bg-accent file:text-white file:border-none file:px-6 file:py-3 file:font-black file:uppercase file:cursor-pointer hover:file:bg-accentHover transition-all" />
                        {newProduct.imageUrl && (
                          <div className="mt-2 border border-border rounded overflow-hidden aspect-video bg-black">
                            <img src={newProduct.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                          </div>
                        )}
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-accent text-white font-black uppercase tracking-[0.3em] py-6 shadow-xl shadow-accent/20 hover:bg-accentHover transition-all">PUBLISH TO STORE</button>
                  </div>
                </form>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

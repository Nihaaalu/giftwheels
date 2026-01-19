
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../db';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchProduct = async () => {
    if (!id) return;
    const p = await db.products.get(Number(id));
    if (p) setProduct(p);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !product.id) return;

    // RE-FETCH Stock from DB immediately before transaction
    const latestProduct = await db.products.get(product.id);
    if (!latestProduct || latestProduct.stock_quantity < orderForm.quantity) {
      alert('Sorry, stock just ran out or is insufficient.');
      fetchProduct();
      return;
    }

    setSubmitting(true);
    try {
      // 1. Transactional Update: Add Order
      await db.orders.add({
        product_id: latestProduct.id!,
        product_name: latestProduct.name,
        customer_name: orderForm.name,
        phone: orderForm.phone,
        address: orderForm.address,
        quantity: orderForm.quantity,
        order_date: Date.now()
      });

      // 2. Transactional Update: Reduce Stock in DB
      const newStock = latestProduct.stock_quantity - orderForm.quantity;
      await db.products.update(latestProduct.id!, {
        stock_quantity: newStock
      });

      // 3. Re-sync frontend with DB truth
      await fetchProduct();
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert('Order failed to persist. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary">
      <h2 className="text-2xl font-black uppercase text-textSecondary">Product not found</h2>
      <button onClick={() => navigate('/store')} className="mt-4 text-accent hover:underline font-bold">RETURN TO STORE</button>
    </div>
  );

  const isOutOfStock = product.stock_quantity === 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Visuals */}
        <div className="space-y-4">
          <div className="aspect-[4/3] bg-secondary border border-border overflow-hidden rounded-sm relative shadow-2xl">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <span className="text-statusOutOfStock text-4xl font-black border-4 border-statusOutOfStock px-8 py-2 transform -rotate-12 uppercase">Sold Out</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-6">
            {product.tags.map((tag, idx) => (
              <span key={idx} className="bg-border/50 text-textSecondary text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-sm">
                #{tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            {product.name}
          </h1>

          <p className="text-textSecondary text-lg leading-relaxed mb-10 max-w-xl">
            {product.description}
          </p>

          <div className="flex items-center gap-12 mb-10 border-y border-border py-8">
            <div>
              <p className="text-[10px] uppercase font-bold text-textSecondary tracking-widest mb-1">Price</p>
              <p className="text-4xl font-black text-accent">₹{product.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-textSecondary tracking-widest mb-1">Availability</p>
              <p className={`text-xl font-bold ${isOutOfStock ? 'text-statusOutOfStock' : product.stock_quantity <= 5 ? 'text-statusLowStock' : 'text-statusInStock'}`}>
                {isOutOfStock ? 'UNAVAILABLE' : `${product.stock_quantity} UNITS LEFT`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowOrderModal(true)}
            disabled={isOutOfStock}
            className={`w-full py-6 rounded-sm text-xl font-black tracking-[0.2em] transition-all uppercase ${
              isOutOfStock 
              ? 'bg-border text-textSecondary cursor-not-allowed' 
              : 'bg-accent hover:bg-accentHover text-white shadow-xl shadow-accent/20 active:scale-[0.98]'
            }`}
          >
            {isOutOfStock ? 'ITEM SOLD OUT' : 'BUY NOW'}
          </button>
        </div>
      </div>

      {/* Persistence-Focused Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-secondary border border-border w-full max-w-xl shadow-2xl relative">
            {success ? (
              <div className="p-16 text-center space-y-8">
                <div className="w-24 h-24 bg-statusInStock/10 text-statusInStock rounded-full flex items-center justify-center mx-auto border-2 border-statusInStock/20">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">ORDER CONFIRMED</h2>
                  <p className="text-textSecondary text-lg">Thank you, <span className="text-white font-bold">{orderForm.name}</span>. Your order has been securely saved to our database. We will contact you via WhatsApp shortly.</p>
                </div>
                <button 
                  onClick={() => { setShowOrderModal(false); setSuccess(false); }}
                  className="bg-accent hover:bg-accentHover text-white px-12 py-4 rounded-sm font-black tracking-widest w-full transition-all"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitOrder} className="p-10 space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-black uppercase tracking-tighter">ORDER DETAILS</h2>
                  <button type="button" onClick={() => setShowOrderModal(false)} className="text-textSecondary hover:text-white p-2">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">Customer Name</label>
                    <input required type="text" className="w-full bg-primary border border-border p-4 text-white focus:border-accent outline-none" value={orderForm.name} onChange={e => setOrderForm({...orderForm, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">WhatsApp Phone</label>
                    <input required type="tel" className="w-full bg-primary border border-border p-4 text-white focus:border-accent outline-none" placeholder="+1..." value={orderForm.phone} onChange={e => setOrderForm({...orderForm, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">Order Quantity</label>
                    <input required type="number" min="1" max={product.stock_quantity} className="w-full bg-primary border border-border p-4 text-white focus:border-accent outline-none" value={orderForm.quantity} onChange={e => setOrderForm({...orderForm, quantity: Number(e.target.value)})} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">Full Delivery Address</label>
                    <textarea required rows={3} className="w-full bg-primary border border-border p-4 text-white focus:border-accent outline-none resize-none" value={orderForm.address} onChange={e => setOrderForm({...orderForm, address: e.target.value})} />
                  </div>
                </div>

                <div className="bg-primary p-6 border border-border flex justify-between items-center">
                  <span className="text-textSecondary font-bold uppercase tracking-widest text-xs">Final Total</span>
                  <span className="text-3xl font-black text-accent">₹{(product.price * orderForm.quantity).toFixed(2)}</span>
                </div>

                <button 
                  disabled={submitting}
                  type="submit" 
                  className="w-full bg-accent hover:bg-accentHover text-white py-6 font-black tracking-[0.3em] transition-all disabled:opacity-50"
                >
                  {submitting ? 'RESERVING STOCK...' : 'COMPLETE PURCHASE'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

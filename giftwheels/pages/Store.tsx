
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../db';
import { Product } from '../types';

const Store: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const all = await db.products.toArray();
      setProducts(all.sort((a, b) => (b.id || 0) - (a.id || 0)));
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const getStockStatus = (qty: number) => {
    if (qty === 0) return { label: 'OUT OF STOCK', color: 'text-statusOutOfStock' };
    if (qty <= 5) return { label: 'LOW STOCK', color: 'text-statusLowStock' };
    return { label: 'IN STOCK', color: 'text-statusInStock' };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter">COLLECTION</h1>
          <p className="text-textSecondary mt-2">Browsing {products.length} unique models</p>
        </div>
      </header>

      {products.length === 0 ? (
        <div className="text-center py-24 bg-secondary border border-border rounded-xl">
          <p className="text-textSecondary mb-4">No models found in the inventory.</p>
          <Link to="/" className="text-accent font-bold hover:underline">Back to Home</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {products.map((product) => {
            const status = getStockStatus(product.stock_quantity);
            return (
              <div 
                key={product.id} 
                className="group bg-secondary border border-border overflow-hidden rounded-sm hover:border-accent/50 transition-all"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-[4/3] overflow-hidden bg-black relative">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    {product.stock_quantity === 0 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="border-2 border-statusOutOfStock text-statusOutOfStock px-4 py-1 font-black transform -rotate-12">SOLD OUT</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-bold text-sm md:text-lg uppercase tracking-tight line-clamp-1 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-accent font-black md:text-xl">₹{product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="text-[10px] bg-border px-2 py-0.5 text-textSecondary rounded-full uppercase tracking-tighter">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <span className={`text-[10px] font-bold tracking-widest ${status.color}`}>
                        {status.label}
                      </span>
                      <span className="text-[10px] font-bold text-white bg-accent px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        VIEW
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Store;

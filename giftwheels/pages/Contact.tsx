
import React, { useState } from 'react';
import { db } from '../db';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await db.contacts.add({
        ...formData,
        date: Date.now()
      });
      setSent(true);
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 animate-in fade-in duration-700">
      <header className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white">Contact Us</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
        {/* SECTION 1: CONTACT INFORMATION */}
        <section className="space-y-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-textSecondary mb-2">Phone</p>
            <p className="text-2xl md:text-3xl font-black text-white tracking-tighter">+91 9110242527</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-textSecondary mb-2">Email</p>
            <p className="text-2xl md:text-3xl font-black text-white tracking-tighter">giftwheels2@gmail.com</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-textSecondary mb-2">Address</p>
            <p className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-tight">
              41-A Appartment, LPU, <br />Punjab 144411
            </p>
          </div>
        </section>

        {/* SECTION 2: CONTACT FORM */}
        <section className="bg-secondary p-8 md:p-12 border border-border rounded-sm">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-8">
              <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Message Sent</h2>
              <p className="text-textSecondary text-sm">Thank you for reaching out. We have received your message.</p>
              <button 
                onClick={() => setSent(false)}
                className="text-accent font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-primary border border-border p-4 text-white focus:border-accent outline-none transition-colors" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">Phone</label>
                <input 
                  required
                  type="tel" 
                  className="w-full bg-primary border border-border p-4 text-white focus:border-accent outline-none transition-colors" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-textSecondary mb-2">Message</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-primary border border-border p-4 text-white focus:border-accent outline-none resize-none transition-colors" 
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <button 
                disabled={submitting}
                type="submit" 
                className="w-full bg-accent hover:bg-accentHover text-white py-5 font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default Contact;

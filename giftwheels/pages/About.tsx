
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-32">
      <header className="mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
          About GiftWheels
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {/* Column 1 */}
        <div className="space-y-8">
          <p className="text-textSecondary text-lg leading-relaxed">
            GiftWheels was born from a deep passion for cars, speed, and the craft of collecting diecast models. <span className="text-white font-semibold">Hot Wheels are more than toys</span>—they are miniature representations of automotive design, engineering, and culture, each carrying its own identity and story.
          </p>
          <p className="text-textSecondary text-lg leading-relaxed">
            What began as a personal interest evolved into a dedicated pursuit of sourcing authentic, well-maintained diecast models. Through careful selection, collector networks, and attention to detail, GiftWheels was created as a trusted destination for enthusiasts who value originality, condition, and proper handling.
          </p>
        </div>

        {/* Column 2 */}
        <div className="space-y-8">
          <p className="text-textSecondary text-lg leading-relaxed">
            At GiftWheels, every product is <span className="text-white font-semibold">100% authentic</span> and sold <span className="text-white font-semibold">strictly at MRP</span>—no inflated prices, no artificial hype. Each model is handled with care, securely packed, and shipped with the same standards expected by serious collectors.
          </p>
          <p className="text-textSecondary text-lg leading-relaxed">
            Whether you’re starting your collection, searching for a specific model, or looking for a meaningful gift, GiftWheels aims to provide a reliable, transparent, and collector-first experience.
          </p>
        </div>
      </div>

      <div className="mt-16 pt-16 border-t border-border/30">
        <p className="text-white text-xl md:text-2xl font-black uppercase tracking-tight italic leading-snug">
          Driven by passion. Built for collectors. Welcome to GiftWheels.
        </p>
      </div>
    </div>
  );
};

export default About;

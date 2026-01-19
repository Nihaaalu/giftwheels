
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 filter grayscale"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6">
          DRIVEN BY <span className="text-accent italic">PASSION</span>
        </h1>
        <p className="text-lg md:text-2xl text-textSecondary font-medium mb-10 max-w-2xl mx-auto">
          Exclusive die-cast models for the ultimate collector. Discover engineering excellence in 1/64 scale.
        </p>
        <Link 
          to="/store" 
          className="inline-block bg-accent hover:bg-accentHover text-white px-10 py-4 rounded-full text-lg font-bold tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-accent/20"
        >
          SHOP NOW
        </Link>
      </div>

      <div className="absolute bottom-10 left-0 w-full flex justify-center opacity-40">
        <div className="flex gap-4 items-center animate-pulse">
          <div className="w-12 h-[1px] bg-white"></div>
          <span className="text-[10px] uppercase tracking-widest font-bold">PREMIUM DIECAST COLLECTION</span>
          <div className="w-12 h-[1px] bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;

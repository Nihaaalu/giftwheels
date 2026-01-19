
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = !!localStorage.getItem('admin_session');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Store', path: '/store' },
    { name: 'About', path: '/about' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-primary text-textPrimary selection:bg-accent selection:text-white font-['Inter']">
      {/* Redesigned Header */}
      <nav className="sticky top-0 z-[100] bg-primary border-b border-border h-16 md:h-[72px] flex items-center px-6 md:px-12">
        {/* Desktop Header Content */}
        <div className="w-full flex justify-between items-center h-full">
          {/* Mobile: Hamburger Left, Desktop: Logo Left */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white mr-4 focus:outline-none"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic">
              giftwheels
            </Link>
          </div>

          {/* Desktop Center: Primary Links */}
          <div className="hidden md:flex items-center gap-10 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-wider h-full flex items-center transition-colors border-b-2 ${
                  isActive(link.path) 
                    ? 'text-accent border-accent' 
                    : 'text-white border-transparent hover:text-accent'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right: Secondary Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/contact" 
              className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                isActive('/contact') ? 'text-accent' : 'text-white hover:text-accent'
              }`}
            >
              Contact
            </Link>
            {isAdmin ? (
              <div className="flex items-center gap-4">
                <Link to="/admin" className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-accent transition-all">Panel</Link>
                <button onClick={handleLogout} className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-accent">Logout</button>
              </div>
            ) : (
              <Link to="/admin/login" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white flex items-center gap-1 transition-all">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Admin
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 top-16 bg-primary z-[99] transition-transform duration-300 md:hidden ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col p-8 gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-black uppercase tracking-tighter ${isActive(link.path) ? 'text-accent' : 'text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-black uppercase tracking-tighter ${isActive('/contact') ? 'text-accent' : 'text-white'}`}
            >
              Contact
            </Link>
            <Link 
              to="/privacy-policy" 
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-black uppercase tracking-tighter ${isActive('/privacy-policy') ? 'text-accent' : 'text-white'}`}
            >
              Privacy & Policy
            </Link>
            <div className="pt-8 mt-8 border-t border-border">
              <Link 
                to="/admin/login" 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-white/40"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Redesigned Footer */}
      <footer className="bg-secondary border-t border-border py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-textSecondary">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black uppercase italic text-white tracking-tighter">giftwheels</h2>
            <p className="text-sm max-w-xs leading-relaxed">
              Curating automotive heritage for enthusiasts and collectors. Built for the chase.
            </p>
            <div className="pt-4 space-y-2 text-sm">
              <p className="hover:text-white transition-colors cursor-default">+91 9110242527</p>
              <p className="hover:text-white transition-colors cursor-default">giftwheels2@gmail.com</p>
              <p className="hover:text-white transition-colors cursor-default">41-A Appartment, LPU, Punjab 144411</p>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-2">Navigation</h3>
            <Link to="/" className="hover:text-white transition-colors text-sm">Home</Link>
            <Link to="/store" className="hover:text-white transition-colors text-sm">Store</Link>
            <Link to="/about" className="hover:text-white transition-colors text-sm">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors text-sm">Contact</Link>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-2">Legal</h3>
            <Link to="/privacy-policy" className="hover:text-white transition-colors text-sm">Privacy & Policy</Link>
            <Link to="/admin/login" className="hover:text-white transition-colors text-sm">Admin Login</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-textSecondary">
          <p>© {new Date().getFullYear()} GiftWheels. No payment processing online.</p>
          <p>Designed for Collectors.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

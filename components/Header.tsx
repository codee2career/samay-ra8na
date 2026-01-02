
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-[#F7C600] flex items-center justify-center font-black text-black text-lg skew-x-[-12deg] shadow-[0_0_15px_rgba(247,198,0,0.3)]">
            L
          </div>
          <span className="font-black text-xl tracking-tighter uppercase hidden sm:block group-hover:text-[#F7C600] transition-colors italic">
            Latent<span className="text-[#F7C600]">TV</span>
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-white" : "hover:text-white transition-colors"}>Episodes</NavLink>
          <a href="#" className="hover:text-white transition-colors">Trending</a>
          <a href="#" className="hover:text-white transition-colors">Live</a>
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-1.5 focus-within:border-[#F7C600]/30 transition-colors">
          <Search size={14} className="text-white/40" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-[11px] font-bold w-24 focus:w-40 transition-all uppercase tracking-wider"
          />
        </div>

        <div className="flex gap-2">
          <a 
            href="https://t.me/example_channel" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-xl bg-[#F7C600] text-black text-[11px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(247,198,0,0.3)] transition-transform active:scale-95 flex items-center gap-2"
          >
            Join TG
          </a>
          <button className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
            <User size={18} className="text-white/60" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

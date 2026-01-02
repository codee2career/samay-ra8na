
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import VideoCard from './components/VideoCard';
import VideoPlayerView from './components/VideoPlayerView';
import AdUnit from './components/AdUnit';
import { EPISODES } from './constants';
import { Play, Info, ArrowRight, ArrowLeft } from 'lucide-react';

const Home: React.FC = () => {
  // Using the high-fidelity Season Collage / Finale thumbnail for the main screen as requested
  const mainScreenThumbnail = "https://i.ytimg.com/vi/78_e4vXw7rM/maxresdefault.jpg";
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 3;

  const totalPages = Math.ceil(EPISODES.length / pageSize);
  const currentEpisodes = EPISODES.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const goToNextPage = () => {
    if (pageIndex < totalPages - 1) {
      setPageIndex(pageIndex + 1);
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  };

  const getNextRangeLabel = () => {
    const nextStart = (pageIndex + 1) * pageSize + 1;
    const nextEnd = Math.min((pageIndex + 2) * pageSize, EPISODES.length);
    if (nextStart > EPISODES.length) return "";
    return `Episodes ${nextStart}-${nextEnd}`;
  };

  return (
    <div className="pb-20">
      {/* Hero Section - Using Main Screen Thumbnail */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={mainScreenThumbnail} 
            className="w-full h-full object-cover opacity-90 transition-transform duration-[20s] hover:scale-110"
            alt="India's Got Latent Season Promo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-yellow-900/5 mix-blend-overlay pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#F7C600]/20 border border-[#F7C600]/40 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
               <div className="w-2 h-2 rounded-full bg-[#F7C600] animate-pulse shadow-[0_0_10px_#F7C600]" />
               <span className="text-[#F7C600] text-[11px] font-black uppercase tracking-[0.25em] italic">Season Finale • Out Now</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] italic mb-6">
              INDIA'S GOT <br />
              <span className="text-[#F7C600] drop-shadow-[0_5px_15px_rgba(247,198,0,0.4)]">LATENT</span>
            </h1>
            
            <p className="mt-4 text-white/80 font-bold text-base md:text-lg leading-relaxed line-clamp-3 max-w-xl uppercase tracking-tight italic">
              Experience the chaos as Samay Raina and a legendary panel of judges discover India's most hidden and hilariously latent talents.
            </p>
            
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link 
                to={`/watch/ep8`}
                className="flex items-center gap-3 bg-[#F7C600] text-black px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl shadow-[#F7C600]/30 hover:scale-105 transition-transform italic"
              >
                <Play fill="black" size={20} />
                Watch Finale
              </Link>
              <button className="flex items-center gap-3 bg-white/5 backdrop-blur-xl text-white border border-white/10 px-8 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white/10 transition-colors italic">
                <Info size={20} />
                Series Info
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement between Hero and Episodes */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <AdUnit />
      </div>

      {/* Main Grid Section with Batch Pagination */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="mb-16">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
               <div className="w-1.5 h-8 bg-[#F7C600] rounded-full" />
               <h2 className="text-2xl font-black uppercase tracking-tighter italic">
                 Episodes <span className="text-[#F7C600]">{pageIndex * pageSize + 1} - {Math.min((pageIndex + 1) * pageSize, EPISODES.length)}</span>
               </h2>
            </div>
            <div className="h-px flex-1 bg-white/5 mx-8" />
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Page</span>
               <span className="text-[10px] font-black text-[#F7C600]">{pageIndex + 1} / {totalPages}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 min-h-[400px]">
            {currentEpisodes.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-6">
            {pageIndex > 0 && (
              <button 
                onClick={goToPrevPage}
                className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-5 rounded-2xl transition-all italic"
              >
                <ArrowLeft size={20} className="text-white/40 group-hover:text-[#F7C600]" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white">Previous</span>
              </button>
            )}

            {pageIndex < totalPages - 1 && (
              <button 
                onClick={goToNextPage}
                className="group flex items-center gap-6 bg-[#F7C600] text-black px-10 py-5 rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-[#F7C600]/20 italic"
              >
                <div className="flex flex-col items-start">
                  <span className="text-[9px] font-black uppercase tracking-[0.1em] opacity-60">Next Up</span>
                  <span className="text-[12px] font-black uppercase tracking-[0.2em]">{getNextRangeLabel()}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center">
                  <ArrowRight size={20} />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f0f0f] text-white selection:bg-[#F7C600] selection:text-black">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:id" element={<VideoPlayerView />} />
          </Routes>
        </main>

        <footer className="py-24 border-t border-white/5 px-6 text-center bg-black/40">
           <div className="mb-8 flex justify-center items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#F7C600] flex items-center justify-center font-black text-black text-lg skew-x-[-12deg]">L</div>
              <span className="font-black tracking-tighter uppercase text-xl italic">Latent<span className="text-[#F7C600]">TV</span></span>
           </div>
           <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.4em] mb-4 italic">Unfiltered • Raw • Latent</p>
           <p className="text-white/10 text-[9px] font-bold uppercase tracking-widest">© 2024 Samay Raina Productions. All rights reserved.</p>
        </footer>

        {/* Floating Mobile Telegram Button */}
        <a 
          href="https://t.me/example_channel" 
          className="fixed bottom-8 right-8 w-16 h-16 bg-[#F7C600] text-black rounded-3xl flex items-center justify-center shadow-3xl shadow-[#F7C600]/40 z-50 md:hidden active:scale-90 transition-all rotate-3 hover:rotate-0"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.35-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.36-.48 1-.72 3.94-1.72 6.57-2.85 7.89-3.4 3.76-1.56 4.54-1.83 5.05-1.84.11 0 .36.03.52.16.13.11.17.26.19.37.02.12.02.24.01.37z"/>
          </svg>
        </a>
      </div>
    </Router>
  );
};

export default App;

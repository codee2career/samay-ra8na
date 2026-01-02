import React, { useState } from 'react';
/* Use react-router for routing components and Link instead of react-router-dom to fix missing export errors in v7 environments */
import { HashRouter as Router, Routes, Route, Link } from 'react-router';
import Header from './components/Header';
import VideoCard from './components/VideoCard';
import VideoPlayerView from './components/VideoPlayerView';
import AdUnit from './components/AdUnit';
import { EPISODES } from './constants';
import { Play, Info, ArrowRight, ArrowLeft, Heart, Youtube, Instagram, ExternalLink } from 'lucide-react';

const Home: React.FC = () => {
  const mainScreenThumbnail = "https://drive.google.com/thumbnail?id=1RtacSVIIJsgtVVtgtodDzFC8b3Ioc-qG&sz=w1280";
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 6; 

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
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={mainScreenThumbnail} 
            className="w-full h-full object-cover opacity-90 transition-transform duration-[20s] hover:scale-110"
            alt="India's Got Latent Season Promo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] dark:from-[#050505] via-[#FAFAFA]/40 dark:via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA] dark:from-[#050505] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#D9FF00]/10 border border-[#D9FF00]/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
               <div className="w-2 h-2 rounded-full bg-[#D9FF00] animate-pulse shadow-[0_0_10px_#D9FF00]" />
               <span className="text-[#D9FF00] text-[11px] font-black uppercase tracking-[0.25em] italic text-shadow">Season Finale • Out Now</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] italic mb-6 text-slate-900 dark:text-white">
              INDIA'S GOT <br />
              <span className="text-[#D9FF00] drop-shadow-[0_0_20px_rgba(217,255,0,0.5)]">LATENT</span>
            </h1>
            
            <p className="mt-4 text-slate-600 dark:text-white/80 font-bold text-base md:text-lg leading-relaxed line-clamp-3 max-w-xl uppercase tracking-tight italic">
              Experience the chaos as Samay Raina and a legendary panel of judges discover India's most hidden and hilariously latent talents.
            </p>
            
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link 
                to={`/watch/ep8`}
                className="flex items-center gap-3 bg-[#D9FF00] text-black px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl shadow-[#D9FF00]/40 hover:scale-105 transition-transform italic"
              >
                <Play fill="black" size={20} />
                Watch Finale
              </Link>
              <button className="flex items-center gap-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 px-8 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-colors italic">
                <Info size={20} />
                Series Info
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Bottom Ad */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <AdUnit slot="8617765071" format="autorelaxed" />
      </div>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="mb-16">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
               <div className="w-1.5 h-8 bg-[#D9FF00] rounded-full shadow-[0_0_10px_#D9FF00]" />
               <h2 className="text-2xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
                 Episodes <span className="text-[#D9FF00]">{pageIndex * pageSize + 1} - {Math.min((pageIndex + 1) * pageSize, EPISODES.length)}</span>
               </h2>
            </div>
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/5 mx-8" />
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">Page</span>
               <span className="text-[10px] font-black text-[#D9FF00]">{pageIndex + 1} / {totalPages}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {currentEpisodes.map((video, index) => (
              <React.Fragment key={video.id}>
                <VideoCard video={video} />
                {(index + 1) % 3 === 0 && index !== currentEpisodes.length - 1 && (
                   <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                      <AdUnit 
                        slot="8378076011" 
                        format="fluid" 
                        layoutKey="-6t+ed+2i-1n-4w"
                        label="Promoted Content"
                        className="my-4"
                      />
                   </div>
                )}
              </React.Fragment>
            ))}
            
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                <AdUnit 
                  slot="8378076011" 
                  format="fluid" 
                  layoutKey="-6t+ed+2i-1n-4w"
                  label="More for you"
                />
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-6">
            {pageIndex > 0 && (
              <button 
                onClick={goToPrevPage}
                className="group flex items-center gap-4 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 px-8 py-5 rounded-2xl transition-all italic"
              >
                <ArrowLeft size={20} className="text-slate-400 dark:text-white/40 group-hover:text-[#D9FF00]" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white">Previous</span>
              </button>
            )}

            {pageIndex < totalPages - 1 && (
              <button 
                onClick={goToNextPage}
                className="group flex items-center gap-6 bg-[#D9FF00] text-black px-10 py-5 rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-[#D9FF00]/40 italic"
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
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-midnight text-slate-900 dark:text-white selection:bg-[#D9FF00] selection:text-black transition-colors duration-300">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:id" element={<VideoPlayerView />} />
          </Routes>
        </main>

        <footer className="py-24 border-t border-slate-200 dark:border-white/5 px-6 text-center bg-slate-100 dark:bg-black/40 relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#D9FF00]/30 to-transparent" />
           
           <div className="max-w-4xl mx-auto">
             <div className="mb-12 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-[#D9FF00] flex items-center justify-center font-black text-black text-3xl skew-x-[-12deg] shadow-2xl shadow-[#D9FF00]/40 mb-6 transition-transform hover:scale-110 duration-500">L</div>
                <span className="font-black tracking-tighter uppercase text-3xl italic text-slate-900 dark:text-white">
                  Latent<span className="text-[#D9FF00]">TV</span>
                </span>
                <p className="text-slate-400 dark:text-white/20 text-[10px] font-black uppercase tracking-[0.5em] mt-2 italic">Unfiltered • Raw • Latent</p>
             </div>

             <div className="mb-12 p-8 rounded-[2rem] bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 shadow-xl inline-block mx-auto backdrop-blur-sm">
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-white/40 mb-4">Hosted By</h4>
                <p className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white mb-2">Samay Raina</p>
                <p className="text-xs font-black text-[#D9FF00] uppercase tracking-[0.2em] mb-6">Comedian, YouTuber & Host of India's Got Latent</p>
                <div className="flex justify-center gap-4">
                   <a href="https://www.instagram.com/maisamayhoon?igsh=M2JwNG5vMHBwd24y" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-[#D9FF00]/20 transition-colors text-slate-600 dark:text-white/60 hover:text-[#D9FF00]"><Instagram size={20} /></a>
                   <a href="https://www.youtube.com/channel/UCAov2BBv1ZJav0c_yHEciAw" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-[#D9FF00]/20 transition-colors text-slate-600 dark:text-white/60 hover:text-[#D9FF00]"><Youtube size={20} /></a>
                   <a href="#" className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-[#D9FF00]/20 transition-colors text-slate-600 dark:text-white/60 hover:text-[#D9FF00]"><Heart size={20} /></a>
                </div>
             </div>

             <div className="max-w-xl mx-auto space-y-8">
                <div className="space-y-2">
                  <h5 className="text-[#D9FF00] text-sm font-black uppercase tracking-[0.3em] italic">All Credit Goes To Samay Raina</h5>
                  <p className="text-slate-400 dark:text-white/30 text-[11px] font-bold leading-relaxed px-4">
                    This is not an official website. Just a fun project to keep the <span className="text-[#D9FF00]">Samay Raina Legacy Alive!</span>
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 dark:text-white/10">
                   <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                   <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/5" />
                   <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                   <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/5" />
                   <span>© 2024 LatentTV Fan Project</span>
                </div>
             </div>
           </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
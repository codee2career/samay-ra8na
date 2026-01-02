
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router';
import Header from './components/Header';
import VideoCard from './components/VideoCard';
import VideoPlayerView from './components/VideoPlayerView';
import AdUnit from './components/AdUnit';
import { EPISODES } from './constants';
import { Play, Info, ArrowRight, ArrowLeft, Heart, Youtube, Instagram, Copyright, Star } from 'lucide-react';

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
      <section className="relative w-full h-[90vh] min-h-[700px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={mainScreenThumbnail} 
            className="w-full h-full object-cover opacity-90 scale-105 transition-transform duration-[30s] hover:scale-100"
            alt="India's Got Latent Season Promo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] dark:from-[#050505] via-[#FAFAFA]/20 dark:via-[#050505]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA] dark:from-[#050505] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 bg-black/40 border border-[#D9FF00]/40 rounded-full px-5 py-2 mb-8 backdrop-blur-xl">
               <div className="w-2.5 h-2.5 rounded-full bg-[#D9FF00] animate-pulse shadow-[0_0_15px_#D9FF00]" />
               <span className="text-[#D9FF00] text-[10px] font-black uppercase tracking-[0.4em] italic">Season Finale • Stream Now</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] italic mb-8 text-slate-900 dark:text-white select-none">
              INDIA'S GOT <br />
              <span className="text-[#D9FF00] drop-shadow-[0_0_30px_rgba(217,255,0,0.6)]">LATENT</span>
            </h1>
            
            <p className="mt-4 text-slate-700 dark:text-white/70 font-bold text-lg md:text-xl leading-relaxed max-w-2xl uppercase tracking-tight italic drop-shadow-sm">
              Samay Raina and the panel of chaos return. Witness the legendary search for talent that's hidden for a reason.
            </p>
            
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Link 
                to={`/watch/ep8`}
                className="flex items-center gap-4 bg-[#D9FF00] text-black px-12 py-6 rounded-2xl font-black uppercase text-sm tracking-[0.25em] shadow-2xl shadow-[#D9FF00]/40 hover:scale-105 hover:shadow-[#D9FF00]/60 transition-all italic active:scale-95"
              >
                <Play fill="black" size={24} />
                Watch Finale
              </Link>
              <button className="flex items-center gap-4 bg-white/10 dark:bg-white/5 backdrop-blur-2xl text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 px-10 py-6 rounded-2xl font-black uppercase text-sm tracking-[0.25em] hover:bg-white/20 transition-all italic">
                <Info size={24} />
                Series Info
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-6">
               <div className="w-2 h-10 bg-[#D9FF00] rounded-full shadow-[0_0_15px_rgba(217,255,0,0.4)]" />
               <h2 className="text-3xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
                 The <span className="text-[#D9FF00]">Library</span>
               </h2>
            </div>
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/5 mx-12 hidden md:block" />
            <div className="flex items-center gap-4">
               <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/20">Archive</span>
               <span className="text-[12px] font-black text-[#D9FF00] bg-[#D9FF00]/10 px-3 py-1 rounded-lg border border-[#D9FF00]/20">{pageIndex + 1} / {totalPages}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {currentEpisodes.map((video, index) => (
              <React.Fragment key={video.id}>
                <VideoCard video={video} />
                {(index + 1) % 3 === 0 && index !== currentEpisodes.length - 1 && (
                   <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                      <AdUnit 
                        slot="8378076011" 
                        format="fluid" 
                        layoutKey="-6t+ed+2i-1n-4w"
                        label="Trending Suggestions"
                        className="my-8"
                      />
                   </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="mt-24 flex flex-col md:flex-row items-center justify-center gap-8">
            {pageIndex > 0 && (
              <button 
                onClick={goToPrevPage}
                className="group flex items-center gap-6 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 px-10 py-6 rounded-2xl transition-all italic"
              >
                <ArrowLeft size={24} className="text-slate-400 dark:text-white/40 group-hover:text-[#D9FF00]" />
                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white">Previous</span>
              </button>
            )}

            {pageIndex < totalPages - 1 && (
              <button 
                onClick={goToNextPage}
                className="group flex items-center gap-10 bg-[#D9FF00] text-black px-12 py-6 rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-[#D9FF00]/20 italic active:scale-95"
              >
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Continue</span>
                  <span className="text-[14px] font-black uppercase tracking-[0.2em]">{getNextRangeLabel()}</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center">
                  <ArrowRight size={24} />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      <footer className="py-24 border-t border-slate-200 dark:border-white/10 px-6 bg-[#050505] relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-[#D9FF00]/60 to-transparent" />
           
           <div className="max-w-7xl mx-auto relative z-10">
             
             {/* TOP SECTION: BIG BOLD CREDIT */}
             <div className="mb-20 text-center">
                <div className="inline-block px-10 py-6 border-2 border-[#D9FF00] rounded-[2rem] bg-[#D9FF00]/5 backdrop-blur-md mb-8">
                   <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-[#D9FF00] mb-4">
                     All Credit Goes To Samay Raina
                   </h2>
                   <p className="text-white/60 font-black uppercase tracking-[0.3em] text-xs md:text-sm max-w-3xl mx-auto leading-relaxed">
                     India's Got Latent is the intellectual property of Samay Raina. This platform is a non-profit fan tribute designed to celebrate the latency.
                   </p>
                </div>
             </div>

             {/* MAIN CREDITS GRID */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
                {/* Visionary Section */}
                <div className="bg-white/[0.03] border border-white/5 p-12 rounded-[3.5rem] relative group">
                    <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#D9FF00] rounded-2xl flex items-center justify-center shadow-2xl rotate-[-10deg]">
                       <Star size={32} className="text-black fill-black" />
                    </div>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-[#D9FF00] mb-8">Original Vision By</h4>
                    <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-white mb-6 leading-none">
                      SAMAY <br /> <span className="text-[#D9FF00]">RAINA</span>
                    </h3>
                    <div className="space-y-4">
                       <p className="text-lg font-black text-white/80 uppercase italic tracking-tight">Comedian. YouTuber. Legend.</p>
                       <p className="text-white/40 font-bold text-sm uppercase tracking-widest leading-loose">
                         The host who turned silence into a scoreboard. Experience the unfiltered madness of India's most latent talents.
                       </p>
                    </div>
                    <div className="mt-12 flex gap-6">
                       <a href="https://www.instagram.com/maisamayhoon?igsh=M2JwNG5vMHBwd24y" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-3 bg-white/5 hover:bg-[#D9FF00] hover:text-black border border-white/10 py-5 rounded-2xl transition-all font-black uppercase text-xs tracking-[0.2em] italic group">
                         <Instagram size={20} />
                         Instagram
                       </a>
                       <a href="https://www.youtube.com/channel/UCAov2BBv1ZJav0c_yHEciAw" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-3 bg-white/5 hover:bg-red-600 hover:text-white border border-white/10 py-5 rounded-2xl transition-all font-black uppercase text-xs tracking-[0.2em] italic group">
                         <Youtube size={20} />
                         YouTube
                       </a>
                    </div>
                </div>

                {/* Legacy & Project Info */}
                <div className="lg:pt-12 space-y-12">
                   <div className="p-12 bg-white text-black rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(217,255,0,0.2)] skew-x-[-2deg]">
                      <h4 className="font-black uppercase text-sm tracking-[0.3em] mb-4">Official Disclaimer</h4>
                      <p className="text-xl md:text-2xl font-black uppercase italic leading-[1.1] tracking-tighter">
                        This is not an official website. Just a fun project to keep the <span className="text-[#D9FF00] bg-black px-2 py-1">Samay Raina Legacy Alive!</span>
                      </p>
                   </div>

                   <div className="px-6 space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-[2px] bg-[#D9FF00]/40" />
                         <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Connect & Support</span>
                         <div className="w-12 h-[2px] bg-[#D9FF00]/40" />
                      </div>
                      <p className="text-white/40 text-sm font-bold uppercase tracking-widest leading-relaxed">
                         Support the latent culture by following the official handles of Samay Raina. All media and video contents belong to the original creator.
                      </p>
                   </div>
                </div>
             </div>

             {/* BOTTOM NAV */}
             <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-12 gap-10">
                <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.4em]">
                   <span className="text-white/40 hover:text-[#D9FF00] cursor-pointer transition-colors">Privacy</span>
                   <span className="text-white/40 hover:text-[#D9FF00] cursor-pointer transition-colors">Terms</span>
                   <span className="text-white/40 hover:text-[#D9FF00] cursor-pointer transition-colors">Credits</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                   <Copyright size={14} />
                   <span>2024 LatentTV • Fan Dedicated Platform</span>
                </div>
             </div>
           </div>
      </footer>
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
      </div>
    </Router>
  );
};

export default App;

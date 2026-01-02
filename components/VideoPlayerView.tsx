
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { EPISODES } from '../constants';
import AdUnit from './AdUnit';
import { Share2, Download, ArrowLeft, CheckCircle2, Clock, Settings, Check, Youtube, Instagram, Play, Sparkles, Star } from 'lucide-react';

const VideoPlayerView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quality, setQuality] = useState('1080p');
  const [isQualityMenuOpen, setIsQualityMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const video = EPISODES.find(v => v.id === id);
  const upNext = EPISODES.filter(v => v.id !== id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsQualityMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-6 bg-[#050505]">
        <h2 className="text-3xl font-black mb-6 uppercase italic tracking-tighter text-white">Episode <span className="text-[#D9FF00]">Not Found</span></h2>
        <button 
          onClick={() => navigate('/')}
          className="px-12 py-5 bg-[#D9FF00] text-black font-black uppercase tracking-[0.3em] rounded-2xl transition-all active:scale-95 shadow-2xl shadow-[#D9FF00]/30"
        >
          Return Home
        </button>
      </div>
    );
  }

  const driveEmbedUrl = `https://drive.google.com/file/d/${video.driveId}/preview`;

  const handleShare = () => {
    const shareData = {
      title: video.title,
      text: `Watch ${video.title} on LatentTV!`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => copyToClipboard());
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const qualities = ['1080p', '720p', '480p', 'Auto'];

  return (
    <div className="min-h-screen pt-16 pb-24 bg-[#050505]">
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:p-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          {/* Mobile Navigation */}
          <div className="px-6 py-5 flex items-center justify-between lg:hidden border-b border-white/5 bg-black/40 backdrop-blur-lg">
            <button onClick={() => navigate(-1)} className="text-[#D9FF00] p-2 hover:bg-[#D9FF00]/10 rounded-full transition-colors"><ArrowLeft size={28} /></button>
            <span className="font-black text-[12px] uppercase tracking-[0.4em] italic text-white/60">EP {video.episode} • <span className="text-[#D9FF00]">ON AIR</span></span>
            <div className="w-10" />
          </div>

          {/* Player Architecture */}
          <div className="w-full bg-black aspect-video lg:rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 relative group">
            <iframe 
              src={driveEmbedUrl} 
              className="w-full h-full border-0" 
              allow="autoplay; fullscreen"
              title={video.title}
            ></iframe>
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]" />
            
            <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-xl px-4 py-2 rounded-xl border border-[#D9FF00]/20 text-[10px] font-black uppercase tracking-widest text-[#D9FF00] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              {quality} ULTRA HD
            </div>
          </div>

          {/* Video Intel */}
          <div className="p-6 lg:px-0 mt-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 pb-8 border-b border-white/5">
              <div>
                <div className="flex items-center gap-4 mb-4">
                   <div className="bg-[#D9FF00] text-black text-[10px] font-black px-3 py-1 rounded-md skew-x-[-10deg]">SEASON 01</div>
                   <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Release: 2024</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black leading-[0.85] uppercase tracking-tighter italic text-white">
                  {video.title}
                </h1>
                {video.guest && (
                  <div className="flex items-center gap-3 mt-6">
                    <Sparkles size={18} className="text-[#D9FF00]" />
                    <span className="text-xl font-black text-white/40 uppercase tracking-[0.2em] italic">
                      GUEST PANEL: <span className="text-[#D9FF00] drop-shadow-[0_0_10px_rgba(217,255,0,0.3)]">{video.guest}</span>
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.25em]">
                <span className="bg-white/5 px-5 py-3 rounded-2xl border border-white/10 flex items-center gap-3 text-white/60">
                  <Clock size={16} className="text-[#D9FF00]" /> {video.duration}
                </span>
                <span className="bg-[#D9FF00]/10 text-[#D9FF00] px-5 py-3 rounded-2xl border border-[#D9FF00]/20">{video.size}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 relative">
              <a 
                href={`https://drive.google.com/uc?export=download&id=${video.driveId}`}
                className="flex-1 min-w-[240px] flex items-center justify-center gap-4 bg-[#D9FF00] text-black px-10 py-6 rounded-[1.5rem] transition-all hover:scale-[1.03] active:scale-95 font-black uppercase text-sm tracking-[0.2em] shadow-3xl shadow-[#D9FF00]/20 italic"
              >
                <Download size={24} />
                Secure Download
              </a>

              <div className="relative flex-1 min-w-[180px]" ref={menuRef}>
                <button 
                  onClick={() => setIsQualityMenuOpen(!isQualityMenuOpen)}
                  className={`w-full flex items-center justify-center gap-4 px-10 py-6 rounded-[1.5rem] transition-all border font-black uppercase text-sm tracking-[0.2em] italic ${isQualityMenuOpen ? 'bg-[#D9FF00] text-black border-[#D9FF00]' : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'}`}
                >
                  <Settings size={22} className={isQualityMenuOpen ? 'animate-spin' : ''} />
                  {quality}
                </button>
                
                {isQualityMenuOpen && (
                  <div className="absolute bottom-full mb-6 left-0 w-full bg-[#111] border border-white/10 rounded-3xl p-3 shadow-3xl backdrop-blur-3xl z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    <div className="p-4 mb-2 border-b border-white/5">
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Bitrate Selection</p>
                    </div>
                    {qualities.map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setQuality(q);
                          setIsQualityMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-5 py-4 rounded-2xl hover:bg-[#D9FF00]/10 transition-colors group"
                      >
                        <span className={`text-xs font-black uppercase tracking-[0.2em] ${quality === q ? 'text-[#D9FF00]' : 'text-white/40 group-hover:text-white'}`}>
                          {q}
                        </span>
                        {quality === q && <Check size={18} className="text-[#D9FF00]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={handleShare}
                className="flex-[0.5] min-w-[140px] flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 px-10 py-6 rounded-[1.5rem] transition-all border border-white/10 font-black uppercase text-sm tracking-[0.2em] text-white/80 italic"
              >
                <Share2 size={22} />
                Share
              </button>
            </div>

            <div className="mt-16 bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 backdrop-blur-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#D9FF00]/5 blur-[80px] rounded-full -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity" />
               <h3 className="font-black uppercase italic text-2xl mb-8 flex items-center gap-5 text-white">
                <div className="w-2 h-8 bg-[#D9FF00] rounded-full shadow-[0_0_20px_rgba(217,255,0,0.5)]" />
                Episode <span className="text-[#D9FF00]">Brief</span>
              </h3>
              <p className="text-white/50 text-xl leading-relaxed font-bold italic max-w-4xl">
                {video.description}
              </p>
              
              <div className="mt-12 flex flex-wrap gap-4">
                {['SAMAY RAINA', 'LATENT TV', 'LEGACY', 'RAW COMEDY'].map(tag => (
                  <span key={tag} className="text-[#D9FF00]/60 text-[10px] font-black uppercase tracking-[0.3em] bg-[#D9FF00]/5 px-6 py-3 rounded-2xl border border-[#D9FF00]/10 hover:border-[#D9FF00]/40 hover:text-[#D9FF00] cursor-pointer transition-all">#{tag}</span>
                ))}
              </div>
            </div>

            <div className="mt-12">
               <AdUnit slot="8617765071" format="autorelaxed" label="Sponsored Content" />
            </div>
          </div>
        </div>

        {/* Sidebar Intelligence */}
        <div className="lg:col-span-4 space-y-12">
          {/* Channel Info Card */}
          <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-md">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-[1.5rem] bg-white/10 border border-white/10 overflow-hidden shadow-2xl relative">
                 <img src="https://yt3.googleusercontent.com/ytc/AIdro_moF326uEw-k0_0NTo4XmE93XF4l5w8W-3Y_mX-6Q=s160-c-k-c0x00ffffff-no-rj" className="w-full h-full object-cover" alt="author" />
                 <div className="absolute inset-0 bg-black/20" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-black uppercase tracking-tighter italic text-white">SAMAY RAINA</p>
                  <CheckCircle2 size={18} className="text-[#D9FF00] fill-[#D9FF00]/10" />
                </div>
                <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em] mt-1">THE ORIGINATOR</p>
              </div>
            </div>
            <a 
              href="https://www.youtube.com/channel/UCAov2BBv1ZJav0c_yHEciAw"
              target="_blank"
              className="w-full flex items-center justify-center gap-4 bg-red-600 text-white py-5 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] hover:bg-red-700 transition-all shadow-xl shadow-red-600/10 italic"
            >
              <Youtube size={20} />
              SUBSCRIBE 3M+
            </a>
          </div>

          <div className="px-6 lg:px-0">
            <h2 className="text-[12px] font-black uppercase tracking-[0.5em] italic text-white/20 mb-8 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              Playlist <span className="text-white/40">Continuity</span>
            </h2>
            
            <div className="flex flex-col gap-8 custom-scrollbar max-h-[800px] overflow-y-auto pr-4">
              {upNext.map((v) => (
                <Link key={v.id} to={`/watch/${v.id}`} className="flex gap-6 group">
                  <div className="relative w-44 aspect-video rounded-2xl overflow-hidden bg-white/5 flex-shrink-0 border border-white/10 shadow-lg group-hover:shadow-[#D9FF00]/10 transition-all">
                    <img src={v.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={v.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                    <span className="absolute bottom-3 right-3 bg-black/90 px-2.5 py-1 text-[9px] font-black text-white rounded-lg border border-white/10 uppercase tracking-widest">{v.duration}</span>
                    <div className="absolute top-3 left-3 bg-[#D9FF00] text-black text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-tighter shadow-lg">
                      EP {v.episode}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center py-2">
                    <h4 className="text-[15px] font-black leading-tight line-clamp-2 uppercase group-hover:text-[#D9FF00] transition-colors italic tracking-tighter text-white">
                      {v.title}
                    </h4>
                    <div className="mt-3 flex items-center gap-3">
                       <span className="text-[10px] font-black text-[#D9FF00] uppercase tracking-widest opacity-80">
                         {v.guest || 'UNFILTERED'}
                       </span>
                       <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                       <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{v.size}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Social Power Box */}
          <div className="space-y-4">
             <div className="bg-gradient-to-br from-[#D9FF00] to-[#BEE600] p-10 rounded-[3rem] text-black shadow-3xl shadow-[#D9FF00]/10 overflow-hidden relative group">
               <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full -mr-20 -mt-20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <Instagram size={40} className="mb-6 opacity-20" />
               <h4 className="font-black uppercase text-3xl leading-[0.85] italic mb-6">THE LATENT <br />INSTAGRAM</h4>
               <p className="text-[12px] font-black leading-relaxed uppercase tracking-tighter opacity-70 mb-10">Follow Samay for raw BTS and daily madness.</p>
               <a 
                 href="https://www.instagram.com/maisamayhoon?igsh=M2JwNG5vMHBwd24y"
                 target="_blank"
                 className="w-full block text-center bg-black text-[#D9FF00] py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] shadow-2xl shadow-black/40 hover:scale-105 transition-all italic active:scale-95"
               >
                  FOLLOW LEGACY
               </a>
             </div>
             
             {/* BOLD CLEAR CREDIT SIDEBAR BOX */}
             <div className="p-10 text-center bg-[#D9FF00] rounded-[3rem] shadow-2xl shadow-[#D9FF00]/20">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                   <Star size={20} className="text-[#D9FF00] fill-[#D9FF00]" />
                </div>
                <h5 className="text-black text-xl font-black uppercase tracking-tighter italic mb-4 leading-none">All Credit Goes To <br /> Samay Raina</h5>
                <p className="text-black/60 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
                  Non-profit Fan project dedicated to keeping the Samay Raina Legacy Alive.
                </p>
             </div>
          </div>
        </div>

      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(217, 255, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(217, 255, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default VideoPlayerView;

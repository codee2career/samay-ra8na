import React, { useEffect, useState, useRef } from 'react';
/* Use react-router for useParams, useNavigate, and Link to fix missing export errors in current environment */
import { useParams, useNavigate, Link } from 'react-router';
import { EPISODES } from '../constants';
import AdUnit from './AdUnit';
import { Share2, Download, ArrowLeft, CheckCircle2, Clock, Settings, Check, Youtube, Instagram } from 'lucide-react';

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
        <h2 className="text-3xl font-black mb-6 uppercase italic tracking-tighter">Episode <span className="text-[#D9FF00]">Not Found</span></h2>
        <button 
          onClick={() => navigate('/')}
          className="px-10 py-4 bg-[#D9FF00] text-black font-black uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95 shadow-xl shadow-[#D9FF00]/20"
        >
          Go Home
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
    <div className="min-h-screen pt-16 pb-16 bg-[#050505]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:p-6">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          {/* Mobile Header Nav */}
          <div className="px-4 py-4 flex items-center justify-between lg:hidden border-b border-white/5 bg-black/40">
            <button onClick={() => navigate(-1)} className="text-white/60 p-2"><ArrowLeft size={24} /></button>
            <span className="font-black text-[10px] uppercase tracking-[0.3em] italic">Now <span className="text-[#D9FF00]">Playing</span></span>
            <div className="w-10" />
          </div>

          {/* Player Container */}
          <div className="w-full bg-black aspect-video lg:rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border border-white/5 relative group">
            <iframe 
              src={driveEmbedUrl} 
              className="w-full h-full border-0" 
              allow="autoplay; fullscreen"
              title={video.title}
            ></iframe>
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] opacity-50" />
            
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[10px] font-black uppercase tracking-widest text-[#D9FF00] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              Stream: {quality}
            </div>
          </div>

          {/* Metadata Section */}
          <div className="p-5 lg:px-2">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-5xl font-black leading-[0.9] uppercase tracking-tighter italic mb-2">
                  {video.title}
                </h1>
                {video.guest && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#D9FF00] animate-pulse" />
                    <span className="text-lg font-black text-white/40 uppercase tracking-widest italic">
                      GUEST: <span className="text-[#D9FF00]">{video.guest}</span>
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
                <span className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                  <Clock size={14} /> {video.duration}
                </span>
                <span className="bg-white/5 px-4 py-2 rounded-xl border border-white/5">{video.size}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 relative">
              <a 
                href={`https://drive.google.com/uc?export=download&id=${video.driveId}`}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-[#D9FF00] text-black px-8 py-5 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-[#D9FF00]/30 italic"
              >
                <Download size={20} />
                Download Episode
              </a>

              <div className="relative flex-1 min-w-[150px]" ref={menuRef}>
                <button 
                  onClick={() => setIsQualityMenuOpen(!isQualityMenuOpen)}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl transition-all border font-black uppercase text-xs tracking-[0.2em] italic ${isQualityMenuOpen ? 'bg-[#D9FF00] text-black border-[#D9FF00]' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                >
                  <Settings size={20} className={isQualityMenuOpen ? 'animate-spin-slow' : ''} />
                  Quality: {quality}
                </button>
                
                {isQualityMenuOpen && (
                  <div className="absolute bottom-full mb-4 left-0 w-full bg-[#111111] border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl z-50 overflow-hidden">
                    <div className="p-3 mb-2 border-b border-white/5">
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Select Playback Quality</p>
                    </div>
                    {qualities.map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setQuality(q);
                          setIsQualityMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#D9FF00]/10 transition-colors group"
                      >
                        <span className={`text-xs font-black uppercase tracking-widest ${quality === q ? 'text-[#D9FF00]' : 'text-white/60 group-hover:text-white'}`}>
                          {q}
                        </span>
                        {quality === q && <Check size={16} className="text-[#D9FF00]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={handleShare}
                className="flex-1 min-w-[150px] flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 px-8 py-5 rounded-2xl transition-all border border-white/10 font-black uppercase text-xs tracking-[0.2em] italic"
              >
                <Share2 size={20} />
                Share
              </button>
            </div>

            <div className="mt-12 flex items-center justify-between bg-white/[0.03] p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden skew-x-[-6deg] shadow-xl">
                   <img src="https://yt3.googleusercontent.com/ytc/AIdro_moF326uEw-k0_0NTo4XmE93XF4l5w8W-3Y_mX-6Q=s160-c-k-c0x00ffffff-no-rj" className="w-full h-full object-cover" alt="author" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-black uppercase tracking-tight italic">{video.author}</p>
                    <CheckCircle2 size={16} className="text-blue-500 fill-blue-500/20" />
                  </div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mt-1">Creator & Host</p>
                </div>
              </div>
              <a 
                href="https://www.youtube.com/channel/UCAov2BBv1ZJav0c_yHEciAw"
                target="_blank"
                className="hidden sm:block bg-red-600 text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-red-600/10 italic"
              >
                Subscribe
              </a>
            </div>

            <div className="mt-12">
               <AdUnit slot="8617765071" format="autorelaxed" />
            </div>

            {/* Context/Description */}
            <div className="mt-12">
              <h3 className="font-black uppercase italic text-xl mb-6 flex items-center gap-4">
                <div className="w-1.5 h-6 bg-[#D9FF00] rounded-full shadow-[0_0_10px_#D9FF00]" />
                Inside the <span className="text-[#D9FF00]">Latency</span>
              </h3>
              <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8">
                <p className="text-white/60 text-lg leading-relaxed font-bold italic">
                  {video.description}
                </p>
                
                {/* NEW: In-Article Ad Placement */}
                <div className="my-10">
                  <AdUnit 
                    slot="4315557985" 
                    format="fluid" 
                    layout="in-article" 
                    textAlign="center"
                    label="Continue Reading" 
                  />
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  {['SAMAY RAINA', 'LATENT TALENT', 'UNFILTERED', 'COMEDY'].map(tag => (
                    <span key={tag} className="text-[#D9FF00] text-[10px] font-black uppercase tracking-[0.2em] bg-[#D9FF00]/5 px-5 py-2.5 rounded-xl border border-[#D9FF00]/10 hover:bg-[#D9FF00]/20 cursor-pointer transition-colors">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Sidebar */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <div className="px-5 lg:px-0 flex items-center justify-between mb-8">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] italic text-white/30 flex items-center gap-3">
              <div className="w-1 h-4 bg-white/20 rounded-full" />
              Up <span className="text-white/60">Next</span>
            </h2>
            <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-[#D9FF00] hover:underline">View All</Link>
          </div>
          
          <div className="flex flex-col gap-6 px-5 lg:px-0 max-h-[1200px] overflow-y-auto custom-scrollbar pr-2">
            {upNext.map((v) => (
              <Link key={v.id} to={`/watch/${v.id}`} className="flex gap-5 group">
                <div className="relative w-40 aspect-video rounded-xl overflow-hidden bg-white/5 flex-shrink-0 border border-white/5">
                  <img src={v.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={v.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-2 right-2 bg-black/90 px-2 py-0.5 text-[9px] font-black text-white rounded-md border border-white/10 uppercase tracking-widest">{v.duration}</span>
                  <div className="absolute top-2 left-2 bg-[#D9FF00] text-black text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-lg">
                    EP {v.episode}
                  </div>
                </div>
                <div className="flex flex-col justify-center py-1">
                  <h4 className="text-[14px] font-black leading-tight line-clamp-2 uppercase group-hover:text-[#D9FF00] transition-colors italic tracking-tighter">
                    {v.title}
                  </h4>
                  <div className="mt-2 flex items-center gap-2">
                     {v.guest && (
                       <span className="text-[10px] font-black text-[#D9FF00] uppercase tracking-wider opacity-60">
                         {v.guest}
                       </span>
                     )}
                     <span className="w-1 h-1 rounded-full bg-white/10" />
                     <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{v.size}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 lg:sticky lg:top-24 bg-gradient-to-br from-[#D9FF00] to-[#E5FF45] p-8 rounded-[2.5rem] text-black shadow-2xl shadow-[#D9FF00]/10 overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16 blur-3xl" />
             <h4 className="font-black uppercase text-2xl leading-[0.9] italic mb-4">THE LATENT <br />HUB</h4>
             <p className="text-[11px] font-black mt-2 leading-relaxed uppercase tracking-tighter opacity-80">Follow Samay Raina on Instagram for daily chaos and BTS updates.</p>
             <a 
               href="https://www.instagram.com/maisamayhoon?igsh=M2JwNG5vMHBwd24y"
               target="_blank"
               className="mt-8 block text-center w-full bg-black text-[#D9FF00] py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-black/30 active:scale-95 transition-transform italic"
             >
                FOLLOW INSTAGRAM
             </a>
          </div>
        </div>

      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(217, 255, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(217, 255, 0, 0.4);
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default VideoPlayerView;
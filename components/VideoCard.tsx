
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../types';
import { Clock } from 'lucide-react';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link to={`/watch/${video.id}`} className="group block relative w-full">
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-white/5 shadow-2xl transition-all duration-300">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Top Left Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="bg-black/80 backdrop-blur-md rounded-md px-3 py-1 text-[10px] font-black text-white border border-white/10 uppercase tracking-widest">
            EP {video.episode}
          </div>
          <div className="bg-[#F7C600] rounded-md px-3 py-1 text-[10px] font-black text-black uppercase tracking-widest shadow-lg shadow-[#F7C600]/20">
            1080P HD
          </div>
        </div>

        {/* Bottom Right Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-black/90 backdrop-blur-md rounded-lg px-2.5 py-1 text-[11px] font-black text-white border border-white/10 flex items-center gap-1.5 uppercase tracking-widest">
          <Clock size={12} className="text-[#F7C600]" />
          {video.duration}
        </div>
      </div>

      <div className="mt-4 px-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-base font-black text-white uppercase tracking-tighter italic flex-1">
            {video.title}
          </h3>
          <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest pt-1">
            {video.size}
          </span>
        </div>
        
        {video.guest && (
          <div className="flex items-center gap-2 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F7C600] shadow-[0_0_8px_#F7C600]" />
            <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.1em] italic">
              GUEST: <span className="text-white/60">{video.guest}</span>
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default VideoCard;

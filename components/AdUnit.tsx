
import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdUnitProps {
  className?: string;
  slot?: string;
  format?: 'auto' | 'fluid' | 'autorelaxed';
  layoutKey?: string;
  label?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ 
  className = "", 
  slot = "8617765071", 
  format = "autorelaxed",
  layoutKey,
  label = "Advertisement"
}) => {
  useEffect(() => {
    try {
      // Small timeout to ensure the DOM is ready and prevent potential race conditions in SPAs
      const timer = setTimeout(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }, 50);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [slot]); // Re-run if slot changes (useful if navigation stays on same layout)

  return (
    <div className={`ad-container my-4 w-full overflow-hidden ${className}`}>
      {label && (
        <div className="flex items-center gap-2 mb-2 px-2 opacity-30">
          <div className="h-[1px] flex-1 bg-white"></div>
          <span className="text-[8px] font-black text-white uppercase tracking-[0.3em]">{label}</span>
          <div className="h-[1px] flex-1 bg-white"></div>
        </div>
      )}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 overflow-hidden min-h-[100px]">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format={format}
          data-ad-layout-key={layoutKey}
          data-ad-client="ca-pub-9959298755857565"
          data-ad-slot={slot}
        ></ins>
      </div>
    </div>
  );
};

export default AdUnit;


import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdUnitProps {
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ className = "" }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`ad-container my-8 w-full overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 mb-2 px-2">
        <div className="h-[1px] flex-1 bg-white/5"></div>
        <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.3em]">Advertisement</span>
        <div className="h-[1px] flex-1 bg-white/5"></div>
      </div>
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 overflow-hidden min-h-[100px]">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-9959298755857565"
          data-ad-slot="8617765071"
        ></ins>
      </div>
    </div>
  );
};

export default AdUnit;

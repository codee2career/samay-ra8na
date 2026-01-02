
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
  layout?: string; // For 'in-article' layout
  label?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const AdUnit: React.FC<AdUnitProps> = ({ 
  className = "", 
  slot = "8617765071", 
  format = "autorelaxed",
  layoutKey,
  layout,
  label = "Advertisement",
  textAlign
}) => {
  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }, 50);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [slot]);

  return (
    <div className={`ad-container my-4 w-full overflow-hidden ${className}`}>
      {label && (
        <div className="flex items-center gap-2 mb-2 px-2 opacity-30">
          <div className="h-[1px] flex-1 bg-slate-900 dark:bg-white"></div>
          <span className="text-[8px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">{label}</span>
          <div className="h-[1px] flex-1 bg-slate-900 dark:bg-white"></div>
        </div>
      )}
      <div className="bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-2xl p-4 overflow-hidden min-h-[100px] transition-colors">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: textAlign || 'inherit' }}
          data-ad-format={format}
          data-ad-layout-key={layoutKey}
          data-ad-layout={layout}
          data-ad-client="ca-pub-9959298755857565"
          data-ad-slot={slot}
        ></ins>
      </div>
    </div>
  );
};

export default AdUnit;


import React, { useState } from 'react';
import { GLOBAL_CONFIG } from '../constants';

interface ReportPageProps {
  config: any;
  onReportSubmit?: () => void;
}

const ReportPage: React.FC<ReportPageProps> = ({ config, onReportSubmit }) => {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-y-auto px-6 py-12 space-y-8 scrollbar-hide pb-32">
      <div className="text-center">
        <h1 className="text-4xl font-calligraphy font-bold gold-gradient drop-shadow-md mb-2">{config.heading}</h1>
        <p className="text-yellow-500/60 text-[10px] tracking-[0.2em] font-bold uppercase">{GLOBAL_CONFIG.reportPage.subHeading}</p>
        
        <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2 flex items-center gap-2 overflow-hidden">
          <span className="text-xs">📢</span>
          <div className="flex-1 overflow-hidden whitespace-nowrap text-[10px] font-bold text-yellow-200">
            <span className="inline-block animate-marquee">{config.marqueeText}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* 奖品图区域 - 16:9 */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden border-2 border-yellow-500/30 shadow-2xl relative bg-black/20">
            <img src={GLOBAL_CONFIG.reportPage.prizeImg} alt="Prize" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="bg-yellow-500 text-red-900 text-[10px] font-black px-3 py-1 rounded-full shadow-lg">本期终极大奖</span>
            </div>
        </div>

        {/* 微信社群交互文字 */}
        <div className="text-center py-2">
            <button 
                onClick={() => setShowQR(true)}
                className="text-yellow-400 font-bold text-sm underline underline-offset-4 animate-pulse active:scale-95 transition-all"
            >
                {GLOBAL_CONFIG.reportPage.joinText || '点击加入微信社群参与抽奖'}
            </button>
        </div>

        {/* 公开课宣传板块 */}
        <div 
          onClick={() => window.open(GLOBAL_CONFIG.reportPage.promoLink, '_blank')}
          className="bg-gradient-to-b from-[#5c0b0b] to-[#8b1111] border-2 border-yellow-500/30 rounded-3xl overflow-hidden relative cursor-pointer active:scale-[0.98] transition-all shadow-2xl group"
        >
             <div className="w-full aspect-video relative bg-black/40">
                <img src={GLOBAL_CONFIG.reportPage.promoBanner} alt="Banner" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5c0b0b] to-transparent"></div>
                
             </div>
             
             <div className="p-8 pt-4">
               <h4 className="font-bold text-yellow-400 flex items-center gap-2 mb-3 text-lg drop-shadow-md">
                  <span>🔥</span> {GLOBAL_CONFIG.reportPage.promoTitle}
               </h4>
               <p className="text-sm text-white/70 mb-6 leading-relaxed font-serif-zh italic">
                 {GLOBAL_CONFIG.reportPage.promoDesc}
               </p>
               <div className="w-full py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center justify-center gap-2 text-xs text-yellow-500 font-black tracking-widest uppercase">
                  {GLOBAL_CONFIG.reportPage.promoBtn} <span className="animate-pulse">&gt;&gt;&gt;</span>
               </div>
             </div>
        </div>
      </div>

      {/* 二维码弹窗 */}
      {showQR && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center px-8 animate-in fade-in zoom-in duration-300">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowQR(false)}></div>
            <div className="relative bg-[#3a0808] border-2 border-yellow-500/50 p-10 rounded-[40px] text-center space-y-6 w-full max-w-sm">
                <h3 className="text-xl font-bold text-yellow-400">扫码加入社群</h3>
                <div className="w-full aspect-square bg-white rounded-2xl p-4 shadow-2xl overflow-hidden">
                    <img src={GLOBAL_CONFIG.reportPage.qrCodeImg} alt="QR Code" className="w-full h-full object-contain" />
                </div>
                <p className="text-white/60 text-xs">加入后发送“上岸”，即可参与本轮奖学金抽奖</p>
                <button onClick={() => setShowQR(false)} className="w-full py-3 bg-white/10 border border-white/20 text-white rounded-full font-bold text-sm">关闭</button>
            </div>
        </div>
      )}

      <style>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-150%); } }
        .animate-marquee { display: inline-block; animation: marquee 15s linear infinite; }
      `}</style>
    </div>
  );
};

export default ReportPage;

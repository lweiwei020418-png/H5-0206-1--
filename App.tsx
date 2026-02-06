
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppStage, WishData } from './types';
import { GLOBAL_CONFIG, INITIAL_STATS } from './constants';
import WishPage from './components/WishPage';
import CheckScorePage from './components/CheckScorePage';
import EvaluatePage from './components/EvaluatePage';
import ReportPage from './components/ReportPage';
import PrivacyModal from './components/PrivacyModal';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.WISH);
  const [showPrivacy, setShowPrivacy] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 微信 JSSDK 初始化
  useEffect(() => {
    const initWechat = async () => {
      const wx = (window as any).wx;
      if (!wx) {
        console.log('微信环境检测失败，可能不在微信浏览器中');
        return;
      }

      try {
        // ==========================================
        // 部署后使用：向后端接口请求签名
        // ==========================================
        // const response = await fetch(`/api/wechat-sign?url=${encodeURIComponent(window.location.href.split('#')[0])}`);
        // const config = await response.json();
        
        // ==========================================
        // 开发测试用：模拟配置（部署前请注释掉）
        // ==========================================
        const config = {
          appId: 'wxfe3c0e236b828b34', // 后续填写：替换为你的公众号AppID
          timestamp: Date.now() / 1000 | 0,
          nonceStr: 'test_nonce_str',
          signature: 'test_signature'
        };
        
        console.log('微信JSSDK配置:', config);
        
        wx.config({
          debug: false, // 调试模式设为 false，部署后改为 false
          appId: config.appId,
          timestamp: config.timestamp,
          nonceStr: config.nonceStr,
          signature: config.signature,
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
        });

        wx.ready(() => {
          console.log('微信JSSDK初始化成功');
          // 初始化默认分享文案
          const shareData = {
            title: GLOBAL_CONFIG.share.title,
            desc: GLOBAL_CONFIG.share.desc,
            link: window.location.href,
            imgUrl: GLOBAL_CONFIG.share.img,
            success: () => console.log('默认分享文案初始化成功')
          };
          wx.updateAppMessageShareData(shareData);
          wx.updateTimelineShareData(shareData);
        });

        wx.error((res: any) => {
          console.error('微信JSSDK配置失败:', res);
          alert('微信分享功能初始化失败，请刷新页面重试');
        });
      } catch (err) {
        console.warn('微信配置初始化失败，可能不在微信环境或后端接口未就绪:', err);
      }
    };

    initWechat();
  }, []);

  // 初始化BGM
  useEffect(() => {
    audioRef.current = new Audio(GLOBAL_CONFIG.bgmUrl);
    audioRef.current.loop = true;
    
    const handleFirstTouch = () => {
      audioRef.current?.play().catch(e => console.log('BGM wait for interaction'));
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
    };
    window.addEventListener('touchstart', handleFirstTouch);
    window.addEventListener('click', handleFirstTouch);

    return () => {
      audioRef.current?.pause();
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
    };
  }, []);

  const trackEvent = useCallback(async (type: string, data?: any) => {
    const rawStats = localStorage.getItem('yidao_stats') || JSON.stringify(INITIAL_STATS);
    const stats = JSON.parse(rawStats);
    if (type === 'IMPRESSION') stats.impressions += 1;
    if (type === 'SHARE') stats.shares += 1;
    if (type === 'WISH_SUBMIT') stats.wishSubmits += 1;
    if (type === 'REPORT_SUBMIT') stats.reportSubmits += 1;
    localStorage.setItem('yidao_stats', JSON.stringify(stats));
    
    // ==========================================
    // 提交统计数据到公司内部数据库
    // ==========================================
    try {
      // 后续填写：替换为实际的公司内部接口地址
      const apiUrl = '/api/internal/stats/submit'; // 公司内部统计接口地址
      
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 后续填写：如果需要认证，请添加认证头
          // 'Authorization': 'Bearer your-token'
        },
        body: JSON.stringify({ type, data })
      });
      console.log('统计数据已提交到公司数据库');
    } catch (error) {
      console.error('统计数据提交失败:', error);
    }
  }, []);

  useEffect(() => { trackEvent('IMPRESSION'); }, [trackEvent]);

  const STAGE_NAMES: Record<AppStage, string> = {
    [AppStage.WISH]: '考前祈福',
    [AppStage.CHECK_SCORE]: '查分中转',
    [AppStage.EVALUATE]: '感谢名师',
    [AppStage.SUCCESS_REPORT]: '报喜领奖'
  };

  const handleWishSubmitted = async (data: WishData) => {
    trackEvent('WISH_SUBMIT', data);
    localStorage.setItem('yidao_last_wish', JSON.stringify(data));
    const existing = JSON.parse(localStorage.getItem('yidao_data') || '[]');
    localStorage.setItem('yidao_data', JSON.stringify([...existing, { ...data, timestamp: new Date().toLocaleString(), type: 'WISH' }]));
    
    // ==========================================
    // 提交到公司内部数据库
    // ==========================================
    try {
      // 后续填写：替换为实际的公司内部接口地址
      const apiUrl = '/api/internal/wish/submit'; // 公司内部接口地址
      
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 后续填写：如果需要认证，请添加认证头
          // 'Authorization': 'Bearer your-token'
        },
        body: JSON.stringify(data)
      });
      console.log('祈福信息已提交到公司数据库');
    } catch (error) {
      console.error('提交到公司数据库失败:', error);
      // 错误处理：可以选择是否显示错误提示
      // alert('数据提交失败，请稍后重试');
    }
  };

  return (
    <div className="h-screen-fix bg-[#8b1111] relative text-white font-serif-zh overflow-auto select-none">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square bg-yellow-500/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square bg-red-500/30 blur-[120px] rounded-full"></div>
      </div>
      
      <div className="fixed top-2 left-0 right-0 flex justify-between items-center px-6 z-[170] pointer-events-none">
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 shadow-lg pointer-events-auto">
          <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center font-bold text-xs text-white border border-yellow-500/50 shadow-inner">道</div>
          <span className="text-sm font-bold tracking-[.25em] text-white/90 uppercase">{GLOBAL_CONFIG.brandName}</span>
        </div>
        <button 
          onClick={() => { trackEvent('SHARE'); alert('正在生成您的专属喜报链接，请点击右上角分享！'); }}
          className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-lg pointer-events-auto active:scale-95 transition-all text-yellow-400"
        >
          <span className="text-xs font-black tracking-widest">分享</span>
          <span className="text-lg">🚀</span>
        </button>
      </div>

      <main className="relative z-20 max-w-md mx-auto h-full flex flex-col">
        {stage === AppStage.WISH && <WishPage config={GLOBAL_CONFIG.wishPage} onNext={() => setStage(AppStage.CHECK_SCORE)} onWishSubmit={handleWishSubmitted} />}
        {stage === AppStage.CHECK_SCORE && <CheckScorePage config={GLOBAL_CONFIG.checkScorePage} courseLink={GLOBAL_CONFIG.wishPage.publicCourse.link} onNext={() => setStage(AppStage.EVALUATE)} />}
        {stage === AppStage.EVALUATE && <EvaluatePage config={GLOBAL_CONFIG.evaluatePage} onNext={() => setStage(AppStage.SUCCESS_REPORT)} />}
        {stage === AppStage.SUCCESS_REPORT && <ReportPage config={GLOBAL_CONFIG.reportPage} onReportSubmit={() => trackEvent('REPORT_SUBMIT')} />}
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-sm">
        <div className="bg-[#2a0505]/95 backdrop-blur-xl rounded-[40px] px-2 py-2 flex items-center justify-between shadow-2xl border border-white/5">
          {Object.values(AppStage).map(s => (
            <button key={s} onClick={() => setStage(s)} className={`flex-1 flex flex-col items-center gap-1 transition-all py-1 ${stage === s ? 'text-white' : 'text-white/40'}`}>
              <div className={`w-full max-w-[64px] h-11 flex items-center justify-center rounded-[22px] transition-all duration-300 ${stage === s ? 'bg-[#f5a623] text-black shadow-lg shadow-yellow-500/30' : ''}`}>
                <span className="text-xl">
                  {s === AppStage.WISH ? '🙇' : s === AppStage.CHECK_SCORE ? '🔍' : s === AppStage.EVALUATE ? '✍️' : '🏆'}
                </span>
              </div>
              <span className="text-[10px] font-bold mt-0.5">{STAGE_NAMES[s]}</span>
            </button>
          ))}
        </div>
      </div>

      {showPrivacy && <PrivacyModal onAgree={() => {
        setShowPrivacy(false);
        audioRef.current?.play().catch(e => console.log('BGM needs tap'));
      }} />}
      {showAdmin && <AdminPanel config={GLOBAL_CONFIG} onUpdateConfig={() => {}} onClose={() => setShowAdmin(false)} />}
    </div>
  );
};

export default App;

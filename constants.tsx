
import React from 'react';

export const COLORS = {
  MAIN_RED: '#991B1B',
  GOLD: '#FFD700',
  SOFT_GOLD: '#FCD34D',
  TALISMAN_RED: '#B91C1C'
};

// 全局配置中心
export const GLOBAL_CONFIG = {
  brandName: '网易有道考研',
  adminPassword: 'youdao_admin_888',
  bgmUrl: 'https://actions.google.com/animator/media/Fx_Whoosh_01.mp3', 
  tcbEnvId: 'your-tcb-env-id',
  
  // ==========================================
  // 【微信分享配置】标题和文案固定
  // ==========================================
  share: {
    title: '2026考研政治祈福墙 - 助你高分上岸！',
    desc: '我在有道考研祈福墙许下了心愿，快来一起沾沾喜气，领取复试礼包！',
    img: 'https://oimageb8.ydstatic.com/image?id=-5649679858100330799&product=xue' // 兜底图
  },

  wishPage: {
    title: '2026考研祈福墙',
    subTitle: 'MAY ALL YOUR WISHES TRUE',
    mainHeading: ['写下心愿', '高分上岸'],
    publicCourse: {
      title: '出分公开课',
      desc: '有道名师团·出分避坑指南',
      buttonText: '立即预约',
      link: 'https://ke.study.163.com/course/detail/100162721?courseId=1474859164&outVendor=kaoyan_VXchufen' 
    },
    syncSuccessAlert: '祈福成功！心愿已同步至祈福墙。',
    shareButton: '分享祈福',
    backButton: '返回',
    shareGuideTitle: '分享祈福墙',
    shareGuideText: '点击右上角分享按钮，将你的祈福分享给更多研友，一起沾沾喜气！',
    gotItButton: '我知道了',
    formTitle: '写下你的心愿',
    nicknameLabel: '昵称',
    nicknamePlaceholder: '请输入你的昵称',
    schoolLabel: '目标院校',
    schoolPlaceholder: '请输入目标院校',
    scoreLabel: '目标分数',
    scorePlaceholder: '请输入目标分数',
    messageLabel: '心愿寄语',
    messagePlaceholder: '写下你的考研心愿',
    submitButton: '提交心愿',
    viewCardButton: '查看祈福卡',
    writeWishButton: '写下心愿',
    nextButton: '查分通道',
    footerText: '网易有道考研 © 2026'
  },

  checkScorePage: {
    heading: '官方查分通道已开启',
    description: '建议提前准备好准考证号及身份证号。查分时建议开启屏幕录制，记录下属于你的高光时刻！',
    rewardHighlight: '✨ 记录查分瞬间，赢取万元奖学金 ✨',
    officialLink: 'https://yz.chsi.com.cn/apply/cjcx/' 
  },

  evaluatePage: {
    heading: '名师护航 感谢有你',
    teacherImg: 'https://oimagec3.ydstatic.com/image?id=8860506062650688455&product=xue',
    teacherTag: '有道考研名师团 · 倾情守护',
    selfMessageLabel: '我想对自己说的话：',
    selfMessagePlaceholder: '写给2026年那个上岸后的自己...'
  },

  reportPage: {
    heading: '有道报喜领奖台',
    subHeading: '解锁万元礼分，解锁属于你的惊喜',
    marqueeText: '参与活动即有机会赢取【全额免单】奖学金 | 已有 12895 位同学参与抽奖',//公告
    prizeImg: 'https://oimagec7.ydstatic.com/image?id=-3166832789471815609&product=xue',//奖品图
    qrCodeImg: 'https://oimagea6.ydstatic.com/image?id=-5353946793802638347&product=xue',//社群二维码
    joinText: '点击加入微信社群参与抽奖',
    promoBanner: 'https://oimagea1.ydstatic.com/image?id=-4735438979756341361&product=xue',//出分公开课banner
    promoTitle: '🔥 必看：26考研双线解析及27考研趋势预测',
    promoDesc: '名师直播解析复试线，教你如何逆袭稳上岸。点击下方按钮立即预约直播，解锁专属复试资料包。',
    promoBtn: '立即跳转直播间',
    promoLink: 'https://ke.study.163.com/course/detail/100162721?courseId=1474859164&outVendor=kaoyan_VXchufen',
    successMsg: '登记成功！扫码进入社群，参与赢大奖！'
  }
};

/** 
 * 九个卡片模板
 */
export const POSTER_TEMPLATES = [
  { id: 1, characterImg: 'https://oimageb4.ydstatic.com/image?id=-8189201794609900955&product=xue', shareImg: 'https://oimagea1.ydstatic.com/image?id=1830176462984344608&product=xue' },
  { id: 2, characterImg: 'https://oimageb5.ydstatic.com/image?id=8761175672428490850&product=xue', shareImg: 'https://oimageb8.ydstatic.com/image?id=-5649679858100330799&product=xue' },
  { id: 3, characterImg: 'https://oimagec4.ydstatic.com/image?id=-4934770906661125601&product=xue', shareImg: 'https://oimagec7.ydstatic.com/image?id=2536576817138599713&product=xue' },
  { id: 4, characterImg: 'https://oimageb2.ydstatic.com/image?id=5800395373388330177&product=xue', shareImg: 'https://oimageb1.ydstatic.com/image?id=1626242696731011788&product=xue' },
  { id: 5, characterImg: 'https://oimagec2.ydstatic.com/image?id=1327223271272034458&product=xue', shareImg: 'https://oimagec1.ydstatic.com/image?id=-1702717990345098008&product=xue' },
  { id: 6, characterImg: 'https://oimagea7.ydstatic.com/image?id=-1470893266635503503&product=xue', shareImg: 'https://oimageb3.ydstatic.com/image?id=4794298962753087719&product=xue' },
  { id: 7, characterImg: 'https://oimagec5.ydstatic.com/image?id=9188532620889856535&product=xue', shareImg: 'https://oimagea2.ydstatic.com/image?id=-3086835460793883956&product=xue' },
  { id: 8, characterImg: 'https://oimagec8.ydstatic.com/image?id=7975423198727246452&product=xue', shareImg: 'https://oimageb8.ydstatic.com/image?id=3676732249847341566&product=xue' },
  { id: 9, characterImg: 'https://oimageb7.ydstatic.com/image?id=-6617221178400837167&product=xue', shareImg: 'https://oimageb2.ydstatic.com/image?id=-6096734105822325959&product=xue' },
];

export const INITIAL_STATS = {
  impressions: 0,
  shares: 0,
  wishSubmits: 0,
  reportSubmits: 0,
  stageReach: { WISH: 0, CHECK: 0, EVALUATE: 0, REPORT: 0 }
};

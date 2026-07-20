import { useState, useEffect } from "react";
import { 
  BookOpen, 
  MapPin, 
  Users, 
  TrendingUp, 
  Lock, 
  HelpCircle, 
  ArrowDown, 
  Heart, 
  Share2, 
  MessageSquare, 
  Award, 
  Clock, 
  BookOpenCheck,
  Compass,
  FileText,
  Sparkles,
  Volume2,
  Tv,
  ShoppingBag,
  Mail,
  MailOpen
} from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";

export default function App() {
  const [theme, setTheme] = useState<"white" | "parchment">("white");
  const [activeNav, setActiveNav] = useState("intro");
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  // 舆情质疑弹幕状态
  const [danmakus, setDanmakus] = useState([
    { id: 1, text: "天天拍视频，还有时间干正事吗？", top: "10%", delay: 0, speed: 12 },
    { id: 2, text: "当官的也想当网红，想红想疯了吧？", top: "35%", delay: 2, speed: 15 },
    { id: 3, text: "这怕是在搞面子工程、政绩秀吧？", top: "60%", delay: 1, speed: 14 },
    { id: 4, text: "干部就该坐在办公室，抛头露面算什么？", top: "80%", delay: 4, speed: 16 },
    { id: 5, text: "辛辛苦苦考入编，结果天天拍段子？", top: "20%", delay: 6, speed: 13 },
    { id: 6, text: "直播赚的钱进谁的口袋了？敢不敢公示？", top: "45%", delay: 3, speed: 18 },
    { id: 7, text: "丢了干部的庄重体面，成何体统！", top: "70%", delay: 5, speed: 15 },
  ]);
  const [newDanmaku, setNewDanmaku] = useState("");

  const handleAddDanmaku = () => {
    if (!newDanmaku.trim()) return;
    const added = {
      id: Date.now(),
      text: newDanmaku.trim(),
      top: `${Math.floor(Math.random() * 70) + 10}%`,
      delay: 0,
      speed: Math.floor(Math.random() * 6) + 10,
      isUser: true,
    };
    setDanmakus(prev => [added, ...prev]);
    setNewDanmaku("");
  };

  // 村务与直播时间与精力分配状态
  const [workloadBalance, setWorkloadBalance] = useState(50); // 0 (100%村务) 到 100 (100%直播)

  // 治理天平状态
  const [placedWeights, setPlacedWeights] = useState<string[]>([]);
  const [activeScaleDetail, setActiveScaleDetail] = useState<string | null>(null);
  const [isLetterOpened, setIsLetterOpened] = useState(false);
  const [activeLetterId, setActiveLetterId] = useState(0);

  const toggleWeight = (type: string) => {
    setPlacedWeights(prev => {
      const next = prev.includes(type) 
        ? prev.filter(w => w !== type) 
        : [...prev, type];
      if (!prev.includes(type)) {
        setActiveScaleDetail(type);
      } else if (activeScaleDetail === type) {
        setActiveScaleDetail(next[next.length - 1] || null);
      }
      return next;
    });
  };
  
  // Reading Progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Highlight active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["intro", "scale", "visible", "behind", "anchor", "tide", "belief"];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Timeline Data
  const timelineData = [
    {
      year: "2018",
      title: "《关于实施乡村振兴战略的意见》",
      desc: "首次提出数字乡村国家战略，完善农村通信基础设施，弥合城乡数字鸿沟。",
      tag: "顶层设计"
    },
    {
      year: "2019",
      title: "《数字乡村发展战略纲要》",
      desc: "数字乡村领域纲领性文件，确立乡村数字治理体系中长期建设目标。",
      tag: "战略路线"
    },
    {
      year: "2020",
      title: "《数字农业农村发展规划》",
      desc: "推动村级全流程事务线上办理，将互联网治理落到村级实操层面。",
      tag: "政务入网"
    },
    {
      year: "2021",
      title: "《数字乡村建设指南 1.0》",
      desc: "出台基层数字化建设完整框架，开始尝试将短视频、直播纳入村务考量。",
      tag: "标准启动"
    },
    {
      year: "2022",
      title: "《数字乡村发展行动计划》",
      desc: "十四五数字乡村行动方案，重点推进村级智慧治理与电商人才培训。",
      tag: "行动指南"
    },
    {
      year: "2022-23",
      title: "农村青年主播培育方案",
      desc: "国家多部委针对村干部、农村青年开展直播带货、短视频创作专项培训。",
      tag: "人才孵化"
    },
    {
      year: "2023",
      title: "《数字中国建设整体布局规划》",
      desc: "数字乡村纳全国顶层体系，数字化多维赋能乡村产业升级与高效治理。",
      tag: "融合并网"
    },
    {
      year: "2024",
      title: "《数字乡村建设指南 2.0》",
      desc: "升级智慧村务，村干部电商直播正式由自主探索转为国家推荐倡导举措。",
      tag: "全面升级"
    },
    {
      year: "2024-25",
      title: "《促进农产品消费实施方案》",
      desc: "明确提出培育大批“高素质农民主播”，提供坚实的直播助农政策背书。",
      tag: "消费赋能"
    },
    {
      year: "2025",
      title: "《乡村全面振兴规划》",
      desc: "持续推进基层政务与数字经济深度融合，下沉全方位数字化资源。",
      tag: "生态落地"
    },
    {
      year: "2026",
      title: "《电子商务高质量发展指导意见》",
      desc: "国家政策正式收录“村播、田播”，宣告村干部直播步入标准化助农时代。",
      tag: "黄金期"
    }
  ];

  const lettersData = [
    {
      id: 0,
      author: "张桂芳",
      title: "三家村支部书记：当‘我’变成‘我们’",
      color: "#B24747",
      bg: "bg-[#B24747]/5",
      border: "border-[#B24747]/20",
      content: `“粉丝们常问我，‘小芳书记，你火了之后是不是就要调走了？’有些村民也私底下嘀咕，觉得我拍视频是为了自己找退路。
但我把我的商品橱窗和所有带货佣金，在法律上都归还给了村集体领办的合作社。人总会离任，但只要这个‘合作社账号’留在这，只要那排老年食堂、那几条干净的水泥路还在，我们就不算辜负这片泥土。
网红在乎的是他镜头里的‘我’，而我们握着手机，唯一的执念是让我们这片安静了太久的村庄、被算法遗忘的‘我们’，能有一扇窗户，能被时代多看上一眼。
这片沾满黄泥的田垄，就是我最热泪盈眶的归宿。”`,
      village: "石林镇三家村",
      seal: "印"
    },
    {
      id: 1,
      author: "董桂林",
      title: "范庄村党支部书记：清晨五点钟的守望",
      color: "#3D7B35",
      bg: "bg-[#3D7B35]/5",
      border: "border-[#3D7B35]/20",
      content: `“刚端起手机巡村直播时，村里的老人家不理解，嫌我‘蹭老百姓饭吃’、天天不干正事搞花架子。
直到那天，我开着大三轮车，通过直播带货帮大伙把滞销的几十万斤红薯销售一空，并且把货款一分不少送到老人家手里。第二天一早，三叔端着一大笸箩自家打的新鲜大枣，红着脸挤进了我的手机镜头里。
我知道，他们不是爱上了短视频，他们是终于信了我这个年轻人。
早晨五点在田头直播，白天依然在村委处理鸡毛蒜皮。我们不是在作秀，我们只是想把泥土的温热，隔着冷冰冰的手机玻璃，捧给在城市里漂泊的每一个人。”`,
      village: "范县范庄村",
      seal: "印"
    },
    {
      id: 2,
      author: "金帅",
      title: "前枣杭村 90后书记：烟火老街里的执守",
      color: "#55ADA1",
      bg: "bg-[#55ADA1]/5",
      border: "border-[#55ADA1]/20",
      content: `“说实话，千万级流量来临的时候，很多MCN机构拿着大笔签约费劝我离职做职业三农博主，自己抽佣变现。
我果断拒绝了。我是一个村书记，如果连我都成了资本包装出来的网红，那这个村子的公信力就彻底没了。
我把镜头移开不拍自己，去拍我们村里有三十年烟火气的老街、去拍一辈子做一把香油、烤一根炸串的村民。结果，成千上万的游客顺着导航挤爆了前枣杭村。
看着大妈脸上被炉火映出的开心笑容，我知道这就是我的最佳‘算法’。把阳光均洒在每一个默默无闻的村民身上，这才是我的本分。”`,
      village: "即墨前枣杭村",
      seal: "印"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-[#DBAA06]/20 selection:text-[#9B7253] ${
      theme === "white" ? "bg-white" : "bg-[#FDFBF7]"
    }`}>
      
      {/* Dynamic Top Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#DBAA06] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Floating Theme Controller */}
      <div className="fixed right-6 bottom-8 z-40 flex flex-col gap-2 bg-white/80 backdrop-blur border border-[#9B7253]/15 p-1.5 rounded-full shadow-lg">
        <button
          onClick={() => setTheme("white")}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            theme === "white" 
              ? "bg-[#9B7253] text-white shadow-sm" 
              : "text-[#9B7253] hover:bg-[#9B7253]/10"
          }`}
          title="经典纯白"
          id="btn-theme-white"
        >
          <span className="text-xs font-mono font-bold">白</span>
        </button>
        <button
          onClick={() => setTheme("parchment")}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            theme === "parchment" 
              ? "bg-[#9B7253] text-white shadow-sm" 
              : "text-[#9B7253] hover:bg-[#9B7253]/10"
          }`}
          title="暖黄雅致"
          id="btn-theme-parchment"
        >
          <span className="text-xs font-mono font-bold">雅</span>
        </button>
      </div>

      {/* Elegant Header */}
      <header className="border-b border-[#9B7253]/10 py-4 px-4 md:px-8 bg-transparent sticky top-0 backdrop-blur-md z-30">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#9B7253]" />
            <span className="font-serif tracking-widest text-[10px] md:text-xs uppercase font-bold text-[#9B7253]">
              数据新闻 · 乡当有流量队
            </span>
          </div>
          <div className="flex items-center gap-3 md:gap-5 text-[11px] md:text-xs font-mono text-[#9B7253]/60 overflow-x-auto pb-1 sm:pb-0 scrollbar-none max-w-full">
            <a href="#intro" className={`transition-colors hover:text-[#9B7253] whitespace-nowrap pb-1 ${activeNav === "intro" ? "text-[#9B7253] font-bold border-b-2 border-[#9B7253]" : ""}`}>壹·发端</a>
            <a href="#scale" className={`transition-colors hover:text-[#9B7253] whitespace-nowrap pb-1 ${activeNav === "scale" ? "text-[#9B7253] font-bold border-b-2 border-[#9B7253]" : ""}`}>贰·群像</a>
            <a href="#visible" className={`transition-colors hover:text-[#9B7253] whitespace-nowrap pb-1 ${activeNav === "visible" ? "text-[#9B7253] font-bold border-b-2 border-[#9B7253]" : ""}`}>叁·看见</a>
            <a href="#behind" className={`transition-colors hover:text-[#9B7253] whitespace-nowrap pb-1 ${activeNav === "behind" ? "text-[#9B7253] font-bold border-b-2 border-[#9B7253]" : ""}`}>肆·审视</a>
            <a href="#anchor" className={`transition-colors hover:text-[#9B7253] whitespace-nowrap pb-1 ${activeNav === "anchor" ? "text-[#9B7253] font-bold border-b-2 border-[#9B7253]" : ""}`}>伍·解绑</a>
            <a href="#tide" className={`transition-colors hover:text-[#9B7253] whitespace-nowrap pb-1 ${activeNav === "tide" ? "text-[#9B7253] font-bold border-b-2 border-[#9B7253]" : ""}`}>陆·回响</a>
            <a href="#belief" className={`transition-colors hover:text-[#9B7253] whitespace-nowrap pb-1 ${activeNav === "belief" ? "text-[#9B7253] font-bold border-b-2 border-[#9B7253]" : ""}`}>柒·乡信</a>
          </div>
        </div>
      </header>

      {/* Hero Cover */}
      <section className="relative overflow-hidden border-b border-[#9B7253]/10 py-24 md:py-36 min-h-[550px] md:min-h-[650px] flex items-center">
        {/* Full-bleed Watercolor Illustration Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
          <img 
            src="/src/assets/images/rural_data_journalism_illustration_1784529460508.jpg" 
            alt="数据新闻 · 乡当有流量队：网络流量与绿色田野的融合" 
            className="w-full h-full object-cover opacity-40 md:opacity-45 transition-all duration-500 mix-blend-multiply scale-105"
            referrerPolicy="no-referrer"
          />
          
          {/* Aesthetic Overlay Gradients to protect text readability */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            theme === "white" 
              ? "bg-white/85 sm:bg-white/80" 
              : "bg-[#FDFBF7]/85 sm:bg-[#FDFBF7]/80"
          }`} />
          
          <div className={`absolute inset-0 transition-all duration-500 bg-gradient-to-t ${
            theme === "white" 
              ? "from-white/100 via-transparent to-white/30" 
              : "from-[#FDFBF7]/100 via-transparent to-[#FDFBF7]/30"
          }`} />

          {/* Dynamic Floating Golden Ribbons */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gold-ribbon-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DBAA06" stopOpacity="0" />
                <stop offset="15%" stopColor="#DBAA06" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#F9E076" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#B38F00" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#B38F00" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gold-ribbon-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E5A93B" stopOpacity="0" />
                <stop offset="25%" stopColor="#FCE0AD" stopOpacity="0.7" />
                <stop offset="70%" stopColor="#DBAA06" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#DBAA06" stopOpacity="0" />
              </linearGradient>
              <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Ribbon 1: Upper flowing ribbon */}
            <motion.path
              d="M-50,150 Q200,80 500,220 T1100,100 T1500,180"
              fill="none"
              stroke="url(#gold-ribbon-1)"
              strokeWidth="12"
              strokeLinecap="round"
              filter="url(#gold-glow)"
              animate={{
                d: [
                  "M-50,150 Q200,80 500,220 T1100,100 T1500,180",
                  "M-50,180 Q250,120 520,180 T1080,140 T1500,150",
                  "M-50,150 Q200,80 500,220 T1100,100 T1500,180"
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Ribbon 2: Thin elegant line */}
            <motion.path
              d="M-50,165 Q200,95 500,235 T1100,115 T1500,195"
              fill="none"
              stroke="#FFF5CC"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.9"
              animate={{
                d: [
                  "M-50,165 Q200,95 500,235 T1100,115 T1500,195",
                  "M-50,195 Q250,135 520,195 T1080,155 T1500,165",
                  "M-50,165 Q200,95 500,235 T1100,115 T1500,195"
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Ribbon 3: Lower flowing ribbon */}
            <motion.path
              d="M-50,280 Q350,380 750,240 T1550,320"
              fill="none"
              stroke="url(#gold-ribbon-2)"
              strokeWidth="8"
              strokeLinecap="round"
              filter="url(#gold-glow)"
              animate={{
                d: [
                  "M-50,280 Q350,380 750,240 T1550,320",
                  "M-50,250 Q300,340 780,270 T1550,290",
                  "M-50,280 Q350,380 750,240 T1550,320"
                ]
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Ribbon 4: Lower thin line */}
            <motion.path
              d="M-50,284 Q350,384 750,244 T1550,324"
              fill="none"
              stroke="#FFF5CC"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.8"
              animate={{
                d: [
                  "M-50,284 Q350,384 750,244 T1550,324",
                  "M-50,254 Q300,344 780,274 T1550,294",
                  "M-50,284 Q350,384 750,244 T1550,324"
                ]
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-10 w-full flex flex-col items-center justify-center text-center">
          <div className="max-w-4xl space-y-8 flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DBAA06]/10 text-[#DBAA06] border border-[#DBAA06]/20 text-xs font-mono uppercase tracking-widest font-semibold shadow-sm backdrop-blur-sm">
              数据新闻 · 乡当有流量队
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#9B7253] leading-[1.25] font-bold tracking-tight">
              相信“乡信”的力量
              <span className="text-xl sm:text-2.5xl md:text-4xl block mt-6 text-[#9B7253]/80 font-normal font-sans tracking-wide">
                ——当村书记站在镜头前
              </span>
            </h1>

            <div className="pt-8 flex flex-col items-center justify-center gap-3">
              <span
                onClick={() => document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" })}
                className="text-base font-serif font-bold text-[#9B7253] hover:text-[#DBAA06] transition-all duration-300 cursor-pointer flex items-center gap-1.5 border-b-2 border-[#9B7253] hover:border-[#DBAA06] pb-1 hover:scale-105 transform"
              >
                点击进入
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </span>
              <div className="text-xs text-[#9B7253]/55 font-sans max-w-sm leading-relaxed">
                （小贴士：点击上方链接，或向下滚动以查看完整深度长文）
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* 一、一部手机+一位书记=？ */}
        <section id="intro" className="py-16 md:py-24 border-b border-[#9B7253]/10">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#DBAA06] uppercase tracking-widest block font-bold">ACT I · 第一幕</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#9B7253] font-medium tracking-tight">
                一部手机 + 一位书记 = ？
              </h2>
            </div>

            <div className="space-y-6 font-serif text-[16px] md:text-lg leading-relaxed text-[#9B7253]/95">
              <p>他们本可以不拍这些的——</p>
              <p>
                河南鹿邑县范庄村的驻村书记董桂林，选择每次出门蹭饭时，点开手机的录制键。
                三个月后，这个每天“到点蹭饭”、吃百家饭的男人，吸引了超过 200 万人在线围观。
              </p>
              <p>
                四川邻水县羊鹿滩村的驻村书记包腾，选择将拍摄地设在田间地头。
                他用一副酷似孙红雷的笑脸和一部手机，让 200 多万人看到了那些充满泥土气息和匠人精神的特色农产品，看到了巴山蜀水间的羊鹿滩村，也看到了在这里勤劳生活的人。
              </p>
              <p>
                河南省鹤壁市石林镇三家村的村长张桂芳，选择将镜头对准村里的每一处角落、每一位老人。
                彩虹墙、集体婚纱照、免费老年食堂……
                53 万的“云村民”亲切地叫她“97村长小芳”。
              </p>
              <p>
                三个人，三幕画面。
                但他们选择举起手机面对镜头的决定却出奇一致，也许只是一个简单的念头——
                <span className="italic font-semibold text-[#9B7253] block border-l-4 border-[#DBAA06] pl-4 py-1 my-4 font-serif">
                  “你听我说说我们的乡村。”
                </span>
              </p>
            </div>

            {/* Hidden legacy SVG 2 */}
            <div className="hidden">
              <svg viewBox="0 0 700 240" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Separator lines */}
                <line x1="230" y1="20" x2="230" y2="220" stroke="#9B7253" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="470" y1="20" x2="470" y2="220" stroke="#9B7253" strokeWidth="0.5" strokeDasharray="3,3" />

                {/* 1. Dong Guilin (蹭饭书记) */}
                <g id="dong-guilin" transform="translate(0, 0)">
                  {/* Background kitchen window or wall tiles outline */}
                  <path d="M 25 35 L 205 35 M 25 80 L 205 80" stroke="#9B7253" strokeWidth="0.5" opacity="0.15" />
                  <line x1="85" y1="35" x2="85" y2="80" stroke="#9B7253" strokeWidth="0.5" opacity="0.15" />
                  <line x1="145" y1="35" x2="145" y2="80" stroke="#9B7253" strokeWidth="0.5" opacity="0.15" />

                  {/* Character body (sturdy male body with fleece vest) */}
                  <path d="M 75 200 L 75 135 C 75 120 88 115 115 115 C 142 115 155 120 155 135 L 155 200" fill="#FDFBF7" stroke="#9B7253" strokeWidth="2" strokeLinecap="round" />
                  {/* Fleece vest collar and zip details */}
                  <path d="M 105 115 L 105 150" stroke="#9B7253" strokeWidth="1.5" />
                  <path d="M 125 115 L 125 150" stroke="#9B7253" strokeWidth="1.5" />
                  <path d="M 115 125 L 115 190" stroke="#9B7253" strokeWidth="1.5" strokeDasharray="1,2" />

                  {/* Head & expressive friendly face */}
                  <circle cx="115" cy="85" r="18" fill="#FDFBF7" stroke="#9B7253" strokeWidth="2" />
                  {/* Short kind hair */}
                  <path d="M 97 82 C 95 68 110 60 125 65 C 132 68 135 76 133 84" fill="#4A3525" stroke="#9B7253" strokeWidth="1" />
                  {/* Squinting laughing eyes & smile lines */}
                  <path d="M 104 84 Q 109 81 110 85" fill="none" stroke="#4A3525" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 120 84 Q 121 81 126 85" fill="none" stroke="#4A3525" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 113 88 Q 115 93 113 94" fill="none" stroke="#9B7253" strokeWidth="1.5" /> {/* nose */}
                  <path d="M 107 96 Q 115 104 123 96 Z" fill="#DBAA06" stroke="#9B7253" strokeWidth="1.5" /> {/* big laughing mouth */}
                  {/* Chubby friendly cheeks lines */}
                  <path d="M 99 92 Q 101 95 103 93" stroke="#9B7253" strokeWidth="1" />
                  <path d="M 127 92 Q 129 95 131 93" stroke="#9B7253" strokeWidth="1" />

                  {/* Arms & Hands holding a big steaming bowl */}
                  <path d="M 75 160 Q 90 185 110 185 Q 130 185 155 160" fill="none" stroke="#9B7253" strokeWidth="2" strokeLinecap="round" />
                  {/* Big Traditional Rice Bowl */}
                  <path d="M 95 165 C 95 185 135 185 135 165 Z" fill="#FDFBF7" stroke="#9B7253" strokeWidth="2" strokeLinejoin="round" />
                  {/* Decorative bowl lines */}
                  <line x1="97" y1="172" x2="133" y2="172" stroke="#DBAA06" strokeWidth="1.5" />
                  {/* Rice inside the bowl */}
                  <path d="M 96 165 Q 115 158 134 165" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.5" />
                  {/* Steam curling from hot food */}
                  <path d="M 108 152 Q 112 144 109 138" fill="none" stroke="#DBAA06" strokeWidth="1" strokeDasharray="1,2" />
                  <path d="M 122 154 Q 126 146 123 140" fill="none" stroke="#DBAA06" strokeWidth="1" strokeDasharray="1,2" />

                  <text x="115" y="218" fontFamily="serif" fontSize="12" fill="#9B7253" textAnchor="middle" fontWeight="bold">董桂林 · 蹭饭书记</text>
                  <text x="115" y="232" fontFamily="sans-serif" fontSize="10" fill="#9B7253" opacity="0.6" textAnchor="middle">吃百家饭，解百家忧</text>
                </g>

                {/* 2. Bao Teng (包书记) */}
                <g id="bao-teng" transform="translate(240, 0)">
                  {/* Vine / orchard background branches */}
                  <path d="M 50 45 Q 120 25 190 40" fill="none" stroke="#61A358" strokeWidth="1" opacity="0.25" />
                  <path d="M 80 35 Q 110 50 140 35" fill="none" stroke="#61A358" strokeWidth="0.8" opacity="0.25" />

                  {/* Tall, spirited male body in outdoor field jacket */}
                  <path d="M 80 200 L 80 132 C 80 115 95 110 122 110 C 149 110 164 115 164 132 L 164 200" fill="#FDFBF7" stroke="#9B7253" strokeWidth="2" strokeLinecap="round" />
                  {/* Jacket details (zipper, collar, pockets) */}
                  <path d="M 122 110 L 122 195" stroke="#9B7253" strokeWidth="1.8" />
                  <rect x="88" y="140" width="20" height="15" rx="1" fill="none" stroke="#9B7253" strokeWidth="1.2" />
                  <rect x="136" y="140" width="20" height="15" rx="1" fill="none" stroke="#9B7253" strokeWidth="1.2" />

                  {/* Spirited face with narrow squinting eyes & broad smile (Sun Honglei style) */}
                  <circle cx="122" cy="80" r="17" fill="#FDFBF7" stroke="#9B7253" strokeWidth="2" />
                  {/* Stylish flat-top short hair */}
                  <path d="M 105 73 C 105 63 120 58 138 61 C 141 68 139 74 138 78 Z" fill="#4A3525" stroke="#9B7253" strokeWidth="1" />
                  {/* Eyes, Nose, Mouth */}
                  <line x1="112" y1="78" x2="117" y2="78" stroke="#4A3525" strokeWidth="2" strokeLinecap="round" />
                  <line x1="127" y1="78" x2="132" y2="78" stroke="#4A3525" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 121 82 Q 123 85 121 87" fill="none" stroke="#9B7253" strokeWidth="1.5" />
                  <path d="M 114 91 Q 122 96 130 91" fill="none" stroke="#DBAA06" strokeWidth="2.2" strokeLinecap="round" />

                  {/* Arm presenting citrus orange */}
                  <path d="M 150 160 Q 165 155 178 142" fill="none" stroke="#9B7253" strokeWidth="2" strokeLinecap="round" />
                  {/* Detailed Orange with leaves */}
                  <circle cx="180" cy="132" r="10" fill="#DBAA06" stroke="#9B7253" strokeWidth="1.5" />
                  {/* Orange skin textured dot */}
                  <circle cx="178" cy="128" r="0.8" fill="#4A3525" />
                  <circle cx="183" cy="134" r="0.8" fill="#4A3525" />
                  {/* Leaf */}
                  <path d="M 180 122 Q 185 113 180 110 Q 174 114 180 122" fill="#61A358" stroke="#9B7253" strokeWidth="1" />

                  {/* Dirt road ground line */}
                  <path d="M 50 200 Q 120 196 190 200" fill="none" stroke="#61A358" strokeWidth="1.5" strokeLinecap="round" />

                  <text x="122" y="218" fontFamily="serif" fontSize="12" fill="#9B7253" textAnchor="middle" fontWeight="bold">包腾 · 邻水包书记</text>
                  <text x="122" y="232" fontFamily="sans-serif" fontSize="10" fill="#9B7253" opacity="0.6" textAnchor="middle">田野里的带货先锋</text>
                </g>

                {/* 3. Zhang Guifang (97村长小芳) */}
                <g id="zhang-guifang" transform="translate(480, 0)">
                  {/* Village wall rainbow background painting outline */}
                  <path d="M 30 110 Q 90 90 150 110" fill="none" stroke="#DBAA06" strokeWidth="1.5" opacity="0.2" />
                  <path d="M 30 118 Q 90 98 150 118" fill="none" stroke="#61A358" strokeWidth="1.5" opacity="0.2" />

                  {/* Young lady body in cozy denim jacket */}
                  <path d="M 75 200 L 75 135 C 75 120 88 116 112 116 C 136 116 148 120 148 135 L 148 200" fill="#FDFBF7" stroke="#9B7253" strokeWidth="2" strokeLinecap="round" />
                  {/* Denim jacket seams, pocket flaps, and button lines */}
                  <path d="M 102 116 L 102 195" stroke="#9B7253" strokeWidth="1.5" />
                  <path d="M 122 116 L 122 195" stroke="#9B7253" strokeWidth="1.5" />
                  <path d="M 80 138 H 95" stroke="#9B7253" strokeWidth="1.2" />
                  <path d="M 128 138 H 143" stroke="#9B7253" strokeWidth="1.2" />

                  {/* Expressive young face with huge shining eyes & high pony tail */}
                  <circle cx="112" cy="82" r="17" fill="#FDFBF7" stroke="#9B7253" strokeWidth="2" />
                  {/* High swinging ponytail & bangs */}
                  <path d="M 97 78 C 96 66 114 62 126 68 Z" fill="#4A3525" stroke="#9B7253" strokeWidth="1" />
                  <path d="M 100 70 Q 82 72 80 84" fill="none" stroke="#4A3525" strokeWidth="2" strokeLinecap="round" /> {/* Ponytail */}
                  {/* Big lovely eyes with eyelashes & dynamic smiley face */}
                  <ellipse cx="104" cy="80" rx="2" ry="2.5" fill="#4A3525" />
                  <ellipse cx="120" cy="80" rx="2" ry="2.5" fill="#4A3525" />
                  <path d="M 103 74 Q 105 76 107 74" fill="none" stroke="#9B7253" strokeWidth="1" /> {/* eyebrow */}
                  <path d="M 117 74 Q 119 76 121 74" fill="none" stroke="#9B7253" strokeWidth="1" /> {/* eyebrow */}
                  <path d="M 111 83 Q 112 86 110 87" fill="none" stroke="#9B7253" strokeWidth="1.5" />
                  <path d="M 106 91 Q 112 96 118 91" fill="none" stroke="#DBAA06" strokeWidth="2" strokeLinecap="round" />

                  {/* Arm holding smartphone, recording video */}
                  <path d="M 132 155 L 152 155 L 160 148" fill="none" stroke="#9B7253" strokeWidth="1.8" strokeLinecap="round" />
                  {/* Smartphone with screen lines and camera */}
                  <rect x="150" y="142" width="22" height="13" rx="1.5" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.2" transform="rotate(-15, 161, 148)" />
                  <circle cx="154" cy="145" r="1.5" fill="#4A3525" />

                  {/* Silhouetted background grandmother who smiles with her */}
                  <path d="M 40 200 C 40 175 52 170 52 160 C 52 150 48 145 48 138 C 48 128 58 128 58 138 C 58 145 56 150 56 160 C 56 170 68 175 68 200" fill="none" stroke="#9B7253" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
                  <circle cx="53" cy="130" r="1.5" fill="#9B7253" opacity="0.5" /> {/* grandmother hair bun */}

                  <text x="112" y="218" fontFamily="serif" fontSize="12" fill="#9B7253" textAnchor="middle" fontWeight="bold">张桂芳 · 97小芳</text>
                  <text x="112" y="232" fontFamily="sans-serif" fontSize="10" fill="#9B7253" opacity="0.6" textAnchor="middle">镜头对准身边的每一份温存</text>
                </g>
              </svg>
            </div>

            <div className="space-y-8 font-serif text-[16px] md:text-lg leading-relaxed text-[#9B7253]/95">
              <p>
                我们刷短视频的时候也许会看到他们，
                可是，为什么偏偏是他们？
                他们拿起镜头，究竟图什么？
                是追逐短视频流量，是谋求工作政绩，还是藏着别的考量？
              </p>
              <p>
                或许我们真正想问的是：
                当“村书记”的基层身份，撞上短视频镜头，举起手机这件事，到底意味着什么？又到底带来了什么？
              </p>
              <p>往下刷，是另一位扎根乡村的书记；再往下刷，还有更多，更多……</p>
            </div>
          </div>
        </section>

        {/* 二、屏幕那头，站满了人 */}
        <section id="scale" className="py-16 md:py-24 border-b border-[#9B7253]/10">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#61A358] uppercase tracking-widest block font-bold">ACT II · 第二幕</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#9B7253] font-medium tracking-tight">
                屏幕那头，站满了人
              </h2>
            </div>

            <div className="space-y-8 font-serif text-[16px] md:text-lg leading-relaxed text-[#9B7253]/95">
              <p>
                你大概注意到了——不只是董桂林、张桂芳、包腾。
                在四川，名字里带“村支书”、粉丝数超过 <strong className="text-[#B24747] font-bold">1 万</strong> 的抖音账号就不下 <strong className="text-[#B24747] font-bold">20 个</strong>。
                一位自称“‘网红村书记’背后的男人”的返乡创业者，专门协助孵化村支书账号，自 <strong className="text-[#B24747] font-bold">2022 年</strong> 以来已孵化村支书账号 <strong className="text-[#B24747] font-bold">12 个</strong>，总粉丝量突破 <strong className="text-[#B24747] font-bold">120 万</strong>。
              </p>
              <p>
                他们是什么时候开始成规模出现的？
                如果拉一条时间线，会发现事情在两三年前开始变得不一样。
              </p>
            </div>

            {/* INTERACTIVE COMPONENT: Policy Document Timeline */}
            <div className="py-8 space-y-6">
              <div className="text-center space-y-2">
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[#61A358] font-bold">
                  【 政策指引时间轴 · 铺设数字高速路 】
                </span>
                <p className="text-xs text-[#9B7253]/70 font-sans max-w-lg mx-auto">
                  从顶层国策到村头主播孵化，长达八载的数字乡村跨越式演进历程
                </p>
              </div>

              {/* Grid-style structured timeline for outstanding readability and interactive hover states */}
              <div className="relative border-l-2 border-[#9B7253]/15 ml-4 md:ml-12 pl-6 md:pl-10 space-y-10">
                {timelineData.map((event, idx) => (
                  <motion.div 
                    key={idx}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setHoveredEvent(idx)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {/* Circle Node */}
                    <span className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                      hoveredEvent === idx 
                        ? "bg-[#DBAA06] border-[#DBAA06] scale-125" 
                        : "bg-white border-[#9B7253]"
                    }`} />

                    {/* Timeline Event Card */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-sm font-bold text-white bg-[#9B7253] px-2 py-0.5 rounded">
                          {event.year}
                        </span>
                        <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full border border-[#61A358]/20 bg-[#61A358]/10 text-[#61A358] font-semibold">
                          {event.tag}
                        </span>
                      </div>
                      <h4 className="font-serif text-base md:text-lg font-bold text-[#9B7253] group-hover:text-[#DBAA06] transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-xs md:text-sm text-[#9B7253]/85 leading-relaxed font-sans max-w-2xl">
                        {event.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-8 font-serif text-[16px] md:text-lg leading-relaxed text-[#9B7253]/95">
              <p>
                政策在铺路，基础设施在跟上——截至 <strong className="text-[#B24747] font-bold">2025 年 6 月</strong>，我国农村网民规模已达 <strong className="text-[#B24747] font-bold">3.22 亿人</strong>，农村地区互联网普及率达到了 <strong className="text-[#B24747] font-bold">69.2%</strong>。
              </p>
              <p>
                然后，录制的红点一个接一个地亮了，镜头前站的人越来越多：
                <strong className="text-[#B24747] font-bold">2024 年</strong>，越来越多的村支书开始自发拍摄短视频；
                <strong className="text-[#B24747] font-bold">2025 年 4 月到 5 月</strong>，“村支书”在短视频平台的搜索指数同比飙升了 <strong className="text-[#B24747] font-bold">231.8%</strong>；
                从 <strong className="text-[#B24747] font-bold">60 多岁</strong>的老支书到“<strong className="text-[#B24747] font-bold">00后</strong>”年轻支书，从黑龙江到四川，从山东到广东……
              </p>

              {/* CHART 1: 账号简介关键词词云图 */}
              <div className="pt-4 pb-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#9B7253]/15 pb-2 text-xs font-mono text-[#9B7253]/60 gap-2">
                  <span className="font-bold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#DBAA06]" /> FIGURE 01 · 账号简介关键词词云图
                  </span>
                  <span>数据视窗 · 交互图表</span>
                </div>
                
                <div className="w-full bg-[#9B7253]/[0.01] rounded-xl border border-[#9B7253]/15 overflow-hidden shadow-sm">
                  <div className="p-4 bg-[#9B7253]/[0.03] text-xs font-mono text-[#9B7253]/80 border-b border-[#9B7253]/10">
                    💡 <strong>图表解读：</strong> 汇聚成百上千名“网红村书记”的账号个人简介。高频出现的词汇展现了这一群体最为核心的关切——“书记”身份是基石，“助农”、“家乡”、“分享”是连接公众的桥梁。
                  </div>
                  <div className="relative w-full h-[450px] sm:h-[500px] md:h-[550px] flex items-center justify-center bg-white">
                    <iframe 
                      src="https://dycharts.com/xshow/index.html?id=c_802d0d8b6eaba2e172092c99af68a0c8" 
                      className="w-full h-full border-0"
                      scrolling="no" 
                    />
                  </div>
                </div>
              </div>
              <p>
                一个人变成了一群人。
                一群人背后，是一个时代的到来——
                当村庄第一次拥有了直接面对世界说话的能力，书记就成了那个拿起话筒的人，而话筒一旦接通，就再也关不掉了。
              </p>
            </div>

            {/* CHART 2: 账号省份分布情况 */}
            <div className="pt-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#9B7253]/15 pb-2 text-xs font-mono text-[#9B7253]/60 gap-2">
                <span className="font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#61A358]" /> FIGURE 02 · 账号省份分布情况
                </span>
                <span>空间分布 · 区域画像</span>
              </div>
              
              <div className="w-full bg-[#9B7253]/[0.01] rounded-xl border border-[#9B7253]/15 overflow-hidden shadow-sm">
                <div className="p-4 bg-[#9B7253]/[0.03] text-xs font-mono text-[#9B7253]/80 border-b border-[#9B7253]/10">
                  💡 <strong>图表解读：</strong> “网红村书记”们的地理版图分布。从内陆省份到沿海地区，乡村短视频的浪潮正呈现由点及面的全国性开花。
                </div>
                <div className="relative w-full h-[450px] sm:h-[500px] md:h-[550px] flex items-center justify-center bg-white">
                  <iframe 
                    src="https://dycharts.com/xshow/index.html?id=c_c0ea709178b4061e5c8688f2df1ac96d" 
                    className="w-full h-full border-0"
                    scrolling="no" 
                  />
                </div>
              </div>
            </div>

            {/* CHART 3: 性别人物矩阵图 */}
            <div className="pt-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#9B7253]/15 pb-2 text-xs font-mono text-[#9B7253]/60 gap-2">
                <span className="font-bold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#DBAA06]" /> FIGURE 03 · 性别人物矩阵图
                </span>
                <span>群体特征 · 人口结构</span>
              </div>
              
              <div className="w-full bg-[#9B7253]/[0.01] rounded-xl border border-[#9B7253]/15 overflow-hidden shadow-sm">
                <div className="p-4 bg-[#9B7253]/[0.03] text-xs font-mono text-[#9B7253]/80 border-b border-[#9B7253]/10">
                  💡 <strong>图表解读：</strong> 活跃在短视频平台上的“村书记”男女比例及群体矩阵图。男性书记大多以质朴、硬核甚至自黑形象带货，而女性书记则常借助温婉、亲和的家乡代言人形象，两者的受众定位存在结构化差异。
                </div>
                <div className="relative w-full h-[450px] sm:h-[500px] md:h-[550px] flex items-center justify-center bg-white">
                  <iframe 
                    src="https://dycharts.com/xshow/index.html?id=c_219383b75b82f62e7f838261a8bdf6a0" 
                    className="w-full h-full border-0"
                    scrolling="no" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 三、“被看见”的重量 */}
        <section id="visible" className="py-16 md:py-24 border-b border-[#9B7253]/10">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#55ADA1] uppercase tracking-widest block font-bold">ACT III · 第三幕</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#9B7253] font-medium tracking-tight">
                “被看见”的重量
              </h2>
            </div>

            <div className="space-y-12 font-serif text-[16px] md:text-lg leading-relaxed text-[#9B7253]/95">
              <p>当镜头对准乡村，这些书记到底在拍什么？打开一个村支书的短视频账号，内容往往比想象中丰富得多：</p>
              
              {/* Feature 1 with specialty product line art */}
              <div className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-4">
                    <h3 className="font-sans font-bold text-base text-[#9B7253] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#55ADA1]"></span>
                      1. 助农带货：让土特产走出大山
                    </h3>
                    <p className="text-sm md:text-base text-[#9B7253]/85">
                      镜头对准田间地头、果园大棚，还有打包车间——土鸡蛋从鸡舍刚拣出来，柑橘挂满枝头等着采摘，红枣在市场摊开筛选。镜头扫过的不只是产品，更多是土地的滋养，是农民掌心的纹路。
                    </p>
                    <p className="text-xs text-[#9B7253]/70 italic mt-1.5">
                      湖北宣恩县万寨乡向家村党支部书记覃浩——“酒窝书记”拥有 <strong className="text-[#B24747] font-bold">35万</strong> 粉丝，累计帮村民销售农产品超 <strong className="text-[#B24747] font-bold">3000万元</strong>，让大山深处的干货一夜之间摆上了全国消费者的屏幕。
                    </p>
                  </div>
                  
                  <div className="md:col-span-5 animate-fade-in flex justify-center">
                    <img 
                      src="/src/assets/images/products_simple_1784523510620.jpg" 
                      alt="特色农产品：土鸡蛋、深山水蜜桃、猕猴桃与木耳" 
                      className="w-full max-w-xs h-auto rounded-xl border border-[#9B7253]/10 shadow-sm mix-blend-multiply transition-transform hover:scale-[1.01] duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

                {/* Hidden legacy SVG 3 */}
                <div className="hidden">
                  <svg viewBox="0 0 320 120" className="w-full h-auto bg-[#9B7253]/[0.01] border border-[#9B7253]/10 rounded-xl" xmlns="http://www.w3.org/2000/svg">
                    {/* Egg Basket on the left */}
                    <g transform="translate(10, 10)">
                      {/* Detailed Woven Basket */}
                      <path d="M 15 80 L 12 50 L 78 50 L 75 80 Q 45 92 15 80 Z" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.8" strokeLinejoin="round" />
                      {/* Basket weave texture lines */}
                      <path d="M 15 50 Q 45 60 75 50 M 14 60 Q 45 70 76 60 M 13 70 Q 45 80 77 70" fill="none" stroke="#9B7253" strokeWidth="0.8" opacity="0.6" />
                      <line x1="25" y1="50" x2="20" y2="80" stroke="#9B7253" strokeWidth="0.8" opacity="0.6" />
                      <line x1="40" y1="50" x2="40" y2="85" stroke="#9B7253" strokeWidth="0.8" opacity="0.6" />
                      <line x1="55" y1="50" x2="55" y2="85" stroke="#9B7253" strokeWidth="0.8" opacity="0.6" />
                      <line x1="68" y1="50" x2="71" y2="80" stroke="#9B7253" strokeWidth="0.8" opacity="0.6" />
                      {/* Handle with wrapped vine detail */}
                      <path d="M 12 50 Q 45 12 78 50" fill="none" stroke="#9B7253" strokeWidth="1.8" />
                      <path d="M 15 45 Q 45 15 75 45" fill="none" stroke="#DBAA06" strokeWidth="0.8" strokeDasharray="3,3" />

                      {/* Overlapping Eggs inside */}
                      <ellipse cx="28" cy="46" rx="8" ry="11" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.5" transform="rotate(-15, 28, 46)" />
                      <ellipse cx="44" cy="42" rx="9" ry="12" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.5" />
                      <ellipse cx="61" cy="45" rx="8" ry="11" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.5" transform="rotate(20, 61, 45)" />
                      <ellipse cx="36" cy="48" rx="8" ry="11" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.5" transform="rotate(45, 36, 48)" />
                      <ellipse cx="52" cy="47" rx="8" ry="11" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.5" transform="rotate(-30, 52, 47)" />
                      
                      <text x="45" y="102" fontFamily="sans-serif" fontSize="8" fill="#9B7253" textAnchor="middle" fontWeight="bold">土鸡蛋</text>
                    </g>

                    {/* Peach / Kiwifruit in the middle */}
                    <g transform="translate(110, 10)">
                      {/* Deep-mountain Peach with soft cleft & details */}
                      <path d="M 50 72 C 22 72 18 38 45 33 C 50 33 52 36 52 36 C 52 36 54 33 59 33 C 86 38 82 72 54 72 Z" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.8" />
                      {/* Cleft line */}
                      <path d="M 52 36 Q 48 55 52 71" fill="none" stroke="#9B7253" strokeWidth="1" strokeDasharray="2,2" opacity="0.7" />
                      {/* Double leaves */}
                      <path d="M 52 36 Q 42 16 26 21 Q 38 31 52 36" fill="#61A358" stroke="#9B7253" strokeWidth="1.2" />
                      <path d="M 52 33 Q 62 14 74 16 Q 66 27 52 33" fill="#61A358" stroke="#9B7253" strokeWidth="1.2" />
                      {/* Tiny droplets of morning dew */}
                      <circle cx="56" cy="48" r="1" fill="none" stroke="#DBAA06" strokeWidth="0.8" />
                      <circle cx="34" cy="56" r="1.5" fill="none" stroke="#DBAA06" strokeWidth="0.8" />
                      
                      <text x="52" y="102" fontFamily="sans-serif" fontSize="8" fill="#9B7253" textAnchor="middle" fontWeight="bold">深山水蜜桃</text>
                    </g>

                    {/* Kiwi & Wood Ear on the right */}
                    <g transform="translate(210, 10)">
                      {/* Kiwifruit Whole */}
                      <ellipse cx="28" cy="52" rx="14" ry="20" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.5" transform="rotate(35, 28, 52)" />
                      {/* Fine fuzzy hair textures on skin */}
                      <line x1="14" y1="45" x2="11" y2="44" stroke="#9B7253" strokeWidth="0.5" />
                      <line x1="18" y1="36" x2="16" y2="33" stroke="#9B7253" strokeWidth="0.5" />
                      <line x1="28" y1="32" x2="28" y2="29" stroke="#9B7253" strokeWidth="0.5" />

                      {/* Kiwi sliced open */}
                      <circle cx="56" cy="62" r="14" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.8" />
                      <circle cx="56" cy="62" r="5" fill="none" stroke="#61A358" strokeWidth="1.2" />
                      {/* radiating seeds & pattern */}
                      <circle cx="51" cy="59" r="1" fill="#4A3525" />
                      <circle cx="52" cy="64" r="1" fill="#4A3525" />
                      <circle cx="58" cy="57" r="1" fill="#4A3525" />
                      <circle cx="61" cy="61" r="1" fill="#4A3525" />
                      <circle cx="59" cy="66" r="1" fill="#4A3525" />
                      <circle cx="54" cy="67" r="1" fill="#4A3525" />

                      {/* Curled wild wood-ear mushrooms */}
                      <path d="M 72 75 C 68 70 60 70 61 78 C 62 84 72 88 77 82" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.2" />
                      <path d="M 82 73 C 79 67 72 68 72 75 C 72 80 82 82 85 77" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.2" />
                      {/* Wood ear internal vein ridges */}
                      <path d="M 72 75 Q 67 76 66 79" fill="none" stroke="#9B7253" strokeWidth="0.6" opacity="0.6" />
                      <path d="M 82 73 Q 77 75 76 78" fill="none" stroke="#9B7253" strokeWidth="0.6" opacity="0.6" />

                      <text x="52" y="102" fontFamily="sans-serif" fontSize="8" fill="#9B7253" textAnchor="middle" fontWeight="bold">猕猴桃 & 椴木木耳</text>
                    </g>
                  </svg>
                </div>

                {/* Feature 2: Snow horse riding with outline illustration */}
                <div className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7 space-y-4">
                      <h3 className="font-sans font-bold text-base text-[#9B7253] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#55ADA1]"></span>
                        2. 文旅推广：让乡村被世界瞩目
                      </h3>
                      <p className="text-sm md:text-base text-[#9B7253]/85">
                        古村落的老街、梯田上的云海、溪流边的露营、非遗手艺的传承。村书记成了家乡的“首席推荐官”，只需一条短视频，就能将那些交通不便、鲜为人知的村庄，以及那些未经修饰的原生态美景，推到了千万人的眼前。
                      </p>
                      <p className="text-xs text-[#9B7253]/70 italic mt-1.5">
                        已故的原昭苏县副县长贺娇龙，自 <strong className="text-[#B24747] font-bold">2020 年</strong> 开始常态化拍摄骑马短视频。一条<strong className="text-[#B24747] font-bold">不到一分钟</strong>的雪原策马视频，全网播放量突破 <strong className="text-[#B24747] font-bold">6 亿次</strong>，旺季游客暴涨<strong className="text-[#B24747] font-bold">上万人</strong>。
                      </p>
                    </div>

                    <div className="md:col-span-5 animate-fade-in flex justify-center">
                      <img 
                        src="/src/assets/images/horse_simple_1784523521417.jpg" 
                        alt="雪地策马：文旅推广的浩瀚图景" 
                        className="w-full max-w-xs h-auto rounded-xl border border-[#9B7253]/10 shadow-sm mix-blend-multiply transition-transform hover:scale-[1.01] duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Hidden legacy SVG 4 */}
                <div className="hidden">
                  <svg viewBox="0 0 320 160" className="w-full h-auto bg-[#9B7253]/[0.01] border border-[#9B7253]/10 rounded-xl" xmlns="http://www.w3.org/2000/svg">
                    {/* Far mountains outline */}
                    <path d="M 10 130 L 40 100 L 70 120 L 110 85 L 150 115 L 200 75 L 260 115 L 310 105 L 310 130 Z" fill="none" stroke="#9B7253" strokeWidth="0.5" opacity="0.15" />
                    {/* Background snow horizon */}
                    <path d="M 10 130 Q 160 140 310 130" fill="none" stroke="#9B7253" strokeWidth="0.8" strokeDasharray="3,3" />

                    {/* Galloping horse & rider (He Jiaolong) */}
                    <g transform="translate(45, 12)">
                      {/* Dramatic Billowing Cape (flowing backwards, very detailed folds) */}
                      <path d="M 105 55 Q 60 20 20 50 Q 5 65 15 75 Q 40 85 75 75 Q 100 68 115 58 Z" fill="#FDFBF7" stroke="#DBAA06" strokeWidth="1.8" strokeLinejoin="round" />
                      {/* Cape fold lines */}
                      <path d="M 85 58 Q 50 38 25 56" fill="none" stroke="#DBAA06" strokeWidth="1" />
                      <path d="M 90 64 Q 65 48 35 68" fill="none" stroke="#DBAA06" strokeWidth="1" />

                      {/* Rider (Detailed posture, coat, and hat) */}
                      {/* Head & Fur Hat */}
                      <circle cx="112" cy="42" r="7" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.5" />
                      <path d="M 104 39 C 104 33 120 33 120 39 C 120 42 118 44 112 44 Z" fill="#4A3525" stroke="#9B7253" strokeWidth="1" /> {/* hat flap */}
                      {/* Rider body & coat */}
                      <path d="M 105 49 C 100 55 98 75 106 78 C 114 78 120 70 118 55" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.8" />
                      {/* Holding reins */}
                      <path d="M 116 58 L 132 58" stroke="#9B7253" strokeWidth="1.2" />

                      {/* Galloping Horse (Athletic anatomy & wind-swept mane/tail) */}
                      {/* Horse Head */}
                      <path d="M 165 48 C 172 40 182 48 178 58 L 160 68 L 152 56 Z" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.8" strokeLinejoin="round" />
                      <circle cx="168" cy="52" r="1" fill="#4A3525" /> {/* Horse Eye */}
                      {/* Horse Ears */}
                      <path d="M 163 48 L 165 40 L 169 48" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.2" />
                      <path d="M 160 48 L 159 41 L 164 48" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1" opacity="0.8" />
                      {/* Wind-blown Mane */}
                      <path d="M 152 56 Q 140 38 128 48 Q 142 54 152 56" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.2" />
                      <path d="M 144 64 Q 132 46 122 56 Q 135 60 144 64" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.2" />
                      
                      {/* Horse Neck */}
                      <path d="M 152 56 Q 138 78 126 76" fill="none" stroke="#9B7253" strokeWidth="1.8" />
                      {/* Horse Body */}
                      <path d="M 126 76 C 110 76 86 80 80 98 C 80 110 110 114 132 100 C 148 88 156 82 152 68" fill="#FDFBF7" stroke="#9B7253" strokeWidth="2" strokeLinejoin="round" />
                      
                      {/* Reins running to head */}
                      <path d="M 132 58 Q 148 58 162 62" fill="none" stroke="#9B7253" strokeWidth="1" />

                      {/* Galloping legs in mid-air */}
                      {/* Front Left Leg (extended forward) */}
                      <path d="M 142 90 L 165 112 L 178 108" fill="none" stroke="#9B7253" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Front Right Leg */}
                      <path d="M 146 88 L 158 102 L 166 98" fill="none" stroke="#9B7253" strokeWidth="1" opacity="0.7" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Back Left Leg (stretched backward) */}
                      <path d="M 92 94 L 62 114 L 46 108" fill="none" stroke="#9B7253" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Back Right Leg */}
                      <path d="M 88 94 L 74 116 L 64 112" fill="none" stroke="#9B7253" strokeWidth="1" opacity="0.7" strokeLinecap="round" strokeLinejoin="round" />

                      {/* Flying Tail */}
                      <path d="M 82 88 Q 50 80 38 92 Q 52 100 82 94" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M 76 90 Q 54 85 44 94" fill="none" stroke="#9B7253" strokeWidth="1" />
                    </g>
                    
                    {/* Dynamic speed lines in snow */}
                    <line x1="20" y1="125" x2="50" y2="125" stroke="#9B7253" strokeWidth="1" strokeLinecap="round" />
                    <line x1="210" y1="122" x2="250" y2="122" stroke="#9B7253" strokeWidth="0.8" strokeLinecap="round" />
                    <line x1="230" y1="132" x2="270" y2="132" stroke="#9B7253" strokeWidth="1.2" strokeLinecap="round" />
                    
                    {/* Small flying snow flakes */}
                    <circle cx="95" cy="115" r="1.5" fill="#DBAA06" />
                    <circle cx="110" cy="120" r="1" fill="#DBAA06" />
                    <circle cx="215" cy="105" r="1.5" fill="#61A358" />
                  </svg>
                </div>

                {/* Feature 3: From Speaker to Drama skit */}
                <div className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7 space-y-4">
                      <h3 className="font-sans font-bold text-base text-[#9B7253] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#55ADA1]"></span>
                        3. 基层治理：让政策融入寻常百姓家
                      </h3>
                      <p className="text-sm md:text-base text-[#9B7253]/85">
                        国家新政策哪些和乡亲们有关？纸面上的政策如何落地融入百姓的日常生活？过去靠大喇叭通知、靠传单发放的政策信息，如今被书记们用乡音录成短视频，推送到乡亲们的手机上。有的编成情景剧，把邻里纠纷演给大家看；有的编成顺口溜，让政策听得懂、记得住。
                      </p>
                      <p className="text-xs text-[#9B7253]/70 italic mt-1.5">
                        河南息县江庄村村支书彭卫，面对纠纷将案例改编为通俗幽默的视频情景剧，通过“线上演、群众看、大家评”，让矛盾化解从事后转向事前。
                      </p>
                    </div>

                    <div className="md:col-span-5 animate-fade-in flex justify-center">
                      <img 
                        src="/src/assets/images/speaker_simple_1784523533045.jpg" 
                        alt="从大喇叭到小屏幕：治理载体的变迁" 
                        className="w-full max-w-xs h-auto rounded-xl border border-[#9B7253]/10 shadow-sm mix-blend-multiply transition-transform hover:scale-[1.01] duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Hidden legacy SVG 5 */}
                <div className="hidden">
                  <svg viewBox="0 0 320 130" className="w-full h-auto bg-[#9B7253]/[0.01] border border-[#9B7253]/10 rounded-xl" xmlns="http://www.w3.org/2000/svg">
                    {/* Left: Traditional high-pole loudspeaker */}
                    <g transform="translate(10, 10)">
                      {/* Pole with structure/wood lines */}
                      <line x1="40" y1="15" x2="40" y2="105" stroke="#9B7253" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="37" y1="30" x2="37" y2="105" stroke="#9B7253" strokeWidth="0.8" opacity="0.4" />
                      {/* Ground brick mount */}
                      <path d="M 32 105 L 48 105 L 52 112 L 28 112 Z" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.2" />
                      
                      {/* Big Horn Speaker Left */}
                      <path d="M 40 30 L 20 20 C 16 28 16 38 20 46 Z" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.5" strokeLinejoin="round" />
                      <ellipse cx="20" cy="33" rx="2" ry="12" fill="none" stroke="#9B7253" strokeWidth="1" />
                      <line x1="40" y1="33" x2="22" y2="33" stroke="#9B7253" strokeWidth="1.2" />
                      
                      {/* Big Horn Speaker Right */}
                      <path d="M 40 30 L 60 20 C 64 28 64 38 60 46 Z" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.5" strokeLinejoin="round" />
                      <ellipse cx="60" cy="33" rx="2" ry="12" fill="none" stroke="#9B7253" strokeWidth="1" />
                      <line x1="40" y1="33" x2="58" y2="33" stroke="#9B7253" strokeWidth="1.2" />
                      
                      {/* Sound waves emitting dynamically */}
                      <path d="M 12 18 Q 2 30 12 42" fill="none" stroke="#DBAA06" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M 7 12 Q -7 30 7 48" fill="none" stroke="#DBAA06" strokeWidth="0.8" strokeDasharray="2,2" />
                      <path d="M 68 18 Q 78 30 68 42" fill="none" stroke="#DBAA06" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M 73 12 Q 87 30 73 48" fill="none" stroke="#DBAA06" strokeWidth="0.8" strokeDasharray="2,2" />
                      
                      <text x="40" y="122" fontFamily="sans-serif" fontSize="8" fill="#9B7253" textAnchor="middle" fontWeight="bold">村头大喇叭</text>
                    </g>

                    {/* Transition arrow/bridge in the middle */}
                    <g transform="translate(100, 45)">
                      {/* Elegant transformation bridge */}
                      <path d="M 5 20 Q 25 -10 45 10" fill="none" stroke="#DBAA06" strokeWidth="1.8" strokeDasharray="2,2" />
                      <path d="M 40 5 L 47 10 L 40 16" fill="none" stroke="#DBAA06" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </g>

                    {/* Right: Modern smartphone vertical video with drama play */}
                    <g transform="translate(175, 5)">
                      {/* Smartphone frame with detailed buttons & lens */}
                      <rect x="25" y="10" width="60" height="102" rx="7" fill="#FDFBF7" stroke="#9B7253" strokeWidth="2" />
                      {/* Internal screen */}
                      <rect x="29" y="15" width="52" height="92" rx="4" fill="none" stroke="#9B7253" strokeWidth="0.8" />
                      {/* Speaker and Front Camera */}
                      <line x1="50" y1="13" x2="60" y2="13" stroke="#9B7253" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="45" cy="13" r="0.8" fill="#4A3525" />

                      {/* Play screen content: micro actors (drama skit outline) */}
                      {/* Actor 1 (Left - wearing a straw hat) */}
                      <circle cx="43" cy="44" r="5.5" fill="#FDFBF7" stroke="#61A358" strokeWidth="1.2" />
                      {/* Straw hat */}
                      <path d="M 33 41 Q 43 32 53 41" fill="none" stroke="#DBAA06" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="30" y1="42" x2="56" y2="42" stroke="#DBAA06" strokeWidth="1.8" strokeLinecap="round" />
                      
                      <path d="M 43 50 L 43 68 L 36 82" fill="none" stroke="#61A358" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M 43 56 Q 32 50 35 46" fill="none" stroke="#61A358" strokeWidth="1.5" strokeLinecap="round" />
                      
                      {/* Actor 2 (Right - gesturing neighbor) */}
                      <circle cx="65" cy="48" r="5.5" fill="#FDFBF7" stroke="#9B7253" strokeWidth="1.2" />
                      {/* Hair bun */}
                      <circle cx="68" cy="42" r="2" fill="#4A3525" stroke="#9B7253" strokeWidth="1" />
                      
                      <path d="M 65 54 L 65 72 L 72 82" fill="none" stroke="#9B7253" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M 65 60 Q 52 56 49 60" fill="none" stroke="#9B7253" strokeWidth="1.5" strokeLinecap="round" />

                      {/* Dialogue / Speech Bubbles and Hearts (Live interaction) */}
                      <path d="M 41 33 Q 50 24 59 31" fill="none" stroke="#DBAA06" strokeWidth="1" strokeDasharray="1,2" />
                      {/* Floating hearts */}
                      <path d="M 35 90 Q 35 86 37 86 Q 39 86 39 90 Q 39 93 35 96 Q 31 93 31 90 Q 31 86 33 86 Q 35 86 35 90 Z" fill="#DBAA06" opacity="0.8" />
                      <path d="M 75 92 Q 75 89 76.5 89 Q 78 89 78 92 Q 78 94.5 75 97 Q 72 94.5 72 92 Q 72 89 73.5 89 Q 75 89 75 92 Z" fill="#61A358" opacity="0.8" />
                      
                      <text x="55" y="122" fontFamily="sans-serif" fontSize="8" fill="#9B7253" textAnchor="middle" fontWeight="bold">政策情景短剧</text>
                    </g>
                  </svg>
                </div>

              <p className="pt-4">
                中国有多少村庄，就有多少“酒香也怕巷子深”的故事：优质的农产品卖不出去，独特的山水无人知晓，传统手艺随老人离世而失传。
              </p>
              <p>
                传统媒体时代，绝大多数村庄终其一生都不会有一次省级报道的机会。
                而在新媒体时代，短视频的出现，第一次给了每一个村庄零成本走向全国的可能——一部手机、一个账号，一个偏远山村的书记就能直接面对千万用户。
              </p>
              <p>
                但更深层的变化在于村干部的角色边界正在松动。
                过去，村干部只需要管好村里的事、服务好村里的人；
                现在，他们发现自己可以不只是“村干部”，还可以是家乡的代言人、农产品的推荐官、政策的转译员……身份在扩展，责任在叠加。
              </p>
              <p>
                当镜头举起来时，他们首先要面对的，是来自四面八方的目光和追问——
                <span className="italic block text-[#9B7253]/70 text-center py-4 font-semibold">
                  “书记整天拍视频，还有时间干正事吗？”<br/>
                  “直播赚的钱进了谁的口袋？”
                </span>
                这些问题，几乎每一个走进镜头的书记都遇到过。
                他们需要用时间和结果来回应，而这条“回应”的路，比想象中要复杂得多。
              </p>
            </div>
          </div>
        </section>

        {/* 四、流量的另一面 */}
        <section id="behind" className="py-16 md:py-24 border-b border-[#9B7253]/10">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#DBAA06] uppercase tracking-widest block font-bold">ACT IV · 第四幕</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#9B7253] font-medium tracking-tight">
                流量的另一面
              </h2>
            </div>

            <div className="space-y-8 font-serif text-[16px] md:text-lg leading-relaxed text-[#9B7253]/95">
              <p>
                很多人关注村书记账号，是想在遍地剧本与营销的互联网里，找一片“真实的净土”。
                但当流量、关注与利益一同涌向镜头前的书记，这片净土也不可避免地迎来了它的考验。
              </p>
              <p>
                当一位村书记决定按下录制键，他面对的不只是镜头，而是一个关于身份、责任与规则的隐秘战场。
              </p>
            </div>

            {/* Sub Section 1: 名 */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-medium text-[#9B7253] border-b border-[#9B7253]/20 pb-2">
                1. 名：面子和里子的拉扯
              </h3>
              <div className="space-y-4 font-serif text-[15px] md:text-base leading-relaxed text-[#9B7253]/90">
                <p>
                  “辛辛苦苦考入编，为了人民去擦边”——一位网友曾在评论区这样调侃，
                  起因是某地村干部为了带货展示农作，脱去外套大秀健硕肌肉，结果引来“作秀擦边”的争议。
                </p>
                <p>
                  “官员做网红”始终伴随着极大的传统偏见——
                  在传统认知中，基层干部应当沉稳低调、庄重务实；
                  而抛头露面拍短视频、对着镜头直播带货，天然和传统的严肃身份有所出入。
                  要想在短视频中突围，就必须放下架子，唠家常、干粗活。但这份接地气，在不少保守审视下，反倒成了“丢了干部体面”。
                </p>
              </div>

              {/* 交互设计：舆论审视弹幕墙 */}
              <div className="relative w-full h-52 bg-[#9B7253]/[0.03] rounded-xl border border-[#9B7253]/15 overflow-hidden my-6">
                <style>{`
                  @keyframes danmaku-run {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                  }
                `}</style>
                {/* 装饰性背景网格 */}
                <div className="absolute inset-0 pointer-events-none opacity-5">
                  <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(#9B7253 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                </div>

                <div className="absolute top-3 left-4 text-[10px] font-mono text-[#9B7253]/50 uppercase tracking-widest z-10 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#DBAA06]/80 rounded-full animate-ping"></span>
                  <span>舆论回廊</span>
                </div>
                
                <div className="absolute inset-0 pt-10 pb-12 overflow-hidden">
                  {danmakus.map((dm) => {
                    const isUser = (dm as any).isUser;
                    return (
                      <div
                        key={dm.id}
                        className={`absolute whitespace-nowrap font-serif transition-opacity pointer-events-none ${
                          isUser 
                            ? "text-[#B24747] font-bold text-base bg-[#B24747]/5 px-2 py-0.5 rounded border border-[#B24747]/10 z-20" 
                            : "text-[#9B7253] text-sm font-medium"
                        }`}
                        style={{
                          top: dm.top,
                          left: 0,
                          opacity: isUser ? 0.95 : 0.28,
                          animation: `danmaku-run ${dm.speed}s linear infinite`,
                          animationDelay: `${dm.delay}s`,
                        }}
                      >
                        {dm.text}
                      </div>
                    );
                  })}
                </div>
                
                <div className="absolute bottom-3 inset-x-3 flex gap-2 z-10 bg-white/70 backdrop-blur-sm p-1.5 rounded-lg border border-[#9B7253]/10">
                  <input
                    type="text"
                    placeholder="输入你所见到的公众审视、质疑或看法..."
                    value={newDanmaku}
                    onChange={(e) => setNewDanmaku(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddDanmaku();
                    }}
                    className="flex-1 bg-transparent px-3 py-1 text-xs text-[#B24747] font-semibold placeholder-[#9B7253]/40 focus:outline-none"
                  />
                  <button
                    onClick={handleAddDanmaku}
                    className="bg-[#9B7253] hover:bg-[#805D43] text-white text-xs font-mono font-medium px-4 py-1.5 rounded-md transition-colors"
                  >
                    发送评论
                  </button>
                </div>
              </div>

              {/* CHART 5: 性别人物矩阵图 */}
              <div className="pt-4 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#9B7253]/15 pb-2 text-xs font-mono text-[#9B7253]/60 gap-2">
                  <span className="font-bold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#DBAA06]" /> FIGURE 05 · 性别人物矩阵图
                  </span>
                  <span>群体特征 · 人口结构</span>
                </div>
                
                <div className="w-full bg-[#9B7253]/[0.01] rounded-xl border border-[#9B7253]/15 overflow-hidden shadow-sm">
                  <div className="p-4 bg-[#9B7253]/[0.03] text-xs font-mono text-[#9B7253]/80 border-b border-[#9B7253]/10">
                    💡 <strong>图表解读：</strong> 展示了村书记自媒体的主播性别分布及核心人物定位画像。
                  </div>
                  <div className="relative w-full h-[450px] sm:h-[500px] md:h-[550px] flex items-center justify-center bg-white">
                    <iframe 
                      src="https://dycharts.com/xshow/index.html?id=c_1795dc2d8ae550779997bc2f1e1e5c07" 
                      className="w-full h-full border-0"
                      scrolling="no" 
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 五、在摇摆中找到锚点 */}
        <section id="anchor" className="py-16 md:py-24 border-b border-[#9B7253]/10">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#61A358] uppercase tracking-widest block font-bold">ACT V · 第五幕</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#9B7253] font-medium tracking-tight">
                在摇摆中找到锚点
              </h2>
            </div>

            <div className="space-y-8 font-serif text-[16px] md:text-lg leading-relaxed text-[#9B7253]/95">
              <p>
                来自名、权、利的三重考验没有标准答案。
                但每一位仍然选择坚守在镜头前的书记，都在用一次次具体的实践作出回答。
                当把所有考量置于天平之上，他们用什么沉重的砝码来稳住乡村发展的重心？
              </p>

              {/* 交互设计：乡村治理与自媒体天平 */}
              <div className="bg-[#9B7253]/[0.02] border border-[#9B7253]/15 rounded-2xl p-5 md:p-8 space-y-6">
                <div className="text-center space-y-2">
                  <h4 className="font-serif font-bold text-lg text-[#9B7253] flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#DBAA06]" />
                    乡村自媒体 · 治理与流量平衡天平
                  </h4>
                  <p className="text-xs text-[#9B7253]/70 max-w-lg mx-auto leading-relaxed">
                    开场状态下，天平向左倾斜。左侧托盘承载着“名、权、利”三重舆情考验。点击下方的回应举措，将其转化为“重力砝码”投放至右侧，帮助天平回归平衡。
                  </p>
                </div>

                {/* SVG 天平可视化 */}
                <div className="relative py-4">
                  <svg viewBox="0 0 300 180" className="w-full max-w-sm mx-auto drop-shadow-sm">
                    {/* 静态立柱与底座 */}
                    <path 
                      d="M 120 160 L 180 160 L 170 150 L 150 150 L 150 60 L 150 50" 
                      fill="none" 
                      stroke="#9B7253" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    <circle cx="150" cy="50" r="4.5" fill="#DBAA06" />

                    {/* 动态旋转的梁架（梁长：220） */}
                    {/* 梁旋转角度: -15 (0个砝码), -10 (1个), -5 (2个), 0 (3个) */}
                    {(() => {
                      const beamRotation = -15 + (placedWeights.length * 5);
                      return (
                        <g style={{ transform: `rotate(${beamRotation}deg)`, transformOrigin: "150px 50px", transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                          {/* 梁 */}
                          <line x1="40" y1="50" x2="260" y2="50" stroke="#9B7253" strokeWidth="3.5" strokeLinecap="round" />
                          <circle cx="150" cy="50" r="2" fill="#9B7253" />

                          {/* 左吊盘及考验砝码 (吊点位于40, 50) */}
                          {/* 吊盘需要反向旋转以保持垂直 */}
                          <g style={{ transform: `rotate(${-beamRotation}deg)`, transformOrigin: "40px 50px", transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                            {/* 吊线 */}
                            <line x1="40" y1="50" x2="20" y2="110" stroke="#9B7253" strokeWidth="1.2" strokeDasharray="2,2" />
                            <line x1="40" y1="50" x2="60" y2="110" stroke="#9B7253" strokeWidth="1.2" strokeDasharray="2,2" />
                            {/* 盘底 */}
                            <path d="M 15 110 Q 40 120 65 110" fill="none" stroke="#9B7253" strokeWidth="2.5" strokeLinecap="round" />
                            
                            {/* 左侧三枚沉重砝码: 名, 权, 利 */}
                            <g>
                              {/* 名 */}
                              <rect x="23" y="93" width="10" height="15" rx="1" fill="#9B7253" fillOpacity="0.8" stroke="#805D43" strokeWidth="1" />
                              <text x="28" y="104" fontSize="7" fill="#FFFFFF" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">名</text>
                              
                              {/* 权 */}
                              <rect x="35" y="93" width="10" height="15" rx="1" fill="#9B7253" fillOpacity="0.8" stroke="#805D43" strokeWidth="1" />
                              <text x="40" y="104" fontSize="7" fill="#FFFFFF" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">权</text>
                              
                              {/* 利 */}
                              <rect x="47" y="93" width="10" height="15" rx="1" fill="#9B7253" fillOpacity="0.8" stroke="#805D43" strokeWidth="1" />
                              <text x="52" y="104" fontSize="7" fill="#FFFFFF" textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">利</text>
                            </g>
                          </g>

                          {/* 右吊盘及破局砝码 (吊点位于260, 50) */}
                          <g style={{ transform: `rotate(${-beamRotation}deg)`, transformOrigin: "260px 50px", transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                            {/* 吊线 */}
                            <line x1="260" y1="50" x2="240" y2="110" stroke="#9B7253" strokeWidth="1.2" strokeDasharray="2,2" />
                            <line x1="260" y1="50" x2="280" y2="110" stroke="#9B7253" strokeWidth="1.2" strokeDasharray="2,2" />
                            {/* 盘底 */}
                            <path d="M 235 110 Q 260 120 285 110" fill="none" stroke="#9B7253" strokeWidth="2.5" strokeLinecap="round" />
                            
                            {/* 右侧投放的破局砝码 */}
                            {placedWeights.includes("名") && (
                              <g>
                                <rect x="242" y="95" width="10" height="13" rx="1" fill="#61A358" stroke="#3D7B35" strokeWidth="1" />
                                <text x="247" y="104" fontSize="7" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">绩</text>
                              </g>
                            )}
                            {placedWeights.includes("权") && (
                              <g>
                                <rect x="255" y="95" width="10" height="13" rx="1" fill="#61A358" stroke="#3D7B35" strokeWidth="1" />
                                <text x="260" y="104" fontSize="7" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">制</text>
                              </g>
                            )}
                            {placedWeights.includes("利") && (
                              <g>
                                <rect x="268" y="95" width="10" height="13" rx="1" fill="#61A358" stroke="#3D7B35" strokeWidth="1" />
                                <text x="273" y="104" fontSize="7" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">清</text>
                              </g>
                            )}
                          </g>
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                {/* 砝码投放按钮控制面板 */}
                <div className="grid gap-4 md:grid-cols-3">
                  <button
                    onClick={() => toggleWeight("名")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      placedWeights.includes("名")
                        ? "bg-[#61A358]/10 border-[#61A358] text-[#3D7B35]"
                        : "bg-white border-[#9B7253]/15 hover:border-[#9B7253]/40 text-[#9B7253]"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#DBAA06]/10 flex items-center justify-center">
                        <Award className="w-4 h-4 text-[#DBAA06]" />
                      </div>
                      <span className="font-mono text-[10px] text-[#9B7253]/60">砝码 A</span>
                    </div>
                    <h5 className="font-serif font-bold text-sm mb-1">名之重归 · 以实绩正名</h5>
                    <p className="text-[11px] leading-relaxed text-[#9B7253]/80">
                      通过踏实业绩回应“作秀、擦边”争议，让实惠看得见。
                    </p>
                    <div className="mt-3 flex justify-end">
                      <span className="text-[10px] font-mono font-bold bg-[#9B7253]/5 px-2 py-0.5 rounded border border-[#9B7253]/10">
                        {placedWeights.includes("名") ? "已投放 ✓" : "点击投放 📥"}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => toggleWeight("权")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      placedWeights.includes("权")
                        ? "bg-[#61A358]/10 border-[#61A358] text-[#3D7B35]"
                        : "bg-white border-[#9B7253]/15 hover:border-[#9B7253]/40 text-[#9B7253]"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#61A358]/10 flex items-center justify-center">
                        <Compass className="w-4 h-4 text-[#61A358]" />
                      </div>
                      <span className="font-mono text-[10px] text-[#9B7253]/60">砝码 B</span>
                    </div>
                    <h5 className="font-serif font-bold text-sm mb-1">权之重构 · 以机制解绑</h5>
                    <p className="text-[11px] leading-relaxed text-[#9B7253]/80">
                      引入专业返乡青年运营团队，让干部精力回归主责主业。
                    </p>
                    <div className="mt-3 flex justify-end">
                      <span className="text-[10px] font-mono font-bold bg-[#9B7253]/5 px-2 py-0.5 rounded border border-[#9B7253]/10">
                        {placedWeights.includes("权") ? "已投放 ✓" : "点击投放 📥"}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => toggleWeight("利")}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      placedWeights.includes("利")
                        ? "bg-[#61A358]/10 border-[#61A358] text-[#3D7B35]"
                        : "bg-white border-[#9B7253]/15 hover:border-[#9B7253]/40 text-[#9B7253]"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#55ADA1]/10 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-[#55ADA1]" />
                      </div>
                      <span className="font-mono text-[10px] text-[#9B7253]/60">砝码 C</span>
                    </div>
                    <h5 className="font-serif font-bold text-sm mb-1">利之明晰 · 以清廉破局</h5>
                    <p className="text-[11px] leading-relaxed text-[#9B7253]/80">
                      归属村集体领办合作社，定期公示账目，实现人走号留。
                    </p>
                    <div className="mt-3 flex justify-end">
                      <span className="text-[10px] font-mono font-bold bg-[#9B7253]/5 px-2 py-0.5 rounded border border-[#9B7253]/10">
                        {placedWeights.includes("利") ? "已投放 ✓" : "点击投放 📥"}
                      </span>
                    </div>
                  </button>
                </div>

                {/* 砝码解读面板 */}
                {activeScaleDetail && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-5 bg-[#9B7253]/[0.03] border border-[#9B7253]/15 rounded-xl space-y-4 text-left"
                  >
                    {activeScaleDetail === "名" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#DBAA06]/10 text-[#DBAA06] font-mono text-[10px] font-bold px-2 py-0.5 rounded">名之实绩案例</span>
                          <h6 className="font-serif font-bold text-[#9B7253] text-sm">以脚踏实地的工作消解“秀场”偏见</h6>
                        </div>
                        <p className="font-serif italic text-xs md:text-sm text-[#9B7253]/90 border-l-2 border-[#DBAA06] pl-3 leading-relaxed">
                          “刚开始拍视频时，有村民在背后指指点点，说我不务正业，天天拿着手机作秀、擦边，想当‘网红’自己发财。但我从来不解释。我带着两委干部去开荒种树，把荒山变成百果园；在村里建免费的老年食堂，解决留守老人吃饭难。当他们吃到嘴里，看到荒山变绿，那些争议自然风吹云散。流量只是喇叭，真正的地基是我们踩在泥土里的脚印。” ——东屏村支部书记 董桂林
                        </p>
                        <p className="text-[11px] text-[#9B7253]/70 font-sans leading-relaxed">
                          <strong>机制亮点：</strong> 用具体可感的民生实绩取代空洞的自媒体人设，将无形的流量声量，切实转换为有形的强村富民成果，以此重塑公信力。
                        </p>
                      </div>
                    )}
                    {activeScaleDetail === "权" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#61A358]/10 text-[#61A358] font-mono text-[10px] font-bold px-2 py-0.5 rounded">权之解绑案例</span>
                          <h6 className="font-serif font-bold text-[#9B7253] text-sm">专班专人运营，让书记回归基层服务</h6>
                        </div>
                        <p className="font-serif italic text-xs md:text-sm text-[#9B7253]/90 border-l-2 border-[#61A358] pl-3 leading-relaxed">
                          “短视频要脚本、要剪辑、要策划，如果这些事情都由我一个个人包揽，那他必然无暇顾及村务。我们村推行了‘专班分工’，从返乡创业的大学生里挑选专业年轻人做技术后期，我只有在需要站台带货、政策宣讲的重要节点才出镜。我的本职工作，从来没有发生任何偏移。” ——羊鹿滩村书记 包腾
                        </p>
                        <p className="text-[11px] text-[#9B7253]/70 font-sans leading-relaxed">
                          <strong>机制亮点：</strong> 羊鹿滩村探索“干部出镜代言 + 专业青年运营”模式，不仅解决了干部精力不济的问题，更为本村返乡青年创造了大量电商就业岗位，实现了“一人当网红，带火一排人”。
                        </p>
                      </div>
                    )}
                    {activeScaleDetail === "利" && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#55ADA1]/10 text-[#55ADA1] font-mono text-[10px] font-bold px-2 py-0.5 rounded">利之透明案例</span>
                          <h6 className="font-serif font-bold text-[#9B7253] text-sm">以党支部领办合作社切断廉政风险</h6>
                        </div>
                        <p className="font-serif italic text-xs md:text-sm text-[#9B7253]/90 border-l-2 border-[#55ADA1] pl-3 leading-relaxed">
                          “有粉丝说：‘小芳书记，你赚这么多钱，是不是揣进个人口袋里了？’我非常自豪地告诉他们：不。我们三家村的短视频账号以及商品橱窗，名义持有人早就通过法律手段过户给了‘三家村集体领办合作社’。每一分钱的佣金分红，都会由村集体财务、全体村民定期公示审计，全部用来建立老年食堂和修缮道路。我干干净净，将来离任了，这个账号也彻底属于村集体，这就是‘人走账号留’。” ——三家村支部书记 张桂芳
                        </p>
                        <p className="text-[11px] text-[#9B7253]/70 font-sans leading-relaxed">
                          <strong>机制亮点：</strong> 针对个人账号产权不清的“信任黑箱”，将账号注册权及收益公开剥离，彻底杜绝了借公益之名贪腐或侵占公共数字资产的风险，让书记与群众都放下了最大的后顾之忧。
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 天平完全回正解锁惊喜横幅 */}
                {placedWeights.length === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#61A358]/10 border border-[#61A358]/35 rounded-xl p-4 text-center space-y-2"
                  >
                    <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#3D7B35] font-serif">
                      <Sparkles className="w-5 h-5 text-[#DBAA06] animate-bounce" />
                      天平回归完美平衡！数字流量已被稳健驯化为乡村发展的坚实基石。
                    </div>
                    <p className="text-xs text-[#9B7253] max-w-xl mx-auto leading-relaxed font-serif">
                      当沉重的实绩、清晰的分工机制以及彻底透明的清廉制度被一一放到天平的右端时，网络流量带来的狂风和摇晃被稳稳消弭。村书记的身份在扩容中，重新找到了扎实的基层公信力与振兴动力。
                    </p>
                  </motion.div>
                )}
              </div>

              <p className="pt-4">
                天平两端，他们不断调整着自我的角色砝码，寻找最稳固的平衡。
                但更值得追问的是——当网络流量骤降，繁华散尽之后，真正留给村庄的是什么？
              </p>
            </div>
          </div>
        </section>

        {/* 六、流量与热度退潮之后 */}
        <section id="tide" className="py-16 md:py-24 border-b border-[#9B7253]/10">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#55ADA1] uppercase tracking-widest block font-bold">ACT VI · 第六幕</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#9B7253] font-medium tracking-tight">
                流量与热度退潮之后
              </h2>
            </div>

            <div className="space-y-8 font-serif text-[16px] md:text-lg leading-relaxed text-[#9B7253]/95">
              <p>
                一条网络爆款的持续热度，大约只有 <strong className="text-[#B24747] font-bold">7 天</strong>。
                而一个真实乡村的改变，却是以 <strong className="text-[#B24747] font-bold">年</strong> 为度量单位。
              </p>

              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#9B7253] flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-[#55ADA1] rounded-full"></span>
                  爆款之后的<strong className="text-[#B24747] font-bold">第 100 天</strong>，他们还在更新吗？
                </h3>
                <p className="text-sm md:text-base text-[#9B7253]/85 leading-relaxed">
                  无数顶着“乡村推荐官”光环的个人账号，因缺乏持续的高质内容供给，在 <strong className="text-[#B24747] font-bold">60 到 90 天</strong>内停更、沦为僵尸号。
                  但真正坚守下来的书记，则把热度转译为常态。短视频不再只是博眼球的窗口，而逐渐沉淀为一件务实的基层治理工具。
                </p>
              </div>

              {/* CHART 4: 粉丝规模长尾数据（半金字塔） */}
              <div className="pt-4 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#9B7253]/15 pb-2 text-xs font-mono text-[#9B7253]/60 gap-2">
                  <span className="font-bold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#55ADA1]" /> FIGURE 04 · 粉丝规模长尾数据（半金字塔）
                  </span>
                  <span>数据规模 · 倒金字塔</span>
                </div>
                
                <div className="w-full bg-[#9B7253]/[0.01] rounded-xl border border-[#9B7253]/15 overflow-hidden shadow-sm">
                  <div className="p-4 bg-[#9B7253]/[0.03] text-xs font-mono text-[#9B7253]/80 border-b border-[#9B7253]/10">
                    💡 <strong>图表解读：</strong> 粉丝规模的分层情况。极少数的“百万头部”拥有全网顶尖的带货号召力，而绝大多数腰部、尾部的书记账号则沉淀在 1 万至 10 万级区间，默默服务本地村民与特定社群。
                  </div>
                  <div className="relative w-full h-[500px] sm:h-[600px] bg-white">
                    <iframe 
                      src="https://flo.uri.sh/visualisation/29731245/embed?auto=1" 
                      className="w-full h-full border-0"
                      scrolling="no" 
                    />
                  </div>
                </div>
              </div>

              {/* CHART 5: 不同性别所属账号粉丝规模对比 */}
              <div className="pt-4 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#9B7253]/15 pb-2 text-xs font-mono text-[#9B7253]/60 gap-2">
                  <span className="font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#55ADA1]" /> FIGURE 05 · 不同性别所属账号粉丝规模对比
                  </span>
                  <span>性别对比 · 规模走势</span>
                </div>
                
                <div className="w-full bg-[#9B7253]/[0.01] rounded-xl border border-[#9B7253]/15 overflow-hidden shadow-sm">
                  <div className="p-4 bg-[#9B7253]/[0.03] text-xs font-mono text-[#9B7253]/80 border-b border-[#9B7253]/10">
                    💡 <strong>图表解读：</strong> 展示了男性和女性所属账号在不同粉丝数量级上的分布结构。虽然大体呈长尾分布，但不同性别角色的叙事手法在粉丝黏性与扩张逻辑上表现出不同的轨迹。
                  </div>
                  <div className="relative w-full h-[450px] sm:h-[500px] md:h-[550px] flex items-center justify-center bg-white">
                    <iframe 
                      src="https://dycharts.com/xshow/index.html?id=c_89ff98815cb827603fb98593561affba" 
                      className="w-full h-full border-0"
                      scrolling="no" 
                    />
                  </div>
                </div>
              </div>

              {/* CHART 7: "粉丝—获赞—作品数"三角关系散点图 */}
              <div className="pt-4 pb-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#9B7253]/15 pb-2 text-xs font-mono text-[#9B7253]/60 gap-2">
                  <span className="font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#55ADA1]" /> FIGURE 07 · “粉丝 — 获赞 — 作品数”三角关系散点图
                  </span>
                  <span>数据科学 · 三维散点</span>
                </div>
                
                <div className="w-full bg-[#9B7253]/[0.01] rounded-xl border border-[#9B7253]/15 overflow-hidden shadow-sm">
                  <div className="p-4 bg-[#9B7253]/[0.03] text-xs font-mono text-[#9B7253]/80 border-b border-[#9B7253]/10">
                    💡 <strong>图表解读：</strong> 这里揭示了村书记自媒体创作中，作品发布总数与最终获取赞数、粉丝数增长的强关联关系。大量默默耕耘的作品构筑了乡村传播的底部，而少数精品则爆发出庞大的赞量。
                  </div>
                  <div className="relative w-full h-[500px] sm:h-[600px] bg-white">
                    <iframe 
                      src="https://flo.uri.sh/visualisation/29731129/embed?auto=1" 
                      className="w-full h-full border-0"
                      scrolling="no" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#9B7253] flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-[#55ADA1] rounded-full"></span>
                  人们记住的，是书记的名字，还是村庄的名字？
                </h3>
                <p className="text-sm md:text-base text-[#9B7253]/85 leading-relaxed">
                  算法总爱推荐具体的人：从“功夫书记”到“蹭饭书记”。
                  但成熟的网红书记，都懂得把个人的名气悄然转移到村庄上。青岛即墨前枣杭村 90 后书记金帅，爆火后拒绝走职业博主道路，而是拍摄村中各家炸串铺子，将千万流量输送进一条条真实的烟火老街。
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#9B7253] flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-[#55ADA1] rounded-full"></span>
                  虚无的流量，如何敲打并改变着物理世界？
                </h3>
                <p className="text-sm md:text-base text-[#9B7253]/85 leading-relaxed">
                  订单暴增倒逼村庄建立起第一座冷链物流库、第一套健全的品控分级标准。更核心的是，曾经为了生存出走他乡的青年，在视频中重新看到了故乡和土地的希望，悄然购买了返程的车票。
                </p>
              </div>

              <p className="pt-4">
                所以，流量退潮过后的沙滩上，真正留下来的宝贵财富，是一种前所未有的<strong>持续连接</strong>。
              </p>
            </div>
          </div>
        </section>

        {/* 七、相信“乡”信的力量 */}
        <section id="belief" className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#DBAA06] uppercase tracking-widest block font-bold">ACT VII · 第七幕</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#9B7253] font-medium tracking-tight text-center">
                相信“乡”信的力量
              </h2>
            </div>

            <div className="space-y-8 font-serif text-[16px] md:text-lg leading-relaxed text-[#9B7253]/95">
              <p>
                他们的镜头，最初只是一部破旧或寻常的手机。
                后来，镜头里被塞进了越来越多<span className="font-bold text-[#9B7253]">沉甸甸的事物</span>：
                装进了大山里滞销的<span className="text-[#3D7B35] font-semibold">土特产</span>；装进了留守老人在天安门前修过的<span className="text-[#3D7B35] font-semibold">合影</span>；装进了归乡青年脸上舒展的<span className="text-[#3D7B35] font-semibold">笑意</span>；也装进了一个村落长久以来对<span className="font-bold text-[#9B7253] border-b border-[#9B7253]/25 pb-0.5">“被看见”的全部执念</span>。
              </p>
              <p>
                但，当村书记决定将自己投身于短视频镜头时，他真正直面的，是一片<span className="font-semibold text-[#9B7253] border-b border-dashed border-[#9B7253]/40 pb-0.5">极其复杂的海域</span>：
                要面对喜怒无常的算法红利、面对四面八方的利益审视，还要面对对自己本职工作的大众怀疑。
                他们原本只需要对这一片巴掌大的泥土和千百村民负责；
                现在，他们还要在<span className="font-bold text-[#9B7253]">算法机制</span>和<span className="font-bold text-[#9B7253]">舆论的风浪</span>里奋力前行。
              </p>
              <p className="text-center font-serif italic text-[#9B7253] py-6 border-y border-[#9B7253]/15 max-w-2xl mx-auto leading-loose text-base md:text-lg font-bold bg-[#9B7253]/[0.02] rounded-xl my-8">
                “网红拍的是<span className="text-[#9B7253] font-sans font-medium bg-[#9B7253]/5 px-2 py-0.5 rounded border border-[#9B7253]/10 mx-1">‘我’</span>，<br/>而乡村书记拍的，永远是<span className="text-[#3D7B35] font-sans font-bold bg-[#61A358]/10 px-2 py-0.5 rounded border border-[#61A358]/20 mx-1">‘我们村’</span>。”
              </p>
              <p>
                国家政策近年来不断为数字化乡村铺平坦的大道，然而，高大宏观的政策从不是遥不可及的一纸红头文件，而是要有人真正<span className="font-semibold text-[#3D7B35] border-b-2 border-[#61A358]/20 pb-0.5">弯下腰，在沾满黄泥的田垄上</span>，把官样词汇一字一句翻译成乡亲们懂的<span className="font-bold text-[#9B7253]">方言</span>；
                把政策宏大蓝图，化为屏幕上生机勃勃的一个个普通人的生活碎片。
              </p>
              <p>
                董桂林跨进村民门槛蹭的每一顿家常饭，张桂芳在免费老年食堂盯紧的每一口饭菜，包腾在果树林子里架起的每一场声嘶力竭的带货……
                这些质朴至极的动作，正是政策落地、直抵人心的<span className="font-bold text-[#3D7B35] bg-[#61A358]/10 px-2 py-0.5 rounded border border-[#61A358]/20">最终拼图</span>。
              </p>
              <p className="flex flex-col items-center justify-center">
                因此，<span className="font-serif text-lg md:text-xl font-bold text-[#3D7B35] bg-[#61A358]/10 px-3 py-1 rounded border border-[#61A358]/20 inline-block my-2 shadow-sm">“相信‘乡’信的力量”</span>：
                不仅是在屏幕前去信任一个举起镜头的普通人；
                更是那个人透过冷冰冰的玻璃屏幕，为整个现代社会、为辽阔的世界寄出了一封饱含热泪的<span className="font-bold text-[#3D7B35] border-b border-dashed border-[#61A358] pb-0.5">“乡村来信”</span>：
              </p>
            </div>
            
            {/* INTERACTIVE LETTER BLOCK */}
              <div className="py-6">
                {!isLetterOpened ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-xl mx-auto aspect-[1.6/1] md:aspect-[1.7/1] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1C4E24] via-[#3D7B35] to-[#1E3B1B] shadow-[0_20px_50px_rgba(61,123,53,0.3)] p-6 border-4 border-[#DBAA06]/30 flex flex-col justify-between"
                  >
                    {/* Retro grid lines on envelope */}
                    <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />
                    
                    {/* Stamp at top right */}
                    <div className="absolute top-4 right-6 border-2 border-dashed border-[#B24747]/70 text-[#B24747] text-[9px] font-mono font-bold px-2 py-1 rotate-12 flex flex-col items-center select-none bg-white/5 rounded-md backdrop-blur-sm shadow-sm z-10">
                      <span className="tracking-widest">中国邮政</span>
                      <span className="text-[#DBAA06] text-xs font-serif mt-0.5">乡信 2026</span>
                    </div>

                    {/* Postal Grid boxes */}
                    <div className="flex gap-1.5 select-none z-10">
                      {[4, 5, 6, 7, 0, 0].map((num, idx) => (
                        <div key={idx} className="w-5 h-6 border border-[#DBAA06]/50 rounded-sm flex items-center justify-center text-[10px] font-mono text-[#DBAA06] font-bold bg-white/5">
                          {num}
                        </div>
                      ))}
                    </div>

                    {/* Envelope Center Title */}
                    <div className="text-center my-auto py-2 z-10">
                      <h4 className="font-serif text-lg md:text-xl text-[#FBF8F3] tracking-[0.2em] font-medium pl-[0.2em]">
                        来自田垄深处的“乡村来信”
                      </h4>
                      <p className="text-[10px] md:text-xs font-serif text-[#DBAA06]/70 mt-1 uppercase tracking-widest font-bold">
                        来自生机勃勃的基层回响
                      </p>
                    </div>

                    {/* Golden Wax Seal in Center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-20">
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setIsLetterOpened(true); setActiveLetterId(0); }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-[#EAA41A] to-[#DBAA06] border-4 border-white/95 shadow-[0_10px_25px_rgba(219,170,6,0.4)] flex flex-col items-center justify-center cursor-pointer select-none group"
                      >
                        <span className="absolute -inset-1 rounded-full border border-dashed border-[#DBAA06]/60 animate-spin-slow group-hover:scale-105 duration-300"></span>
                        <span className="absolute -inset-2 rounded-full border border-[#DBAA06]/20 animate-ping opacity-60"></span>
                        <Mail className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-serif text-[10px] font-bold tracking-widest text-white mt-1">启 封</span>
                      </motion.button>
                      <span className="text-[10px] text-[#FBF8F3]/60 font-serif tracking-widest animate-pulse mt-1 select-none">
                        点击漆印 · 见字如面
                      </span>
                    </div>

                    {/* Left corner detail */}
                    <div className="text-[9px] font-serif text-[#DBAA06]/60 tracking-widest max-w-[40%] select-none z-10">
                      官方文献 #2026-乡村守护者
                    </div>

                    {/* Sender & Receiver Info */}
                    <div className="text-right select-none font-serif z-10">
                      <div className="text-[11px] text-[#FBF8F3]/60 italic">寄件人：默默耕耘的村书记们</div>
                      <div className="text-xs text-[#DBAA06] font-medium mt-0.5">收件人：见字如面的每一个你</div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 120 }}
                    className="w-full max-w-2xl mx-auto bg-[#FCF9F2] rounded-2xl shadow-2xl overflow-hidden border relative"
                    style={{
                      borderColor: `${lettersData[activeLetterId].color}30`
                    }}
                  >
                    {/* Top tabs */}
                    <div className="flex border-b border-[#9B7253]/10 bg-[#9B7253]/5">
                      {lettersData.map((item, idx) => {
                        const isActive = idx === activeLetterId;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setActiveLetterId(idx)}
                            className="flex-1 py-3 px-2 font-serif text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 relative cursor-pointer font-semibold"
                            style={{
                              color: isActive ? item.color : "#9B7253",
                              backgroundColor: isActive ? "#FCF9F2" : "transparent",
                            }}
                          >
                            <span 
                              className="w-2.5 h-2.5 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            />
                            {item.author}的来信
                            {isActive && (
                              <motion.div 
                                layoutId="activeLetterBorder"
                                className="absolute bottom-0 inset-x-0 h-[3px]"
                                style={{ backgroundColor: item.color }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Letter Body paper container */}
                    <div className="p-6 md:p-8 space-y-6 min-h-[350px] flex flex-col justify-between relative bg-[radial-gradient(#9b725310_1px,transparent_1px)] [background-size:16px_16px]">
                      
                      {/* Letter Stamp */}
                      <div className="flex justify-between items-start gap-4 border-b border-[#9B7253]/15 pb-4">
                        <div>
                          <span 
                            className="text-[10px] font-mono tracking-widest font-bold uppercase px-2 py-0.5 rounded-sm"
                            style={{ 
                              color: lettersData[activeLetterId].color,
                              backgroundColor: `${lettersData[activeLetterId].color}12`
                            }}
                          >
                            信件第 {activeLetterId + 1} 封 · 乡村振兴微光
                          </span>
                          <h4 
                            className="font-serif text-base md:text-lg font-bold mt-1.5"
                            style={{ color: lettersData[activeLetterId].color }}
                          >
                            {lettersData[activeLetterId].title}
                          </h4>
                        </div>
                        <MailOpen 
                          className="w-5 h-5 shrink-0" 
                          style={{ color: lettersData[activeLetterId].color }}
                        />
                      </div>

                      {/* Content */}
                      <div className="py-4 font-serif text-sm md:text-base leading-relaxed text-[#4A3C31] whitespace-pre-line pl-4 border-l-2"
                        style={{ borderLeftColor: lettersData[activeLetterId].color }}
                      >
                        {lettersData[activeLetterId].content}
                      </div>

                      {/* Signature & Village Stamp */}
                      <div className="flex justify-between items-end border-t border-[#9B7253]/10 pt-4 mt-2">
                        <div className="text-[11px] font-mono text-[#9B7253]/50">
                          * 本文根据真实村书记自媒体采访素材梳理呈现
                        </div>
                        
                        <div className="text-right font-serif relative">
                          <div className="text-xs text-[#9B7253]/70">寄自田垄：</div>
                          <div className="text-sm font-bold text-gray-800 mt-0.5">{lettersData[activeLetterId].author}</div>
                          <div className="text-xs text-[#9B7253]/80 mt-0.5 italic">{lettersData[activeLetterId].village}</div>
                          
                          {/* Traditional Seal */}
                          <div 
                            className="absolute -right-2 -bottom-2 border-2 text-[10px] font-bold p-1 rounded font-serif rotate-12 scale-90 select-none pointer-events-none"
                            style={{ 
                              borderColor: `${lettersData[activeLetterId].color}`,
                              color: `${lettersData[activeLetterId].color}` 
                            }}
                          >
                            {lettersData[activeLetterId].author.substring(0, 2)}印
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Bottom controls */}
                    <div className="flex justify-between items-center bg-[#9B7253]/[0.03] border-t border-[#9B7253]/10 px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          disabled={activeLetterId === 0}
                          onClick={() => setActiveLetterId(prev => Math.max(0, prev - 1))}
                          className={`px-3 py-1.5 text-xs font-serif rounded border cursor-pointer select-none transition-colors ${
                            activeLetterId === 0 
                              ? "opacity-40 border-[#9B7253]/10 text-[#9B7253]/40 cursor-not-allowed" 
                              : "border-[#9B7253]/20 text-[#9B7253] hover:bg-[#9B7253]/5"
                          }`}
                        >
                          ← 前一封
                        </button>
                        <button
                          disabled={activeLetterId === lettersData.length - 1}
                          onClick={() => setActiveLetterId(prev => Math.min(lettersData.length - 1, prev + 1))}
                          className={`px-3 py-1.5 text-xs font-serif rounded border cursor-pointer select-none transition-colors ${
                            activeLetterId === lettersData.length - 1 
                              ? "opacity-40 border-[#9B7253]/10 text-[#9B7253]/40 cursor-not-allowed" 
                              : "border-[#9B7253]/20 text-[#9B7253] hover:bg-[#9B7253]/5"
                          }`}
                        >
                          下一封 →
                        </button>
                      </div>

                      <button
                        onClick={() => setIsLetterOpened(false)}
                        className="text-xs font-serif font-bold text-[#DBAA06] bg-[#DBAA06]/10 px-3 py-1.5 rounded-full border border-[#DBAA06]/20 hover:bg-[#DBAA06]/15 transition-all cursor-pointer flex items-center gap-1"
                      >
                        重新封缄
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              <p className="text-center font-bold text-xl md:text-2xl text-[#9B7253] py-4 mt-8 bg-[#9B7253]/5 rounded-xl border-x-4 border-[#9B7253] shadow-sm max-w-2xl mx-auto">
                “我们没有遗忘这里，而这里也依然<span className="text-[#4F8B49] font-serif font-bold">生机勃勃</span>。”
              </p>
              <p className="text-center text-[#9B7253]/85 leading-relaxed">
                浪潮总会退去，技术亦将不断演变。<br />
                但<span className="font-bold text-[#9B7253] border-b border-dashed border-[#9B7253]/30">泥土里的根不会变</span>。
                真正推动这片古老土地发生改变的，或许也从来不只是某一条爆火的网络视频。
              </p>
              <p className="text-center font-serif text-xl md:text-2xl text-[#DBAA06] pt-8 font-bold tracking-wide animate-pulse">
                而是当年，那个坚定地将手机举向家乡的瞬间。
              </p>
            </div>
        </section>

      </div>

      {/* Elegant Footer */}
      <footer className="border-t border-[#9B7253]/10 py-16 px-4 bg-[#9B7253]/[0.02] text-center">
        <div className="max-w-4xl mx-auto space-y-8 text-left">
          {/* Team Members */}
          <div className="space-y-2">
            <h4 className="font-serif text-xs font-bold tracking-widest text-[#9B7253] flex items-center gap-2 uppercase">
              <span className="w-1.5 h-3 bg-[#55ADA1] rounded-full"></span>
              团队成员 · Team Members
            </h4>
            <div className="text-xs font-serif text-[#9B7253]/80 pl-3.5 space-y-1">
              <p className="font-medium">
                <strong>乡当有流量队：</strong>白灵、杨佳雯、张紫妍、谢诗晨
              </p>
            </div>
          </div>

          {/* Data Sources */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold tracking-widest text-[#9B7253] flex items-center gap-2 uppercase">
              <span className="w-1.5 h-3 bg-[#55ADA1] rounded-full"></span>
              数据来源与研究方法 · Data Sources
            </h4>
            <div className="text-xs font-serif text-[#9B7253]/75 pl-3.5 space-y-3 leading-relaxed">
              <div className="space-y-1">
                <p className="font-bold text-[#9B7253]/90">1. 平台数据（自建一手数据）</p>
                <p className="pl-4 border-l border-[#9B7253]/15">
                  以“村书记”“第一书记”“村支书”等为关键词检索抖音，交叉验证人民日报、新华社、各省农业农村厅推荐及地方融媒体报道，人工初筛排除企业号与仿冒账号，建立近 300 个基层干部账号样本库。使用八爪鱼采集器批量抓取主页公开字段（粉丝数、获赞数、视频量、IP属地、认证状态、橱窗开通等），形成结构化数据库。
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[#9B7253]/90">2. 政策文本</p>
                <p className="pl-4 border-l border-[#9B7253]/15">
                  检索北大法宝、中国政府网及农业农村部等官网，采集 2018–2026 年中央与地方关于“数字乡村”“直播助农”“基层干部新媒体运用”等政策文件与指导意见，提取关键条款作为制度背景依据。
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[#9B7253]/90">3. 媒体报道</p>
                <p className="pl-4 border-l border-[#9B7253]/15">
                  收集人民日报、新华社、农民日报等主流媒体对典型“网红书记”的深度报道，用于样本核验与叙事补充。
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Nav Dock for easy jumping across sections, especially on mobile/iframes */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur border border-[#9B7253]/25 px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2.5 md:gap-4 text-[10px] md:text-xs font-mono max-w-[95%] overflow-x-auto scrollbar-none transition-all hover:border-[#9B7253]/50">
        <span className="text-[#9B7253]/40 font-bold border-r border-[#9B7253]/15 pr-2.5 select-none hidden sm:inline">章节大纲</span>
        <button 
          onClick={() => document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" })}
          className={`px-2 py-1 rounded transition-colors cursor-pointer ${activeNav === "intro" ? "bg-[#9B7253] text-white font-bold" : "text-[#9B7253]/80 hover:bg-[#9B7253]/10"}`}
        >
          壹·发端
        </button>
        <button 
          onClick={() => document.getElementById("scale")?.scrollIntoView({ behavior: "smooth" })}
          className={`px-2 py-1 rounded transition-colors cursor-pointer ${activeNav === "scale" ? "bg-[#9B7253] text-white font-bold" : "text-[#9B7253]/80 hover:bg-[#9B7253]/10"}`}
        >
          贰·群像
        </button>
        <button 
          onClick={() => document.getElementById("visible")?.scrollIntoView({ behavior: "smooth" })}
          className={`px-2 py-1 rounded transition-colors cursor-pointer ${activeNav === "visible" ? "bg-[#9B7253] text-white font-bold" : "text-[#9B7253]/80 hover:bg-[#9B7253]/10"}`}
        >
          叁·看见
        </button>
        <button 
          onClick={() => document.getElementById("behind")?.scrollIntoView({ behavior: "smooth" })}
          className={`px-2 py-1 rounded transition-colors cursor-pointer ${activeNav === "behind" ? "bg-[#9B7253] text-white font-bold" : "text-[#9B7253]/80 hover:bg-[#9B7253]/10"}`}
        >
          肆·审视
        </button>
        <button 
          onClick={() => document.getElementById("anchor")?.scrollIntoView({ behavior: "smooth" })}
          className={`px-2 py-1 rounded transition-colors cursor-pointer ${activeNav === "anchor" ? "bg-[#9B7253] text-white font-bold" : "text-[#9B7253]/80 hover:bg-[#9B7253]/10"}`}
        >
          伍·解绑
        </button>
        <button 
          onClick={() => document.getElementById("tide")?.scrollIntoView({ behavior: "smooth" })}
          className={`px-2 py-1 rounded transition-colors cursor-pointer ${activeNav === "tide" ? "bg-[#9B7253] text-white font-bold" : "text-[#9B7253]/80 hover:bg-[#9B7253]/10"}`}
        >
          陆·回响
        </button>
        <button 
          onClick={() => document.getElementById("belief")?.scrollIntoView({ behavior: "smooth" })}
          className={`px-2 py-1 rounded transition-colors cursor-pointer ${activeNav === "belief" ? "bg-[#9B7253] text-white font-bold" : "text-[#9B7253]/80 hover:bg-[#9B7253]/10"}`}
        >
          柒·乡信
        </button>
      </div>
    </div>
  );
}

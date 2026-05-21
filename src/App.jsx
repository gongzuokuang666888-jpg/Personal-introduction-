import { useState, useEffect } from 'react'
import avatarImg from './assets/avatar.png'

const PROJECTS_DATA = [
  {
    id: 1,
    title: '企业级“数字员工”智能体底座',
    category: 'AI 智能体',
    description: '面向连锁零售集团构建的数字员工底座平台。提供统一的智能体托管、私有知识库检索（RAG）、自动化工具链调用与多主体（Multi-Agent）协同架构，支撑财务、客服、督导等数十个运营场景的数字员工快速部署与无缝集成。',
    tags: ['智能体底座', '数字员工', 'RAG 知识库', '多智能体协同'],
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    link: '#',
  },
  {
    id: 2,
    title: '连锁门店 AI 智能预测与自动订货系统',
    category: '大数据',
    description: '针对生鲜与快消零售场景，构建融合深度学习时序预测与强化学习的智能订货模型。实时清洗整合历史销量、促销活动、天气及损耗多维数据，实现门店商品自动订货与精准补货，显著降低耗损率并提升周转效能。',
    tags: ['智能订货', '时序预测', '损耗控制', '自动补货'],
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    link: '#',
  },
  {
    id: 3,
    title: '零售连锁 AI 智能体导购生态系统',
    category: 'AI 智能体',
    description: '针对大型零售连锁门店场景设计的多智能体（Multi-Agent）协同系统。系统集成智能导购、自动补货及智能客服等多个专用智能体，实现门店运营效率提升 25% 并显著优化顾客留存率。',
    tags: ['AI 智能体', '智慧零售', '大语言模型', '多智能体协同'],
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    link: '#',
  },
  {
    id: 4,
    title: '零售门店大数据智能决策系统',
    category: '大数据',
    description: '构建连锁零售场景下的核心数据资产化模型。清洗并整合供应链与终端销售数据，实现智能选品、动态定价及精准营销，推动实体零售实现数据资产的商业化变现。',
    tags: ['大数据分析', '决策科学', '连锁管理', '商业变现'],
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    link: '#',
  },
  {
    id: 5,
    title: '政-产-学-研-资-用 创新生态平台',
    category: '产业融合',
    description: '牵头构建以“政-产-学-研-资-用”为核心的复合型创新生态链。通过搭建平台机制与合作网络，高效对接多方资源，推动人工智能与大数据技术由基础研究向产业落地、商业变现的高效转化。',
    tags: ['生态搭建', '资源协同', '商业转化', '产业融合'],
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    link: '#',
  }
];

const SKILLS_DATA = [
  { name: '企业级智能体底座 (AI Agent Platform)', primary: true },
  { name: '数字员工与流程自动化', primary: true },
  { name: 'AI 智能订货与预测', primary: true },
  { name: '大数据资产化与变现', primary: true },
  { name: '连锁零售数字化转型', primary: false },
  { name: '复合创新生态圈构建', primary: false },
  { name: '政-产-学-研 资源对接', primary: false },
  { name: '顶层架构设计与推动', primary: false },
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // 1. 鼠标跟随背景光晕状态
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothedMousePos, setSmoothedMousePos] = useState({ x: 0, y: 0 });

  // 2. 页面滚动进度状态
  const [scrollProgress, setScrollProgress] = useState(0);

  // 3. 动态打字机效果状态
  const TYPED_WORDS = ["落地实践专家", "多智能体生态构建者", "大数据分析科学家"];
  const [wordIdx, setWordIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Set theme attributes on HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 监听鼠标移动
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 鼠标平滑缓动效果 (Spring interpolation)
  useEffect(() => {
    let animationFrameId;
    const updateSmoothedPosition = () => {
      setSmoothedMousePos(prev => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        const ease = 0.08; // 缓动系数，越小越平滑
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease
        };
      });
      animationFrameId = requestAnimationFrame(updateSmoothedPosition);
    };
    animationFrameId = requestAnimationFrame(updateSmoothedPosition);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // 监听滚动进度
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 打字机逻辑
  useEffect(() => {
    let timer;
    const currentWord = TYPED_WORDS[wordIdx];
    const speed = isDeleting ? 40 : 100;

    if (!isDeleting && typedText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setWordIdx(prev => (prev + 1) % TYPED_WORDS.length);
    } else {
      timer = setTimeout(() => {
        setTypedText(
          isDeleting 
            ? currentWord.substring(0, typedText.length - 1)
            : currentWord.substring(0, typedText.length + 1)
        );
      }, speed);
    }
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIdx]);

  // IntersectionObserver 滚动渐入动效
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
      }
    );
    revealElements.forEach(el => observer.observe(el));
    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) errors.name = '请输入您的姓名';
    if (!formData.email.trim()) {
      errors.email = '请输入您的电子邮箱';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = '请输入有效的电子邮箱地址';
    }
    if (!formData.message.trim()) errors.message = '请输入您的留言内容';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSending(true);
    setSubmitError('');

    fetch("https://formsubmit.co/ajax/gongzuokuang666888@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        姓名: formData.name,
        邮箱: formData.email,
        留言内容: formData.message,
        _subject: "【个人网站新留言】来自您的个人主页",
        _captcha: "false"
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("发送失败，请稍后重试");
    })
    .then(() => {
      setIsSending(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    })
    .catch(error => {
      setIsSending(false);
      setSubmitError(error.message || '网络连接发生故障，请稍后重试');
    });
  };

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  return (
    <>
      {/* 滚动进度条 */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* 鼠标跟随背景光晕 */}
      <div className="cursor-glow" style={{ transform: `translate3d(calc(${smoothedMousePos.x}px - 50%), calc(${smoothedMousePos.y}px - 50%), 0)` }} />
      <div className="cursor-glow-2" style={{ transform: `translate3d(calc(${smoothedMousePos.x}px - 50%), calc(${smoothedMousePos.y}px - 50%), 0)` }} />

      {/* 导航栏 */}
      <header className="header">
        <div className="container nav">
          <a href="#hero" className="logo" style={{ letterSpacing: '0.05em' }}>
            <span className="text-gradient">张炜立</span>.dev
          </a>
          
          {/* 移动端汉堡菜单按钮 */}
          <button 
            className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label="Toggle Menu"
            title="切换导航菜单"
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>个人介绍</a></li>
            <li><a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>实践项目</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>生态合作</a></li>
            <li>
              <button 
                onClick={toggleTheme} 
                className="theme-toggle" 
                aria-label="Toggle Theme"
                title={`切换至${theme === 'dark' ? '日间' : '夜间'}模式`}
              >
                {theme === 'dark' ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* 首屏 Hero Section */}
      <section id="hero" className="hero section">
        <div className="container grid-2">
          <div className="hero-content">
            <div className="hero-subtitle">百果园集团科技中心 生态负责人</div>
            <h1 className="hero-title">
              大数据与 AI 智能体 <br />
              <span className="text-gradient typed-text">{typedText}</span>
              <span className="typed-cursor">|</span>
            </h1>
            <p className="hero-description" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
              具备超过 8 年大数据与人工智能产业应用经验，长期致力于推动 AI 与传统产业的深度融合，从顶层设计到项目落地的全链条推动能力。具备 10 年以上企业级资源协同与生态搭建经验，擅长构建以“政-产-学-研-资-用”为核心的复合型创新生态链。
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">查看实践项目</a>
              <a href="#contact" className="btn btn-secondary">对接生态合作</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="avatar-wrapper animate-float" style={{ border: '4px solid hsl(var(--bg-secondary))' }}>
              <img src={avatarImg} alt="张炜立" className="avatar-img" />
              <div className="avatar-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 综合个人介绍 Section */}
      <section id="about" className="section reveal">
        <div className="container grid-2">
          <div className="reveal-left">
            <h2>个人介绍</h2>
            <p style={{ marginTop: '20px', marginBottom: '16px', textIndent: '2em', lineHeight: '1.75' }}>
              张炜立，原深圳市大数据研究与应用协会秘书长、大数据分析师。具备超过 8 年大数据与人工智能产业应用经验，长期致力于推动 AI 与传统产业的深度融合，从顶层设计到项目落地的全链条推动能力。具备 10 年以上企业级资源协同与生态搭建经验，擅长构建以“政-产-学-研-资-用”为核心的复合型创新生态链。
            </p>
            <p style={{ marginBottom: '28px', textIndent: '2em', lineHeight: '1.75' }}>
              通过构建平台机制与合作网络，推动人工智能技术从基础研究向产业落地、商业变现的高效转化。在零售连锁行业，积极探索并落地以“AI 智能体（AI Agents）”和“数字员工”为代表的前沿技术，开发智能预测与自动订货系统，实现业务流程的高效自动化，赋能数据智能驱动实体零售的商业化爆发。
            </p>
            
            <h3>核心专业领域</h3>
            <div className="skills-container" style={{ marginTop: '16px' }}>
              {SKILLS_DATA.map((skill, i) => (
                <span key={i} className={`skill-badge ${skill.primary ? 'skill-badge-primary' : ''}`}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          <div className="reveal-right delay-200">
            <h2>核心优势与价值</h2>
            <div className="value-pillars" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ color: 'hsl(var(--secondary))', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  1. 企业级 AI 智能体与数字员工底座
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.6' }}>
                  构建以统一平台托管、多模态智能体协同为代表的零售数智化基础设施，赋能供应链、客服与内部督导等核心业务全流程自适应提效。
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ color: 'hsl(var(--primary))', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                  2. AI 智能订货与零售大数据资产化
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.6' }}>
                  以智能需求预测和订单自动化流转为抓手，融合复杂多维销售数据流，降低生鲜耗损，实现数据资产向实际业绩和周转效率的高效变现。
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ color: 'hsl(var(--accent))', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  3. 复合型创新生态链搭建
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.6' }}>
                  以“政-产-学-研-资-用”为核心，通过构建平台机制与合作网络，高效对接多方资源，推动人工智能技术从基础研究向产业落地、商业变现的高效转化。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 实践项目 Section */}
      <section id="projects" className="section reveal">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }} className="reveal">
            <h2>核心实践项目</h2>
            <p style={{ marginTop: '12px', color: 'hsl(var(--text-secondary))' }}>
              聚焦人工智能落地、大数据应用与连锁零售产业升级的实践成果。
            </p>
            
            {/* 过滤器 */}
            <div className="skills-container" style={{ justifyContent: 'center', marginTop: '24px' }}>
              {['All', 'AI 智能体', '大数据', '产业融合'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`skill-badge ${activeCategory === cat ? 'skill-badge-primary' : ''}`}
                  style={{ border: '1px solid hsl(var(--border-color))', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  {cat === 'All' ? '全部' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-3 portfolio-grid">
            {filteredProjects.map((project, idx) => (
              <article key={project.id} className={`glass-panel project-card reveal-scale delay-${(idx % 3) * 100 + 100}`}>
                <div className="project-icon">
                  {project.icon}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description" style={{ fontSize: '0.92rem', lineHeight: '1.6' }}>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link">
                  查看成果详情
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 生态合作 Section */}
      <section id="contact" className="section reveal">
        <div className="container grid-2">
          <div className="reveal-left">
            <h2>开启生态合作</h2>
            <p style={{ marginTop: '20px', marginBottom: '40px', maxWidth: '480px', color: 'hsl(var(--text-secondary))' }}>
              如果您希望探讨零售行业数字化升级、多智能体（Multi-Agent）系统落地，或进行政产学研资源生态合作对接，欢迎随时与我联系。
            </p>
            
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon-box">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="contact-item-title">电子邮箱</div>
                  <div className="contact-item-value">gongzuokuang666888@gmail.com</div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon-box">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="contact-item-title">联络地址</div>
                  <div className="contact-item-value">中国 · 深圳</div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-right delay-200">
            <form onSubmit={handleFormSubmit} className="glass-panel contact-form" noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="name">您的姓名</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-input" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="例如：张先生"
                />
                {formErrors.name && <span style={{ color: 'hsl(var(--accent))', fontSize: '0.85rem' }}>{formErrors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">电子邮箱</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-input" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="请输入您的邮箱地址"
                />
                {formErrors.email && <span style={{ color: 'hsl(var(--accent))', fontSize: '0.85rem' }}>{formErrors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">留言内容</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="form-textarea" 
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="请输入您的合作意向或留言..."
                ></textarea>
                {formErrors.message && <span style={{ color: 'hsl(var(--accent))', fontSize: '0.85rem' }}>{formErrors.message}</span>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '10px' }}
                disabled={isSending}
              >
                {isSending ? '正在发送...' : '提交留言'}
              </button>

              {submitError && (
                <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'hsl(var(--accent) / 0.1)', border: '1px solid hsl(var(--accent) / 0.3)', color: 'hsl(var(--accent))', textAlign: 'center', fontSize: '0.95rem' }}>
                  ✗ {submitError}
                </div>
              )}

              {isSubmitted && (
                <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'hsl(var(--secondary-glow))', border: '1px solid hsl(var(--secondary) / 0.3)', color: 'hsl(var(--secondary))', textAlign: 'center', fontSize: '0.95rem' }}>
                  ✓ 留言发送成功！我会尽快给您答复。
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} 张炜立 · 保留所有权利 · 基于 React & Vite 构建</p>
        </div>
      </footer>
    </>
  )
}

export default App

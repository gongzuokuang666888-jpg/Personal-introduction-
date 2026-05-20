import { useState, useEffect } from 'react'
import avatarImg from './assets/avatar.png'

const PROJECTS_DATA = [
  {
    id: 1,
    title: '零售连锁 AI 智能体导购生态系统',
    category: 'AI 智能体',
    description: '针对大型零售连锁门店场景设计的多智能体（Multi-Agent）协同系统。系统集成智能导购、自动补货及智能客服等多个专用智能体，实现门店运营效率提升 25% 并显著优化顾客留存率。',
    tags: ['AI 智能体', '智慧零售', '大语言模型', '多智能体协同'],
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    link: '#',
  },
  {
    id: 2,
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
    id: 3,
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
  { name: 'AI 智能体落地 (AI Agents)', primary: true },
  { name: '大数据资产化与分析', primary: true },
  { name: '连锁零售数字化转型', primary: true },
  { name: '复合创新生态圈构建', primary: true },
  { name: '产业深度融合', primary: false },
  { name: '商业化变现与孵化', primary: false },
  { name: '政-产-学-研 资源对接', primary: false },
  { name: '顶层架构设计', primary: false },
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeCategory, setActiveCategory] = useState('All');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set theme attributes on HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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

    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  return (
    <>
      {/* 导航栏 */}
      <header className="header">
        <div className="container nav">
          <a href="#hero" className="logo" style={{ letterSpacing: '0.05em' }}>
            <span className="text-gradient">张炜立</span>.dev
          </a>
          <ul className="nav-links">
            <li><a href="#about" className="nav-link">个人介绍</a></li>
            <li><a href="#projects" className="nav-link">实践项目</a></li>
            <li><a href="#contact" className="nav-link">生态合作</a></li>
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
            <h1 style={{ fontSize: '3rem', lineHeight: '1.25' }}>
              大数据与 AI 智能体 <br />
              <span className="text-gradient">落地实践专家</span>
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
      <section id="about" className="section">
        <div className="container grid-2">
          <div>
            <h2>个人介绍</h2>
            <p style={{ marginTop: '20px', marginBottom: '16px', textIndent: '2em', lineHeight: '1.75' }}>
              张炜立，原深圳市大数据研究与应用协会秘书长、大数据分析师。具备超过 8 年大数据与人工智能产业应用经验，长期致力于推动 AI 与传统产业的深度融合，从顶层设计到项目落地的全链条推动能力。具备 10 年以上企业级资源协同与生态搭建经验，擅长构建以“政-产-学-研-资-用”为核心的复合型创新生态链。
            </p>
            <p style={{ marginBottom: '28px', textIndent: '2em', lineHeight: '1.75' }}>
              通过构建平台机制与合作网络，推动人工智能技术从基础研究向产业落地、商业变现的高效转化。在零售连锁行业，积极探索并落地以“AI 智能体（AI Agents）”为代表的前沿技术应用，推动供应链与终端销售数据资产化，实现数据智能驱动实体零售的商业化增长。
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

          <div>
            <h2>核心优势与价值</h2>
            <div className="value-pillars" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ color: 'hsl(var(--secondary))', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  1. AI 智能体（AI Agents）顶层设计与落地
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.6' }}>
                  探索并设计多智能体（Multi-Agent）在连锁零售、客户服务等场景中的协同工作机制，实现核心业务流程的自适应智能化与效能最大化。
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ color: 'hsl(var(--primary))', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                  2. 大数据资产化与商业化变现
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.6' }}>
                  打通并整合庞大且复杂的供应链、仓储物流及终端销售多维数据流，将数据转化为高商业价值资产，赋能实体门店科学经营决策与精准营销。
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
      <section id="projects" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
            {filteredProjects.map(project => (
              <article key={project.id} className="glass-panel project-card">
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
      <section id="contact" className="section">
        <div className="container grid-2">
          <div>
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

          <div>
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

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                提交留言
              </button>

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

const PROJECTS=[
{"id":"ai-agent-evolution-and-review","title":"AI Agent 持续进化与多 Agent 协作审核","en":"AI AGENT · CONTINUOUS IMPROVEMENT & MULTI-AGENT REVIEW","description":"构建能够从个人反馈持续改进、通过独立审核与验证提高交付质量的 AI 工作体系；人负责目标、标准和关键决策。","status":"Idea · 待研究与验证","topics":[]},
{"id":"solid-visible-technical-influence","title":"技术影响力建设：Solid + Visible","en":"TECHNICAL INFLUENCE · SOLID + VISIBLE","description":"持续输出有深度的技术博客、开源代码与 Skills，通过 X、LinkedIn 和 GitHub 扩大传播。把技术能力沉淀为公开、可验证、可持续积累的个人资产，支持技术负责人岗位求职，并增加被主动联系的机会。下一步是等有时间时启动，选定第一项公开产出。","status":"Idea · 待启动","topics":[]},
{"id":"algorithm-engineering-standards","title":"算法研发规范与民航数据审查 Skills","en":"ALGORITHM ENGINEERING · AVIATION DATA AUDIT","description":"建立六阶段算法研发规范、可执行 Agent Skills 与可复用数据审查工具；从问题定义、数据理解到模型选型、研发、验证和部署。","status":"In Progress · 规范 V0.3 / Skill 待开发","topics":[]},
{"id":"pros-data-driven-bid-price","title":"PROS 数据驱动 Bid Price 预测研究","en":"PROS · DATA-DRIVEN BID PRICE GENERATION","description":"研究 PROS 利用历史订座与成交数据，通过启发式标签构造和神经网络直接预测 Bid Price 的方法；评估其对现有 RM 网络优化与 BP 计算的借鉴价值。","status":"待读 · Literature Review","topics":[]},
{"id":"weekly-algorithm-interview-intelligence","title":"算法面经每周整理与自动采集","en":"WEEKLY ALGORITHM INTERVIEW INTELLIGENCE","description":"每周增量整理真实算法面经，形成可追溯题库与项目深挖训练素材。小红书单篇POC已完成，暂缓推进；重启后优先验证多平台采集和批量稳定性。","status":"Paused · POC validated","topics":[]},
{id:"air-china-long-term-pricing",title:"国航长期定价",en:"AIR CHINA · LONG-TERM ROUND-TRIP PRICING",description:"基于旅客支付意愿与运价规则约束，优化国际航线往返长期运价结构；记录航司反馈、数据需求和模型迭代。",status:"In Progress",topics:[]},
{id:"pods-v10-simulation",title:"PODS 航空市场仿真与动态定价验证",en:"PODS · MARKET SIMULATION & DP VALIDATION",description:"以真实 Shopping/验价数据校准具有可控 Ground Truth 的虚拟航空市场；独立验证旅客选择模型、动态定价和强化学习策略。",status:"In Progress",topics:[]},
{id:"airline-revenue-management-development",title:"民航收益管理项目开发",en:"AIRLINE REVENUE MANAGEMENT · DEVELOPMENT",description:"记录收益管理系统 RM/DP 开发中的技术问题、性能瓶颈定位与工程优化实践。",status:"In Progress",topics:[]},
{id:"jrpm-passenger-choice-review",title:"航空动态定价旅客选择模型综述（JRPM）",en:"PASSENGER CHOICE MODELS · JRPM",description:"Passenger Choice Models for Airline Dynamic Pricing: A Review from Theory to Practice；JRPM 二轮大修中，已汇总审稿意见并确定修改优先级。",status:"Major Revision",topics:[]},
{id:"event-impact-demand",title:"从历史事件因果效应预测未来航空需求",en:"EVENT IMPACT & AIRLINE DEMAND",description:"从历史事件的因果效应预测新事件对航空 OD 需求的影响。",status:"Idea",topics:[]},
{id:"airline-agent-simulation",title:"LLM 多智能体航空市场仿真",en:"AIRLINE MARKET SIMULATION",description:"探索基于旅客 Agent 的航空定价与收益管理仿真环境。",status:"Idea",topics:[]}
];
const TOPICS=[{id:"hardware",title:"硬件",en:"HARDWARE",group:"计算机系统",description:"CPU、GPU、计算架构、并行计算和硬件性能基础。"}];
const DEFAULT_POINTS=5;
const app=document.getElementById("app");
document.getElementById("year").textContent=new Date().getFullYear();
let achievements=[];
let engineering={principles:[],decisions:[],template:[]};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const score=x=>x.type==="news"?0:Math.max(0,Number(x.points??DEFAULT_POINTS)||0);
const href=x=>"#/task/"+encodeURIComponent(x.id);
const projectLink=id=>"#/project/"+encodeURIComponent(id);
const topicLink=id=>"#/topic/"+encodeURIComponent(id);
const sorted=rows=>[...rows].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
const projectRows=id=>sorted(achievements.filter(x=>x.type!=="news"&&(x.projectIds||[]).includes(id)));
const topicRows=id=>sorted(achievements.filter(x=>x.type!=="news"&&(x.topicIds||[]).includes(id)));
const xp=rows=>rows.reduce((n,x)=>n+score(x),0);
const tag=(t,kind)=>'<a class="tag" href="'+(kind==="project"?projectLink(t.id):topicLink(t.id))+'">'+esc(t.title)+'</a>';
const empty='<p class="lane-empty">暂无进展记录</p>';
function rowItem(x){return '<a class="task-card" href="'+href(x)+'"><h3>'+esc(x.title)+'</h3><div class="meta"><span>'+esc(x.date)+'</span><span class="xp">'+(x.type==="news"?"记录 · 0 XP":(x.type==="idea"?"IDEA · ":"")+"+"+score(x)+" XP")+' ↗</span></div></a>'}
function card(item,kind,i,count){const rows=kind==="project"?projectRows(item.id):topicRows(item.id);return '<section class="lane" style="--accent:#52725b"><div class="lane-head"><div class="lane-count"><span class="lane-index">'+String(i+1).padStart(2,"0")+' / '+String(count).padStart(2,"0")+'</span><span class="lane-bullet"></span></div><a class="lane-title" href="'+(kind==="project"?projectLink(item.id):topicLink(item.id))+'"><h2>'+esc(item.title)+'<small>'+esc(item.en)+'</small></h2></a><div class="score"><strong>'+xp(rows)+'</strong><span>XP · '+rows.length+' 条记录</span></div></div><div class="lane-scroll" tabindex="0" aria-label="'+esc(item.title)+'的进展">'+(rows.length?rows.map(rowItem).join(""):empty)+'</div></section>'}
function shellHome(){
 const recent=sorted(achievements.filter(x=>x.type!=="news")).slice(0,6);
 const tile=(name,num,href0,desc,items)=>'<a class="project-tile" href="'+href0+'"><div class="tile-head"><span>'+num+'</span><span>'+items.length+' 个方向 ↗</span></div><h3>'+name+'</h3><p>'+desc+'</p><div class="tile-tags"><span>'+esc(items.slice(0,4).map(x=>x.title).join(" · "))+'</span></div></a>';
 return '<section class="home-intro"><div class="home-head"><div class="eyebrow">Nini Zhang / Personal Research OS</div><h1>Research, notes<br>and things I made.</h1><p>以项目记录研究进展，以主题积累知识。每条记录只存一份，多个研究方向可以交叉关联。</p></div><aside class="home-side"><div class="side-title">目录 <span>INDEX</span></div><div class="index-row"><span>01</span><b>Projects / 项目</b><a href="#/projects">查看 →</a></div><div class="index-row"><span>02</span><b>Topics / 主题</b><a href="#/topics">查看 →</a></div><div class="index-row"><span>03</span><b>消息面 / News & Signals</b><a href="#/news">查看 →</a></div><div class="side-note">新增进展默认 +5 XP；全站总积分按记录去重。</div></aside></section>'+
 '<section class="depth-manifesto" aria-label="研究原则：少开新坑，持续深挖"><div class="depth-message"><div class="eyebrow">A NOTE TO SELF / RESEARCH PRINCIPLE</div><h2>少一点开始，多一点深入。</h2><p>Go deep. Keep going.</p><span class="depth-rule">长期坚持一个重要问题 · 让每周的进展向下扎根</span></div><svg class="depth-drawing" viewBox="0 0 600 210" role="img" aria-labelledby="depth-title depth-desc" xmlns="http://www.w3.org/2000/svg"><title id="depth-title">从浅尝辄止到持续深耕</title><desc id="depth-desc">左侧数株幼苗只长出短小的根，右侧一棵树通过持续向下扎根，形成广阔而深入的根系。</desc><defs><pattern id="soil-lines" width="22" height="17" patternUnits="userSpaceOnUse"><path d="M0 17H22" stroke="#e6e1d5" stroke-width=".65"/></pattern></defs><path d="M0 73H600V210H0Z" fill="#f3f0e8"/><path d="M0 73H600V210H0Z" fill="url(#soil-lines)"/><path d="M0 73H600" fill="none" stroke="#a2a995" stroke-width="1.5"/><path d="M296 14V200" stroke="#c6c9bd" stroke-dasharray="2 7"/><g font-family="Georgia,serif" fill="#7b8376" font-size="12"><text x="138" y="19" text-anchor="middle">MANY STARTS</text><text x="453" y="19" text-anchor="middle" fill="#456e50">ONE DEEP PURSUIT</text></g><g stroke="#8d9f86" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M50 73V54q-14-2-16-14 13 0 16 14M50 58q12-15 24-11-7 13-24 13"/><path d="M111 73V48q-13-1-17-14 14 1 17 14M111 54q13-16 25-10-9 13-25 14"/><path d="M180 73V58q-12-2-16-12 11 0 16 12M180 61q10-10 20-7-6 9-20 9"/><path d="M246 73V49q-12 0-15-12 13 1 15 12M246 55q11-13 23-8-7 12-23 12"/></g><g stroke="#b0aa96" stroke-width="1.6" stroke-linecap="round" fill="none"><path d="M50 73v22m0-13-9 8m9-4 8 7M111 73v15m0-7-7 5m7-3 9 8M180 73v28m0-14-9 7m9-4 8 8M246 73v20m0-11-9 9m9-6 7 5"/></g><g stroke="#55745a" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M448 73V29" stroke-width="4"/><path d="M448 55Q429 47 421 36M448 49Q467 39 471 28" stroke-width="2.4"/><path d="M447 42Q432 28 434 19M449 43Q456 25 467 19" stroke-width="2"/><path d="M448 74C445 103 449 137 449 203" stroke-width="3.5"/><path d="M448 91C434 104 416 107 396 118S373 144 365 156M447 103C469 111 480 122 497 129S520 146 534 167M449 132C434 141 426 153 419 169S404 191 398 205M449 145C469 151 478 163 484 180S493 197 505 207M449 170C441 181 440 194 435 207" stroke-width="2.1"/><path d="M414 108q-8-13-11-22m-6 32-16-6m3 25-20 1m15 4-7 12m55 0-9-17m-3 31-17 6m78-57 7-21m17 36 17-3m5 19 14 1m-58 25 12-18m14 30 16-4m-78 16-9-12m-4 28-12 7" stroke-width="1.3" opacity=".8"/><path d="M449 195l-6 12m6-12 7 13" stroke-width="1.4"/></g><g fill="#6f9270"><ellipse cx="420" cy="35" rx="11" ry="5" transform="rotate(30 420 35)"/><ellipse cx="472" cy="28" rx="11" ry="5" transform="rotate(-35 472 28)"/><ellipse cx="435" cy="20" rx="10" ry="5" transform="rotate(50 435 20)"/><ellipse cx="466" cy="20" rx="10" ry="5" transform="rotate(-50 466 20)"/></g><g font-family="Georgia,serif" font-size="11" fill="#8e8e80"><text x="149" y="186" text-anchor="middle">Shallow effort · frequent resets</text><text x="449" y="207" text-anchor="middle" fill="#4c7052">Depth grows over time</text></g></svg></section>' +
 '<section class="home-projects"><div class="section-title"><h2>研究目录</h2><span class="right">Explore</span></div><div class="project-grid">'+tile("Projects","01","#/projects","围绕具体研究目标，持续记录 Idea、实验和成果。",PROJECTS)+tile("Topics","02","#/topics","按知识主题整理学习记录与复习笔记。",TOPICS)+tile("News & Signals / 消息面","03","#/news","私人记录 · 需 GitHub 账户授权访问。",[])+'</div></section>'+
 '<section class="recent-section"><div class="section-title"><h2>最近记录</h2><span class="right">'+xp(achievements)+' XP · '+achievements.length+' entries</span></div><div class="recent-list">'+recent.map(x=>'<a class="recent-row" href="'+href(x)+'"><time>'+esc(x.date)+'</time><strong>'+esc(x.title)+'</strong><span>'+(x.type==="news"?"记录":x.type==="idea"?"IDEA":"进展")+'</span><i>→</i></a>').join("")+'</div></section>';
}
function projectStartReminder(){
  const questions=[
    ["为什么发现这个问题？","记录最初的信号，以及它如何指向这个问题。"],
    ["为什么值得解决？","说明它影响谁、影响哪个指标，以及为什么值得优先做。"],
    ["为什么选择这个方案？","列出考虑过的方案，以及做取舍时用到的证据和约束。"],
    ["如何证明创造了价值？","动手前定好基线、衡量指标和验证方法。"]
  ];
  return '<section class="project-principles-reminder" aria-labelledby="project-start-questions"><div class="reminder-heading"><h2 id="project-start-questions">每个项目开始前，先回答这四个问题</h2></div><div class="template-grid">'+questions.map(([question,prompt])=>'<div><strong>'+esc(question)+'</strong><span>'+esc(prompt)+'</span></div>').join('')+'</div></section>';
}
function projectPrinciplesReminder(){const checks=[["Low Ego","是否愿意接受不同证据？"],["Honest","是否区分事实、经验与假设？"],["Solid","实验和结果能否复现？"],["Right Thing","是否改善长期决策？"],["Co-design","是否与业务和工程共同设计？"]];return '<section class="project-principles-reminder"><div class="reminder-heading"><div><span class="eyebrow">BEFORE A PROJECT DECISION</span><h2>先审视原则，再做技术决策</h2><p>新增项目记录前，用五个问题检查方案；重大取舍应留下决策日志。</p></div><a class="reminder-link" href="#/projects/principles">查看五项原则与决策日志 →</a></div><div class="reminder-grid">'+checks.map(([name,q])=>'<div><strong>'+esc(name)+'</strong><span>'+esc(q)+'</span></div>').join('')+'</div></section>';}
function board(kind){
if(kind==="topics"){const items=TOPICS;return '<section class="dashboard-head"><a class="back" href="#/">← 返回首页</a><div class="eyebrow">RESEARCH / TOPICS</div><h1>Topics · 知识主题</h1><p>按主题积累学习笔记，每条新增进展默认 +5 XP。</p><div class="summary-band"><div class="metric"><strong>'+xp(achievements.filter(x=>x.type!=="news"))+'</strong><span>全站 XP</span></div><div class="metric"><strong>'+items.length+'</strong><span>主题</span></div></div></section><div class="board topics-board">'+items.map((p,i)=>card(p,"topic",i,items.length)).join("")+'</div>';}
const items=PROJECTS;
return '<section class="dashboard-head projects-head"><div class="solid-watermark" aria-label="SOLID：深入、扎实、经得住追问">SOLID<small>GO DEEP · STAND UP TO SCRUTINY</small></div><a class="back" href="#/">← 返回首页</a><div class="eyebrow">RESEARCH / PROJECTS</div><h1>Projects · 研究项目</h1><p>按研究目标持续记录 Idea、实验与成果。</p><div class="summary-band"><div class="metric"><strong>'+xp(achievements)+'</strong><span>总 XP</span></div><div class="metric"><strong>'+items.length+'</strong><span>项目</span></div></div></section>'+projectStartReminder()+projectPrinciplesReminder()+'<div class="board projects-board">'+items.map((p,i)=>card(p,"project",i,items.length)).join("")+'</div>';
}
const PROJECT_BUSINESS_ANSWERS={
  "ai-agent-evolution-and-review": [
    "重复指导AI、人工反复检查交付物的成本暴露了反馈难以复用、审核责任未分离的问题。依据：项目两条研究方向。",
    "减少低层次返工与人工审核时间，让负责人集中于目标、标准及关键决策；质量不能因自动化而下降。",
    "反馈沉淀为版本化Skills，并分离执行、审核、验证角色；相比单次提示可复用规则，相比单Agent可引入独立证据。是否值得增加复杂度待验证。",
    "以单Agent及人工审核为基线，在固定任务集比较错误漏检率、返工次数、人工分钟数、总成本和质量；检验规则更新前后回归表现。目前仅为Idea。"
  ],
  "solid-visible-technical-influence": [
    "技术能力若仅存在于内部项目中，外部招聘方难以观察和验证。依据：项目描述；实际曝光缺口待量化。",
    "将技术深度转化为可展示资产，降低外部评估成本，提高高质量职业机会的可达性。",
    "选择技术博客、可复现开源代码和Skills作为证据，通过GitHub、X及LinkedIn传播；优先深度与可复现性，而非单纯追求流量。",
    "记录发布前基线及发布后有效阅读、复现反馈、专业交流和相关岗位主动联系数；区分曝光与有效机会。目前待启动，不能宣称影响力提升。"
  ],
  "algorithm-engineering-standards": [
    "算法汇报中问题定义不清、模型适用性和数据风险难以系统审查，促成六阶段规范设计。依据：V0.3与数据审查设计记录。",
    "减少错误建模、重复返工和知识流失，形成可复用的研发质量管理能力。",
    "先明确问题与数据，再审查数据、选型、研发、验证和部署；用可执行Skills和只读检查脚本固化成熟规则，先从数据审查试点。",
    "用同类小项目的现有流程作基线，比较风险检出率、误报率、返工工时、实验可复现率；植入已知错误测试。已完成文档和设计，实际效果待验证。"
  ],
  "pros-data-driven-bid-price": [
    "传统RM通过预测和网络优化产生BP；发现PROS论文探索直接生成BP，提出是否能降低计算或建模依赖的问题。依据：待读论文记录。",
    "如果收入质量不下降且计算成本降低，可改善决策更新效率并为国际系统对标提供备选方案。",
    "先精读并复现论文的启发式代理标签和神经网络，与传统DLP/DP方法对照；重点审查代理标签偏差、历史策略影响及网络约束。当前仅为研究候选。",
    "在同一市场、容量、需求和销售规则下比较收入、计算时间、拒绝/接受决策及稳健性；BP数值一致性仅作辅助。尚未精读、复现或验证。"
  ],
  "weekly-algorithm-interview-intelligence": [
    "普通网页搜索难稳定获取真实面经全文及图片内容，人工检索重复且难追溯。依据：OpenCLI单篇POC记录。",
    "提高面试准备效率，积累可追溯的真实题库，帮助识别高频技能和项目追问。",
    "采用本地浏览器桥接、原始来源保留、图文提取和去重；先做单篇POC再验证多平台与批量稳定性，避免提前投入完整自动化。",
    "以人工搜集为基线，测每周有效新增题数、来源准确率、提取错误率、重复率及人工时间。已完成单篇POC，批量和跨平台效果待验证，项目暂缓。"
  ],
  "air-china-long-term-pricing": [
    "航司反馈周中周末价差方向与旅客划分不宜固定，淡旺季不能仅从历史订座量判断。依据：航司展示反馈记录。",
    "改善长期运价结构与真实需求、支付意愿及竞争环境的匹配，减少不合理价差，同时满足运价规则与执行约束。",
    "采用数据驱动客群与季节划分、WTP估计及约束优化；结合运力、客座率和可获准竞品信息控制观测销量偏差。相比固定规则更灵活，但识别性与数据覆盖待审查。",
    "以现行运价结构为基线，检验规则可行率、需求/选择模型样本外表现、反事实收益及价格结构稳定性；最终以受控业务试验或可靠准实验验证收入。已展示并获反馈，未证明生产增收。"
  ],
  "pods-v10-simulation": [
    "现有仿真若同时承担预测和定价，难独立验证算法；真实交易数据也缺少反事实结果。依据：v10方案及v9修正记录。",
    "在可控环境比较策略的真实决策质量，降低上线试错成本，为动态定价与强化学习提供一致评估环境。",
    "将PODS独立为市场环境与评估器，使用真实Shopping/验价校准，显式设置可控Ground Truth；保留v9为基线，处理机器人与未购买观测缺失。",
    "先验证真实市场校准指标，再验证虚拟市场稳定性与策略排序一致性；同随机种子比较收益、转化、客座率及弹性。已完成设计，真实校准和闭环实验待完成。"
  ],
  "airline-revenue-management-development": [
    "动态规划运行慢、需求预测耗时长；同事通过语言改写及空跑对比发现计算与数据库读写瓶颈不同。依据：两条工程记录。",
    "缩短端到端运行时间并保持决策结果正确，提高系统更新及时性、可扩展性及运维效率。",
    "先分段计时定位瓶颈，再针对动态规划采用编译实现、针对预测优化数据库读写；避免未经测量就引入GPU等复杂架构。",
    "固定数据规模、硬件及算法参数，比较优化前后端到端耗时、I/O耗时、资源用量、数值一致性及失败率。已有定性加速反馈，具体倍数尚未核实。"
  ],
  "jrpm-passenger-choice-review": [
    "航空定价中的旅客选择建模需要区分数据可观测性、行为假设和定价用途；审稿反馈指出框架与量化验证需加强。依据：JRPM大修记录。",
    "帮助研究及工程人员按实际数据条件和定价目标选择模型，避免将预测准确性等同于行为解释或决策价值。",
    "通过结构化综述、SP/RP数据区分、模型假设及评价框架、量化指标与模拟示例建立可操作比较，而非仅罗列模型。",
    "检查文献覆盖与引用准确性、审稿意见闭环、示例可复现性及框架能否区分模型适用性；发表与引用是外部反馈，不等同于业务价值。仓库记录仍为大修阶段，最新修回进度待同步。"
  ],
  "event-impact-demand": [
    "业务交流中发现热点事件信息与航线需求及运营动作缺乏量化连接。依据：事件因果效应Idea记录。",
    "若能在事件初期估计需求冲击，可帮助提前调整运力、库存和票价，减少错过机会或过度反应。",
    "先估计历史事件反事实效应，再依据事件及市场特征迁移到新事件；与普通事件特征预测相比有望更好区分事件影响，但因果识别和迁移假设必须验证。",
    "采用按公告时间滚动及留一事件验证，与无事件、普通事件特征模型对照；测需求误差、区间覆盖及仿真决策收益。尚无实验，数据和可信对照组待确认。"
  ],
  "airline-agent-simulation": [
    "受量化多Agent市场模拟启发，提出传统固定旅客选择模型能否充分模拟异质行为及交互的问题。依据：Idea记录。",
    "潜在价值是构建更灵活的航空市场实验环境，支持测试定价策略对不同客群及情景的影响。",
    "探索LLM旅客Agent生成偏好及行为，与MNL等传统选择模型对照；只有在行为校准和决策评估确有增益时才引入LLM复杂度。与PODS项目共享评估思路但不预设替代关系。",
    "在固定小规模场景对比传统Agent与LLM Agent的选择分布、弹性、转化率、策略排序、稳定性和推理成本；再做真实数据校准。当前仅Idea，未实验。"
  ]
};
function projectBusinessAnswers(id){const questions=["为什么发现这个问题？","为什么值得解决？","为什么选择这个方案？","如何证明创造了价值？"];const values=PROJECT_BUSINESS_ANSWERS[id]||[];return '<section class="detail-panel"><h2>业务思考 · Four Questions</h2><p>项目立项与复盘：基于已有记录整理；方案理由及验证指标为待确认的分析建议，不代表已验证收益。</p>'+questions.map((q,i)=>'<div style="margin-top:18px"><h3>'+esc((i+1)+". "+q)+'</h3><p>'+esc(values[i]||"待补充")+'</p></div>').join("")+'</section>';}
function entityDetail(kind,id){
const project=kind==="project",obj=(project?PROJECTS:TOPICS).find(x=>x.id===id);
if(!obj)return notFound();
const rows=project?projectRows(id):topicRows(id);
const related=project?(obj.topics||[]).map(k=>TOPICS.find(t=>t.id===k)).filter(Boolean).map(t=>tag(t,"topic")).join(""):PROJECTS.filter(p=>p.topics.includes(id)).map(p=>tag(p,"project")).join("");
return '<div class="detail-layout"><article><a class="back" href="#/'+(project?"projects":"topics")+'">← 返回 '+(project?"Projects":"Topics")+'</a><div class="eyebrow">'+esc(obj.en)+' / '+(project?"PROJECT":"TOPIC")+'</div><h1>'+esc(obj.title)+'</h1>'+(obj.description?'<p class="detail-sub">'+esc(obj.description)+'</p>':'')+'<div class="summary-band"><div class="metric"><strong>'+xp(rows)+'</strong><span>关联 XP</span></div><div class="metric"><strong>'+rows.length+'</strong><span>条进展</span></div></div>'+(project?projectBusinessAnswers(id):"")+'<section class="detail-panel"><h2>进展记录 · Progress</h2><div class="entity-progress">'+(rows.length?rows.map(rowItem).join(""):empty)+'</div></section></article><aside class="detail-aside"><div class="stat"><label>'+(project?"STATUS":"GROUP")+'</label><b>'+esc(project?obj.status:obj.group)+'</b></div><div class="stat"><label>'+(project?"RELATED TOPICS":"RELATED PROJECTS")+'</label><div class="tag-list">'+(related||'<span class="lane-empty">暂无关联</span>')+'</div></div></aside></div>';
}
function notFound(){return '<div class="notfound"><h1>没有找到这个页面</h1><a class="cta" href="#/">返回首页 ↗</a></div>'}
function detail(id){
const x=achievements.find(v=>v.id===id);if(!x)return notFound();
const projects=(x.projectIds||[]).map(id=>PROJECTS.find(p=>p.id===id)).filter(Boolean);
const topics=(x.topicIds||[]).map(id=>TOPICS.find(t=>t.id===id)).filter(Boolean);
const back=x.type==="news"?"#/news":projects.length?projectLink(projects[0].id):"#/topics";
return '<div class="detail-layout"><article><a class="back" href="'+back+'">← 返回'+(x.type==="news"?"消息面":projects.length?"项目":"主题")+'</a><div class="eyebrow">RESEARCH LOG / 进展详情</div><h1>'+esc(x.title)+'</h1><p class="detail-sub">'+esc(x.summary)+'</p>'+(x.type==="idea"?'<span class="idea-status">IDEA · 研究构想，尚未验证</span>':x.type==="news"?'<span class="idea-status">业务交流记录 · 非正式需求文档</span>':'')+[['背景与目标',x.background],['具体过程',x.process],['完成结果',x.result],['关键收获',x.takeaway]].map(([title,body])=>'<section class="detail-panel"><h2>'+title+'</h2><p>'+esc(body||"待补充")+'</p></section>').join("")+(Array.isArray(x.references)&&x.references.length?'<section class="detail-panel"><h2>待读论文 · Reading list</h2><ol class="paper-list">'+x.references.map(p=>'<li><a href="'+esc(p.url)+'" target="_blank" rel="noopener noreferrer">'+esc(p.title)+' ↗</a><span> · '+esc(p.year||"")+'</span><p>'+esc(p.note||"")+'</p></li>').join("")+'</ol></section>':'')+'</article><aside class="detail-aside"><div class="stat"><label>RECORDED</label><b>'+esc(x.date)+'</b></div><div class="stat"><label>EXPERIENCE</label><b>+'+score(x)+' XP</b></div><div class="stat"><label>PROJECTS</label><div class="tag-list">'+(projects.map(t=>tag(t,"project")).join("")||"—")+'</div></div><div class="stat"><label>TOPICS</label><div class="tag-list">'+(topics.map(t=>tag(t,"topic")).join("")||"—")+'</div></div></aside></div>';
}
function newsPage(){return '<section class="dashboard-head"><a class="back" href="#/">← 返回首页</a><div class="eyebrow">PRIVATE / NEWS & SIGNALS</div><h1>消息面 · Private News</h1><p>私人记录已迁移至独立的访问受限仓库。请使用获授权的 GitHub 账户登录。</p><a class="task-card" href="https://github.com/ningningzhang-nina/private-intelligence" target="_blank" rel="noopener noreferrer"><h3>打开私人情报库 ↗</h3></a></section>'}
function engineeringPage(){
 const cards=(engineering.principles||[]).map((p,i)=>{
 const events=(p.events||[]).map(e=>'<article class="principle-event"><div class="principle-event-head"><h3>'+esc(e.title)+'</h3><span class="event-status">'+esc(e.status||"")+'</span></div>'+[['背景',e.context],['我的判断与责任',e.judgment],['新的证据',e.evidence],['采取或计划的行动',e.response],['复盘收获',e.lesson]].filter(([_,v])=>v).map(([n,v])=>'<div class="event-field"><strong>'+n+'</strong><p>'+esc(v)+'</p></div>').join('')+'</article>').join("");
 return '<section class="principle-card" id="principle-'+esc(p.id)+'"><div class="principle-num">'+String(i+1).padStart(2,'0')+'</div><div class="principle-main"><h2>'+esc(p.en)+'<small>'+esc(p.zh)+'</small></h2><p class="principle-question">'+esc(p.question)+'</p>'+(p.intro?'<p class="principle-intro">'+esc(p.intro)+'</p>':'')+(events||'<div class="principle-empty">案例待补充</div>')+'</div></section>';
 }).join('');
 const journal=(engineering.decisions||[]).map(d=>'<article class="journal-entry"><div class="journal-meta"><time>'+esc(d.date)+'</time><span>'+esc(d.project)+'</span><span class="event-status">'+esc(d.status)+'</span></div><h3>'+esc(d.title)+'</h3>'+[['问题与约束',d.problem],['候选方案',d.options],['当时的判断',d.decision],['证据与假设',d.evidence],['验证方法',d.validation],['待复盘事项',d.review]].map(([n,v])=>'<div class="event-field"><strong>'+n+'</strong><p>'+esc(v)+'</p></div>').join('')+'</article>').join('');
 return '<section class="dashboard-head"><a class="back" href="#/projects">← 返回 Projects</a><div class="eyebrow">PROJECTS / ENGINEERING CULTURE</div><h1>技术判断与协作原则</h1><p>Engineering Principles & Decision Journal · 用真实事件检验判断、诚信、扎实工作与协作能力。</p></section><nav class="principles-tabs" aria-label="页内导航"><a href="#principles-list" data-jump="principles-list">五项原则</a><a href="#decision-journal" data-jump="decision-journal">技术决策记录</a></nav><section id="principles-list" class="principles-section"><div class="section-title"><h2>Five Principles / 五项标准</h2><span class="right">真实案例持续追加 · 不计XP</span></div>'+cards+'</section><section id="decision-journal" class="journal-section"><div class="section-title"><h2>Decision Journal / 技术决策记录</h2><span class="right">先记录当时的判断，再记录验证结果</span></div><p class="journal-explain">每个重大决策保留问题、备选方案、理由、证据、验证方法和复盘状态。记录“当时为什么这样决定”，避免只保留事后正确的结论。</p>'+journal+'<div class="journal-template"><h3>以后每次新增决策，按六项记录</h3><div class="template-grid">'+(engineering.template||[]).map(([n,v])=>'<div><strong>'+esc(n)+'</strong><span>'+esc(v)+'</span></div>').join('')+'</div><p>建议只记录关键技术取舍，不写流水账；每次有新实验或业务反馈后更新“复盘状态”。公开网站仅使用脱敏信息。</p></div></section>';
}
function render(){
const route=decodeURIComponent(location.hash||"#/").replace(/^#\//,"").split("/");
let page=route[0]||"home";if(page==="principles"){location.replace("#/projects/principles");return;}if(page==="ai"||page==="aviation"){location.replace("#/topics");return;}
document.querySelectorAll("[data-nav]").forEach(n=>n.classList.toggle("active",n.dataset.nav===page));
app.innerHTML=page==="home"?shellHome():page==="projects"&&route[1]==="principles"?engineeringPage():page==="projects"||page==="topics"?board(page):page==="news"?newsPage():page==="project"||page==="topic"?entityDetail(page,route.slice(1).join("/")):page==="task"?detail(route.slice(1).join("/")):notFound();
document.title=(page==="projects"?"Projects":page==="topics"?"Topics":page==="news"?"News & Signals":page==="projects"&&route[1]==="principles"?"Engineering Principles":page==="home"?"Research OS":"Research Detail")+" · Nini Zhang";
window.scrollTo({top:0,behavior:"instant"});
}
async function load(){try{const r=await fetch("./data/achievements.json?v=20261126-agent-evolution",{cache:"no-store"});if(!r.ok)throw Error("data unavailable");const data=await r.json();if(!Array.isArray(data))throw Error("invalid data");achievements=data.filter(x=>x.type!=="news");const ep=await fetch("./data/engineering-principles.json?v=20261125",{cache:"no-store"});if(!ep.ok)throw Error("principles unavailable");engineering=await ep.json();}catch(e){console.error("Achievement data unavailable:",e);app.innerHTML='<div class="notfound"><h1>数据加载失败</h1><p>请刷新页面。如果问题持续，请检查 GitHub Pages 部署。</p></div>';return;}render();}
window.addEventListener("hashchange",render);
document.addEventListener("click",e=>{const target=e.target.closest('[data-jump]');if(!target)return;e.preventDefault();const el=document.getElementById(target.dataset.jump);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});});
load();

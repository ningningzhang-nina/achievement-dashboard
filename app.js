const PROJECTS=[
{id:"event-impact-demand",title:"热点事件与航空需求预测",en:"EVENT IMPACT & AIRLINE DEMAND",description:"从历史事件的因果效应预测新事件对航空 OD 需求的影响。",status:"Idea",topics:["aviation","causal-inference","demand-forecasting","special-events"]},
{id:"airline-agent-simulation",title:"LLM 多智能体航空市场仿真",en:"AIRLINE MARKET SIMULATION",description:"探索基于旅客 Agent 的航空定价与收益管理仿真环境。",status:"Idea",topics:["aviation","llm","simulation","dynamic-pricing"]}
];
const TOPICS=[
{id:"aviation",title:"民航",en:"AVIATION",group:"应用领域"},
{id:"causal-inference",title:"因果推断",en:"CAUSAL INFERENCE",group:"技术方法"},
{id:"demand-forecasting",title:"需求预测",en:"DEMAND FORECASTING",group:"研究问题"},
{id:"special-events",title:"热点与特殊事件",en:"SPECIAL EVENTS",group:"研究问题"},
{id:"llm",title:"大语言模型",en:"LARGE LANGUAGE MODELS",group:"技术方法"},
{id:"simulation",title:"仿真与多智能体",en:"SIMULATION & AGENTS",group:"技术方法"},
{id:"dynamic-pricing",title:"动态定价",en:"DYNAMIC PRICING",group:"研究问题"},
{id:"revenue-management",title:"收益管理",en:"REVENUE MANAGEMENT",group:"研究问题"},
{id:"machine-learning",title:"机器学习",en:"MACHINE LEARNING",group:"技术方法"},
{id:"deep-learning",title:"深度学习",en:"DEEP LEARNING",group:"技术方法"},
{id:"reinforcement-learning",title:"强化学习",en:"REINFORCEMENT LEARNING",group:"技术方法"},
{id:"time-series",title:"时间序列",en:"TIME SERIES",group:"技术方法"}
];
const DEFAULT_POINTS=5;
const app=document.getElementById("app");
document.getElementById("year").textContent=new Date().getFullYear();
let achievements=[];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const score=x=>x.type==="news"?0:Math.max(0,Number(x.points??DEFAULT_POINTS)||0);
const href=x=>"#/task/"+encodeURIComponent(x.id);
const projectLink=id=>"#/project/"+encodeURIComponent(id);
const topicLink=id=>"#/topic/"+encodeURIComponent(id);
const sorted=rows=>[...rows].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
const projectRows=id=>sorted(achievements.filter(x=>(x.projectIds||[]).includes(id)));
const topicRows=id=>sorted(achievements.filter(x=>(x.topicIds||[]).includes(id)));
const xp=rows=>rows.reduce((n,x)=>n+score(x),0);
const tag=(t,kind)=>'<a class="tag" href="'+(kind==="project"?projectLink(t.id):topicLink(t.id))+'">'+esc(t.title)+'</a>';
const empty='<p class="lane-empty">暂无进展记录</p>';
function rowItem(x){return '<a class="task-card" href="'+href(x)+'"><h3>'+esc(x.title)+'</h3><div class="meta"><span>'+esc(x.date)+'</span><span class="xp">'+(x.type==="news"?"记录 · 0 XP":(x.type==="idea"?"IDEA · ":"")+"+"+score(x)+" XP")+' ↗</span></div></a>'}
function card(item,kind,i,count){const rows=kind==="project"?projectRows(item.id):topicRows(item.id);return '<section class="lane" style="--accent:#52725b"><div class="lane-head"><div class="lane-count"><span class="lane-index">'+String(i+1).padStart(2,"0")+' / '+String(count).padStart(2,"0")+'</span><span class="lane-bullet"></span></div><a class="lane-title" href="'+(kind==="project"?projectLink(item.id):topicLink(item.id))+'"><h2>'+esc(item.title)+'<small>'+esc(item.en)+'</small></h2></a><div class="score"><strong>'+xp(rows)+'</strong><span>XP · '+rows.length+' 条记录</span></div></div><div class="lane-scroll" tabindex="0" aria-label="'+esc(item.title)+'的进展">'+(rows.length?rows.map(rowItem).join(""):empty)+'</div></section>'}
function shellHome(){
 const recent=sorted(achievements).slice(0,6);
 const tile=(name,num,href0,desc,items)=>'<a class="project-tile" href="'+href0+'"><div class="tile-head"><span>'+num+'</span><span>'+items.length+' 个方向 ↗</span></div><h3>'+name+'</h3><p>'+desc+'</p><div class="tile-tags"><span>'+esc(items.slice(0,4).map(x=>x.title).join(" · "))+'</span></div></a>';
 return '<section class="home-intro"><div class="home-head"><div class="eyebrow">Nini Zhang / Personal Research OS</div><h1>Research, notes<br>and things I made.</h1><p>以项目记录研究进展，以主题积累知识。每条记录只存一份，多个研究方向可以交叉关联。</p></div><aside class="home-side"><div class="side-title">目录 <span>INDEX</span></div><div class="index-row"><span>01</span><b>Projects / 项目</b><a href="#/projects">查看 →</a></div><div class="index-row"><span>02</span><b>Topics / 主题</b><a href="#/topics">查看 →</a></div><div class="side-note">新增进展默认 +5 XP；全站总积分按记录去重。</div></aside></section>'+
 '<section class="home-projects"><div class="section-title"><h2>研究目录</h2><span class="right">Explore</span></div><div class="project-grid">'+tile("Projects","01","#/projects","围绕具体研究目标，持续记录 Idea、实验和成果。",PROJECTS)+tile("Topics","02","#/topics","跨项目积累知识，按方法、问题和应用领域检索。",TOPICS)+'</div></section>'+
 '<section class="recent-section"><div class="section-title"><h2>最近记录</h2><span class="right">'+xp(achievements)+' XP · '+achievements.length+' entries</span></div><div class="recent-list">'+recent.map(x=>'<a class="recent-row" href="'+href(x)+'"><time>'+esc(x.date)+'</time><strong>'+esc(x.title)+'</strong><span>'+(x.type==="news"?"记录":x.type==="idea"?"IDEA":"进展")+'</span><i>→</i></a>').join("")+'</div></section>';
}
function board(kind){const isProject=kind==="projects",items=isProject?PROJECTS:TOPICS;return '<section class="dashboard-head"><a class="back" href="#/">← 返回首页</a><div class="eyebrow">RESEARCH / '+(isProject?"PROJECTS":"TOPICS")+'</div><h1>'+(isProject?"Projects · 研究项目":"Topics · 知识主题")+'</h1><p>'+(isProject?"按独立的研究目标管理，记录每个项目的 Idea、实验与产出。":"按研究问题、方法和应用领域管理；一个进展可以关联多个主题。")+'</p><div class="summary-band"><div class="metric"><strong>'+xp(achievements)+'</strong><span>全站唯一 XP</span></div><div class="metric"><strong>'+items.length+'</strong><span>'+(isProject?"项目":"主题")+'</span></div><div class="metric"><strong>'+achievements.length+'</strong><span>全站进展</span></div></div>'+(isProject?'':'<p class="score-note">主题积分是关联进展的汇总；不同主题可能展示同一进展，不可相加为全站总分。</p>')+'</section><div class="board '+(isProject?"projects-board":"topics-board")+'">'+items.map((p,i)=>card(p,isProject?"project":"topic",i,items.length)).join("")+'</div>'}
function entityDetail(kind,id){
const project=kind==="project",obj=(project?PROJECTS:TOPICS).find(x=>x.id===id);
if(!obj)return notFound();
const rows=project?projectRows(id):topicRows(id);
const related=project?(obj.topics||[]).map(k=>TOPICS.find(t=>t.id===k)).filter(Boolean).map(t=>tag(t,"topic")).join(""):PROJECTS.filter(p=>p.topics.includes(id)).map(p=>tag(p,"project")).join("");
return '<div class="detail-layout"><article><a class="back" href="#/'+(project?"projects":"topics")+'">← 返回 '+(project?"Projects":"Topics")+'</a><div class="eyebrow">'+esc(obj.en)+' / '+(project?"PROJECT":"TOPIC")+'</div><h1>'+esc(obj.title)+'</h1>'+(obj.description?'<p class="detail-sub">'+esc(obj.description)+'</p>':'')+'<div class="summary-band"><div class="metric"><strong>'+xp(rows)+'</strong><span>关联 XP</span></div><div class="metric"><strong>'+rows.length+'</strong><span>条进展</span></div></div><section class="detail-panel"><h2>进展记录 · Progress</h2><div class="entity-progress">'+(rows.length?rows.map(rowItem).join(""):empty)+'</div></section></article><aside class="detail-aside"><div class="stat"><label>'+(project?"STATUS":"GROUP")+'</label><b>'+esc(project?obj.status:obj.group)+'</b></div><div class="stat"><label>'+(project?"RELATED TOPICS":"RELATED PROJECTS")+'</label><div class="tag-list">'+(related||'<span class="lane-empty">暂无关联</span>')+'</div></div></aside></div>';
}
function notFound(){return '<div class="notfound"><h1>没有找到这个页面</h1><a class="cta" href="#/">返回首页 ↗</a></div>'}
function detail(id){
const x=achievements.find(v=>v.id===id);if(!x)return notFound();
const projects=(x.projectIds||[]).map(id=>PROJECTS.find(p=>p.id===id)).filter(Boolean);
const topics=(x.topicIds||[]).map(id=>TOPICS.find(t=>t.id===id)).filter(Boolean);
const back=projects.length?projectLink(projects[0].id):"#/topics";
return '<div class="detail-layout"><article><a class="back" href="'+back+'">← 返回'+(projects.length?"项目":"主题")+'</a><div class="eyebrow">RESEARCH LOG / 进展详情</div><h1>'+esc(x.title)+'</h1><p class="detail-sub">'+esc(x.summary)+'</p>'+(x.type==="idea"?'<span class="idea-status">IDEA · 研究构想，尚未验证</span>':x.type==="news"?'<span class="idea-status">业务交流记录 · 非正式需求文档</span>':'')+[['背景与目标',x.background],['具体过程',x.process],['完成结果',x.result],['关键收获',x.takeaway]].map(([title,body])=>'<section class="detail-panel"><h2>'+title+'</h2><p>'+esc(body||"待补充")+'</p></section>').join("")+(Array.isArray(x.references)&&x.references.length?'<section class="detail-panel"><h2>待读论文 · Reading list</h2><ol class="paper-list">'+x.references.map(p=>'<li><a href="'+esc(p.url)+'" target="_blank" rel="noopener noreferrer">'+esc(p.title)+' ↗</a><span> · '+esc(p.year||"")+'</span><p>'+esc(p.note||"")+'</p></li>').join("")+'</ol></section>':'')+'</article><aside class="detail-aside"><div class="stat"><label>RECORDED</label><b>'+esc(x.date)+'</b></div><div class="stat"><label>EXPERIENCE</label><b>+'+score(x)+' XP</b></div><div class="stat"><label>PROJECTS</label><div class="tag-list">'+(projects.map(t=>tag(t,"project")).join("")||"—")+'</div></div><div class="stat"><label>TOPICS</label><div class="tag-list">'+(topics.map(t=>tag(t,"topic")).join("")||"—")+'</div></div></aside></div>';
}
function render(){
const route=decodeURIComponent(location.hash||"#/").replace(/^#\//,"").split("/");
let page=route[0]||"home";if(page==="ai"||page==="aviation"){location.replace("#/topics");return;}
document.querySelectorAll("[data-nav]").forEach(n=>n.classList.toggle("active",n.dataset.nav===page));
app.innerHTML=page==="home"?shellHome():page==="projects"||page==="topics"?board(page):page==="project"||page==="topic"?entityDetail(page,route.slice(1).join("/")):page==="task"?detail(route.slice(1).join("/")):notFound();
document.title=(page==="projects"?"Projects":page==="topics"?"Topics":page==="home"?"Research OS":"Research Detail")+" · Nini Zhang";
window.scrollTo({top:0,behavior:"instant"});
}
async function load(){try{const r=await fetch("./data/achievements.json",{cache:"no-cache"});if(!r.ok)throw Error("data unavailable");const data=await r.json();if(!Array.isArray(data))throw Error("invalid data");achievements=data;}catch(e){console.warn("Achievement data unavailable:",e)}render();}
window.addEventListener("hashchange",render);load();

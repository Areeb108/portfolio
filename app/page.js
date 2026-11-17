'use client';
import {useEffect,useState} from 'react';
import {ArrowUpRight,ArrowDown,Download,Mail,Menu,X, Github,Linkedin,Code2, Figma, Layers, Sparkles} from 'lucide-react';
import {portfolio as p} from '../data/portfolio';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiFigma
} from "react-icons/si";

import { FiLayers, FiEye } from "react-icons/fi";
const links=['Home','About','Projects','Skills','Experience','Contact'];
const skillIcons = {
  HTML5: SiHtml5,
  CSS3: SiCss3,
  JavaScript: SiJavascript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  Figma: SiFigma,
  "Design Systems": FiLayers,
  Accessibility: FiEye,
};
export default function Home(){
 const [menu,setMenu]=useState(false),[progress,setProgress]=useState(0);
 const [face, setFace] = useState(1);
const [faceTilt, setFaceTilt] = useState({ x: 0, y: 0 });
useEffect(() => {
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * -30;

    setFaceTilt({ x: y, y: x });
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);
 useEffect(() => {
  const interval = setInterval(() => {
    setFace(Math.floor(Math.random() * 8) + 1);
  }, 2500);

  return () => clearInterval(interval);
}, []);
useEffect(()=>{
    
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;setProgress(max?scrollY/max*100:0)};
  addEventListener('scroll',onScroll,{passive:true});onScroll();return()=>{observer.disconnect();removeEventListener('scroll',onScroll)};
 },[]);
 useEffect(() => {
  const sections = document.querySelectorAll("section[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.history.replaceState(
            null,
            "",
            `#${entry.target.id}`
          );
        }
      });
    },
    {
      rootMargin: "-35% 0px -35% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);
 return <><div className="progress" style={{width:`${progress}%`}}/><div className="ambient a1"/><div className="ambient a2"/>
 <header className="nav wrap"><a className="logo" href="#home">{p.firstName}<span>.</span></a><nav className={menu?'navlinks open':'navlinks'}>{links.map(l=><a key={l} href={'#'+l.toLowerCase()} onClick={()=>setMenu(false)}>{l}</a>)}</nav><button className="menu" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation">{menu?<X/>:<Menu/>}</button></header>
 <main><section id="home" className="hero wrap"><div className="orb orb1"/><div className="orb orb2"/><div className="heroInner reveal"><div className="eyebrow"><span className="dot"/>WELCOME TO MY PORTFOLIO</div><h1>
  Hi
  
 <img
src={`/portfolio/face-${face}.png`}
alt="Animated Memoji"
  className="memoji"
  style={{
    transform: `perspective(500px) rotateX(${faceTilt.x}deg) rotateY(${faceTilt.y}deg)`,
  }}
/>
  , I'm <span className="gradient">{p.name}</span></h1><h2>{p.role}</h2><p>{p.intro}</p><div className="actions"><a className="btn primary" href="#contact">Contact Me <ArrowUpRight size={17}/></a><a className="btn outline" href={p.cv||'#projects'} {...(p.cv?{download:true}:{})}>{p.cv?'Download CV':'Explore Work'} {p.cv?<Download size={17}/>:<ArrowUpRight size={17}/>}</a></div></div><a href="#about" className="scroll">SCROLL TO EXPLORE <ArrowDown size={16}/></a></section>
 <section id="about" className="section wrap"><div className="reveal"><div className="kicker">01 / INTRODUCTION</div><h2 className="heading">About <span>Me</span></h2><p className="lead">{p.about}</p></div><div className="stats">{p.stats.map((s,i)=><div className="stat reveal" key={i}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div></section>
 <section id="projects" className="section wrap"><div className="reveal"><div className="kicker">02 / PORTFOLIO</div><h2 className="heading">Featured <span>Projects</span></h2><p className="sub">A selection of projects at the intersection of design and technology.</p></div><div className="projectGrid">{p.projects.map((item,i)=><article className="project reveal" key={i}><div className="projectTop"><span>{item.number} / {item.category}</span><ArrowUpRight size={21}/></div><div className="projectArt"><div className="artGlow"/><span>{item.name.split(' ').map(w=>w[0]).slice(0,3).join('')}</span></div><h3>{item.name}</h3><p>{item.description}</p><div className="tags">{item.tags.map(t=><span key={t}>{t}</span>)}</div>{item.link&&<a className="projectLink" href={item.link} target="_blank" rel="noreferrer">View project <ArrowUpRight size={15}/></a>}</article>)}</div></section>
 <section id="skills" className="section wrap"><div className="reveal"><div className="kicker">03 / TOOLBOX</div><h2 className="heading">Skills & <span>Technologies</span></h2><p className="sub">Tools I use to turn ideas into experiences.</p></div><div className="skillGrid">{p.skills.map((skill,i)=><div className="skill reveal" key={skill}><div className="skillIcon">{(() => {
  const Icon = skillIcons[skill] || FiLayers;
  return <Icon size={36} />;
})()}</div><span>{skill}</span></div>)}</div></section>
 <section id="experience" className="section wrap"><div className="reveal"><div className="kicker">04 / JOURNEY</div><h2 className="heading">My <span>Experience</span></h2></div><div className="timeline">{p.experience.map((e,i)=><div className="job reveal" key={i}><div className="jobDate">{e.period}</div><div><h3>{e.role}</h3><strong>{e.company}</strong><p>{e.description}</p></div></div>)}</div></section>
 <section id="contact" className="section wrap contact"><div className="reveal"><div className="kicker">05 / GET IN TOUCH</div><h2 className="heading">Let's create <span>something great.</span></h2><p className="lead">Have a project in mind or want to connect? I'd love to hear from you.</p><a className="btn primary" href={'mailto:'+p.email}>Say Hello <Mail size={18}/></a><div className="socials">{p.github&&<a href={p.github} aria-label="GitHub"><Github/></a>}{p.linkedin&&<a href={p.linkedin} aria-label="LinkedIn"><Linkedin/></a>}</div></div></section></main>
 <footer className="footer wrap"><span>© {new Date().getFullYear()} {p.name}</span><span>Designed with care <Sparkles size={14}/></span></footer></>
}

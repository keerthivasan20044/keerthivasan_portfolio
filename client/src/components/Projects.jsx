import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from './SectionTitle'
import TechIcon from './TechIcons'

const PROJECTS = [
  {
    num:'01', tag:'FEATURED · FULLSTACK', color:'cyan', featured: true,
    title:'GENWEAR — Fashion E-Commerce',
    desc:'Complete fashion e-commerce platform with 50+ features — product browsing, wishlist, cart, secure checkout, order tracking, and full Admin Dashboard with product/order management.',
    bullets:['JWT auth + role-based access control','Redux Toolkit for global state','Mobile-first UI deployed live on Vercel'],
    stack:['React','Redux','NodeJS','Express','MongoDB','Tailwind','JWT'],
    live:'https://genwear-client.vercel.app/',
    github:'https://github.com/keerthivasan20044',
  },
  {
    num:'02', tag:'FULLSTACK', color:'purple',
    title:'To-Do List — CRUD App',
    desc:'Complete task management web app with Create, Read, Update, Delete operations. RESTful API with Express.js and MongoDB persistence.',
    bullets:['React Hooks for state management','RESTful API with Express','Fully responsive mobile UI'],
    stack:['React','NodeJS','Express','MongoDB','CSS'],
    github:'https://github.com/keerthivasan20044',
  },
  {
    num:'03', tag:'FRONTEND', color:'pink',
    title:'Amazon Clone',
    desc:'Pixel-perfect front-end clone of Amazon with product cards, navigation bar, and cart section. Modern responsive design across all screen sizes.',
    bullets:['Responsive layout & design','Product cards & navigation','Cart section UI'],
    stack:['HTML5','CSS3','JavaScript'],
    github:'https://github.com/keerthivasan20044',
  },
  {
    num:'04', tag:'API · FRONTEND', color:'purple',
    title:'Real-Time Weather App',
    desc:'Live weather forecasting via OpenWeatherMap API — temperature, humidity, wind speed by city. Dynamic icons and conditional UI rendering.',
    bullets:['OpenWeatherMap API integration','Dynamic weather icons','City search functionality'],
    stack:['HTML5','CSS3','JavaScript'],
    github:'https://github.com/keerthivasan20044',
  },
  {
    num:'05', tag:'FULLSTACK', color:'cyan',
    title:'Mini E-Commerce Website',
    desc:'Product browsing, filtering, and cart management with React component architecture. Clean responsive storefront UI focused on UX.',
    bullets:['Product filtering & browsing','Cart management','Responsive component UI'],
    stack:['React','NodeJS','Express','MongoDB','CSS'],
    github:'https://github.com/keerthivasan20044',
  },
]

const C = {
  cyan:   { border:'rgba(0,245,255,0.3)',   text:'#00f5ff', bg:'rgba(0,245,255,0.07)',   glow:'rgba(0,245,255,0.08)'   },
  purple: { border:'rgba(157,78,221,0.3)',  text:'#9d4edd', bg:'rgba(157,78,221,0.07)',  glow:'rgba(157,78,221,0.08)'  },
  pink:   { border:'rgba(255,0,110,0.3)',   text:'#ff006e', bg:'rgba(255,0,110,0.07)',   glow:'rgba(255,0,110,0.08)'   },
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .05 })
  return (
    <section id="projects" className="relative z-10 py-24 px-4 md:px-14">
      <div className="max-w-6xl mx-auto">
        <SectionTitle num="03" pre="Pro" accent="jects" />
        <div ref={ref} className="flex flex-col gap-5">
          {PROJECTS.map((p, i) => {
            const c = C[p.color]
            return (
              <motion.div key={p.num}
                initial={{ opacity:0, y:35 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:i*.09, duration:.6 }}
                className={`glass rounded-xl p-6 relative overflow-hidden transition-all duration-400 hover:-translate-y-1 group ${p.featured ? 'md:p-8' : ''}`}
                onMouseEnter={e=>e.currentTarget.style.borderColor=c.border}
                onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(0,245,255,0.1)'}
              >
                {/* Glow orb */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background:`radial-gradient(circle,${c.glow},transparent)`, transform:'translate(25%,-25%)' }}/>

                {p.featured && <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan via-purple to-pink"/>}

                <div className={`${p.featured ? 'md:grid md:grid-cols-3 md:gap-8' : ''}`}>
                  <div className={p.featured ? 'md:col-span-2' : ''}>
                    <div className="font-fira text-[0.68rem] tracking-[3px] mb-2" style={{color:c.text}}>{p.num} // {p.tag}</div>
                    <h3 className={`font-orbitron font-bold text-white mb-3 ${p.featured?'text-base md:text-lg':'text-sm'}`}>{p.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-3">{p.desc}</p>
                    <ul className="mb-4 space-y-1">
                      {p.bullets.map(b=>(
                        <li key={b} className="font-fira text-[0.72rem] text-slate-500 flex items-start gap-2">
                          <span style={{color:c.text}} className="mt-0.5">▸</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={p.featured ? 'md:flex md:flex-col md:justify-between' : ''}>
                    {/* Stack icons */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.stack.map(s=>(
                        <span key={s} className="flex items-center gap-1 font-fira text-[0.65rem] px-2 py-1 rounded"
                          style={{background:c.bg, border:`1px solid ${c.border}`, color:c.text}}>
                          <TechIcon name={s} size={12}/>{s}
                        </span>
                      ))}
                    </div>
                    {/* Links */}
                    <div className="flex gap-4 flex-wrap">
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer"
                          className="font-fira text-[0.72rem] tracking-widest px-4 py-2 rounded border transition-all duration-300 hover:-translate-y-0.5"
                          style={{color:c.text, borderColor:c.border}}
                          onMouseEnter={e=>{e.currentTarget.style.background=c.bg}}
                          onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}>
                          LIVE DEMO ↗
                        </a>
                      )}
                      <a href={p.github} target="_blank" rel="noreferrer"
                        className="font-fira text-[0.72rem] tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-1">
                        <TechIcon name="GitHub" size={13}/> GitHub →
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

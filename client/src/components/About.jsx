import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from './SectionTitle'
import TechIcon from './TechIcons'

const STACK = ['React','NodeJS','MongoDB','Express','JavaScript','Python','HTML5','CSS3','Tailwind','Redux','Git','Figma']
const STATS = [
  ['phone',    '+91 9345737726'],
  ['degree',   'MCA (2024–Present)'],
  ['cgpa',     '8.124'],
  ['location', 'Nagapattinam, TN'],
  ['status',   'Open to Work ✦'],
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .1 })
  return (
    <section id="about" className="relative z-10 py-24 px-4 md:px-14">
      <div className="max-w-6xl mx-auto">
        <SectionTitle num="01" pre="Ab" accent="out Me" />
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <motion.div initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}
            className="glass rounded-2xl p-8 anim-float anim-glow-pulse relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan via-purple to-pink"/>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center font-orbitron text-3xl font-black text-[#060612] mx-auto mb-6 shadow-[0_0_28px_rgba(0,245,255,0.4)]">KV</div>
            <div className="text-center mb-6">
              <div className="font-orbitron text-cyan text-sm tracking-widest mb-1">Keerthivasan R</div>
              <div className="font-fira text-slate-500 text-[0.7rem]">Full Stack Developer</div>
            </div>
            <div className="space-y-2.5 border-t border-white/[0.06] pt-4">
              {STATS.map(([k,v])=>(
                <div key={k} className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                  <span className="font-fira text-[0.7rem] text-slate-500">{k}</span>
                  <span className={k==='status'?'text-pink font-semibold text-xs':'text-cyan text-xs'}>{v}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-3 mt-5 pt-4 border-t border-white/[0.06]">
              {[['GitHub ↗','https://github.com/keerthivasan20044'],['LinkedIn ↗','https://www.linkedin.com/in/keerthivasan-r-8003a7389'],['LeetCode ↗','https://leetcode.com/u/keerthivasanmca']].map(([l,h])=>(
                <a key={l} href={h} target="_blank" rel="noreferrer"
                  className="font-fira text-[0.65rem] text-slate-500 hover:text-cyan transition-colors border border-white/[0.08] px-2 py-1 rounded hover:border-cyan/30">{l}</a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6,delay:.2}}>
            <p className="text-slate-400 leading-relaxed mb-4">Hey! I'm <span className="text-white font-semibold">Keerthivasan</span> — MCA student at EGS Pillay Engineering College, CGPA <span className="text-cyan">8.124</span>.</p>
            <p className="text-slate-400 leading-relaxed mb-4">I specialize in <span className="text-white font-semibold">Full Stack Web Development</span> (MERN stack). I've shipped{' '}
              <a href="https://genwear-client.vercel.app/" target="_blank" rel="noreferrer" className="text-cyan font-semibold hover:underline">GENWEAR</a>
              {' '}— a complete fashion e-commerce platform with 50+ features, live on Vercel.</p>
            <p className="text-slate-400 leading-relaxed mb-8">Quick learner, team player, passionate about clean code and intuitive UI.</p>
            <div className="font-fira text-[0.7rem] text-purple tracking-[3px] mb-4">// tech stack</div>
            <div className="flex flex-wrap gap-2.5">
              {STACK.map((t,i)=>(
                <motion.div key={t} initial={{opacity:0,scale:.8}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay:.3+i*.05}}
                  className="interactive flex flex-col items-center gap-1.5 px-3 py-2.5 glass rounded-xl hover:border-cyan/40 hover:shadow-[0_0_14px_rgba(0,245,255,0.18)] hover:-translate-y-1 transition-all duration-300 cursor-default min-w-[58px]">
                  <TechIcon name={t} size={26}/>
                  <span className="font-fira text-[0.58rem] text-slate-500">{t}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

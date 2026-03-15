import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from './SectionTitle'
import TechIcon from './TechIcons'

const CATS = [
  { title: 'Languages', skills: [
    { name:'HTML5',      icon:'HTML5',      pct:90 },
    { name:'CSS3',       icon:'CSS3',       pct:85 },
    { name:'JavaScript', icon:'JavaScript', pct:75 },
    { name:'Python',     icon:'Python',     pct:70 },
  ]},
  { title: 'Frameworks & UI', skills: [
    { name:'React.js',    icon:'React',    pct:82 },
    { name:'Tailwind CSS',icon:'Tailwind', pct:84 },
    { name:'Redux Toolkit',icon:'Redux',   pct:72 },
    { name:'Express.js',  icon:'Express',  pct:74 },
  ]},
  { title: 'Database & Backend', skills: [
    { name:'MongoDB',  icon:'MongoDB',    pct:70 },
    { name:'Node.js',  icon:'NodeJS',     pct:75 },
    { name:'SQL',      icon:'MySQL',      pct:60 },
    { name:'JWT Auth', icon:'JWT',        pct:72 },
  ]},
  { title: 'Tools & Deployment', skills: [
    { name:'Git',          icon:'Git',      pct:82 },
    { name:'GitHub',       icon:'GitHub',   pct:84 },
    { name:'Vercel',       icon:'Vercel',   pct:78 },
    { name:'Figma',        icon:'Figma',    pct:70 },
  ]},
]

function Bar({ name, icon, pct, animate }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="flex items-center gap-2 text-sm text-white/90">
          <TechIcon name={icon} size={16} />
          {name}
        </span>
        <span className="font-fira text-[0.72rem] text-cyan">{pct}%</span>
      </div>
      <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan to-purple"
          style={{ boxShadow: '0 0 8px #00f5ff' }}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${pct}%` : 0 }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .1 })
  return (
    <section id="skills" className="relative z-10 py-24 px-4 md:px-14">
      <div className="max-w-6xl mx-auto">
        <SectionTitle num="02" pre="Sk" accent="ills" />
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATS.map((cat, ci) => (
            <motion.div key={cat.title}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: ci * .1, duration: .6 }}
              className="glass rounded-xl p-6">
              <div className="font-fira text-[0.7rem] text-purple tracking-[3px] mb-5">// {cat.title.toLowerCase()}</div>
              {cat.skills.map(s => <Bar key={s.name} {...s} animate={inView} />)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

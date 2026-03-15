import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from './SectionTitle'

const CERTS = [
  { icon:'🐍', title:'Python Programming',   issuer:'Infosys Springboard & HackerRank', year:'2025' },
  { icon:'🎨', title:'UI/UX Mastery with AI', issuer:'Design Phoenix',                  year:'2025' },
  { icon:'🌐', title:'HTML & CSS',            issuer:'Infosys Springboard',              year:'2025' },
  { icon:'⚡', title:'JavaScript',            issuer:'Infosys Springboard',              year:'2025' },
]

export default function Certifications() {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:.1 })
  return (
    <section id="certifications" className="relative z-10 py-24 px-4 md:px-14">
      <div className="max-w-6xl mx-auto">
        <SectionTitle num="04" pre="Certifi" accent="cations"/>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTS.map((c,i)=>(
            <motion.div key={i}
              initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:i*.1,duration:.5}}
              className="glass rounded-xl p-5 flex gap-4 items-start relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:border-purple/40">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-purple to-pink scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/>
              <div className="w-11 h-11 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{background:'rgba(157,78,221,0.12)',border:'1px solid rgba(157,78,221,0.22)'}}>
                {c.icon}
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm leading-snug mb-1">{c.title}</h4>
                <div className="font-fira text-purple text-[0.68rem]">{c.issuer}</div>
                <div className="font-fira text-slate-500 text-[0.68rem] mt-1">{c.year}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

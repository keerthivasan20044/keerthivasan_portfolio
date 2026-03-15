import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from './SectionTitle'

const EDU = [
  { degree:'Master of Computer Applications (MCA)', school:'E.G.S. Pillay Engineering College, Nagapattinam', meta:'CGPA: 8.124', period:'2024 – Present', top:true },
  { degree:'B.Sc Computer Science', school:'Don Bosco College, Thamanangudy, Karaikal', meta:'CGPA: 7.00', period:'2021 – 2024' },
  { degree:'Higher Secondary (HSC)', school:'Karaikal Ammayar HR Sec School, Karaikal', meta:'72%', period:'2019 – 2021' },
  { degree:'Secondary School (SSLC)', school:'Karaikal Ammayar HR Sec School, Karaikal', meta:'60%', period:'2018 – 2019' },
]

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:.1 })
  return (
    <section id="education" className="relative z-10 py-24 px-4 md:px-14">
      <div className="max-w-6xl mx-auto">
        <SectionTitle num="05" pre="Edu" accent="cation"/>
        <div ref={ref} className="relative pl-7 border-l border-cyan/15 space-y-7">
          {EDU.map((e,i)=>(
            <motion.div key={i}
              initial={{opacity:0,x:-28}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:i*.12,duration:.6}}
              className="relative">
              <div className="absolute -left-[1.95rem] top-1.5 w-3 h-3 rounded-full bg-cyan shadow-[0_0_10px_#00f5ff]"/>
              <div className={`glass rounded-xl p-5 transition-all duration-300 hover:border-cyan/25 ${e.top?'border-cyan/20':''}`}>
                <div className="font-orbitron text-xs text-cyan tracking-widest mb-1">{e.degree}</div>
                <div className="text-white font-semibold text-sm mb-2">{e.school}</div>
                <div className="flex gap-4 font-fira text-xs">
                  <span className="text-purple">{e.meta}</span>
                  <span className="text-slate-500">{e.period}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

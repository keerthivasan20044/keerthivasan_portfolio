import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['about','skills','projects','certifications','education','contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(()=>{
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll',h)
    return () => window.removeEventListener('scroll',h)
  },[])
  const go = id => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setOpen(false) }

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 md:px-14 py-4 transition-all duration-300 border-b border-white/[0.06] ${scrolled?'bg-[#060612]/96 backdrop-blur-xl':'bg-[#060612]/70 backdrop-blur-md'}`}>
        <button onClick={()=>go('hero')} className="font-orbitron text-xl font-black text-cyan tracking-[3px]" style={{textShadow:'0 0 18px rgba(0,245,255,0.6)'}}>
          K<span className="text-pink">V</span>
        </button>
        <ul className="hidden md:flex gap-8">
          {links.map(l=>(
            <li key={l}>
              <button onClick={()=>go(l)} className="font-fira text-[0.78rem] text-slate-400 hover:text-cyan tracking-widest transition-colors duration-300 relative group">
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan group-hover:w-full transition-all duration-300 shadow-[0_0_6px_#00f5ff]"/>
              </button>
            </li>
          ))}
        </ul>
        <button onClick={()=>setOpen(!open)} className="md:hidden flex flex-col gap-[5px] p-1" aria-label="menu">
          {[0,1,2].map(i=>(
            <span key={i} className={`block w-[22px] h-px bg-cyan shadow-[0_0_5px_#00f5ff] transition-all duration-300 ${open&&i===0?'rotate-45 translate-y-[6px]':open&&i===1?'opacity-0':open&&i===2?'-rotate-45 -translate-y-[6px]':''}`}/>
          ))}
        </button>
      </nav>
      <AnimatePresence>
        {open&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-40 bg-[#060612]/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-9">
            {links.map((l,i)=>(
              <motion.button key={l} initial={{opacity:0,x:-40}} animate={{opacity:1,x:0}} transition={{delay:i*.07}}
                onClick={()=>go(l)} className="font-orbitron text-2xl text-white hover:text-cyan tracking-[4px] uppercase transition-colors">
                {l}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

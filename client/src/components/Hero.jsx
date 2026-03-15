import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import DevBoy from './DevBoy'

const ROLES = ['Full Stack Developer','MERN Stack Developer','React Developer','UI/UX Enthusiast']

export default function Hero() {
  const [text, setText] = useState('')
  const [ri, setRi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(()=>{
    const word = ROLES[ri]
    const t = setTimeout(()=>{
      if(!del){ setText(word.slice(0,ci+1)); setCi(c=>c+1); if(ci+1===word.length) setTimeout(()=>setDel(true),1600) }
      else    { setText(word.slice(0,ci-1)); setCi(c=>c-1); if(ci-1===0){ setDel(false); setRi(r=>(r+1)%ROLES.length) } }
    }, del?55:100)
    return ()=>clearTimeout(t)
  },[ci,del,ri])

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-4 md:px-14 overflow-hidden scanline-wrap">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-center pt-20 pb-8">

        {/* Left — text */}
        <div>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.3}}
            className="font-fira text-[0.75rem] text-cyan/70 tracking-[4px] mb-5">
            <span className="text-pink">&gt; </span>MCA Student · MERN Stack
          </motion.p>

          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.5}}
            className="font-orbitron font-black leading-[1.05] mb-5"
            style={{fontSize:'clamp(2.1rem,6.5vw,4.2rem)'}}>
            <div className="text-white">KEERTHI</div>
            <div className="glow-c" style={{color:'transparent',WebkitTextStroke:'1.5px #00f5ff'}}>VASAN.R</div>
          </motion.h1>

          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.7}}
            className="font-fira text-purple text-sm md:text-base mb-5 h-6">
            &gt; {text}<span className="text-cyan cursor-blink">_</span>
          </motion.div>

          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.9}}
            className="text-slate-400 leading-relaxed max-w-[460px] mb-8 text-[0.97rem]">
            Motivated MCA student building <span className="text-white font-semibold">production-grade web apps</span> with React, Node.js & MongoDB.
            From concept to deployment — clean code, intuitive UI.
          </motion.p>

          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.1}}
            className="flex flex-wrap gap-4">
            <button onClick={()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}
              className="px-7 py-3 font-fira text-xs tracking-[3px] text-cyan border border-cyan rounded hover:bg-cyan hover:text-[#060612] transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,245,255,0.45)] hover:-translate-y-1">
              VIEW_PROJECTS →
            </button>
            <a href="https://genwear-client.vercel.app/" target="_blank" rel="noreferrer"
              className="px-7 py-3 font-fira text-xs tracking-[3px] text-pink border border-pink rounded hover:bg-pink hover:text-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,0,110,0.45)] hover:-translate-y-1">
              LIVE_DEMO ↗
            </a>
            <a
              href="/Keerthivasan_Resume.pdf"
              download="Keerthivasan_Resume.pdf"
              className="flex items-center gap-2 px-7 py-3 font-fira text-xs tracking-[3px] text-purple border border-purple rounded hover:bg-purple hover:text-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(157,78,221,0.45)] hover:-translate-y-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              RESUME
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4}}
            className="flex gap-6 mt-10 pt-6 border-t border-white/[0.07]">
            {[['5+','Projects Built'],['8.124','CGPA'],['4+','Certifications']].map(([n,l])=>(
              <div key={l}>
                <div className="font-orbitron text-xl text-cyan font-black">{n}</div>
                <div className="font-fira text-[0.65rem] text-slate-500 tracking-wide mt-0.5">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Animated Dev Boy */}
        <motion.div
          initial={{opacity:0, x:40}}
          animate={{opacity:1, x:0}}
          transition={{delay:0.8, duration:0.9}}
          className="flex items-center justify-center"
        >
          <DevBoy />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-fira text-[0.6rem] text-slate-600 tracking-[3px]">scroll</span>
        <div className="w-px h-9 bg-gradient-to-b from-cyan to-transparent" style={{animation:'scanline 2s ease-in-out infinite'}}/>
      </motion.div>
    </section>
  )
}

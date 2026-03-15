import { useEffect, useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleCanvas from './components/ParticleCanvas'

export default function App() {
  const cursorRef = useRef(null)
  const ringRef   = useRef(null)
  let mx=0, my=0, rx=0, ry=0

  useEffect(() => {
    const onMove = e => {
      mx = e.clientX; my = e.clientY
      if (cursorRef.current) { cursorRef.current.style.left = mx+'px'; cursorRef.current.style.top = my+'px' }
    }
    window.addEventListener('mousemove', onMove)
    let raf
    const lerpRing = () => {
      rx += (mx-rx)*0.13; ry += (my-ry)*0.13
      if (ringRef.current) { ringRef.current.style.left = rx+'px'; ringRef.current.style.top = ry+'px' }
      raf = requestAnimationFrame(lerpRing)
    }
    lerpRing()
    const grow = () => { cursorRef.current?.classList.add('cursor-grow'); ringRef.current?.classList.add('ring-grow') }
    const shrink = () => { cursorRef.current?.classList.remove('cursor-grow'); ringRef.current?.classList.remove('ring-grow') }
    const els = document.querySelectorAll('a,button,.interactive')
    els.forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink) })
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="relative min-h-screen" style={{ background: '#060612' }}>
      <div className="cursor" ref={cursorRef}/>
      <div className="cursor-ring" ref={ringRef}/>
      <ParticleCanvas/>
      <Toaster position="bottom-right" toastOptions={{
        style: { background:'rgba(10,10,22,0.97)', border:'1px solid rgba(0,245,255,0.3)', color:'#00f5ff', fontFamily:'"Fira Code",monospace', fontSize:'0.82rem' }
      }}/>
      <Navbar/>
      <main className="relative z-10">
        <Hero/>
        <About/>
        <Skills/>
        <Projects/>
        <Certifications/>
        <Education/>
        <Contact/>
      </main>
      <Footer/>
    </div>
  )
}

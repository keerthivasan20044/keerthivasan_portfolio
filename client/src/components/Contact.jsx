import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import toast from 'react-hot-toast'
import axios from 'axios'
import SectionTitle from './SectionTitle'
import TechIcon from './TechIcons'

const SOCIALS = [
  { icon:'📧', label:'keerthivasanmca718@gmail.com',          href:'mailto:keerthivasanmca718@gmail.com' },
  { icon:'📱', label:'+91 9345737726',                         href:'tel:+919345737726' },
  { tech:'github',   label:'github.com/keerthivasan20044',     href:'https://github.com/keerthivasan20044' },
  { tech:'linkedin', label:'linkedin.com/in/keerthivasan-r',   href:'https://www.linkedin.com/in/keerthivasan-r-8003a7389' },
  { tech:'leetcode', label:'leetcode.com/u/keerthivasanmca',   href:'https://leetcode.com/u/keerthivasanmca' },
]

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const CONTACT_ENDPOINT = API_BASE_URL ? `${API_BASE_URL}/api/contact` : '/api/contact'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:.1 })
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [loading, setLoading] = useState(false)
  const set = e => setForm(f=>({...f,[e.target.name]:e.target.value}))

  const submit = async e => {
    e.preventDefault()
    if(!form.name||!form.email||!form.message){ toast.error('Please fill all required fields.'); return }
    setLoading(true)
    try {
      const res = await axios.post(CONTACT_ENDPOINT, form)
      if(res.data.success){ toast.success(res.data.message||'Message sent! 🚀'); setForm({name:'',email:'',subject:'',message:''}) }
    } catch(err) {
      toast.error(err.response?.data?.message||'Failed to send. Try again!')
    } finally { setLoading(false) }
  }

  return (
    <section id="contact" className="relative z-10 py-24 px-4 md:px-14">
      <div className="max-w-6xl mx-auto">
        <SectionTitle num="06" pre="Con" accent="tact"/>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          <motion.div initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
            <h3 className="font-orbitron text-white text-base font-bold mb-3">Let's build something amazing.</h3>
            <p className="text-slate-400 leading-relaxed mb-8 text-sm">
              Open to internships, freelance projects, and full-time opportunities. Drop me a message!
            </p>
            <div className="space-y-3">
              {SOCIALS.map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 glass rounded-lg px-4 py-3 hover:border-cyan/35 hover:shadow-[0_0_12px_rgba(0,245,255,0.1)] transition-all duration-300 group">
                  {s.tech
                    ? <TechIcon name={s.tech} size={18}/>
                    : <span className="text-base">{s.icon}</span>
                  }
                  <span className="font-fira text-[0.75rem] text-slate-400 group-hover:text-cyan transition-colors">{s.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6,delay:.2}}
            className="glass rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan via-purple to-pink"/>
            <form onSubmit={submit} className="space-y-4">
              {[{l:'name *',n:'name',t:'text',ph:'Your name'},{l:'email *',n:'email',t:'email',ph:'your@email.com'},{l:'subject',n:'subject',t:'text',ph:'Project / Opportunity'}].map(f=>(
                <div key={f.n}>
                  <label className="block font-fira text-[0.7rem] text-cyan tracking-widest mb-1">// {f.l}</label>
                  <input type={f.t} name={f.n} value={form[f.n]} onChange={set} placeholder={f.ph}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-md text-white font-fira text-sm outline-none focus:border-cyan/45 focus:shadow-[0_0_10px_rgba(0,245,255,0.12)] transition-all placeholder:text-slate-600"/>
                </div>
              ))}
              <div>
                <label className="block font-fira text-[0.7rem] text-cyan tracking-widest mb-1">// message *</label>
                <textarea name="message" value={form.message} onChange={set} placeholder="Tell me about your project..." rows={4}
                  className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-md text-white font-fira text-sm outline-none focus:border-cyan/45 focus:shadow-[0_0_10px_rgba(0,245,255,0.12)] transition-all placeholder:text-slate-600 resize-none"/>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 font-fira text-xs tracking-[3px] text-cyan border border-cyan rounded-md hover:bg-cyan hover:text-[#060612] hover:shadow-[0_0_22px_rgba(0,245,255,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading?'SENDING...':'SEND_MESSAGE →'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

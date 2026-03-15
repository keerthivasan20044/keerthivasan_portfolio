import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function SectionTitle({ num, pre, accent }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div ref={ref} initial={{opacity:0,x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.6}} className="mb-14">
      <div className="font-fira text-[0.68rem] text-cyan/40 tracking-[5px] mb-1">{num} //</div>
      <h2 className="font-orbitron font-black tracking-widest" style={{fontSize:'clamp(1.5rem,4vw,2.3rem)'}}>
        {pre}<span className="text-cyan">{accent}</span>
      </h2>
      <div className="title-line mt-2"/>
    </motion.div>
  )
}

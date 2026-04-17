import { motion } from 'framer-motion'

interface Props {
  text: string
  className?: string
  delay?: number
  inView: boolean
  /** 'words' (default) or 'chars' for character split */
  splitBy?: 'words' | 'chars'
}

const wordVariant = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      delay: i * 0.055,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

export default function RevealText({ text, className = '', delay = 0, inView, splitBy = 'words' }: Props) {
  const parts = splitBy === 'chars' ? text.split('') : text.split(' ')

  return (
    <span className={`inline ${className}`} aria-label={text}>
      {parts.map((part, i) => (
        <motion.span
          key={i}
          custom={delay + i}
          variants={wordVariant}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="inline-block"
          style={{ marginRight: splitBy === 'words' ? '0.25em' : undefined }}
          aria-hidden="true"
        >
          {part === '' ? '\u00A0' : part}
        </motion.span>
      ))}
    </span>
  )
}

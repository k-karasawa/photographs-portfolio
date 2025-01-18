import { motion } from 'framer-motion'
import Link from 'next/link'

interface PrimaryButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  triggerOnScroll?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const PrimaryButton = ({ 
  children, 
  onClick, 
  href,
  className = "",
  triggerOnScroll = false,
  icon,
  iconPosition = 'right'
}: PrimaryButtonProps) => {
  const buttonClasses = `
    inline-flex items-center justify-center gap-2
    bg-[#C84C38] text-white 
    px-8 py-3 
    rounded-full 
    text-lg font-bold
    shadow-lg hover:shadow-xl
    hover:bg-opacity-90 
    transition-all
    ${className}
  `

  const content = (
    <>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    )
  }

  if (triggerOnScroll) {
    return (
      <motion.button
        onClick={onClick}
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {content}
      </motion.button>
    )
  }

  return (
    <button 
      onClick={onClick} 
      className={buttonClasses}
    >
      {content}
    </button>
  )
}

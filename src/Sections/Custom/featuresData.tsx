type FeatureIcon = ({ className }: { className?: string }) => JSX.Element

interface Feature {
  title: string
  description: string
  icon: FeatureIcon
}

export const features: Feature[] = [
  {
    title: "伝統のデザインが作れる",
    description: "自然色の羽根に紫や濃紺の落ち着きを合わせたり、縁起の良い亀甲やとんぼ柄をあしらう事もできます。",
    icon: ({ className }: { className?: string }) => (
      <svg 
        className={className} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
        />
      </svg>
    )
  },
  {
    title: "オリジナリティも出せる",
    description: "誰とも違う、あなたのためだけの矢を作ることができます。カスタマイズできる組み合わせの数は無限大。",
    icon: ({ className }: { className?: string }) => (
      <svg 
        className={className} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
        />
      </svg>
    )
  },
  {
    title: "高品質な仕上がり",
    description: "注文頂いたその時から、職人が材料や細部にこだわり一つ一つ、丁寧に手作りで製作します。",
    icon: ({ className }: { className?: string }) => (
      <svg 
        className={className} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
        />
      </svg>
    )
  }
]
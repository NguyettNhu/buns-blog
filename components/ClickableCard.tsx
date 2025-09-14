'use client'

import { useRouter } from 'next/navigation'

export function ClickableCard({
  href,
  children,
  className = '',
  ariaLabel,
}: {
  href: string
  children: React.ReactNode
  className?: string
  ariaLabel?: string
}) {
  const router = useRouter()
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(href)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          router.push(href)
        }
      }}
      aria-label={ariaLabel ?? `Mở ${href}`}
      className={`h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
    >
      {children}
    </div>
  )
}

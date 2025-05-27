import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
  className?: string
}

export function NavLink({ href, children, isActive, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative text-sm font-medium transition-colors duration-300",
        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
      {isActive ? (
        <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary transition-all duration-300 group-hover:h-1 group-hover:bg-primary/80" />
      ) : (
        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary/60 transition-all duration-300 group-hover:w-full" />
      )}
    </Link>
  )
}

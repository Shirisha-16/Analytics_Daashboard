"use client"

import type React from "react"

import Image from 'next/image'
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Cloud,
  Newspaper,
  TrendingUp,
  Home,
  Settings,
  Users,
  HelpCircle,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { signOut } from "next-auth/react" // Import signOut from next-auth/react

const lightModeLogo = '/lightModeLogo.jpeg'; // e.g., public/Logo-Light.jpeg
const darkModeLogo = '/darkModeLogo.jpeg';
interface SidebarProps {
  open: boolean
  onClose: () => void
}

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  href: string
  active?: boolean
  subItems?: { label: string; href: string }[]
  isExternal?: boolean; // New prop to indicate an external link
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Force a re-render after initial mount to ensure proper sidebar display
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("resize"))
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const sidebarItems: SidebarItemProps[] = [
    {
      icon: Home,
      label: "Overview",
      href: "/",
      active: pathname === "/",
    },
    {
      icon: Cloud,
      label: "Weather",
      href: "/weather",
      active: pathname === "/weather",
    },
    {
      icon: Newspaper,
      label: "News",
      href: "/news",
      active: pathname === "/news",
      subItems: [
        { label: "General", href: "/news/technology" },
      ]
    },
    {
      icon: TrendingUp,
      label: "Finance",
      href: "/finance",
      active: pathname === "/finance",
    },
    // {
    //   icon: Users,
    //   label: "Users",
    //   href: "/users",
    //   active: pathname === "/users",
    // },
    {
      icon: BarChart3,
      label: "Analytics",
      href: "/analytics",
      active: pathname === "/analytics",
    },
    
    {
      icon: HelpCircle,
      label: "Help",
      href: "https://www.noaa.gov/education/resource-collections/climate/climate-change-impacts", // Placeholder external help link
      active: false, // External links are typically not "active" in the same way
      isExternal: true, // Mark as external
    },
  ]

  // Function to handle logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/signin' }); // Redirect to sign-in page after logout
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-20 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2">
           <Image
                     src={lightModeLogo}
                     alt="Colorful clouds and finance icons"
                      width={100} 
                     height={60}
                     className="max-w-xs bg-cover sm:max-w-sm md:max-w-md lg:max-w-full h-auto rounded-full shadow-lg dark:hidden"
                     priority 
                   />
                   <Image
                     src={darkModeLogo}
                     alt="App Logo (Dark Mode)"
                     width={100} // Placeholder: Replace with actual image width
                     height={60} // Placeholder: Replace with actual image height
                     className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full h-auto rounded-full shadow-lg hidden dark:block"
                     priority // Prioritize loading this image
                   />
            <span className="text-lg font-semibold font-serif">Analytics</span>
          </Link>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="px-3 py-4">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <SidebarItem key={item.href} {...item} />
              ))}
            </nav>
          </div>

          <div className="absolute bottom-4 left-0 right-0 px-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground"
              onClick={handleLogout} // Add onClick handler
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}

function SidebarItem({ icon: Icon, label, href, active, subItems, isExternal }: SidebarItemProps) {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = (e: React.MouseEvent) => {
    if (subItems) {
      e.preventDefault()
      setExpanded(!expanded)
    }
  }

  return (
    <div>
      <Link
        href={href}
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          active && "bg-accent text-accent-foreground",
        )}
        onClick={toggleExpanded}
        target={isExternal ? "_blank" : undefined} // Open in new tab if external
        rel={isExternal ? "noopener noreferrer" : undefined} // Security for external links
      >
        <Icon className="mr-3 h-5 w-5" />
        <span className="flex-1">{label}</span>
        {subItems && (
          <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        )}
      </Link>

      {subItems && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="ml-6 mt-1 space-y-1 border-l pl-3">
                {subItems.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

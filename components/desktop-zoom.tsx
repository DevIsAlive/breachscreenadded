"use client"

import { useEffect } from "react"

export default function DesktopZoom() {
  useEffect(() => {
    // Check if device is desktop (screen width >= 1024px)
    const isDesktop = window.innerWidth >= 1024

    if (isDesktop) {
      // Create or update viewport meta tag for desktop
      let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement
      if (!viewportMeta) {
        viewportMeta = document.createElement("meta")
        viewportMeta.name = "viewport"
        document.head.appendChild(viewportMeta)
      }
      viewportMeta.content = "width=device-width, initial-scale=1.25, maximum-scale=1.25, user-scalable=no"
    } else {
      // Mobile/tablet - use normal viewport
      let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement
      if (!viewportMeta) {
        viewportMeta = document.createElement("meta")
        viewportMeta.name = "viewport"
        document.head.appendChild(viewportMeta)
      }
      viewportMeta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    }

    // Handle window resize
    const handleResize = () => {
      const isDesktopNow = window.innerWidth >= 1024
      const viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement
      if (viewportMeta) {
        if (isDesktopNow) {
          viewportMeta.content = "width=device-width, initial-scale=1.25, maximum-scale=1.25, user-scalable=no"
        } else {
          viewportMeta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return null
}

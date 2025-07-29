"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Translations, getTranslations, detectLanguage } from "@/lib/localization"
import { useGeolocation } from "@/hooks/use-geolocation"

interface LocalizationContextType {
  t: Translations
  language: string
  setLanguage: (lang: string) => void
  loading: boolean
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined)

interface LocalizationProviderProps {
  children: ReactNode
}

export function LocalizationProvider({ children }: LocalizationProviderProps) {
  const { language: detectedLanguage, loading: geoLoading, country } = useGeolocation()
  const [language, setLanguage] = useState("en")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!geoLoading) {
      let finalLanguage = "en" // Default to English

      if (detectedLanguage) {
        // Use geolocation-detected language
        finalLanguage = detectedLanguage
      } else {
        // Fallback to browser language detection
        finalLanguage = detectLanguage()
      }

      setLanguage(finalLanguage)
      setLoading(false)
    }
  }, [detectedLanguage, geoLoading, country])

  const translations = getTranslations(language)

  return (
    <LocalizationContext.Provider
      value={{
        t: translations,
        language,
        setLanguage: (newLang: string) => {
          setLanguage(newLang)
        },
        loading,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  )
}

export function useLocalization() {
  const context = useContext(LocalizationContext)
  if (context === undefined) {
    throw new Error("useLocalization must be used within a LocalizationProvider")
  }
  return context
}

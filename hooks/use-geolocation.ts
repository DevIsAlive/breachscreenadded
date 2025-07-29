"use client"

import { useState, useEffect } from "react"

interface GeolocationData {
  country?: string
  language?: string
  loading: boolean
  error?: string
}

// Map countries to preferred languages - COMPREHENSIVE AND ACCURATE
const countryLanguageMap: Record<string, string> = {
  // === ENGLISH SPEAKING COUNTRIES ===
  US: "en", // United States
  GB: "en", // United Kingdom
  AU: "en", // Australia
  NZ: "en", // New Zealand
  IE: "en", // Ireland
  CA: "en", // Canada (English majority)
  ZA: "en", // South Africa
  NG: "en", // Nigeria
  IN: "en", // India
  PK: "en", // Pakistan
  PH: "en", // Philippines
  SG: "en", // Singapore
  MY: "en", // Malaysia

  // === SPANISH SPEAKING COUNTRIES ===
  ES: "es", // Spain
  MX: "es", // Mexico
  AR: "es", // Argentina
  CO: "es", // Colombia
  PE: "es", // Peru
  VE: "es", // Venezuela
  CL: "es", // Chile
  EC: "es", // Ecuador
  GT: "es", // Guatemala
  CU: "es", // Cuba
  BO: "es", // Bolivia
  DO: "es", // Dominican Republic
  HN: "es", // Honduras
  PY: "es", // Paraguay
  SV: "es", // El Salvador
  NI: "es", // Nicaragua
  CR: "es", // Costa Rica
  PA: "es", // Panama
  UY: "es", // Uruguay

  // === PORTUGUESE SPEAKING COUNTRIES ===
  BR: "pt", // Brazil
  PT: "pt", // Portugal
  AO: "pt", // Angola
  MZ: "pt", // Mozambique

  // === FRENCH SPEAKING COUNTRIES ===
  FR: "fr", // France
  BE: "fr", // Belgium
  CH: "fr", // Switzerland
  CA: "fr", // Canada (Quebec)
  SN: "fr", // Senegal
  CI: "fr", // Côte d'Ivoire

  // === GERMAN SPEAKING COUNTRIES ===
  DE: "de", // Germany
  AT: "de", // Austria
  CH: "de", // Switzerland

  // === RUSSIAN SPEAKING COUNTRIES ===
  RU: "ru", // Russia
  BY: "ru", // Belarus
  KZ: "ru", // Kazakhstan
  KG: "ru", // Kyrgyzstan

  // === ITALIAN SPEAKING COUNTRIES ===
  IT: "it", // Italy
  SM: "it", // San Marino
  VA: "it", // Vatican City

  // === DUTCH SPEAKING COUNTRIES ===
  NL: "nl", // Netherlands
  BE: "nl", // Belgium (Flemish)
  SR: "nl", // Suriname
}

export function useGeolocation(): GeolocationData {
  const [data, setData] = useState<GeolocationData>({ loading: true })

  useEffect(() => {
    async function detectLocation() {
      try {
        // Method 1: Try multiple IP geolocation services
        const services = [
          {
            url: "https://ipapi.co/json/",
            countryField: "country_code",
          },
          {
            url: "https://ip-api.com/json/",
            countryField: "countryCode",
          },
          {
            url: "https://ipinfo.io/json",
            countryField: "country",
          },
        ]

        for (const service of services) {
          try {
            const response = await fetch(service.url, {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
            })

            if (response.ok) {
              const locationData = await response.json()
              let country = locationData[service.countryField]

              if (country) {
                country = country.toUpperCase()
                const language = countryLanguageMap[country] || "en"

                setData({
                  country,
                  language,
                  loading: false,
                })
                return
              }
            }
          } catch (serviceError) {
            console.warn(`Geolocation service ${service.url} failed:`, serviceError)
            continue
          }
        }

        // Method 2: Fallback to browser language detection
        const browserLang = navigator.language.toLowerCase()
        let detectedLang = "en" // Default to English

        // More specific browser language detection
        if (browserLang.startsWith("es")) detectedLang = "es"
        else if (browserLang.startsWith("fr") && !browserLang.includes("ca"))
          detectedLang = "fr" // Exclude French-Canadian
        else if (browserLang.startsWith("de")) detectedLang = "de"
        else if (browserLang.startsWith("pt")) detectedLang = "pt"
        else if (browserLang.startsWith("ru")) detectedLang = "ru"
        else if (browserLang.startsWith("it")) detectedLang = "it"
        else if (browserLang.startsWith("nl")) detectedLang = "nl"
        else if (browserLang.startsWith("ar")) detectedLang = "ar"

        setData({
          language: detectedLang,
          loading: false,
        })
      } catch (error) {
        console.error("Geolocation detection failed:", error)
        // Final fallback to English
        setData({
          language: "en",
          loading: false,
          error: "Could not detect location",
        })
      }
    }

    detectLocation()
  }, [])

  return data
}

"use client"

export interface Translations {
  // Spin to Win Page
  spinToWin: string
  spinButton: string
  spinning: string
  youWon: string
  claimPrize: string
  // Username Page
  enterUsername: string
  verifyAccount: string
  verifyAccountDesc?: string
  yourRobloxUsername: string
  verifying: string
  tryingAlternative: string
  welcome: string
  accountVerified: string
  continueToQuiz: string
  connectingToRoblox: string
  usingBackupServers: string
  pleaseEnterUsername: string
  userNotFound: string
  networkError: string
  // Quiz Page
  favoriteGames: string
  howOftenPlay: string
  topItem: string
  quizDone: string
  // Quiz Options
  bloxfruits: string
  adoptMe: string
  growGarden: string
  rivals: string
  everyDay: string
  sometimes: string
  notMuch: string
  aLot: string
  robux: string
  gamepass: string
  giftcard: string
  clothing: string
  // Loot Box Page
  pickYourPrize: string
  chooseBox: string
  // Gift Card Claim Page
  youWonGiftcard: string
  claimIn: string
  odds: string
  timesUp: string
  missedChance: string
  // Live Winners Ticker
  won: string
  // Disclaimer
  disclaimer: string
  importantLegalDisclaimer: string
  entertainmentPurpose: string
  noAffiliation: string
  voluntaryParticipation: string
  simulatedExperience: string
  noRealPrizes: string
  ageRestriction: string
  dataCollection: string
  thirdPartyLinks: string
  liabilityLimitation: string
  intellectualProperty: string
  terminationRights: string
  governingLaw: string
  contactInformation: string
  // Common
  loading: string
  tryAgain: string
  close: string
  favourite: string
}

export const translations: Record<string, Translations> = {
  // English (default)
  en: {
    spinToWin: "SPIN TO WIN! 🚀",
    spinButton: "SPIN TO WIN! 🚀",
    spinning: "SPINNING... ✨",
    youWon: "YOU WON",
    claimPrize: "CLAIM PRIZE! 🚀",
    enterUsername: "Enter Username! 👇",
    verifyAccount: "VERIFY ACCOUNT! 👉",
    verifyAccountDesc: "We'll verify your Roblox account",
    yourRobloxUsername: "Your Roblox Username",
    verifying: "VERIFYING... 🔍",
    tryingAlternative: "TRYING ALTERNATIVE... 🔍",
    welcome: "Welcome",
    accountVerified: "Account Verified Successfully!",
    continueToQuiz: "CONTINUE TO QUIZ! ✅",
    connectingToRoblox: "Connecting to Roblox... 🔍",
    usingBackupServers: "Using backup servers...",
    pleaseEnterUsername: "Please enter a username.",
    userNotFound: "User not found. Please check the username spelling.",
    networkError: "Network error. Please check your connection and try again.",
    favoriteGames: "Favorite Games? 🎮",
    howOftenPlay: "How Often Play? ⏰",
    topItem: "Top Item? 💎",
    quizDone: "Quiz Done! 🎉",
    // Quiz Options
    bloxfruits: "Bloxfruits",
    adoptMe: "Adopt Me",
    growGarden: "Grow a Garden",
    rivals: "Rivals",
    everyDay: "Every Day",
    sometimes: "Sometimes",
    notMuch: "Not Much",
    aLot: "A Lot!",
    robux: "Robux",
    gamepass: "Gamepass",
    giftcard: "Giftcard",
    clothing: "Clothing",
    // Loot Box Page
    pickYourPrize: "PICK YOUR PRIZE! 👇",
    chooseBox: "Choose a Box! ✨",
    // Gift Card Claim Page
    youWonGiftcard: "$750 GIFTCARD!",
    claimIn: "Claim in",
    odds: "Odds:",
    timesUp: "Time's up! ⏰ You missed your chance. 😔",
    missedChance: "You missed your chance",
    // Live Winners Ticker
    won: "won",
    // Disclaimer
    disclaimer: "Legal Disclaimer",
    importantLegalDisclaimer: "IMPORTANT LEGAL DISCLAIMER AND TERMS OF USE",
    entertainmentPurpose:
      "ENTERTAINMENT ONLY: This application is provided strictly for entertainment, educational, and amusement purposes only. No actual prizes, rewards, gift cards, or monetary compensation of any kind will be awarded, distributed, or provided to users.",
    noAffiliation:
      "NO AFFILIATION: This application and its creators have no affiliation, association, authorization, endorsement, or sponsorship with Roblox Corporation, any gaming platforms, gift card providers, or any third-party entities mentioned or referenced herein. All trademarks, logos, and brand names are the property of their respective owners.",
    voluntaryParticipation:
      "VOLUNTARY USE: Participation in this application is entirely voluntary and at your own discretion. Users acknowledge that they are using this service for recreational purposes only and understand that no real benefits, prizes, or rewards will be received.",
    simulatedExperience:
      "SIMULATED EXPERIENCE: All game elements, prize wheels, loot boxes, gift cards, usernames, winner announcements, and prize claims are completely simulated, fictional, and for entertainment purposes only. Any resemblance to real persons, prizes, or events is purely coincidental.",
    noRealPrizes:
      "NO REAL PRIZES: Users explicitly acknowledge and agree that no actual prizes, gift cards, Robux, game passes, or any form of real-world value will be provided. All displayed prizes and rewards are fictional representations for entertainment purposes only.",
    ageRestriction:
      "AGE RESTRICTIONS: This application is intended for users aged 13 and above. Users under 18 must have parental consent before using this service. Parents and guardians are responsible for monitoring their children's use of this application.",
    dataCollection:
      "DATA AND PRIVACY: By using this application, you consent to the collection and processing of data as outlined in our Privacy Policy. We may collect usage statistics, device information, and interaction data for analytical purposes. No personal information is stored or shared with third parties.",
    thirdPartyLinks:
      "THIRD-PARTY LINKS: This application may contain links to external websites or services. We are not responsible for the content, privacy policies, or practices of any third-party sites. Users access external links at their own risk and discretion.",
    liabilityLimitation:
      "LIMITATION OF LIABILITY: The creators, developers, and operators of this application shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use this service. Users assume all risks associated with their use of this application.",
    intellectualProperty:
      "INTELLECTUAL PROPERTY: All content, design, code, and materials in this application are protected by copyright and intellectual property laws. Users may not reproduce, distribute, or create derivative works without explicit written permission.",
    terminationRights:
      "TERMINATION: We reserve the right to terminate, suspend, or restrict access to this application at any time, without notice, for any reason, including but not limited to violation of these terms or inappropriate use.",
    governingLaw:
      "GOVERNING LAW: These terms shall be governed by and construed in accordance with applicable local laws. Any disputes arising from the use of this application shall be resolved through appropriate legal channels in the jurisdiction where the service is operated.",
    contactInformation:
      "CONTACT: For questions, concerns, or legal inquiries regarding this disclaimer or the application, please contact us through appropriate legal channels. By continuing to use this application, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions stated herein.",
    // Common
    loading: "Loading...",
    tryAgain: "Try Again",
    close: "Close",
    favourite: "Favourite? 💎",
  },
  // Spanish
  es: {
    spinToWin: "¡GIRA PARA GANAR! 🚀",
    spinButton: "¡GIRA PARA GANAR! 🚀",
    spinning: "GIRANDO... ✨",
    youWon: "¡GANASTE",
    claimPrize: "¡RECLAMAR PREMIO! 🚀",
    enterUsername: "¡Ingresa tu Usuario! 👇",
    verifyAccount: "¡VERIFICAR CUENTA! 👉",
    verifyAccountDesc: "Verificaremos tu cuenta de Roblox",
    yourRobloxUsername: "Tu Usuario de Roblox",
    verifying: "VERIFICANDO... 🔍",
    tryingAlternative: "PROBANDO ALTERNATIVA... 🔍",
    welcome: "Bienvenido",
    accountVerified: "¡Cuenta Verificada Exitosamente!",
    continueToQuiz: "¡CONTINUAR AL QUIZ! ✅",
    connectingToRoblox: "Conectando a Roblox... 🔍",
    usingBackupServers: "Usando servidores de respaldo...",
    pleaseEnterUsername: "Por favor ingresa un usuario.",
    userNotFound: "Usuario no encontrado. Verifica la ortografía del nombre.",
    networkError: "Error de red. Verifica tu conexión e intenta de nuevo.",
    favoriteGames: "¿Juegos Favoritos? 🎮",
    howOftenPlay: "¿Qué Tan Seguido Juegas? ⏰",
    topItem: "¿Artículo Principal? 💎",
    quizDone: "¡Quiz Completado! 🎉",
    bloxfruits: "Bloxfruits",
    adoptMe: "Adopt Me",
    growGarden: "Cultivar Jardín",
    rivals: "Rivales",
    everyDay: "Todos los Días",
    sometimes: "A Veces",
    notMuch: "No Mucho",
    aLot: "¡Mucho!",
    robux: "Robux",
    gamepass: "Pase de Juego",
    giftcard: "Tarjeta Regalo",
    clothing: "Ropa",
    pickYourPrize: "¡ELIGE TU PREMIO! 👇",
    chooseBox: "¡Elige una Caja! ✨",
    youWonGiftcard: "¡TARJETA REGALO DE $750!",
    claimIn: "Reclamar en",
    odds: "Probabilidades:",
    timesUp: "¡Se acabó el tiempo! ⏰ Perdiste tu oportunidad. 😔",
    missedChance: "Perdiste tu oportunidad",
    won: "ganó",
    disclaimer: "Descargo Legal",
    importantLegalDisclaimer: "DESCARGO LEGAL IMPORTANTE Y TÉRMINOS DE USO",
    entertainmentPurpose:
      "SOLO ENTRETENIMIENTO: Esta aplicación se proporciona estrictamente para fines de entretenimiento, educativos y de diversión únicamente. No se otorgarán, distribuirán o proporcionarán premios reales, recompensas, tarjetas de regalo o compensación monetaria de ningún tipo a los usuarios.",
    noAffiliation:
      "SIN AFILIACIÓN: Esta aplicación y sus creadores no tienen afiliación, asociación, autorización, respaldo o patrocinio con Roblox Corporation, plataformas de juegos, proveedores de tarjetas de regalo o entidades de terceros mencionadas o referenciadas aquí. Todas las marcas comerciales, logotipos y nombres de marca son propiedad de sus respectivos dueños.",
    voluntaryParticipation:
      "USO VOLUNTARIO: La participación en esta aplicación es completamente voluntaria y a su propia discreción. Los usuarios reconocen que están usando este servicio solo con fines recreativos y entienden que no recibirán beneficios, premios o recompensas reales.",
    simulatedExperience:
      "EXPERIENCIA SIMULADA: Todos los elementos del juego, ruedas de premios, cajas de botín, tarjetas de regalo, nombres de usuario, anuncios de ganadores y reclamos de premios son completamente simulados, ficticios y solo para fines de entretenimiento. Cualquier parecido con personas, premios o eventos reales es puramente coincidental.",
    noRealPrizes:
      "SIN PREMIOS REALES: Los usuarios reconocen y aceptan explícitamente que no se proporcionarán premios reales, tarjetas de regalo, Robux, pases de juego o cualquier forma de valor del mundo real. Todos los premios y recompensas mostrados son representaciones ficticias solo para fines de entretenimiento.",
    ageRestriction:
      "RESTRICCIONES DE EDAD: Esta aplicación está destinada a usuarios de 13 años en adelante. Los usuarios menores de 18 años deben tener consentimiento parental antes de usar este servicio. Los padres y tutores son responsables de supervisar el uso de esta aplicación por parte de sus hijos.",
    dataCollection:
      "DATOS Y PRIVACIDAD: Al usar esta aplicación, usted consiente la recopilación y procesamiento de datos como se describe en nuestra Política de Privacidad. Podemos recopilar estadísticas de uso, información del dispositivo y datos de interacción con fines analíticos. No se almacena ni comparte información personal con terceros.",
    thirdPartyLinks:
      "ENLACES DE TERCEROS: Esta aplicación puede contener enlaces a sitios web o servicios externos. No somos responsables del contenido, políticas de privacidad o prácticas de sitios de terceros. Los usuarios acceden a enlaces externos bajo su propio riesgo y discreción.",
    liabilityLimitation:
      "LIMITACIÓN DE RESPONSABILIDAD: Los creadores, desarrolladores y operadores de esta aplicación no serán responsables de daños directos, indirectos, incidentales, consecuentes o punitivos que surjan del uso o la incapacidad de usar este servicio. Los usuarios asumen todos los riesgos asociados con su uso de esta aplicación.",
    intellectualProperty:
      "PROPIEDAD INTELECTUAL: Todo el contenido, diseño, código y materiales en esta aplicación están protegidos por derechos de autor y leyes de propiedad intelectual. Los usuarios no pueden reproducir, distribuir o crear obras derivadas sin permiso escrito explícito.",
    terminationRights:
      "TERMINACIÓN: Nos reservamos el derecho de terminar, suspender o restringir el acceso a esta aplicación en cualquier momento, sin aviso, por cualquier razón, incluyendo pero no limitado a la violación de estos términos o uso inapropiado.",
    governingLaw:
      "LEY APLICABLE: Estos términos se regirán e interpretarán de acuerdo con las leyes locales aplicables. Cualquier disputa que surja del uso de esta aplicación se resolverá a través de canales legales apropiados en la jurisdicción donde se opera el servicio.",
    contactInformation:
      "CONTACTO: Para preguntas, inquietudes o consultas legales sobre este descargo o la aplicación, contáctenos a través de canales legales apropiados. Al continuar usando esta aplicación, usted reconoce que ha leído, entendido y acepta estar sujeto a todos los términos y condiciones establecidos aquí.",
    loading: "Cargando...",
    tryAgain: "Intentar de Nuevo",
    close: "Cerrar",
    favourite: "¿Favorito? 💎",
  },
}

// Language detection based on location/browser
export function detectLanguage(): string {
  if (typeof window === "undefined") return "en"

  // Try to get language from browser first
  const browserLang = navigator.language.toLowerCase()

  // Map browser languages to our supported languages
  if (browserLang.startsWith("es")) return "es"
  if (browserLang.startsWith("fr")) return "fr"
  if (browserLang.startsWith("de")) return "de"
  if (browserLang.startsWith("pt")) return "pt"
  if (browserLang.startsWith("ru")) return "ru"
  if (browserLang.startsWith("it")) return "it"
  if (browserLang.startsWith("nl")) return "nl"
  if (browserLang.startsWith("ar")) return "ar"

  return "en" // Default to English
}

// Get translations for current language
export function getTranslations(language?: string): Translations {
  const lang = language || detectLanguage()
  return translations[lang] || translations.en
}

// Hook for using translations in components
export function useTranslations() {
  const language = detectLanguage()
  return {
    t: getTranslations(language),
    language,
    isRTL: language === "ar" || language === "he", // For future RTL language support
  }
}

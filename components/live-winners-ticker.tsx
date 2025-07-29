"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Trophy, Zap } from "lucide-react"
import { useLocalization } from "./localization-provider"

const prizes = [
  { amount: 500, color: "#1E40AF", label: "500" },
  { amount: 1000, color: "#2563EB", label: "1000" },
  { amount: 750, color: "#3B82F6", label: "750" },
  { amount: 1500, color: "#1D4ED8", label: "1500" },
  { amount: 250, color: "#1E3A8A", label: "250" },
  { amount: 2000, color: "#312E81", label: "2000" },
  { amount: 100, color: "#3730A3", label: "100" },
  { amount: 5000, color: "#1E40AF", label: "5000" },
]

const baseUsernames = [
  "gamerciara2012",
  "SomberCannonDab",
  "Speedy117892",
  "lovelygirls2226",
  "Alley_Kitten",
  "BaddieforeverCD",
  "ilovemybestfriend328",
  "malihamello",
  "Alley1291",
  "roseyrosesnowball",
  "fortnit",
  "sophhlovesyou",
  "SoccerWacky1",
  "dogydoodoo20",
  "Iigxht",
  "Beefjakenev",
  "broo11108",
  "Warrior22151",
  "Mushy4440",
  "marsh100115",
  "Foltynisthe_best53",
  "FORTNITE954A1",
  "Sonic41029",
  "Hakouna13",
  "Nickjroreo",
  "CrunchyPiggle",
  "Ohioxd69o21",
  "Ghoorun_31",
  "KonradK2018",
  "111eetry",
  "Yfhddhhddhhxjxxjnxnc",
  "Tama",
  "princessareamazing12",
  "ZlataCat20003",
  "stonksmeow203",
  "bunnyrosescot12333",
  "Lowkeyxox",
  "CookieSwirl_SB",
  "girl321849",
  "LOL_6594",
  "Avaflava1218",
  "Emihua12345",
  "Katie125221",
  "Cherry2cherry_lady23",
  "Helena0nPc",
  "Pastapunk1238",
  "Jayuso4488",
  "Ayeshahaider5",
  "Charlie_farly12",
  "MrSmarty92",
  "Girlsv05",
  "Soy_vane50",
  "planes_201625",
  "lilmochi_2113",
  "Slay121174",
  "Avery_InDaSky",
  "Averie22335",
  "tillyto222",
  "Jennaishere_74",
  "tehjeikk5",
  "avaunicorngirl2015",
  "Eva_me111",
  "Jeageriscrazy",
  "Jiggles265",
  "strawberriesgirl952",
  "Fileyrock78",
  "Laveverine365",
  "Vilot9853",
  "shah_ava",
  "SarahC_20189",
  "mooniy131",
  "Littlebvbles2011MP",
  "Unicornninja788",
  "NyanKittyWorld",
  "Itsvivi777",
  "Sia_mia5",
  "samitedrose459",
  "TiredOfThis248",
  "HappyQQ02069",
]

export default function LiveWinnersTicker() {
  const { t } = useLocalization()
  const [currentWinner, setCurrentWinner] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Generate fake winners with translated "won" text
  const fakeWinners = baseUsernames.map((username) => {
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)].amount
    return {
      username,
      amount: randomPrize,
      text: `${username} ${t.won} ${randomPrize} R$! 🎉`,
    }
  })

  // Winners ticker logic with enhanced timing
  useEffect(() => {
    if (fakeWinners.length === 0) {
      return
    }

    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentWinner((prev) => {
          const nextIndex = (prev + 1) % fakeWinners.length
          return nextIndex
        })
        setIsVisible(true)
      }, 200) // Brief pause for smooth transition
    }, 3000) // Longer display time

    return () => clearInterval(interval)
  }, [fakeWinners.length, t.won])

  // Initialize currentWinner state properly and ensure it starts from 0
  useEffect(() => {
    if (fakeWinners.length > 0) {
      setCurrentWinner(0) // Ensure we start at the first winner
    }
  }, [fakeWinners.length])

  if (fakeWinners.length === 0) return null

  // Ensure currentWinner is within bounds
  const safeCurrentWinner = currentWinner % fakeWinners.length
  const currentWinnerData = fakeWinners[safeCurrentWinner]

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, delay: 1 }}
      className="fixed bottom-4 left-0 right-0 mx-auto z-50 max-w-md"
    >
      <motion.div
        className="trust-card p-4 px-6 mx-4 relative overflow-hidden backdrop-blur-sm"
        animate={{
          scale: [1, 1.02, 1],
          boxShadow: ["0 10px 30px rgba(0,0,0,0.2)", "0 15px 40px rgba(34,197,94,0.3)", "0 10px 30px rgba(0,0,0,0.2)"],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        whileHover={{ scale: 1.05, y: -2 }}
      >
        {/* Background shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-10"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
          }}
        />

        <div className="flex items-center justify-center gap-3 relative z-10">
          {/* Animated icon */}
          <motion.div
            className="flex items-center gap-1"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Trophy className="w-6 h-6 text-yellow-500" />
            <Users className="w-6 h-6" />
          </motion.div>

          {/* Winner text with enhanced animations */}
          <div className="flex-1 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={safeCurrentWinner}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  x: 0,
                  scale: 1,
                }}
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.4,
                }}
                className="font-bold text-lg"
              >
                <motion.span
                  className="text-gray-800"
                  animate={{
                    color: ["#1d4ed8", "#059669", "#dc2626", "#1d4ed8"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  {currentWinnerData.username}
                </motion.span>
                <span className="text-gray-700"> {t.won} </span>
                <motion.span
                  className="text-green-600 font-black"
                  animate={{
                    scale: [1, 1.1, 1],
                    textShadow: [
                      "0 0 5px rgba(34,197,94,0.3)",
                      "0 0 10px rgba(34,197,94,0.6)",
                      "0 0 5px rgba(34,197,94,0.3)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  {currentWinnerData.amount} R$!
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Animated sparkle */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            }}
          >
            <Zap className="w-5 h-5 text-yellow-400" />
          </motion.div>
        </div>

        {/* Live indicator */}
        <motion.div
          className="absolute top-2 right-2 flex items-center gap-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <span className="text-xs text-gray-800 font-semibold">LIVE</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

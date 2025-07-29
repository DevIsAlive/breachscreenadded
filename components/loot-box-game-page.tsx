"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Box, HandIcon as HandClick, Gift, Sparkles, Zap } from "lucide-react"
import ProgressBar from "./progress-bar"
import { useLocalization } from "./localization-provider"

interface LootBoxGamePageProps {
  onNext: () => void
  prizeAmount: number
  username: string
}

export default function LootBoxGamePage({ onNext, prizeAmount, username }: LootBoxGamePageProps) {
  const { t } = useLocalization()
  const [selectedBox, setSelectedBox] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleBoxClick = (index: number) => {
    if (isAnimating || selectedBox !== null) return

    setIsAnimating(true)
    setSelectedBox(index)

    setTimeout(() => {
      setIsAnimating(false)
      onNext()
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 flex flex-col items-center justify-center p-4 pb-24 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-15"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              rotate: [0, 360],
              scale: [0.3, 1.8, 0.3],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.8,
            }}
          >
            <Gift className="text-yellow-300" size={20 + Math.random() * 25} />
          </motion.div>
        ))}

        {/* Magical sparkles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          >
            <Sparkles className="text-white" size={8 + Math.random() * 12} />
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <ProgressBar currentStep={4} totalSteps={5} />
      </motion.div>

      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center w-full"
        >
          {/* Enhanced title section */}
          <motion.div
            className="trust-card p-6 mb-8 relative overflow-hidden"
            animate={{
              scale: [1, 1.01, 1],
              boxShadow: [
                "0 10px 30px rgba(0,0,0,0.2)",
                "0 15px 40px rgba(255,215,0,0.3)",
                "0 10px 30px rgba(0,0,0,0.2)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            {/* Title card shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-10"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            />

            <motion.div
              className="flex items-center justify-center gap-3 mb-3"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                <Box className="w-20 h-20 text-blue-500" />
              </motion.div>
              <motion.div
                animate={{
                  x: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Zap className="w-8 h-8 text-yellow-400" />
              </motion.div>
            </motion.div>

            <motion.h2
              className="text-4xl font-black text-blue-700 mb-2 drop-shadow-lg relative z-10"
              animate={{
                textShadow: [
                  "0 0 10px rgba(29,78,216,0.3)",
                  "0 0 20px rgba(29,78,216,0.6)",
                  "0 0 10px rgba(29,78,216,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {t.pickYourPrize}
            </motion.h2>

            <motion.p
              className="text-blue-600 font-bold text-xl drop-shadow-sm relative z-10"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {t.chooseBox}
            </motion.p>
          </motion.div>

          {/* Enhanced prize boxes */}
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.button
                key={i}
                onClick={() => handleBoxClick(i)}
                disabled={isAnimating || selectedBox !== null}
                className={`
                  flex flex-col items-center justify-center w-40 h-40 p-4 transition-all duration-500 relative overflow-hidden
                  rounded-2xl border-6 cursor-pointer
                  ${
                    selectedBox === i
                      ? "bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 border-yellow-600 shadow-2xl"
                      : "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 border-blue-800 shadow-xl"
                  }
                  ${selectedBox !== null && selectedBox !== i ? "opacity-40 grayscale" : ""}
                `}
                whileTap={{ scale: selectedBox === null ? 0.92 : 1 }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: selectedBox === i ? 1.15 : 1,
                  y: selectedBox === null ? [0, -8, 0] : 0,
                  boxShadow:
                    selectedBox === i
                      ? [
                          "0 20px 40px rgba(255,215,0,0.4)",
                          "0 25px 50px rgba(255,215,0,0.6)",
                          "0 20px 40px rgba(255,215,0,0.4)",
                        ]
                      : [
                          "0 10px 25px rgba(0,0,0,0.3)",
                          "0 15px 35px rgba(59,130,246,0.4)",
                          "0 10px 25px rgba(0,0,0,0.3)",
                        ],
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: i * 0.1,
                  y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                {/* Box shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2 + i * 0.5,
                  }}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedBox === i ? "revealed-content" : "closed-content"}
                    initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                    animate={{ opacity: 1, scale: selectedBox === i ? 0.95 : 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                    className="flex flex-col items-center relative z-10"
                  >
                    {selectedBox === i ? (
                      <>
                        {/* Explosion particles */}
                        {[...Array(12)].map((_, particleIndex) => (
                          <motion.div
                            key={particleIndex}
                            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                            initial={{ scale: 0, x: 0, y: 0 }}
                            animate={{
                              scale: [0, 1, 0],
                              x: (Math.random() - 0.5) * 120,
                              y: (Math.random() - 0.5) * 120,
                              rotate: Math.random() * 360,
                            }}
                            transition={{
                              duration: 1.5,
                              delay: particleIndex * 0.05,
                              ease: "easeOut",
                            }}
                          />
                        ))}

                        <motion.div
                          className="w-24 h-24 flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
                          animate={{
                            opacity: [0.5, 1, 0.5],
                            scale: [0.8, 1.4, 0.8],
                            rotate: [0, 360, 720],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          <Gift className="w-full h-full text-yellow-600 drop-shadow-lg" />
                        </motion.div>

                        <motion.div
                          className="text-yellow-700 font-black text-lg mt-2"
                          animate={{
                            scale: [1, 1.2, 1],
                            textShadow: [
                              "0 0 5px rgba(180,83,9,0.5)",
                              "0 0 15px rgba(180,83,9,0.8)",
                              "0 0 5px rgba(180,83,9,0.5)",
                            ],
                          }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        >
                          WINNER!
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <motion.div
                          animate={{
                            rotateY: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Box className="w-20 h-20 text-white drop-shadow-lg" />
                        </motion.div>

                        <motion.p
                          className="text-white font-black text-4xl mt-2 drop-shadow-md"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                        >
                          ?
                        </motion.p>

                        <motion.div
                          className="absolute bottom-2 right-2 text-white opacity-70"
                          animate={{
                            x: [0, 8, 0],
                            y: [0, -8, 0],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                          <HandClick className="w-8 h-8 drop-shadow-lg" />
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced instruction text */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.p
              className="text-white font-bold text-lg drop-shadow-lg"
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Choose wisely, {username}! ✨
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

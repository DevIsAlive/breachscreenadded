"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Sparkles, CheckCircle } from "lucide-react"
import ProgressBar from "./progress-bar"
import QuizOptionButton from "./quiz-option-button"
import { useLocalization } from "./localization-provider"

interface QuizPageProps {
  onNext: () => void
  setQuizScore: (score: number) => void
}

const questions = [
  {
    questionKey: "favoriteGames" as const,
    options: [
      { textKey: "bloxfruits" as const, emoji: "⚔️" },
      { textKey: "adoptMe" as const, emoji: "🐾" },
      { textKey: "growGarden" as const, emoji: "🌱" },
    ],
  },
  {
    questionKey: "howOftenPlay" as const,
    options: [
      { textKey: "everyDay" as const, emoji: "📅" },
      { textKey: "sometimes" as const, emoji: "📆" },
      { textKey: "aLot" as const, emoji: "🎯" },
    ],
  },
  {
    questionKey: "favourite" as const,
    options: [
      { textKey: "robux" as const, emoji: "💰" },
      { textKey: "gamepass" as const, emoji: "🎟️" },
      { textKey: "giftcard" as const, emoji: "🎁" },
    ],
  },
]

export default function QuizPage({ onNext, setQuizScore }: QuizPageProps) {
  const { t } = useLocalization()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setScore((prev) => prev + 1)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
      } else {
        setQuizScore(score + 1)
        setShowCelebration(true)
        setTimeout(() => {
          onNext()
        }, 2500)
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 flex flex-col items-center justify-center p-4 pb-24 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              rotate: [0, 360],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.7,
            }}
          >
            <Brain className="text-white" size={25 + Math.random() * 15} />
          </motion.div>
        ))}

        {/* Floating question marks */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`question-${i}`}
            className="absolute text-white/20 text-4xl font-bold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          >
            ?
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <ProgressBar currentStep={3} totalSteps={5} />
      </motion.div>

      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md z-10">
        <AnimatePresence mode="wait">
          {!showCelebration ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="w-full"
            >
              {/* Enhanced question header */}
              <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="flex items-center justify-center gap-3 mb-4"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Brain className="w-8 h-8 text-white" />
                  </motion.div>
                  <span className="text-white font-bold text-lg">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-300" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Enhanced question card */}
              <motion.div
                className="trust-card p-6 mb-8 text-center relative overflow-hidden"
                animate={{
                  scale: [1, 1.01, 1],
                  boxShadow: [
                    "0 10px 30px rgba(0,0,0,0.2)",
                    "0 15px 40px rgba(147,51,234,0.3)",
                    "0 10px 30px rgba(0,0,0,0.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                {/* Question card shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-10"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                  }}
                />

                <motion.h2
                  className="text-2xl font-black text-blue-600 relative z-10"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(59,130,246,0.3)",
                      "0 0 20px rgba(59,130,246,0.6)",
                      "0 0 10px rgba(59,130,246,0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {t[questions[currentQuestion].questionKey]}
                </motion.h2>
              </motion.div>

              {/* Enhanced answer options */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <QuizOptionButton
                      option={{ text: t[option.textKey], emoji: option.emoji }}
                      index={index}
                      selectedAnswer={selectedAnswer}
                      onSelect={handleAnswer}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.3, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="text-center w-full"
            >
              {/* Celebration particles */}
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#A78BFA"][i % 6],
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    x: (Math.random() - 0.5) * 500,
                    y: (Math.random() - 0.5) * 500,
                    rotate: Math.random() * 720,
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                />
              ))}

              <motion.div
                className="trust-card p-8 relative overflow-hidden"
                animate={{
                  scale: [1, 1.02, 1],
                  boxShadow: [
                    "0 20px 40px rgba(34,197,94,0.2)",
                    "0 25px 50px rgba(34,197,94,0.4)",
                    "0 20px 40px rgba(34,197,94,0.2)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {/* Success shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-15"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                  }}
                />

                <motion.div
                  className="flex items-center justify-center gap-3 mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
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
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </motion.div>
                  <motion.span
                    className="text-6xl"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    🎉
                  </motion.span>
                </motion.div>

                <motion.h1
                  className="text-3xl font-black text-blue-600 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    textShadow: [
                      "0 0 10px rgba(59,130,246,0.3)",
                      "0 0 20px rgba(59,130,246,0.6)",
                      "0 0 10px rgba(59,130,246,0.3)",
                    ],
                  }}
                  transition={{
                    delay: 0.4,
                    textShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  {t.quizDone}
                </motion.h1>

                <motion.p
                  className="text-green-600 font-bold mt-2 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Perfect score! 🌟
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

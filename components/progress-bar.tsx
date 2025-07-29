"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full max-w-sm mx-auto mb-8">
      {/* Step indicators */}
      <div className="flex justify-between mb-3">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <motion.div
            key={index}
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
              index + 1 <= currentStep
                ? "bg-white border-white text-blue-600 shadow-lg"
                : "border-white/50 text-white/50"
            }`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
          >
            {index + 1 < currentStep ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                <CheckCircle className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.span
                className="text-sm font-bold"
                animate={
                  index + 1 === currentStep
                    ? {
                        scale: [1, 1.2, 1],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                {index + 1}
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-white/30 rounded-full h-4 border-2 border-white/50 shadow-inner overflow-hidden">
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #ffffff 0%, #f0f9ff 50%, #ffffff 100%)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
            }}
          />
          {/* Pulsing glow */}
          <motion.div
            className="absolute inset-0 bg-white/20"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

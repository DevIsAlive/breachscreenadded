"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Shield, Lock, Wifi, WifiOff, Activity, CheckCircle, X, Terminal } from "lucide-react"
import { useLocalization } from "./localization-provider"

interface HumanVerificationPageProps {
  onNext: () => void
  username: string
  onUIVisibilityChange: (visible: boolean) => void
}

// Advanced shuffling text with multiple character sets
const ShufflingText = ({
  finalText,
  duration = 1500,
  className = "",
  intensity = "high",
}: {
  finalText: string
  duration?: number
  className?: string
  intensity?: "low" | "medium" | "high"
}) => {
  const [displayText, setDisplayText] = useState("")
  const [isShuffling, setIsShuffling] = useState(true)

  const charSets = {
    low: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    medium: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*",
    high: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?█▓▒░",
  }

  const chars = charSets[intensity]

  useEffect(() => {
    let interval: NodeJS.Timeout
    let currentIndex = 0
    const shuffleSpeed = duration / (finalText.length * 3)

    const shuffle = () => {
      if (currentIndex < finalText.length) {
        let scrambled = ""
        for (let i = 0; i < finalText.length; i++) {
          if (i <= currentIndex) {
            scrambled += finalText[i]
          } else {
            scrambled += chars[Math.floor(Math.random() * chars.length)]
          }
        }
        setDisplayText(scrambled)

        if (Math.random() > 0.7) currentIndex++
      } else {
        setIsShuffling(false)
        clearInterval(interval)
      }
    }

    interval = setInterval(shuffle, shuffleSpeed)
    return () => clearInterval(interval)
  }, [finalText, duration, chars])

  return (
    <span className={`font-mono ${isShuffling ? "text-red-400" : "text-green-400"} ${className}`}>{displayText}</span>
  )
}

// Glitch text effect
const GlitchText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <motion.span
      className={`font-mono relative ${className}`}
      animate={{
        textShadow: [
          "0 0 0 transparent",
          "2px 0 0 #ff0000, -2px 0 0 #00ff00",
          "0 0 0 transparent",
          "-2px 0 0 #ff0000, 2px 0 0 #00ff00",
          "0 0 0 transparent",
        ],
      }}
      transition={{
        duration: 0.1,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    >
      {text}
    </motion.span>
  )
}

// Typewriter effect for console
const TypewriterText = ({
  text,
  speed = 50,
  onComplete,
}: {
  text: string
  speed?: number
  onComplete?: () => void
}) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, speed)
      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return <span className="font-mono">{displayText}</span>
}

// Matrix rain effect
const MatrixRain = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: [0, 1, 0.7] }}
      transition={{ duration: 0.5 }}
      className="font-mono text-green-400 text-sm"
    >
      {text}
    </motion.div>
  )
}

// Console Component
const ConsoleWindow = ({ phase }: { phase: string }) => {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)

  const consoleCommands = [
    "Initializing hardware verification protocol...",
    "Scanning system architecture...",
    "Detecting CPU: Intel Core i7-12700K",
    "Detecting GPU: NVIDIA RTX 4070",
    "Extracting motherboard serial: MB-7C02-MS-1",
    "Reading BIOS signature: AMI-9.17.1021",
    "Generating hardware fingerprint...",
    "HWID: 4A7B-9C3E-F1D8-2K5M-8N7Q-3P6R",
    "Cross-referencing with device registry...",
    "Validating TPM 2.0 certificate...",
    "Certificate status: VALID",
    "Device trust level: VERIFIED",
    "Hardware authentication: PASSED",
  ]

  useEffect(() => {
    if (phase === "console" && currentLine < consoleCommands.length) {
      const timer = setTimeout(
        () => {
          setLines((prev) => [...prev, consoleCommands[currentLine]])
          setCurrentLine((prev) => prev + 1)
        },
        200 + Math.random() * 300,
      )
      return () => clearTimeout(timer)
    }
  }, [phase, currentLine, consoleCommands])

  if (phase !== "console") return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-black border border-green-500 rounded p-4 w-full max-h-64 overflow-y-auto"
    >
      <div className="flex items-center mb-2 text-green-400 text-sm">
        <Terminal className="w-4 h-4 mr-2" />
        <span>Hardware Verification Console</span>
      </div>
      <div className="space-y-1">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 text-sm font-mono"
          >
            <span className="text-gray-500">{">"}</span> {line}
          </motion.div>
        ))}
        {currentLine < consoleCommands.length && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            className="text-green-400 text-sm font-mono"
          >
            <span className="text-gray-500">{">"}</span> _
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Redacted text with staggered reveal
const RedactedText = ({
  text,
  revealDelay = 0,
  staggerDelay = 100,
}: {
  text: string
  revealDelay?: number
  staggerDelay?: number
}) => {
  const [revealedChars, setRevealedChars] = useState<boolean[]>(new Array(text.length).fill(false))

  useEffect(() => {
    const timer = setTimeout(() => {
      text.split("").forEach((_, index) => {
        setTimeout(() => {
          setRevealedChars((prev) => {
            const newState = [...prev]
            newState[index] = true
            return newState
          })
        }, index * staggerDelay)
      })
    }, revealDelay)

    return () => clearTimeout(timer)
  }, [revealDelay, staggerDelay, text])

  return (
    <span className="font-mono">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className={revealedChars[index] ? "text-green-400" : "bg-black text-black"}
          animate={{
            backgroundColor: revealedChars[index] ? "transparent" : "#000000",
          }}
          transition={{ duration: 0.2 }}
        >
          {revealedChars[index] ? char : "█"}
        </motion.span>
      ))}
    </span>
  )
}

// Security Checklist Component
const SecurityChecklist = ({ phase }: { phase: string }) => {
  const [completedItems, setCompletedItems] = useState<boolean[]>([false, false, false, false])

  const checklistItems = [
    "Device HWID verification",
    "TPM certificate validation",
    "System integrity check",
    "User database lookup",
  ]

  useEffect(() => {
    if (phase === "analyzing") {
      checklistItems.forEach((_, index) => {
        setTimeout(
          () => {
            setCompletedItems((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          },
          (index + 1) * 1000,
        )
      })
    }
  }, [phase])

  return (
    <div className="space-y-3">
      {checklistItems.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-3 text-base font-mono"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <motion.div
            animate={{
              scale: completedItems[index] ? 1 : [1, 1.2, 1],
              rotate: completedItems[index] ? 0 : 360,
            }}
            transition={{
              scale: { duration: 1.5, repeat: completedItems[index] ? 0 : Number.POSITIVE_INFINITY },
              rotate: { duration: 3, repeat: completedItems[index] ? 0 : Number.POSITIVE_INFINITY, ease: "linear" },
            }}
          >
            {completedItems[index] ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <div className="w-5 h-5 border-2 border-yellow-400 rounded-full animate-pulse" />
            )}
          </motion.div>
          <span className={completedItems[index] ? "text-green-400" : "text-yellow-400"}>{item}</span>
        </motion.div>
      ))}
    </div>
  )
}

// Network Activity Graph
const NetworkGraph = () => {
  const [dataPoints, setDataPoints] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const newPoint = Math.random() * 80 + 20
        const newData = [...prev, newPoint]
        return newData.slice(-15)
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  const maxHeight = 60
  const width = 200

  return (
    <div className="bg-black/50 border border-green-500/30 rounded p-4">
      <div className="text-base text-green-400 font-mono mb-3">NETWORK ACTIVITY</div>
      <svg width={width} height={maxHeight} className="overflow-visible">
        {[0, 20, 40, 60].map((y) => (
          <line key={y} x1={0} y1={y} x2={width} y2={y} stroke="rgba(34, 197, 94, 0.2)" strokeWidth={0.5} />
        ))}

        {dataPoints.length > 1 && (
          <motion.polyline
            points={dataPoints
              .map(
                (point, index) =>
                  `${(index / (dataPoints.length - 1)) * width},${maxHeight - (point / 100) * maxHeight}`,
              )
              .join(" ")}
            fill="none"
            stroke="#22c55e"
            strokeWidth={2}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}

        {dataPoints.map((point, index) => (
          <motion.circle
            key={index}
            cx={(index / Math.max(dataPoints.length - 1, 1)) * width}
            cy={maxHeight - (point / 100) * maxHeight}
            r={2}
            fill="#22c55e"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </svg>
      <div className="text-base text-green-400 font-mono mt-2">
        PACKETS: {dataPoints.length > 0 ? Math.floor(dataPoints[dataPoints.length - 1]) : 0}/sec
      </div>
    </div>
  )
}

// Hardware Scanner
const HardwareScanner = () => {
  return (
    <div className="relative w-32 h-32 mx-auto">
      <motion.div
        className="absolute inset-0 border-2 border-blue-400 rounded"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border border-blue-400/40 rounded"
          animate={{
            scale: [0.5, 1.3],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.8,
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <Shield className="w-10 h-10 text-blue-400" />
      </motion.div>
    </div>
  )
}

export default function HumanVerificationPage({ onNext, username, onUIVisibilityChange }: HumanVerificationPageProps) {
  const { t } = useLocalization()
  const [phase, setPhase] = useState<
    "warning" | "initializing" | "console" | "scanning" | "analyzing" | "failed" | "retry" | "terminal" | "complete"
  >("warning")
  const [scanProgress, setScanProgress] = useState(0)
  const [retinalScanProgress, setRetinalScanProgress] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "lost" | "restored">(
    "connecting",
  )

  useEffect(() => {
    if (phase !== "warning") {
      onUIVisibilityChange(false)
    }
    return () => {
      if (phase === "complete") {
        onUIVisibilityChange(true)
      }
    }
  }, [phase, onUIVisibilityChange])

  useEffect(() => {
    let timer: NodeJS.Timeout

    switch (phase) {
      case "warning":
        timer = setTimeout(() => setPhase("initializing"), 3500) // 1s flash + 2.5s display
        break

      case "initializing":
        timer = setTimeout(() => setPhase("console"), 3500)
        break

      case "console":
        timer = setTimeout(() => setPhase("scanning"), 4000)
        break

      case "scanning":
        const scanInterval = setInterval(() => {
          setScanProgress((prev) => {
            const increment = Math.random() * 15 + 5
            const newProgress = Math.min(prev + increment, 100)

            if (newProgress >= 100) {
              clearInterval(scanInterval)
              setTimeout(() => setPhase("analyzing"), 800)
            }
            return newProgress
          })
        }, 300)
        return () => clearInterval(scanInterval)

      case "analyzing":
        const retinalInterval = setInterval(() => {
          setRetinalScanProgress((prev) => {
            const newProgress = Math.min(prev + Math.random() * 20 + 5, 100)
            if (newProgress >= 100) {
              clearInterval(retinalInterval)
              setTimeout(() => setPhase("failed"), 1500)
            }
            return newProgress
          })
        }, 250)
        return () => clearInterval(retinalInterval)

      case "failed":
        setConnectionStatus("lost")
        timer = setTimeout(() => {
          setConnectionStatus("restored")
          setPhase("retry")
        }, 3500)
        break

      case "retry":
        setScanProgress(0)
        setRetinalScanProgress(0)
        timer = setTimeout(() => setPhase("terminal"), 2500)
        break

      case "terminal":
        timer = setTimeout(() => setPhase("complete"), 6000)
        break

      case "complete":
        timer = setTimeout(() => onNext(), 3500)
        break
    }

    return () => clearTimeout(timer)
  }, [phase, onNext])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-500/10 font-mono text-sm select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          >
            {Math.random().toString(36).substring(2, 8).toUpperCase()}
          </motion.div>
        ))}

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/8 to-transparent h-2"
          animate={{
            y: [0, window.innerHeight || 800, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,0,0,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,0,0,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "25px 25px",
          }}
        />
      </div>

      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md z-10">
        <AnimatePresence mode="wait">
          {phase === "warning" && (
            <motion.div
              key="warning"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0, 1, 0, 1, 0, 1, 1],
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                filter: "brightness(0) contrast(0)",
              }}
              transition={{
                duration: 1,
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1],
                ease: "easeOut",
              }}
              className="text-center w-full"
            >
              {/* Glitch flash overlay */}
              <motion.div
                className="absolute inset-0 bg-red-500 mix-blend-screen pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.8, 0, 0.6, 0, 0.3, 0, 0.4, 0],
                }}
                transition={{
                  duration: 1,
                  times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1],
                }}
              />

              <motion.div
                className="bg-gradient-to-br from-red-600 via-red-700 to-black border-4 border-red-500 rounded-lg p-6 relative overflow-hidden shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(239,68,68,0.6)",
                    "0 0 60px rgba(239,68,68,0.9)",
                    "0 0 30px rgba(239,68,68,0.6)",
                  ],
                  borderColor: ["#ef4444", "#dc2626", "#ef4444"],
                }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />

                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ duration: 0.4, repeat: Number.POSITIVE_INFINITY }}
                >
                  <AlertTriangle className="w-16 h-16 text-white mx-auto mb-3" />
                </motion.div>

                <motion.h1
                  className="text-xl font-black text-white mb-2 tracking-wider font-mono"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(255,255,255,0.5)",
                      "0 0 20px rgba(255,255,255,0.8)",
                      "0 0 10px rgba(255,255,255,0.5)",
                    ],
                  }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <GlitchText text="SECURITY BREACH" />
                </motion.h1>

                <motion.p
                  className="text-red-200 font-bold text-base font-mono mb-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  UNAUTHORIZED ACCESS DETECTED
                </motion.p>

                <motion.div
                  className="text-red-300 font-mono text-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  Initiating verification protocol...
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {phase === "initializing" && (
            <motion.div
              key="initializing"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="text-center w-full"
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 via-black to-gray-800 border-2 border-yellow-500 rounded-lg p-8 relative overflow-hidden shadow-2xl"
                animate={{
                  borderColor: ["#eab308", "#f59e0b", "#eab308"],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Shield className="w-8 h-8 text-yellow-400" />
                  </motion.div>
                  <h2 className="text-xl font-black text-yellow-400 font-mono tracking-wider">
                    <ShufflingText finalText="STARTING VERIFICATION" duration={2200} intensity="medium" />
                  </h2>
                </div>

                <div className="space-y-4 text-left font-mono text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-400">System:</span>
                    <ShufflingText finalText="HWID_VERIFIER_v2.3" duration={1500} intensity="low" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Protocol:</span>
                    <ShufflingText finalText="DEVICE_FINGERPRINT" duration={1200} intensity="medium" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-yellow-400">Initializing...</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="h-full bg-yellow-400 rounded-full"
                        animate={{ width: ["0%", "100%", "0%"] }}
                        transition={{
                          duration: 2.5,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.4,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {phase === "console" && (
            <motion.div
              key="console"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="text-center w-full"
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 via-black to-gray-800 border-2 border-purple-500 rounded-lg p-6 relative overflow-hidden shadow-2xl"
                animate={{
                  borderColor: ["#a855f7", "#7c3aed", "#a855f7"],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Terminal className="w-8 h-8 text-purple-400" />
                  </motion.div>
                  <h2 className="text-xl font-black text-purple-400 font-mono tracking-wider">HARDWARE ANALYSIS</h2>
                </div>

                <ConsoleWindow phase={phase} />
              </motion.div>
            </motion.div>
          )}

          {(phase === "scanning" || phase === "retry") && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="text-center w-full"
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 via-black to-gray-800 border-2 border-blue-500 rounded-lg p-6 relative overflow-hidden shadow-2xl"
                animate={{
                  borderColor: ["#3b82f6", "#1d4ed8", "#3b82f6"],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />

                <div className="flex items-center justify-center gap-3 mb-6">
                  <h2 className="text-xl font-black text-blue-400 font-mono tracking-wider">
                    {phase === "retry" ? "RECONNECTING TO DATABASE" : "DEVICE VERIFICATION"}
                  </h2>
                </div>

                <HardwareScanner />

                <div className="space-y-4 text-left font-mono text-base mt-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target:</span>
                    <ShufflingText finalText={username.toUpperCase()} duration={1500} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Progress:</span>
                    <span className="text-blue-400">{Math.floor(scanProgress)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Database:</span>
                    <div className="flex items-center gap-2">
                      {connectionStatus === "connected" || connectionStatus === "restored" ? (
                        <Wifi className="w-4 h-4 text-green-400" />
                      ) : (
                        <WifiOff className="w-4 h-4 text-red-400" />
                      )}
                      <span className={connectionStatus === "lost" ? "text-red-400" : "text-green-400"}>
                        {connectionStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-4 mt-6 overflow-hidden border border-gray-600">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full relative"
                    animate={{
                      width: `${scanProgress}%`,
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      width: { duration: 0.5 },
                      backgroundPosition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {phase === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center w-full space-y-6"
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 via-black to-purple-900 border-2 border-purple-500 rounded-lg p-6 relative overflow-hidden shadow-2xl"
                animate={{
                  borderColor: ["#a855f7", "#7c3aed", "#a855f7"],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Activity className="w-8 h-8 text-purple-400" />
                  </motion.div>
                  <h2 className="text-xl font-black text-purple-400 font-mono tracking-wider">SYSTEM VALIDATION</h2>
                </div>

                <SecurityChecklist phase={phase} />

                <div className="mt-6 space-y-3 text-left font-mono text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Validation:</span>
                    <ShufflingText finalText="IN_PROGRESS" duration={1200} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Progress:</span>
                    <span className="text-purple-400">{Math.floor(retinalScanProgress)}%</span>
                  </div>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-4 mt-6 overflow-hidden border border-gray-600">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500 rounded-full"
                    animate={{
                      width: `${retinalScanProgress}%`,
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      width: { duration: 0.5 },
                      backgroundPosition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
                    }}
                  />
                </div>
              </motion.div>

              <NetworkGraph />
            </motion.div>
          )}

          {phase === "failed" && (
            <motion.div
              key="failed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center w-full"
            >
              <motion.div
                className="bg-gradient-to-br from-red-900 via-black to-red-800 border-2 border-red-500 rounded-lg p-8 relative overflow-hidden shadow-2xl"
                animate={{
                  borderColor: ["#ef4444", "#dc2626", "#ef4444"],
                  boxShadow: [
                    "0 0 20px rgba(239,68,68,0.5)",
                    "0 0 40px rgba(239,68,68,0.8)",
                    "0 0 20px rgba(239,68,68,0.5)",
                  ],
                }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <X className="w-12 h-12 text-red-400" />
                  </motion.div>
                  <h2 className="text-xl font-black text-red-400 font-mono tracking-wider">
                    <GlitchText text="VERIFICATION FAILED" />
                  </h2>
                </div>

                <div className="space-y-4 text-left font-mono text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Error:</span>
                    <span className="text-red-400">DATABASE_TIMEOUT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Connection:</span>
                    <span className="text-red-400">LOST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-yellow-400">RECONNECTING</span>
                  </div>
                </div>

                <motion.div
                  className="mt-6 text-red-300 font-mono text-base"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  Switching to backup server...
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {phase === "terminal" && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full"
            >
              <div className="bg-black border-2 border-green-500 rounded-lg p-6 font-mono text-base shadow-2xl">
                <div className="flex items-center mb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-4 text-green-400">root@verification-server</span>
                </div>

                <div className="space-y-3 text-green-400">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <span className="text-red-400">$</span> verify_user --hwid {username}
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                    <span className="text-gray-400">Checking hardware fingerprint...</span>
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
                    <span className="text-gray-400">HWID:</span>{" "}
                    <RedactedText text="4A7B-9C3E-F1D8-2K5M" revealDelay={2200} staggerDelay={100} />
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
                    <span className="text-gray-400">Status:</span>{" "}
                    <RedactedText text="VERIFIED" revealDelay={3200} staggerDelay={120} />
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6 }}>
                    <span className="text-gray-400">Access Level:</span>{" "}
                    <motion.span
                      className="text-green-400 font-bold"
                      animate={{
                        textShadow: [
                          "0 0 5px rgba(34,197,94,0.5)",
                          "0 0 15px rgba(34,197,94,0.8)",
                          "0 0 5px rgba(34,197,94,0.5)",
                        ],
                      }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 4.0 }}
                    >
                      AUTHORIZED
                    </motion.span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.6 }}
                    className="text-green-400 mt-4"
                  >
                    <span className="text-red-400">$</span> redirect --secure-area
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5.2 }}
                    className="text-yellow-400"
                  >
                    [INFO] Redirecting to secure area...
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {phase === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center w-full"
            >
              <motion.div
                className="bg-gradient-to-br from-green-900 via-green-800 to-black border-2 border-green-400 rounded-lg p-8 relative overflow-hidden shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(34,197,94,0.6)",
                    "0 0 60px rgba(34,197,94,0.9)",
                    "0 0 30px rgba(34,197,94,0.6)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />

                <motion.div
                  className="flex items-center justify-center gap-3 mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Lock className="w-12 h-12 text-green-400" />
                  <motion.span
                    className="text-6xl"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    ✓
                  </motion.span>
                </motion.div>

                <motion.h2
                  className="text-2xl font-black text-green-400 mb-4 font-mono tracking-wider"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(34,197,94,0.5)",
                      "0 0 20px rgba(34,197,94,0.8)",
                      "0 0 10px rgba(34,197,94,0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  DEVICE VERIFIED
                </motion.h2>

                <motion.p
                  className="text-green-300 font-bold font-mono text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  ACCESS GRANTED
                </motion.p>

                <motion.div
                  className="mt-4 text-green-400/70 text-base font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Redirecting {username}...
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

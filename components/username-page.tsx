"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, User, RefreshCw, Shield, Zap, CheckCircle2 } from "lucide-react"
import ProgressBar from "./progress-bar"
import { getRobloxUserHeadshot, getRobloxUserHeadshotAlternative } from "@/app/actions/roblox"
import { useLocalization } from "./localization-provider"

interface UsernamePageProps {
  onNext: () => void
  prizeAmount: number
  username: string
  setUsername: (username: string) => void
}

export default function UsernamePage({ onNext, prizeAmount, username, setUsername }: UsernamePageProps) {
  const { t } = useLocalization()
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [userHeadshotUrl, setUserHeadshotUrl] = useState<string | null>(null)
  const [verificationError, setVerificationError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const handleVerify = async (useAlternative = false) => {
    if (!username.trim()) {
      setVerificationError(t.pleaseEnterUsername)
      return
    }

    setIsVerifying(true)
    setVerificationError(null)
    setUserHeadshotUrl(null)

    try {
      const result = useAlternative
        ? await getRobloxUserHeadshotAlternative(username)
        : await getRobloxUserHeadshot(username)

      if (result.success && result.headshotUrl) {
        setUserHeadshotUrl(result.headshotUrl)
        setIsVerified(true)
        setRetryCount(0)
      } else {
        setVerificationError(t.userNotFound)
        setIsVerified(false)
        if (!useAlternative && retryCount < 1) {
          setRetryCount((prev) => prev + 1)
          setTimeout(() => {
            handleVerify(true)
          }, 1000)
          return
        }
      }
    } catch (error) {
      setVerificationError(t.userNotFound)
      setIsVerified(false)
    }

    setIsVerifying(false)
  }

  const handleRetry = () => {
    setRetryCount(0)
    handleVerify(false)
  }

  const handleConfirm = () => {
    onNext()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 flex flex-col items-center justify-center p-4 pb-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              rotate: [0, 360],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          >
            <Shield className="text-white" size={30 + Math.random() * 20} />
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <ProgressBar currentStep={2} totalSteps={5} />
      </motion.div>

      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md z-10">
        <AnimatePresence mode="wait">
          {!isVerified ? (
            <motion.div
              key="verification-form"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="text-center w-full"
            >
              <motion.div
                className="trust-card p-8 mb-6 relative overflow-hidden"
                animate={{
                  scale: [1, 1.01, 1],
                  boxShadow: [
                    "0 10px 30px rgba(0,0,0,0.2)",
                    "0 15px 40px rgba(59,130,246,0.3)",
                    "0 10px 30px rgba(0,0,0,0.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                {/* Card shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5"
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
                  className="mb-4"
                >
                  <Shield className="w-16 h-16 text-blue-500 mx-auto" />
                </motion.div>

                <motion.h1
                  className="text-3xl font-black text-blue-600 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {t.enterUsername}
                </motion.h1>

                <motion.p
                  className="text-blue-500 text-sm font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {t.verifyAccountDesc}
                </motion.p>
              </motion.div>

              <div className="space-y-4">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  whileFocus={{ scale: 1.02 }}
                >
                  <motion.div
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <User className="w-5 h-5" />
                  </motion.div>
                  <motion.input
                    type="text"
                    placeholder={t.yourRobloxUsername}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value)
                      setVerificationError(null)
                    }}
                    disabled={isVerifying}
                    className="trust-input w-full pl-12 transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/25"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && username.trim() && !isVerifying) {
                        handleVerify()
                      }
                    }}
                    whileFocus={{
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                    }}
                  />
                </motion.div>

                <AnimatePresence>
                  {verificationError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="bg-red-100 border-2 border-red-400 rounded-xl p-3 relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-red-200 opacity-20"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                      />
                      <p className="text-red-600 font-bold text-sm relative z-10">{verificationError}</p>
                      {retryCount > 0 && (
                        <motion.button
                          onClick={handleRetry}
                          className="mt-2 text-red-600 underline text-xs flex items-center gap-1 mx-auto relative z-10"
                          whileTap={{ scale: 0.95 }}
                        >
                          <RefreshCw className="w-3 h-3" />
                          {t.tryAgain}
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  onClick={() => handleVerify()}
                  disabled={!username.trim() || isVerifying}
                  className={`trust-button w-full relative overflow-hidden transition-all duration-300 ${
                    !username.trim() || isVerifying ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  whileTap={{ scale: username.trim() && !isVerifying ? 0.98 : 1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    boxShadow: username.trim()
                      ? [
                          "0 4px 15px rgba(59,130,246,0.3)",
                          "0 8px 25px rgba(59,130,246,0.5)",
                          "0 4px 15px rgba(59,130,246,0.3)",
                        ]
                      : [],
                  }}
                  transition={{
                    delay: 1,
                    boxShadow: { duration: 2, repeat: username.trim() ? Number.POSITIVE_INFINITY : 0 },
                  }}
                >
                  {/* Button shine effect */}
                  {username.trim() && !isVerifying && (
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
                  )}
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isVerifying ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Loader2 className="w-5 h-5" />
                        </motion.div>
                        <span className="font-bold">{retryCount > 0 ? t.tryingAlternative : t.verifying}</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        <span className="font-bold">{t.verifyAccount}</span>
                      </>
                    )}
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="verification-success"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="text-center w-full"
            >
              {/* Success particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-green-400 rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 200,
                    y: (Math.random() - 0.5) * 200,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                />
              ))}

              <motion.div
                className="trust-card p-8 relative overflow-hidden"
                animate={{
                  scale: [1, 1.01, 1],
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

                <motion.div
                  className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-6 border-4 border-green-500 overflow-hidden relative"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 20px rgba(34,197,94,0.3)",
                      "0 0 30px rgba(34,197,94,0.5)",
                      "0 0 20px rgba(34,197,94,0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {userHeadshotUrl ? (
                    <motion.img
                      src={userHeadshotUrl || "/placeholder.svg"}
                      alt={`${username}'s Roblox avatar headshot`}
                      className="w-full h-full object-cover"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=112&width=112&text=${encodeURIComponent(username)}`
                      }}
                    />
                  ) : (
                    <img
                      src={`/placeholder.svg?height=112&width=112&text=${encodeURIComponent(username)}`}
                      alt="Placeholder avatar"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Verified badge */}
                  <motion.div
                    className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>

                <motion.h2
                  className="text-2xl font-black text-blue-600 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {t.welcome}, {username}! ✅
                </motion.h2>

                <motion.p
                  className="text-green-600 font-bold mb-6 flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  {t.accountVerified}
                </motion.p>

                <motion.button
                  onClick={handleConfirm}
                  className="trust-button w-full relative overflow-hidden"
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    boxShadow: [
                      "0 4px 15px rgba(59,130,246,0.3)",
                      "0 8px 25px rgba(59,130,246,0.5)",
                      "0 4px 15px rgba(59,130,246,0.3)",
                    ],
                  }}
                  transition={{
                    delay: 0.7,
                    boxShadow: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  {/* Button shine */}
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
                  <span className="relative z-10 font-black">{t.continueToQuiz}</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Loading Overlay */}
      <AnimatePresence>
        {isVerifying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-900/90 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              className="trust-card p-8 text-center mx-4 max-w-sm relative overflow-hidden"
              animate={{
                scale: [1, 1.02, 1],
                boxShadow: [
                  "0 20px 40px rgba(59,130,246,0.3)",
                  "0 25px 50px rgba(59,130,246,0.5)",
                  "0 20px 40px rgba(59,130,246,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {/* Loading shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-10"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <motion.div
                className="relative z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Loader2 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              </motion.div>
              <motion.p
                className="text-blue-600 font-bold text-lg mb-2"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                {retryCount > 0 ? t.tryingAlternative : t.connectingToRoblox}
              </motion.p>
              <div className="flex gap-1 justify-center mt-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-blue-500 rounded-full"
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
              {retryCount > 0 && (
                <motion.p
                  className="text-blue-400 text-xs mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {t.usingBackupServers}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

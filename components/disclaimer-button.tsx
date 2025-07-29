"use client"

import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { useLocalization } from "./localization-provider"

interface DisclaimerButtonProps {
  onClick: () => void
}

export default function DisclaimerButton({ onClick }: DisclaimerButtonProps) {
  const { t } = useLocalization()

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1 px-3 py-2 rounded-full bg-blue-800/50 text-blue-200 text-xs font-semibold transition-colors duration-200"
    >
      <Info className="w-4 h-4" />
      {t.disclaimer}
    </motion.button>
  )
}

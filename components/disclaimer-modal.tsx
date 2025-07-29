"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useLocalization } from "./localization-provider"

interface DisclaimerModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DisclaimerModal({ isOpen, onClose }: DisclaimerModalProps) {
  const { t } = useLocalization()

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] mx-4 relative shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
              aria-label={t.close}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="pr-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.importantLegalDisclaimer}</h2>

              <div className="text-gray-700 text-sm space-y-4 leading-relaxed">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">1. ENTERTAINMENT PURPOSE</h3>
                  <p>{t.entertainmentPurpose}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">2. NO AFFILIATION</h3>
                  <p>{t.noAffiliation}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">3. VOLUNTARY PARTICIPATION</h3>
                  <p>{t.voluntaryParticipation}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">4. SIMULATED EXPERIENCE</h3>
                  <p>{t.simulatedExperience}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">5. NO REAL PRIZES</h3>
                  <p>{t.noRealPrizes}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">6. AGE RESTRICTIONS</h3>
                  <p>{t.ageRestriction}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">7. DATA AND PRIVACY</h3>
                  <p>{t.dataCollection}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">8. THIRD-PARTY LINKS</h3>
                  <p>{t.thirdPartyLinks}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">9. LIMITATION OF LIABILITY</h3>
                  <p>{t.liabilityLimitation}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">10. INTELLECTUAL PROPERTY</h3>
                  <p>{t.intellectualProperty}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">11. TERMINATION RIGHTS</h3>
                  <p>{t.terminationRights}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">12. GOVERNING LAW</h3>
                  <p>{t.governingLaw}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">13. CONTACT INFORMATION</h3>
                  <p>{t.contactInformation}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

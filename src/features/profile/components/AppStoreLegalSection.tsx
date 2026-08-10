import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ShieldCheck, RotateCcw, FileText, Mail, ExternalLink, CheckCircle2 } from 'lucide-react'
import { ModalBase } from '../../../components/atoms/ModalBase'
import { restoreProPurchases } from '../../../services/revenueCatService'

export const AppStoreLegalSection: React.FC = () => {
  const { t } = useTranslation()
  const [isRestoring, setIsRestoring] = useState(false)
  const [restoreMsg, setRestoreMsg] = useState<string | null>(null)
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null)

  const handleRestore = async () => {
    setIsRestoring(true)
    setRestoreMsg(null)
    try {
      const res = await restoreProPurchases()
      setRestoreMsg(res ? 'Purchases restored successfully!' : 'No previous purchases found.')
    } catch (_) {
      setRestoreMsg('Restore complete.')
    } finally {
      setIsRestoring(false)
    }
  }

  return (
    <div className="space-y-3 font-sans">
      <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
        App Store & Legal
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
        {/* Restore Purchases */}
        <button
          onClick={handleRestore}
          disabled={isRestoring}
          className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-purple-500/30 hover:bg-purple-900/40 transition-all text-purple-100"
        >
          <div className="flex items-center gap-2">
            <RotateCcw className={`w-4 h-4 text-amber-300 ${isRestoring ? 'animate-spin' : ''}`} />
            <span>{t('paywall.restore')}</span>
          </div>
          <span className="text-[10px] text-amber-300 font-bold">App Store</span>
        </button>

        {/* Support & Contact */}
        <a
          href="https://www.sosyalvideoolustur.com.tr"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-purple-500/30 hover:bg-purple-900/40 transition-all text-purple-100"
        >
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Support & Feedback</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
        </a>

        {/* Privacy Policy */}
        <button
          onClick={() => setActiveModal('privacy')}
          className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-purple-500/30 hover:bg-purple-900/40 transition-all text-purple-100"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Privacy Policy</span>
          </div>
          <FileText className="w-3.5 h-3.5 text-purple-300" />
        </button>

        {/* Terms of Service / EULA */}
        <button
          onClick={() => setActiveModal('terms')}
          className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-purple-500/30 hover:bg-purple-900/40 transition-all text-purple-100"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Terms of Service (EULA)</span>
          </div>
          <FileText className="w-3.5 h-3.5 text-purple-300" />
        </button>
      </div>

      {restoreMsg && (
        <div className="p-3 bg-purple-950/60 border border-purple-500/30 rounded-2xl text-xs font-bold text-amber-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{restoreMsg}</span>
        </div>
      )}

      {/* App Version Tag */}
      <div className="text-center pt-2 text-[10px] text-purple-200/50 font-mono">
        TarotEdu PRO v1.0.0 (Build 1) • com.tarotedu.pro.app
      </div>

      {/* Privacy Policy Modal */}
      <ModalBase
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title="Privacy Policy"
      >
        <div className="space-y-3 text-xs text-purple-100 font-medium leading-relaxed max-h-72 overflow-y-auto pr-1">
          <p>
            TarotEdu PRO respects your privacy. All your daily journal entries, life path numbers, and card readings remain 100% private and stored locally on your device.
          </p>
          <p>
            Subscription status is processed securely via Apple In-App Purchases and RevenueCat. We never sell or share your personal data with third parties.
          </p>
        </div>
      </ModalBase>

      {/* Terms of Service Modal */}
      <ModalBase
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title="Terms of Service (EULA)"
      >
        <div className="space-y-3 text-xs text-purple-100 font-medium leading-relaxed max-h-72 overflow-y-auto pr-1">
          <p>
            By using TarotEdu PRO, you agree to Apple's Standard End User License Agreement (EULA) and these terms.
          </p>
          <p>
            Subscriptions auto-renew unless cancelled at least 24 hours before the end of the current billing period in your Apple ID Account Settings.
          </p>
        </div>
      </ModalBase>
    </div>
  )
}

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Sun, Moon, Eye, Heart, Briefcase } from 'lucide-react'
import { TarotCard } from '../../../types/tarot'

interface CardDetailTabsContentProps {
  card: TarotCard
  activeTab: 'core' | 'symbolism' | 'loveCareer'
}

export const CardDetailTabsContent: React.FC<CardDetailTabsContentProps> = ({ card, activeTab }) => {
  const { t } = useTranslation()

  return (
    <>
      {activeTab === 'core' && (
        <div className="space-y-2.5">
          <div>
            <h4 className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              {t('academy.uprightMeaning')}
            </h4>
            <p className="text-xs text-purple-100 font-medium leading-relaxed bg-slate-900/90 p-2.5 rounded-xl border border-purple-500/30">
              {t(`cards.${card.id}.upright`, card.meaning.upright)}
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              {t('academy.reversedMeaning')}
            </h4>
            <p className="text-xs text-purple-100 font-medium leading-relaxed bg-slate-900/90 p-2.5 rounded-xl border border-purple-500/30">
              {t(`cards.${card.id}.reversed`, card.meaning.reversed)}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'symbolism' && (
        <div className="space-y-2 text-xs text-purple-100 bg-slate-900/90 p-3 rounded-xl border border-purple-500/30 leading-relaxed font-medium">
          <span className="font-bold text-amber-300 flex items-center gap-1 mb-1">
            <Eye className="w-3.5 h-3.5" /> Kadim Sembolizm ve Arketip
          </span>
          <p>
            Rider-Waite tradisyonunda bu kart, bilincin evrimindeki kutsal döngüyü ve gizli esoterik sembolleri temsil eder.
          </p>
        </div>
      )}

      {activeTab === 'loveCareer' && (
        <div className="space-y-2 text-xs text-purple-100 bg-slate-900/90 p-3 rounded-xl border border-purple-500/30 leading-relaxed font-medium">
          <span className="font-bold text-pink-300 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-pink-400" /> Aşk Yorumu:
          </span>
          <p className="text-[11px]">İlişkilerde duygusal uyum, samimiyet ve ruhsal bağ derinleşmesi.</p>
          <span className="font-bold text-teal-300 flex items-center gap-1 pt-1">
            <Briefcase className="w-3.5 h-3.5 text-teal-400" /> Kariyer Yorumu:
          </span>
          <p className="text-[11px]">Yeni projelere adım atma, finansal fırsatlar ve irade gücü.</p>
        </div>
      )}
    </>
  )
}

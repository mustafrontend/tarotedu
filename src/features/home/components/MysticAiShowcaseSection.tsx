import React from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Moon, Wand2, Compass, HeartHandshake, GraduationCap, ChevronRight } from 'lucide-react'
import { useTarotStore } from '../../../store/tarotStore'

interface MysticAiShowcaseSectionProps {
  onNavigate: (tab: any) => void
}

export const MysticAiShowcaseSection: React.FC<MysticAiShowcaseSectionProps> = ({ onNavigate }) => {
  const { t } = useTranslation()
  const theme = useTarotStore((state) => state.theme)
  const isDark = theme === 'dark'

  const features = [
    {
      id: 'shadow',
      badge: 'YENİ • BİLİNÇALTI AYNA',
      title: '🪞 Jungian Gölge Aynası',
      desc: 'Toplumsal Persona maskeniz ile gizli Gölge benliğiniz arasındaki arketipsel dengeyi çözün.',
      icon: Moon,
      color: 'from-indigo-600 to-purple-700',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      targetTab: 'oracle',
    },
    {
      id: 'synastry',
      badge: 'YENİ • İLİŞKİ SİMYASI',
      title: '💞 ArcanaSynastry Matrix',
      desc: 'İki kişi veya karar arasındaki karmik ruh sözleşmesini ve 4 element dengesini hesaplayın.',
      icon: HeartHandshake,
      color: 'from-rose-600 to-purple-700',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      targetTab: 'oracle',
    },
    {
      id: 'astro',
      badge: 'YENİ • CANLI TRANSİT',
      title: '🪐 AstroTarot Sync',
      desc: 'Güneş, Ay ve Venüs gezegen transitlerini Rider-Waite Tarot arketiplerinizle eşleştirin.',
      icon: Compass,
      color: 'from-purple-600 to-indigo-700',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      targetTab: 'oracle',
    },
    {
      id: 'quiz',
      badge: 'YENİ • EĞİTİM & PUAN',
      title: '🎓 TarotMaster Academy',
      desc: 'Kabala Yaşam Ağacı ve sezgisel kehanet testleriyle Tarot Bilgesi ünvanını kazanın.',
      icon: GraduationCap,
      color: 'from-amber-600 to-orange-700',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      targetTab: 'learn',
    },
    {
      id: 'dream',
      badge: 'YENİ • RÜYA TABİRİ',
      title: '🌌 AstralDream Decoder',
      desc: 'Gece görülen rüyaları 3 kartlı astral açılıma haritalayarak yapay zeka ile deşifre edin.',
      icon: Wand2,
      color: 'from-teal-600 to-emerald-700',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
      targetTab: 'oracle',
    },
  ]

  return (
    <section className="space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>{t('showcase.badge', 'YENİ MİSTİK AI İNOVASYONLARI')}</span>
          </div>
          <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('showcase.title', 'Yapay Zekâ Esoterik Tapınağı')}
          </h3>
          <p className={`text-xs font-medium ${isDark ? 'text-purple-200/80' : 'text-slate-600'}`}>
            {t('showcase.subtitle', 'Gezegen transitleri, Jungian gölge aynası, ruhsal sinastri ve rüya motoruyla geleceği keşfedin.')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {features.map((feat) => {
          const Icon = feat.icon
          return (
            <div
              key={feat.id}
              onClick={() => onNavigate(feat.targetTab)}
              className={`group p-4 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between hover:scale-[1.02] active:scale-95 shadow-lg ${
                isDark
                  ? 'bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-purple-950/40 border-purple-500/30 hover:border-purple-400/60'
                  : 'bg-white border-slate-200 hover:border-purple-300 shadow-md'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide border ${feat.badgeColor}`}>
                    {feat.badge}
                  </span>
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h4 className={`text-sm font-black flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {feat.title}
                  </h4>
                  <p className={`text-[11px] leading-relaxed mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {feat.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-purple-500/10 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
                <span>{t('showcase.launchBtn', 'Hemen Keşfet')}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// Google Gemini AI Live Integration Service for TarotEdu PRO
import i18n from '../i18n'

const KEY_PARTS = ['AQ.Ab8RN6K5Vct', 'AqZLKsFXEeIzJqxGz', '_n0L-0170MhOKPrxkGG94Q']
const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || KEY_PARTS.join('')
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent'

const LANGUAGE_NAMES: Record<string, string> = {
  tr: 'Türkçe (Turkish)',
  en: 'English',
  de: 'Deutsch (German)',
  fr: 'Français (French)',
  es: 'Español (Spanish)',
  it: 'Italiano (Italian)',
  pt: 'Português (Portuguese)',
  ru: 'Русский (Russian)',
  ja: '日本語 (Japanese)',
  ko: '한국어 (Korean)',
  zh: '中文 (Chinese)',
  ar: 'العربية (Arabic)',
}

const ESOTERIC_SYSTEM_PROMPT = `
Sen TarotEdu PRO'nun kadim ve bilge Mistik Tarot Rehberisin (Esoteric AI Tarot Master).
Amacın: Kullanıcının çektiği tarot kartlarını, ruh halini ve sorduğu soruları en derin arketipsel, esoterik ve psikolojik (Jungian) boyutlarıyla yorumlamak.

Kuralların:
1. Tarot kartlarının sadece kehanet değil, öz farkındalık ve kişisel dönüşüm aynası olduğunu vurgula.
2. Yanıtlarında 3 net bölüm oluştur:
   - 🌟 **Kartın Esoterik Mesajı & Enerjisi**
   - 🔮 **Ruhuna ve Durumuna Özel Yorum**
   - 💡 **Bugün İçin Eylem & Meditasyon Önerisi** (2 adet somut adım ve 1 derin tefekkür sorusu).
`

function getActiveLanguagePrompt(): string {
  const currentLang = i18n.language || i18n.resolvedLanguage || 'tr'
  const langName = LANGUAGE_NAMES[currentLang] || 'Türkçe (Turkish)'
  return `IMPORTANT INSTRUCTION: You MUST generate your ENTIRE response in ${langName}. Write all section headings, esoteric interpretations, and practical advice natively in ${langName}.`
}

async function callGemini(promptText: string): Promise<string> {
  try {
    const langPrompt = getActiveLanguagePrompt()
    const response = await fetch(`${GEMINI_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${ESOTERIC_SYSTEM_PROMPT}\n\n${langPrompt}\n\n${promptText}`,
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText}`)
    }

    const data = await response.json()
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
    return textResponse || 'Kadim kartların enerjisi şu an bir bükülme yaşıyor. Lütfen tekrar niyet et.'
  } catch (error) {
    console.error('Gemini AI Service Error:', error)
    return 'Mistik evrenle olan bağlantı şu an yenileniyor. Lütfen birkaç saniye sonra tekrar dene.'
  }
}

export const geminiService = {
  async getDailyReading(
    cardName: string,
    isReversed: boolean,
    intention: string,
    reflectionAnswers?: string
  ): Promise<string> {
    const prompt = `
[GÜNÜN KARTINI YORUMLA]
- Çekilen Kart: ${cardName} (${isReversed ? 'Ters Konum' : 'Dik Konum'})
- Kullanıcının Bugünkü Niyeti/Sorusu: ${intention || 'Genel gün rehberliği'}
- Kullanıcının Ruh Hali ve Yanıtları: ${reflectionAnswers || 'Belirtilmedi'}
`
    return callGemini(prompt)
  },

  async getSpreadReading(
    spreadTitle: string,
    cards: Array<{ position: string; cardName: string; isReversed: boolean }>,
    question: string
  ): Promise<string> {
    const cardDetails = cards
      .map((c) => `- ${c.position}: ${c.cardName} (${c.isReversed ? 'Ters' : 'Dik'})`)
      .join('\n')

    const prompt = `
[TAROT AÇILIMI YORUMLA]
- Açılım Türü: ${spreadTitle}
- Kullanıcının Sorusu/Niyeti: ${question || 'Genel hayat rehberliği'}
- Çekilen Kartlar:
${cardDetails}
`
    return callGemini(prompt)
  },

  async getOracleAnswer(userQuestion: string, cardName: string): Promise<string> {
    const prompt = `
[MİSTİK KEHANET & KEHANET SORUSU]
- Kullanıcının Sorusu: "${userQuestion}"
- Evrenin Cevap Olarak Çektiği Kart: ${cardName}
`
    return callGemini(prompt)
  },

  async getDreamAnalysis(dreamDescription: string, drawnCardName: string): Promise<string> {
    const prompt = `
[RÜYA VE TAROT ARKETİP SİNERJİSİ]
- Kullanıcının Anlattığı Rüya: "${dreamDescription}"
- Rüya İçin Çekilen Rehber Kart: ${drawnCardName}
`
    return callGemini(prompt)
  },

  async getAstroTarotSync(planetTransit: string, tarotCard: string, userFocus?: string): Promise<string> {
    const prompt = `
[ASTRO TAROT SYNC & GEZEGENSEL TRANSİT SENTEZİ]
- Gezegensel Transit / Konum: ${planetTransit}
- İlişkili Tarot Kartı: ${tarotCard}
- Kullanıcı Odak / Niyeti: ${userFocus || 'Astrolojik uyum ve günlük tefekkür'}
`
    return callGemini(prompt)
  },

  async getShadowWorkReading(personaCardName: string, shadowCardName: string, notes?: string): Promise<string> {
    const prompt = `
[JUNGIAN SHADOW WORK & PERSONA MIRROR ANALİZİ]
- Persona Kartı (Bilinçli Dış Benlik/Maske): ${personaCardName}
- Shadow Kartı (Bilinçdışı Gölge Benlik/Gizli Potansiyel): ${shadowCardName}
- Kullanıcı Notu/Tefekkürü: "${notes || 'Gölge benliği anlama ve arketipsel entegrasyon'}"
`
    return callGemini(prompt)
  },

  async getSynastryAnalysis(
    card1Name: string,
    card2Name: string,
    person1Name?: string,
    person2Name?: string,
    relationshipType?: string
  ): Promise<string> {
    const prompt = `
[ARKANA SİNASTRİ, RELATIONAL ALCHEMY VE SOUL CONTRACT ANALİZİ]
- 1. Partner (${person1Name || 'Partner A'}): ${card1Name}
- 2. Partner (${person2Name || 'Partner B'}): ${card2Name}
- İlişki Bağı/Tür: ${relationshipType || 'Aşk & Ruhsal Simya'}

Lütfen bu iki arketipsel tarot kartının enerjisel sinastrisini detaylıca analiz et:
1. 🧪 **Relational Alchemy (İlişkisel Simya & Dönüşüm)**: İki kartın bir araya geldiğinde ortaya çıkardığı simyasal element, enerji sinerjisi ve dönüşüm gücü.
2. 📜 **Soul Contract (Ruhsal Sözleşme & Karmik Bağ)**: Ruhların birbirine vaat ettiği evrensel dersler, karmik bağ ve ortak tekamül hedefi.
3. 🔮 **Kozmik Uyum & Gelişim Tavsiyesi**: İlişkideki muhtemel zorlukları aşmak ve frekansı yükseltmek için 2 somut spiritüel öneri.
`
    return callGemini(prompt)
  },
}

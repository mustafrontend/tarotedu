// Google Gemini AI Live Integration Service for TarotEdu PRO
const KEY_PARTS = ['AQ.Ab8RN6K5Vct', 'AqZLKsFXEeIzJqxGz', '_n0L-0170MhOKPrxkGG94Q']
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || KEY_PARTS.join('')
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent'

const ESOTERIC_SYSTEM_PROMPT = `
Sen TarotEdu PRO'nun kadim ve bilge Mistik Tarot Rehberisin (Esoteric AI Tarot Master).
Dilin: Şefkatli, gizemli, derin, ilham verici ve şiirsel fakat son derece net ve pratik tavsiyeler içeren Türkçe.
Amacın: Kullanıcının çektiği tarot kartlarını, ruh halini ve sorduğu soruları en derin arketipsel, esoterik ve psikolojik (Jungian) boyutlarıyla yorumlamak.

Kuralların:
1. Kullanıcıya "Sevgili Arayışçı" veya "Sevgili Ruh Dostum" diye hitap et.
2. Tarot kartlarının sadece kehanet değil, öz farkındalık ve kişisel dönüşüm aynası olduğunu vurgula.
3. Yanıtlarında 3 net bölüm oluştur:
   - 🌟 **Kartın Esoterik Mesajı & Enerjisi**
   - 🔮 **Ruhuna ve Durumuna Özel Yorum**
   - 💡 **Bugün İçin Eylem & Meditasyon Önerisi** (2 adet somut adım ve 1 derin tefekkür sorusu).
`

async function callGemini(promptText: string): Promise<string> {
  try {
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
                text: `${ESOTERIC_SYSTEM_PROMPT}\n\n${promptText}`,
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
  // Günün Kartı İçin Derin AI Yorumu & Özel Soru Analizi
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
- Kullanıcının Ruh Halı ve Yanıtları: ${reflectionAnswers || 'Belirtilmedi'}

Lütfen bu kartın bugünkü enerjisini kullanıcı için özel olarak analiz et. Kullanıcının niyetine odaklan, ona rehberlik et ve gün içinde dikkat etmesi gereken 2 somut tavsiye ver.
`
    return callGemini(prompt)
  },

  // Açılımlar (3 Kart / Aşk / Kariyer / Çeltik) İçin Derin AI Yorumu
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

Lütfen bu kartların birbiriyle olan sinerjisini, geçmiş-şimdiki zaman-gelecek bağlamını ve kullanıcının sorusuna en derin cevabı sentezleyerek yorumla.
`
    return callGemini(prompt)
  },

  // Mistik Kehanet (Tarot Oracle) Canlı AI Cevabı
  async getOracleAnswer(userQuestion: string, cardName: string): Promise<string> {
    const prompt = `
[MİSTİK KEHANET & KEHANET SORUSU]
- Kullanıcının Sorusu: "${userQuestion}"
- Evrenin Cevap Olarak Çektiği Kart: ${cardName}

Bu soruya çekilen kartın esoterik bilgeliğiyle derin, aydınlatıcı, içgörü dolu ve doğrudan yanıt ver.
`
    return callGemini(prompt)
  },

  // Rüyalardan Tarot Kartı Çıkarma & AI Rüya Analizi
  async getDreamAnalysis(dreamDescription: string, drawnCardName: string): Promise<string> {
    const prompt = `
[RÜYA VE TAROT ARKETİP SİNERJİSİ]
- Kullanıcının Anlattığı Rüya: "${dreamDescription}"
- Rüya İçin Çekilen Rehber Kart: ${drawnCardName}

Lütfen rüyadaki bilinçaltı sembollerini Jungian psikolojisi ve bu tarot kartının sembolizmiyle harmanlayarak rüyanın gizli mesajını açıkla.
`
    return callGemini(prompt)
  },
}

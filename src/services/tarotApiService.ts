const API_BASE_URL = 'https://www.sosyalvideoolustur.com.tr/api/cat'

export const tarotApiService = {
  async notifyLogin(userName?: string, platform?: string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/notify_login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          catName: `TarotEdu User: ${userName || 'Mystic Student'}`,
          devicePlatform: platform || 'iOS/Web',
        }),
      })
    } catch (e) {
      console.warn('[TarotApiService] Login notify error:', e)
    }
  },

  async notifyPurchase(packageId: string, price: string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/notify_purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: `TarotEdu PRO: ${packageId}`,
          price,
        }),
      })
    } catch (e) {
      console.warn('[TarotApiService] Purchase notify error:', e)
    }
  },
}

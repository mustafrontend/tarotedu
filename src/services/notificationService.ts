import { Capacitor } from '@capacitor/core'
import { LocalNotifications } from '@capacitor/local-notifications'

export const initializeNotifications = async (): Promise<boolean> => {
  try {
    if (!Capacitor.isNativePlatform()) return false

    const perm = await LocalNotifications.requestPermissions()
    if (perm.display === 'granted') {
      await scheduleDailyTarotReminders()
      return true
    }
    return false
  } catch (error) {
    console.error('[NotificationService] Init error:', error)
    return false
  }
}

export const scheduleDailyTarotReminders = async (): Promise<void> => {
  try {
    if (!Capacitor.isNativePlatform()) return

    const pending = await LocalNotifications.getPending()
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel(pending)
    }

    const now = new Date()
    const target10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0)
    if (target10 < now) target10.setDate(target10.getDate() + 1)

    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1001,
          title: 'Günün Kartı Seni Bekliyor 🔮',
          body: 'Bugünkü mistik rehberliğini almak ve niyetini belirlemek için TarotEdu\'ya göz at!',
          schedule: { at: target10, repeats: true, every: 'day' },
          sound: 'mystic_bell.wav',
        },
      ],
    })
  } catch (error) {
    console.error('[NotificationService] Schedule error:', error)
  }
}

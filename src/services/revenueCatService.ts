import { Capacitor } from '@capacitor/core'
import { Purchases, LOG_LEVEL, PurchasesPackage } from '@revenuecat/purchases-capacitor'
import { tarotApiService } from './tarotApiService'

export const REVENUECAT_API_KEY = 'appl_LGDebvaaUWDibaQSRWAGbbCVpNz'
export const REVENUECAT_ENTITLEMENT_ID = 'pro_access'

export interface PurchaseResult {
  success: boolean
  error?: string
}

export const initializeRevenueCat = async (): Promise<boolean> => {
  try {
    const platform = Capacitor.getPlatform()
    console.log('[RevenueCat] Platform:', platform)

    if (platform === 'ios' || platform === 'android') {
      await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG })
      await Purchases.configure({ apiKey: REVENUECAT_API_KEY })
      console.log('[RevenueCat] Initialized on mobile with token:', REVENUECAT_API_KEY)
      return true
    } else {
      console.log('[RevenueCat] Web mode active')
      return false
    }
  } catch (error) {
    console.error('[RevenueCat] Init error:', error)
    return false
  }
}

export const checkIsProUser = async (): Promise<boolean> => {
  try {
    const customerInfo = await Purchases.getCustomerInfo()
    return customerInfo.customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID] !== undefined
  } catch {
    return false
  }
}

export const purchaseProPackage = async (
  packageId: 'annual' | 'monthly' | 'lifetime'
): Promise<PurchaseResult> => {
  try {
    const platform = Capacitor.getPlatform()
    if (platform !== 'ios' && platform !== 'android') {
      return { success: true } // Web sandbox
    }

    const offerings = await Purchases.getOfferings()
    let availablePackages: PurchasesPackage[] = offerings.current?.availablePackages || []

    if (availablePackages.length > 0) {
      const target =
        availablePackages.find((pkg: PurchasesPackage) =>
          pkg.identifier.toLowerCase().includes(packageId)
        ) || availablePackages[0]

      const { customerInfo } = await Purchases.purchasePackage({ aPackage: target })
      const isSuccess =
        customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID] !== undefined

      if (isSuccess) {
        tarotApiService.notifyPurchase(packageId, target.product?.priceString || 'Standard')
        return { success: true }
      } else {
        return {
          success: false,
          error:
            'Satın alma tamamlandı ancak RevenueCat üzerinde "pro_access" yetkisi aktifleşmedi.',
        }
      }
    }

    const productIdMap = {
      annual: 'com.tarotedu.pro.annual',
      monthly: 'com.tarotedu.pro.monthly',
      lifetime: 'com.tarotedu.pro.lifetime',
    }
    const productId = productIdMap[packageId]

    const { products } = await Purchases.getProducts({ productIdentifiers: [productId] })
    if (products && products.length > 0) {
      const { customerInfo } = await Purchases.purchaseStoreProduct({ product: products[0] })
      const isSuccess =
        customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID] !== undefined
      return isSuccess
        ? { success: true }
        : {
            success: false,
            error: 'Ürün satın alındı fakat pro_access yetkisi tanımlı görünmüyor.',
          }
    }

    return {
      success: false,
      error: `RevenueCat teklif paketi (Offerings) veya ürün bulunamadı. Lütfen RevenueCat panelinden '${productId}' ürününü tanımlayın.`,
    }
  } catch (error: any) {
    console.error('[RevenueCat] Purchase failed:', error)
    const errMessage =
      error?.message || (typeof error === 'string' ? error : JSON.stringify(error))
    return {
      success: false,
      error: `Satın Alma Hatası: ${errMessage}`,
    }
  }
}

export const restoreProPurchases = async (): Promise<PurchaseResult> => {
  try {
    const platform = Capacitor.getPlatform()
    if (platform !== 'ios' && platform !== 'android') {
      return { success: true }
    }

    const { customerInfo } = await Purchases.restorePurchases()
    const isSuccess =
      customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID] !== undefined

    if (isSuccess) {
      return { success: true }
    } else {
      return {
        success: false,
        error:
          'Geçmiş satın alımlar sorgulandı ancak bu Apple ID hesabında aktif bir PRO abonelik bulunamadı.',
      }
    }
  } catch (error: any) {
    console.error('[RevenueCat] Restore failed:', error)
    const errMessage =
      error?.message || (typeof error === 'string' ? error : JSON.stringify(error))
    return {
      success: false,
      error: `Geri Yükleme Hatası: ${errMessage}`,
    }
  }
}

# 💳 TarotEdu PRO — RevenueCat Entegrasyon ve Yapılandırma Rehberi

Bu rehber, **TarotEdu PRO** uygulamasındaki RevenueCat içi satın alım (In-App Purchase) mimarisini Apple App Store Connect ve RevenueCat paneliyle birebir eşlemeniz için hazırlanmıştır.

---

## 🔑 1. Temel Yapılandırma Anahtarları (Project Identifiers)

Uygulamanızdaki sabit kod değerleri aşağıda tanımlanmıştır:

| Parametre | Değer / ID | Açıklama |
| :--- | :--- | :--- |
| **App Bundle ID** | `com.tarotedu.pro.app` | iOS Uygulama Paketi Kimliği |
| **RevenueCat Public API Key** | `appl_KYCMWKtHLpIvVfRoVOlwEOgfuRZ` | `revenueCatService.ts` içindeki API anahtarı |
| **Entitlement ID** | `pro_access` | PRO özelliklerin kilidini açan yetki kimliği |

---

## 📦 2. Ürün ve Paket Kimlikleri (Products & Offerings)

App Store Connect ve RevenueCat panellerinde tanımlanacak 3 ana ürün:

### 1️⃣ Yıllık Üyelik (Annual Subscription)
- **Product ID (App Store Connect)**: `com.tarotedu.pro.annual`
- **Fiyat**: `$19.99 / Yıl` (3 Gün Ücretsiz Deneme opsiyonel)
- **Tür**: Auto-Renewable Subscription (Otomatik Yenilenen Abonelik)
- **RevenueCat Package ID**: `$rc_annual` (veya `annual`)
- **Attached Entitlement**: `pro_access`

### 2️⃣ Aylık Üyelik (Monthly Subscription)
- **Product ID (App Store Connect)**: `com.tarotedu.pro.monthly`
- **Fiyat**: `$4.99 / Ay`
- **Tür**: Auto-Renewable Subscription (Otomatik Yenilenen Abonelik)
- **RevenueCat Package ID**: `$rc_monthly` (veya `monthly`)
- **Attached Entitlement**: `pro_access`

### 3️⃣ Ömür Boyu VIP Paket (Lifetime Access)
- **Product ID (App Store Connect)**: `com.tarotedu.pro.lifetime`
- **Fiyat**: `$39.99` (Tek Seferlik Ödeme)
- **Tür**: Non-Consumable (Tüketilmeyen Tek Seferlik Satın Alım)
- **RevenueCat Package ID**: `$rc_lifetime` (veya `lifetime`)
- **Attached Entitlement**: `pro_access`

---

## 🛠️ 3. RevenueCat Paneli Adım Adım Kurulum Rehberi

### Adım A: App Store Connect Bağlantısı (App Settings)
1. **RevenueCat Dashboard** -> **Projects** -> Uygulamanızı seçin.
2. **Apps** sekmesinden **App Store (iOS)** ekleyin.
3. **App Bundle ID**: `com.tarotedu.pro.app` girin.
4. **App Store Connect API Key** (veya Shared Secret) bilgisini ekleyin.

### Adım B: Entitlement Oluşturma
1. RevenueCat -> **Entitlements** sekmesine gidin.
2. **+ New Entitlement** butonuna basın.
3. **Identifier**: `pro_access` (Tam olarak bu ismi verin).
4. **Description**: `Full TarotEdu PRO Access`.

### Adım C: Ürünleri Ekleme (Products)
1. RevenueCat -> **Products** sekmesine gidin.
2. **+ New Product** butonuna tıklayın:
   - `com.tarotedu.pro.annual`
   - `com.tarotedu.pro.monthly`
   - `com.tarotedu.pro.lifetime`
3. Her üç ürünü de `pro_access` entitlement'ına bağlayın.

### Adım D: Offering & Packages Oluşturma
1. RevenueCat -> **Offerings** sekmesine gidin.
2. **Default Offering** (veya `default`) oluşturun.
3. Altına 3 paket ekleyin:
   - Package: `$rc_annual` -> Product: `com.tarotedu.pro.annual`
   - Package: `$rc_monthly` -> Product: `com.tarotedu.pro.monthly`
   - Package: `$rc_lifetime` -> Product: `com.tarotedu.pro.lifetime`

---

## 🧪 4. Kod Düzeyinde Doğrulama (`revenueCatService.ts`)

Uygulamanız başlatıldığında otomatik olarak RevenueCat'e bağlanır ve satın alımı doğrular:

```typescript
// 1. Başlatma
await initializeRevenueCat() // Uses key: appl_JYVlJKQALPEgHINrBpUgYismGUU

// 2. Satın Alım Çağrısı
await purchaseProPackage('annual')   // com.tarotedu.pro.annual
await purchaseProPackage('monthly')  // com.tarotedu.pro.monthly
await purchaseProPackage('lifetime') // com.tarotedu.pro.lifetime

// 3. Satın Alımları Geri Yükleme
await restoreProPurchases()
```

---

## 🍏 5. App Store Connect In-App Purchase Kurulumu

1. **App Store Connect** -> **Apps** -> `TarotEdu PRO` uygulamasını seçin.
2. Sol menüden **In-App Purchases** sekmesine gidin:
   - **+ Create** -> Select *Non-Consumable* -> Product ID: `com.tarotedu.pro.lifetime` -> Price: Tier 40 ($39.99).
3. **Subscriptions** sekmesine gidin:
   - **+ Create Subscription Group** -> Adı: `TarotEdu PRO Subscriptions`.
   - **Product 1**: `com.tarotedu.pro.annual` -> Price: $19.99 / Yıl.
   - **Product 2**: `com.tarotedu.pro.monthly` -> Price: $4.99 / Ay.
4. Her ürün için **App Store Review Screenshot** (Ödeme ekranının ekran görüntüsü) yükleyin ve kaydedin.

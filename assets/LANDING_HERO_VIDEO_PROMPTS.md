# 🔮 TarotEdu PRO — Ana Sayfa (Landing Page) Sinematik AI Video Prompt Rehberi

Bu doküman, **TarotEdu PRO** Ana Sayfası (Hero Section & Tanıtım Videosu) için özel olarak tasarlanmış **Runway Gen-3 Alpha**, **Luma Dream Machine**, **Kling AI**, **Pika 1.0**, ve **Sora** ile uyumlu sinematik 3B video üretim promptlarını içerir.

---

## 📽️ 1. Hero Arka Plan Döngü Videosu (Seamless Loop Video)

> **Kullanım Yeri:** Ana sayfanın en üstündeki 3D Hero kartında veya web sitesinin arka planında sonsuz döngüde (loop) oynatılacak büyüleyici atmosferik video.

### 🌟 English Prompt (AI Video Üreticisine Birebir Yapıştırın):
```text
A 3D cinematic seamless loop of an ornate golden Rider-Waite tarot card floating above a luminous crystal orb, surrounded by swirling deep purple and violet galaxy nebula, glowing golden astrology runes and sacred geometric patterns floating softly in mid-air, volumetric purple ray lighting, ultra-high resolution 8k, photorealistic 3D render, smooth slow motion, magical ambient atmosphere, cinematic camera slow push in --ar 16:9 --fps 60
```

### 🇹🇷 Türkçe Açıklaması:
- **Konu:** Işıldayan bir kristal kürenin üzerinde süzülen altın süslemeli Tarot kartı.
- **Atmosfer:** Etrafta dönen derin mor nebula, havada süzülen altın astroloji sembolleri ve kutsal geometri.
- **Kamera:** Yavaş ve pürüzsüz yaklaşma (push-in), 60fps akıcı sinematik ışık süzülmeleri.

---

## 🎬 2. Ana Sayfa 15-Saniyelik Sinematik Tanıtım Fragmanı (Hero Trailer)

> **Kullanım Yeri:** Ana sayfada "Tanıtım Videosunu İzle" veya "TarotEdu'yu Keşfet" modalında oynatılacak yüksek enerjili 3D tanıtım videosu.

### 🌟 English Prompt:
```text
Cinematic 3D commercial teaser for a high-end Tarot app: Camera starts inside a dark cosmic void with purple nebula clouds. A golden crystal ball bursts with radiant 528Hz frequency light waves. 5 sacred Rider-Waite tarot cards (The Fool, High Priestess, The Sun, The Magician, The World) gracefully fan out and align into a glowing Celtic Cross spread. Shimmering purple and gold sparks illuminate the screen, cinematic 8k resolution, Unreal Engine 5 render style, dramatic camera orbit, 60fps --ar 16:9
```

### 🇹🇷 Türkçe Açıklaması:
- **Sekans 1 (0-3s):** Kozmik mor bulutların içinde parlayan altın bir kristal küre belirir.
- **Sekans 2 (4-10s):** 5 Kutsal Tarot kartı (The Fool, High Priestess, Sun, Magician, World) yelpaze şeklinde açılır ve Kelt Haçı dizilimine geçer.
- **Sekans 3 (11-15s):** 528Hz ışık dalgaları ve altın kıvılcımlarla muazzam bir kapanış.

---

## 🔮 3. Mobil Uygulama 9:16 Dikey Tanıtım Videosu (Instagram Reels & TikTok & App Store Video)

> **Kullanım Yeri:** Mobil dikey ekranlar, App Store ekran videosu ve sosyal medya reklamları için.

### 🌟 English Prompt:
```text
Vertical 9:16 3D cinematic video: A mystical glowing smartphone floating in dark purple ambient fog, displaying a glowing 3D Tarot card flipping in slow motion. Radiant purple aura glows around the phone, golden astrological constellation lines forming in the background, 8k resolution, hyper-detailed render, cinematic lighting --ar 9:16
```

---

## 🛠️ Tavsiye Edilen AI Video Araçları Ayarları

1. **Runway Gen-3 Alpha / Gen-2**:
   - **Motion:** `3` veya `4` (Dengeli yumuşak hareket)
   - **Camera:** `Pan Up` / `Zoom In` (0.5 yavaşlıkta)
2. **Luma Dream Machine**:
   - **Enhance Prompt:** Enabled
3. **Kling AI**:
   - **Mode:** Professional Mode (1080p, 60fps)

---

## 📁 Dosyayı Projeye Kaydetme

Videoyu ürettikten sonra:
1. Videoyu `tarotedu/public/videos/hero-bg.mp4` olarak kaydedin.
2. `HomePageView.tsx` içindeki Hero bileşenine `<video autoPlay loop muted playsInline>` etiketi ile ekleyebilirsiniz!

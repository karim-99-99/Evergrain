# إعداد مفتاح Google Drive API | Google Drive API Setup

دليل خطوة بخطوة لإنشاء مفتاح API لعرض الصور والفيديوهات من Google Drive بشكل موثوق في جميع المتصفحات.

---

## الخطوة 1: إنشاء مشروع في Google Cloud

1. افتح [Google Cloud Console](https://console.cloud.google.com/)
2. سجّل الدخول بحساب Google
3. انقر على القائمة المنسدلة للمشروع (أعلى الصفحة) → **New Project**
4. أدخل اسم المشروع (مثل: `evergrain`) واضغط **Create**

---

## الخطوة 2: تفعيل Google Drive API

1. من القائمة الجانبية: **APIs & Services** → **Library**
2. ابحث عن **Google Drive API**
3. انقر على **Google Drive API** ثم **Enable**

---

## الخطوة 3: إنشاء مفتاح API

1. من القائمة: **APIs & Services** → **Credentials**
2. انقر **+ Create Credentials** → **API key**
3. سيظهر مفتاحك — انسخه واحفظه في مكان آمن
4. (اختياري) انقر **Restrict Key** للأمان:
   - **API restrictions** → اختر **Restrict key**
   - اختر **Google Drive API** فقط
   - احفظ التغييرات

---

## الخطوة 4: إضافة المفتاح في Vercel (مهم لـ Safari)

1. افتح [Vercel Dashboard](https://vercel.com/dashboard) → مشروعك
2. **Settings** → **Environment Variables**
3. أضف متغير جديد:
   - **Name:** `GOOGLE_DRIVE_API_KEY`
   - **Value:** المفتاح الذي نسخته
   - **Environment:** Production (و Preview إن أردت)
4. احفظ واضغط **Redeploy** لإعادة النشر

---

## الخطوة 5: إعادة النشر

بعد إضافة المتغير في Vercel، اضغط **Redeploy** على آخر deployment.

---

## ملاحظات مهمة

- **المشاركة:** تأكد أن ملفات Google Drive مضبوطة على "أي شخص لديه الرابط"
- **اسم المتغير:** استخدم `GOOGLE_DRIVE_API_KEY` (بدون VITE_) — يُستخدم في الخادم فقط
- **الأمان:** لا تشارك مفتاح API أو ترفعه على GitHub
- **Proxy:** الصور والفيديوهات تُحمّل عبر `/api/drive-proxy` على نفس النطاق — يعمل في Safari وكل المتصفحات

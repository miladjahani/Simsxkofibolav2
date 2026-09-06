# SimSXEWCu Pro v7.0 ⚡ | پلتفرم صنعتی شبیه‌سازی مدار استخراج حلالی و الکترووینینگ مس
### Enterprise Copper Solvent Extraction & Electrowinning Simulation Platform

[![PWA Ready](https://img.shields.io/badge/PWA-Installable-emerald?style=for-the-badge&logo=pwa)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Google Style UI](https://img.shields.io/badge/UI-Google%20Workspace%20Style-blue?style=for-the-badge&logo=google)](https://workspace.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-cyan?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-teal?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📖 معرفی سامانه صنعتی (Industrial Platform Overview)

نرم‌افزار **SimSXEWCu Pro v7.0** یک پلتفرم جامع، سازمانی و کامپیوتر/موبایل‌محور بر مبنای طراحی **Google Workspace** است که برای شبیه‌سازی دقیق و صنعتی مدار استخراج حلالی و الکترووینینگ مس (Copper SX-EW) توسعه داده شده است.

این نرم‌افزار پیاده‌سازی کامل و همگرای مدل متالورژیکی **مهندس جوزف کافومبیلا (Joseph Kafumbila, 2026)** است که برخلاف فایل‌های اکسل نیازی به اجرای دستی Solver ندارد و امکان تعریف سناریوها و سکشن‌های دلخواه را به کاربر می‌دهد.

---

### 🌟 قابلیت‌های ویژه و نوآوری‌های طراحی

1. **معماری مدیریت چندسکشنی سبک گوگل (Multi-Section / Tabbed Project Workspace):**
   * کاربر مقید به داده‌های پیش‌فرض نیست؛ می‌تواند سکشن‌های کاری کاملاً خام ایجاد کرده و داده‌های کارخانه خود را وارد کند.
   * امکان ایجاد چندین مطالعه موردی همزمان (مانند تب‌های Google Sheets) و سوییچ سریع بین آنها.
   * ذخیره‌سازی خودکار در حافظه مرورگر (`localStorage`) بدون خطر از دست رفتن اطلاعات.
   * تغییر نام سکشن، کپی کردن (Duplicate) و حذف با یک کلیک.

2. **مرکز جامع راهنما و دانش فنی از صفر تا صد (0 to 100 Live Knowledge Center):**
   * **راهنمای گام‌به‌گام کاربری:** آموزش کامل مراحل طراحی مدار، ورود داده و تحلیل خروجی‌ها.
   * **فرهنگ جامع پارامترها:** تشریح تک‌تک متغیرها شامل تعریف مفهومی، دامنه معمول در کارخانجات مس، اهمیت متالورژیکی، و پیامدهای بالا یا پایین بودن غلظت یا دبی.
   * **راهنمای سناریوهای ده‌گانه (A1 تا E2):** تحلیل اقتصادی، فنی و ریسک‌های هر آرایش فرایندی.
   * **مبانی تئوری و معادلات مهندسی:** استناد به مقالات ۲۰۱۷ تا ۲۰۲۶، ترمودینامیک Lix984N و موازنه ردوکس $Mn/Fe$.
   * **راهنمای زنده روی تمام فیلدها:** آیکون راهنما روی تمامی ورودی‌ها برای مشاهده توضیحات سریع.

3. **ارگونومی و بهینه‌سازی پیشرفته برای گوشی و ویندوز (Mobile-First Ergonomics):**
   * نوار ناوبری پایین صفحه (Bottom Navigation Bar) اختصاصی برای مرورگرهای موبایل و محیط Termux.
   * فیلدهای ورودی بهینه‌شده با کیبورد عددی (`inputMode="decimal"`) جهت تایپ سریع داده‌های آزمایشگاهی و پایش سایت.
   * بدون باگ، بدون صفحه سفید و با اعتبارسنجی زنده داده‌ها.

4. **پوشش ۱۰ مدار صنعتی با آرایش‌های متنوع:**
   * مدارهای پایه بدون شستشو (A1, A2) با و بدون بازچرخانی بلید به استخراج
   * شستشوی فاز آلی در لندر ستلر E1 (B1, B2)
   * میکسر-ستلر شستشو با آب خام O/A=50 (C1, C2)
   * اسکرابینگ انتخابی آهن فریک با آب اسیدی (D1, D2)
   * اسکرابینگ بهینه با بلید رقیق‌شده الکترووینینگ (E1, E2)
   * آرایش‌های ۲Ex۱S، ۳Ex۱S، ExPx۱S، ۲Ex۲S، ۳Ex۲S و غیره.

5. **خروجی‌های حرفه‌ای و صنعتی:**
   * چاپ گزارش فنی رسمی مهندسی متالورژی (Print / Save as PDF).
   * خروجی کامل جدول موازنه جریان‌ها با فرمت CSV اکسل.
   * ذخیره و بازیابی کل پروژه با فرمت JSON.

---

## 🚀 راهنمای سریع راه‌اندازی و استقرار

### ۱. استقرار در GitHub Pages (خودکار با GitHub Actions)
فایل آماده گردش‌کار در مسیر `.github/workflows/deploy-gh-pages.yml` قرار دارد. پس از استخراج و Push به گیت‌هاب:
1. در پنل گیت‌هاب به مسیر **Settings > Pages** بروید.
2. گزینه **Source** را روی **GitHub Actions** بگذارید.

### ۲. اجرا در محیط Termux اندروید
```bash
chmod +x setup-termux.sh
./setup-termux.sh
```

### ۳. استقرار سریع از طریق اسکریپت ترمینال
```bash
chmod +x deploy-github.sh
./deploy-github.sh https://github.com/USERNAME/REPO_NAME.git
```

---

## 📄 لایسنس
توسعه‌یافته تحت مجوز MIT.

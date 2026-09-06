#!/bin/bash
# SimSXEWCu Pro v7.0 - Quick GitHub Push & Deploy Script
echo "=========================================================="
echo " ⚡ SimSXEWCu Pro v7.0 | استقرار خودکار در GitHub Pages "
echo "=========================================================="

if [ -z "" ]; then
  echo "لطفاً آدرس مخزن گیت‌هاب را وارد کنید:"
  echo "(مثال: https://github.com/username/copper-sxew-sim.git)"
  read -p "آدرس مخزن (Repo URL): " REPO_URL
else
  REPO_URL=""
fi

if [ -z "" ]; then
  echo "❌ آدرس مخزن وارد نشد. عملیات لغو گردید."
  exit 1
fi

echo "🔧 تنظیم شاخه اصلی به main..."
git branch -M main

echo "🔗 اتصال به مخزن گیت‌هاب ()..."
git remote remove origin 2>/dev/null
git remote add origin ""

echo "📦 ثبت آخرین تغییرات..."
git add .
git commit -m "feat: SimSXEWCu Pro v7.0 complete production codebase" 2>/dev/null || true

echo "🚀 در حال ارسال به گیت‌هاب (git push -u origin main)..."
git push -u origin main

echo ""
echo "=========================================================="
echo "✅ با موفقیت به گیت‌هاب ارسال شد!"
echo "📌 جهت انتشار در GitHub Pages:"
echo "   1. وارد مخزن در گیت‌هاب شوید."
echo "   2. به بخش Settings > Pages بروید."
echo "   3. در قسمت Build and deployment، گزینه Source را روی 'GitHub Actions' بگذارید."
echo "   4. پس از ۱ دقیقه، برنامه شما در اینترنت منتشر خواهد شد."
echo "=========================================================="

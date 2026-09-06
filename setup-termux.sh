#!/bin/bash
# SimSXEWCu Pro v7.0 - Termux Setup & Run Script
echo "=========================================================="
echo " ⚡ SimSXEWCu Pro v7.0 | راه‌اندازی شبیه‌ساز مس در Termux "
echo "=========================================================="

pkg update -y && pkg install -y nodejs git

echo "📦 در حال نصب پکیج‌های پروژه..."
npm install

echo "🚀 در حال اجرای سرور توسعه Vite..."
echo "📍 آدرس محلی در مرورگر: http://localhost:5173"
npm run dev -- --host

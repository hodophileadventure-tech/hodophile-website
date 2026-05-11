# Hostinger Deployment Script (Windows)
# Run this after setting MONGODB_URL environment variable

Write-Host "🚀 Starting Hostinger deployment..." -ForegroundColor Green
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install

Write-Host "🔨 Building Next.js..." -ForegroundColor Blue
npm run build

Write-Host "🗄️ Pushing Prisma schema to MongoDB..." -ForegroundColor Blue
npm run db:push

Write-Host "🌱 Seeding database..." -ForegroundColor Blue
npm run db:seed

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🎯 Start the app with: npm start" -ForegroundColor Cyan

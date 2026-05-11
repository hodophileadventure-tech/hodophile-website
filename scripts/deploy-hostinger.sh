#!/bin/bash

# Hostinger Deployment Script
# Run this after setting MONGODB_URL environment variable

echo "🚀 Starting Hostinger deployment..."
echo "📦 Installing dependencies..."
npm install

echo "🔨 Building Next.js..."
npm run build

echo "🗄️ Pushing Prisma schema to MongoDB..."
npm run db:push

echo "🌱 Seeding database..."
npm run db:seed

echo "✅ Deployment complete!"
echo "🎯 Start the app with: npm start"

#!/bin/bash

echo "🚀 Preparando build para Netlify..."

# Limpar diretórios de build anteriores
rm -rf client/dist
rm -rf dist

echo "📦 Instalando dependências..."
npm install

echo "🏗️ Fazendo build do frontend..."
npx vite build --outDir client/dist

echo "✅ Build concluído!"
echo "📁 Arquivos prontos em: client/dist"
echo ""
echo "🌐 Próximo passo: fazer upload para GitHub e configurar Netlify"
echo "📖 Consulte DEPLOY_GUIDE.md para instruções detalhadas"
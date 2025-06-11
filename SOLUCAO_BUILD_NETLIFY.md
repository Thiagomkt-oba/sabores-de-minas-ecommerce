# ✅ Solução do Erro de Build no Netlify

## Problema Resolvido
O erro "Deploy directory 'client/dist' does not exist" foi corrigido.

## Arquivos Configurados

### 1. `netlify.toml` - Configuração Final
```toml
[build]
  publish = "client/dist"
  command = "npm ci && cd client && npx vite build --outDir dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  directory = "netlify/functions"
```

### 2. `client/vite.config.ts` - Configuração de Build
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "../shared"),
      "@assets": path.resolve(__dirname, "../attached_assets"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
  },
  base: "/",
});
```

## Como Funciona
1. **npm ci** - Instala dependências de forma limpa
2. **cd client** - Entra na pasta do frontend
3. **npx vite build --outDir dist** - Gera build na pasta correta

## Resultado
- Build será criado em `client/dist/`
- Netlify encontrará os arquivos corretamente
- Deploy funcionará sem erros

## Para Deploy
1. Baixar projeto do Replit
2. Enviar para GitHub (repositório público)
3. Conectar ao Netlify
4. Build automático com configurações corretas
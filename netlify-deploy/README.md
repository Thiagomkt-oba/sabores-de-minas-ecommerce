# Sabores de Minas - Deploy Netlify

Este é o projeto preparado para deploy no Netlify com todas as configurações necessárias.

## Estrutura do Projeto

- `src/` - Código fonte do frontend React
- `public/` - Arquivos estáticos
- `netlify/functions/` - Funções serverless para APIs
- `netlify.toml` - Configuração do Netlify

## Configuração no Netlify

1. **Build Settings:**
   - Build command: `cd netlify-deploy && npm install && npm run build`
   - Publish directory: `netlify-deploy/dist`

2. **Environment Variables necessárias:**
   - `FOR4PAYMENTS_API_KEY` - Chave da API For4Payments
   - `UTMIFY_API_TOKEN` - Token da API Utmify

3. **Functions:**
   - `/.netlify/functions/create-pix-payment` - Cria pagamentos PIX
   - `/.netlify/functions/webhook-for4payments` - Webhook para confirmações

## Funcionalidades

- ✅ Frontend React otimizado para produção
- ✅ Integração com For4Payments para PIX
- ✅ Tracking Utmify para conversões
- ✅ Validação de CEP via ViaCEP
- ✅ Formulário responsivo
- ✅ Componentes UI customizados

## Deploy

1. Conecte seu repositório ao Netlify
2. Configure as variáveis de ambiente
3. O deploy será automático a cada push

## Tecnologias

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Netlify Functions
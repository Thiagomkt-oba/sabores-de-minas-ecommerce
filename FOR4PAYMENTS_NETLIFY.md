# Configurar For4Payments no Netlify

## Passo a Passo

### 1. Obter Chave da API For4Payments
1. Acesse seu painel For4Payments
2. Vá em "Configurações" → "API"
3. Copie sua chave de API

### 2. Configurar no Netlify
1. Acesse seu site no Netlify
2. Vá em "Site settings" → "Environment variables"
3. Clique "Add variable"
4. Configure:
   - **Nome**: `FOR4PAYMENTS_API_KEY`
   - **Valor**: Cole sua chave aqui

### 3. Redeploy
1. Vá em "Deploys"
2. Clique "Trigger deploy" → "Clear cache and deploy site"
3. Aguarde o build completar

### 4. Testar PIX
1. Acesse seu site
2. Adicione produtos ao carrinho
3. Preencha dados do checkout
4. Clique em "Gerar PIX"

## Logs de Debug
A função agora inclui logs detalhados que aparecerão no Functions log do Netlify para facilitar o troubleshooting.

## Webhook (Para receber confirmações)
Configure no For4Payments:
- URL: `https://seu-site.netlify.app/.netlify/functions/webhook-for4payments`

A função foi otimizada especificamente para For4Payments com tratamento adequado de erros e logs para facilitar o debug.
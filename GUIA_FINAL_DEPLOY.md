# Deploy no Netlify - Guia Final

## Problema Resolvido
O erro "Deploy directory 'client/dist' does not exist" foi corrigido com as configurações atualizadas.

## Passos para Deploy

### 1. Preparar Projeto
- Baixar projeto do Replit (Download as zip)
- Extrair arquivos no computador
- Remover: `node_modules/`, `.replit`, `replit.nix`, `.local/`

### 2. Enviar para GitHub
- Criar repositório público no GitHub
- Fazer upload de todos os arquivos
- Confirmar commit

### 3. Deploy no Netlify
**Configurações automáticas já prontas:**
- Build command: `npm ci && cd client && npx vite build --outDir dist`
- Publish directory: `client/dist`
- Node version: 18

**Conectar ao Netlify:**
1. Login com GitHub
2. Selecionar repositório
3. Deploy automático

### 4. Configurar APIs
**Variáveis necessárias no Netlify:**
- `MERCADOPAGO_ACCESS_TOKEN`
- `MERCADOPAGO_PUBLIC_KEY`
- `NODE_ENV=production`

**Webhook URL:**
`https://seu-site.netlify.app/.netlify/functions/webhook-for4payments`

## Funcionalidades Prontas
- Carrinho de compras completo
- Checkout com validação
- Geração de PIX automática
- Webhook para confirmação
- API de CEP integrada
- Functions serverless configuradas

## APIs Recomendadas
**Mercado Pago** (gratuito até 1.000 transações)
- Site: mercadopago.com.br/developers
- Documentação completa
- Ambiente sandbox para testes

Seu e-commerce estará funcionando em produção após seguir estes passos.
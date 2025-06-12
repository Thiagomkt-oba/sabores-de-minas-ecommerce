# Como Configurar Pagamento PIX no Netlify

## O Problema
A função está retornando erro 400 porque não há credenciais de API configuradas no Netlify.

## Solução: Configurar Mercado Pago

### Passo 1: Criar Conta no Mercado Pago
1. Acesse: https://www.mercadopago.com.br/developers
2. Crie uma conta gratuita
3. Acesse "Suas integrações" → "Criar aplicação"
4. Escolha "Pagamentos online"

### Passo 2: Obter Credenciais
1. No painel do Mercado Pago
2. Vá em "Credenciais"
3. Copie o "Access Token" (teste primeiro, depois produção)

### Passo 3: Configurar no Netlify
1. Acesse seu site no Netlify
2. Vá em "Site settings" → "Environment variables"
3. Clique "Add variable"
4. Adicione:
   - **Nome**: `MERCADOPAGO_ACCESS_TOKEN`
   - **Valor**: Cole seu Access Token aqui

### Passo 4: Fazer Redeploy
1. No Netlify, vá em "Deploys"
2. Clique "Trigger deploy" → "Clear cache and deploy site"
3. Aguarde alguns minutos

## Teste de Funcionamento

### Credenciais de Teste (Sandbox)
Use estas para testar:
- Access Token de teste: `TEST-xxx...`
- Cartões de teste disponíveis na documentação

### Produção
Quando estiver funcionando, troque para:
- Access Token de produção: `APP_USR-xxx...`

## Webhook (Opcional)
Para receber notificações de pagamento:
1. No Mercado Pago, configure webhook
2. URL: `https://seu-site.netlify.app/.netlify/functions/webhook-for4payments`

## Custos
- Mercado Pago: 2,39% por transação PIX
- Primeiras 1.000 transações gratuitas
- Sem taxa mensal

Após configurar, o PIX funcionará corretamente no seu site.
# Solução Rápida para Erro PIX

## Problema Identificado
O erro 400 ocorre porque as credenciais de pagamento não estão configuradas no Netlify.

## Solução Imediata

### 1. Obter Credenciais do Mercado Pago
- Acesse: mercadopago.com.br/developers
- Crie conta gratuita
- Vá em "Credenciais" 
- Copie o "Access Token de teste"

### 2. Configurar no Netlify
- Site settings → Environment variables
- Adicionar variável:
  - Nome: `MERCADOPAGO_ACCESS_TOKEN`
  - Valor: seu access token

### 3. Redeploy
- Deploys → Trigger deploy → Clear cache and deploy site

## Resultado
Após configurar, o PIX funcionará normalmente gerando códigos QR válidos para pagamento.

## Custos
- Teste: gratuito
- Produção: 2,39% por transação
- Sem mensalidade

A função foi corrigida com tratamento de erros adequado e suporte ao Mercado Pago.
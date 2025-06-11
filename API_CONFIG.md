# 🔌 Configuração de APIs para Produção

## 1. APIs Necessárias para o Projeto

### **API de Pagamento PIX**
Seu projeto precisa de uma API de pagamento para gerar códigos PIX. Recomendações:

#### **Mercado Pago (Recomendado)**
- **Site**: https://www.mercadopago.com.br/developers
- **Gratuito**: Até 1.000 transações/mês
- **Taxa**: 2,39% por transação
- **Sandbox**: Sim, para testes

#### **Asaas**
- **Site**: https://www.asaas.com
- **Gratuito**: Até 10 transações/mês
- **Taxa**: A partir de 1,69%
- **Sandbox**: Sim

#### **PagSeguro**
- **Site**: https://dev.pagseguro.uol.com.br
- **Taxa**: A partir de 2,39%
- **Sandbox**: Sim

### **API de CEP**
- **ViaCEP**: Gratuita, já integrada no projeto
- **URL**: https://viacep.com.br/ws/{cep}/json/

## 2. Variáveis de Ambiente Necessárias

### Para Netlify Functions:
```
PAYMENT_API_KEY=sua_chave_da_api
PAYMENT_WEBHOOK_SECRET=seu_segredo_webhook
PAYMENT_API_URL=https://api.mercadopago.com/v1
NODE_ENV=production
```

## 3. Como Obter as Chaves da API

### **Mercado Pago (Exemplo)**
1. Acesse https://www.mercadopago.com.br/developers
2. Crie uma conta de desenvolvedor
3. Crie uma aplicação
4. Copie suas credenciais:
   - `Access Token` (para produção)
   - `Public Key` (para frontend)
   - `Webhook Secret` (para validar notificações)

## 4. Configurar Webhooks

### URL do Webhook (após deploy):
```
https://seu-site.netlify.app/.netlify/functions/webhook-for4payments
```

### Eventos para Configurar:
- `payment.created`
- `payment.updated` 
- `payment.approved`
- `payment.cancelled`

## 5. Testar APIs

### Ambiente de Sandbox:
1. Use as credenciais de teste
2. Faça transações de teste
3. Valide se os webhooks funcionam

### Ambiente de Produção:
1. Troque para credenciais de produção
2. Configure URLs de produção
3. Teste com transações reais (valores baixos)
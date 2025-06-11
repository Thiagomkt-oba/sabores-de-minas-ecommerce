# ✅ Checklist de Deploy - GitHub + Netlify

## **Antes de Começar**
- [ ] Projeto funcionando no Replit
- [ ] Conta no GitHub criada
- [ ] Conta no Netlify criada

## **1. Preparar Projeto**
- [ ] Baixar projeto do Replit (Download as zip)
- [ ] Extrair arquivos no computador
- [ ] Remover pasta `node_modules/`
- [ ] Remover pasta `.replit`
- [ ] Remover arquivo `replit.nix`
- [ ] Remover pasta `.local/`

## **2. GitHub**
- [ ] Criar novo repositório no GitHub
- [ ] Marcar como **público** (importante para Netlify gratuito)
- [ ] Fazer upload dos arquivos do projeto
- [ ] Confirmar que todos os arquivos foram enviados

## **3. Configurar API de Pagamento**
- [ ] Escolher gateway de pagamento (Mercado Pago, Asaas, PagSeguro)
- [ ] Criar conta de desenvolvedor
- [ ] Obter credenciais da API
- [ ] Configurar webhook URL (será feito após deploy)

## **4. Deploy no Netlify**
- [ ] Acessar netlify.com
- [ ] Fazer login com GitHub
- [ ] Clicar em "New site from Git"
- [ ] Selecionar seu repositório
- [ ] Configurar build settings:
  - Build command: `npm run build`
  - Publish directory: `client/dist`
- [ ] Adicionar variáveis de ambiente:
  - `PAYMENT_API_KEY`
  - `PAYMENT_WEBHOOK_SECRET`
  - `NODE_ENV=production`
- [ ] Fazer deploy

## **5. Pós-Deploy**
- [ ] Testar se o site abre
- [ ] Testar carrinho de compras
- [ ] Testar formulário de CEP
- [ ] Configurar webhook na API de pagamento
- [ ] Testar pagamento PIX (sandbox)
- [ ] Configurar domínio personalizado (opcional)

## **6. Testes Finais**
- [ ] Adicionar produto ao carrinho
- [ ] Preencher dados de checkout
- [ ] Gerar código PIX
- [ ] Receber notificação de webhook
- [ ] Confirmar pagamento

## **URLs Importantes**
- **Site no Netlify**: https://SEU-SITE.netlify.app
- **Webhook URL**: https://SEU-SITE.netlify.app/.netlify/functions/webhook-for4payments
- **Repositório GitHub**: https://github.com/SEU-USUARIO/SEU-REPOSITORIO

## **Contatos de Suporte**
- **Netlify**: https://docs.netlify.com
- **Mercado Pago**: https://www.mercadopago.com.br/developers
- **GitHub**: https://docs.github.com
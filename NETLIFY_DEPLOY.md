# 🚀 Deploy no Netlify - Guia Completo

## Passo 1: Preparar o Projeto

### 1.1 Baixar do Replit
1. No Replit, clique nos 3 pontinhos → "Download as zip"
2. Extraia o arquivo no seu computador
3. Remova estas pastas/arquivos:
   - `node_modules/`
   - `.replit`
   - `replit.nix`
   - `.local/`

## Passo 2: Enviar para GitHub

### 2.1 Criar Repositório
1. Acesse https://github.com/new
2. Nome do repositório: `seu-ecommerce`
3. **IMPORTANTE**: Marque como "Public" (necessário para Netlify gratuito)
4. Clique "Create repository"

### 2.2 Upload dos Arquivos
1. Na página do repositório, clique "uploading an existing file"
2. Arraste todos os arquivos do projeto
3. Commit message: "Deploy inicial"
4. Clique "Commit changes"

## Passo 3: Deploy no Netlify

### 3.1 Conectar GitHub
1. Acesse https://netlify.com
2. Clique "Sign up" → Entre com GitHub
3. Clique "New site from Git"
4. Selecione "GitHub"
5. Escolha seu repositório

### 3.2 Configurações de Build
**Branch to deploy**: `main`
**Build command**: `npm install && npx vite build --config vite.config.netlify.ts --outDir client/dist`
**Publish directory**: `client/dist`

### 3.3 Variáveis de Ambiente
Clique "Advanced build settings" e adicione:
- `NODE_VERSION`: `18`
- `NODE_ENV`: `production`

### 3.4 Deploy
1. Clique "Deploy site"
2. Aguarde 3-5 minutos
3. Seu site estará em: `https://random-name-123.netlify.app`

## Passo 4: Configurar APIs

### 4.1 Obter API de Pagamento
**Recomendado: Mercado Pago**
1. Acesse https://www.mercadopago.com.br/developers
2. Crie uma conta
3. Vá em "Suas integrações" → "Criar aplicação"
4. Copie suas credenciais:
   - Access Token (produção)
   - Public Key (produção)

### 4.2 Adicionar Credenciais no Netlify
1. No painel do Netlify: Site settings → Environment variables
2. Adicione:
   - `MERCADOPAGO_ACCESS_TOKEN`: seu_access_token
   - `MERCADOPAGO_PUBLIC_KEY`: sua_public_key

### 4.3 Configurar Webhook
1. No Mercado Pago, vá em "Webhooks"
2. URL do webhook: `https://seu-site.netlify.app/.netlify/functions/webhook-for4payments`
3. Eventos: `payment`, `merchant_order`

## Passo 5: Testes

### 5.1 Testar Site
- [ ] Site carrega
- [ ] Produtos aparecem
- [ ] Carrinho funciona
- [ ] CEP funciona

### 5.2 Testar Pagamento
- [ ] Gerar PIX (use ambiente sandbox primeiro)
- [ ] Receber webhook
- [ ] Status do pagamento atualiza

## URLs Importantes Após Deploy

- **Site**: https://seu-site.netlify.app
- **Webhook**: https://seu-site.netlify.app/.netlify/functions/webhook-for4payments
- **Admin Netlify**: https://app.netlify.com/sites/seu-site

## Solução de Problemas

### Build Falhando?
1. Verifique se `vite.config.netlify.ts` existe
2. Confirme se `netlify.toml` está correto
3. Verifique logs de build no Netlify

### Funções não Funcionam?
1. Verifique se pasta `netlify/functions/` existe
2. Confirme variáveis de ambiente
3. Teste webhooks com ngrok localmente primeiro

### Site em Branco?
1. Verifique se build gerou arquivos em `client/dist`
2. Confirme publish directory: `client/dist`
3. Verifique console do browser para erros

## Próximos Passos

1. Configure domínio personalizado (opcional)
2. Configure SSL (automático no Netlify)
3. Configure analytics
4. Monitore logs de erro

Seu e-commerce estará funcionando em poucos minutos!
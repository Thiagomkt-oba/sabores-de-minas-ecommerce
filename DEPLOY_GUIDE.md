# 🚀 Guia Completo de Deploy - GitHub + Netlify

## 📋 Passo a Passo Detalhado

### **1. Preparar o Projeto para GitHub**

#### 1.1 Baixar o Projeto do Replit
1. No Replit, clique nos 3 pontinhos no canto superior direito
2. Selecione "Download as zip"
3. Extraia o arquivo zip em seu computador

#### 1.2 Limpar o Projeto
Remova estes arquivos/pastas antes de enviar para GitHub:
```
node_modules/
.replit
replit.nix
.local/
dist/
client/dist/
```

### **2. Enviar para GitHub**

#### 2.1 Criar Repositório no GitHub
1. Acesse https://github.com
2. Clique em "New repository"
3. Nomeie seu repositório (ex: `meu-ecommerce`)
4. Deixe como **público** (importante para Netlify gratuito)
5. Clique em "Create repository"

#### 2.2 Fazer Upload dos Arquivos
**Opção A - Interface Web (Mais Fácil):**
1. Na página do seu novo repositório
2. Clique em "uploading an existing file"
3. Arraste todos os arquivos do projeto (exceto os listados no item 1.2)
4. Adicione uma mensagem: "Initial commit"
5. Clique em "Commit changes"

**Opção B - Git Command Line:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

### **3. Configurar APIs para Produção**

#### 3.1 Preparar Variáveis de Ambiente
Você precisará configurar estas variáveis no Netlify:

**Para Payment API (PIX):**
- `PAYMENT_API_KEY`: Sua chave da API de pagamento
- `PAYMENT_API_URL`: URL da API de pagamento
- `WEBHOOK_SECRET`: Segredo para validar webhooks

**Para CEP API:**
- Usa API pública do ViaCEP (sem necessidade de chave)

#### 3.2 Atualizar URLs da API
No código, você precisará alterar as URLs das APIs de localhost para as URLs de produção.

### **4. Deploy no Netlify**

#### 4.1 Conectar GitHub ao Netlify
1. Acesse https://netlify.com
2. Clique em "Sign up" e faça login com GitHub
3. Após login, clique em "New site from Git"
4. Selecione "GitHub" como provedor
5. Escolha seu repositório da lista

#### 4.2 Configurar Build Settings
**Build Command:** `npm run build`
**Publish Directory:** `client/dist`
**Node Version:** `18`

#### 4.3 Configurar Environment Variables
1. No painel do Netlify, vá em "Site settings"
2. Clique em "Environment variables"
3. Adicione suas variáveis de ambiente:
   - `PAYMENT_API_KEY`
   - `PAYMENT_API_URL`
   - `WEBHOOK_SECRET`

#### 4.4 Deploy
1. Clique em "Deploy site"
2. Aguarde o build completar (3-5 minutos)
3. Seu site estará disponível em uma URL como: `https://seu-site.netlify.app`

### **5. Configurar Domain Personalizado (Opcional)**

#### 5.1 No Netlify
1. Vá em "Site settings" > "Domain management"
2. Clique em "Add custom domain"
3. Digite seu domínio (ex: `meusite.com`)

#### 5.2 Configurar DNS
No seu provedor de domínio, configure:
- **Tipo A**: `185.199.108.153`
- **Tipo A**: `185.199.109.153`
- **Tipo A**: `185.199.110.153`
- **Tipo A**: `185.199.111.153`

### **6. Conectar APIs de Terceiros**

#### 6.1 API de Pagamento PIX
Você precisará:
1. Contratar um gateway de pagamento (Mercado Pago, PagSeguro, etc.)
2. Obter as credenciais da API
3. Configurar webhooks para receber notificações
4. Atualizar o código para usar as URLs de produção

#### 6.2 Exemplos de Gateways Populares:

**Mercado Pago:**
- Site: https://www.mercadopago.com.br/developers
- Documentação: https://www.mercadopago.com.br/developers/pt/docs

**PagSeguro:**
- Site: https://dev.pagseguro.uol.com.br
- Documentação: https://dev.pagseguro.uol.com.br/docs

**Asaas:**
- Site: https://www.asaas.com
- Documentação: https://docs.asaas.com

### **7. Testar em Produção**

#### 7.1 Checklist de Testes
- [ ] Site carrega corretamente
- [ ] Carrinho de compras funciona
- [ ] Formulário de checkout funciona
- [ ] API de CEP funciona
- [ ] Geração de PIX funciona (em ambiente de sandbox)
- [ ] Webhooks recebem notificações

#### 7.2 Monitoramento
- Use as ferramentas de analytics do Netlify
- Configure Google Analytics se necessário
- Monitore os logs de erro

### **8. Atualizações Futuras**

Para fazer alterações:
1. Edite os arquivos localmente
2. Commit e push para GitHub:
   ```bash
   git add .
   git commit -m "Descrição da alteração"
   git push
   ```
3. Netlify fará deploy automaticamente

---

## 🔧 Arquivos Importantes Criados

### `netlify.toml`
```toml
[build]
  publish = "client/dist"
  command = "npm run build"

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
```

### `netlify/functions/` (Funções Serverless)
- `create-pix-payment.js`: Criar pagamentos PIX
- `webhook-for4payments.js`: Receber notificações de pagamento

---

## 💡 Dicas Importantes

1. **Sempre teste em ambiente de desenvolvimento primeiro**
2. **Use variáveis de ambiente para dados sensíveis**
3. **Configure HTTPS (Netlify faz automaticamente)**
4. **Faça backup regular do código**
5. **Monitore os logs de erro constantemente**

## 📞 Próximos Passos

1. Baixe o projeto do Replit
2. Crie o repositório no GitHub
3. Configure as APIs de pagamento
4. Deploy no Netlify
5. Teste tudo em produção

Qualquer dúvida durante o processo, pode perguntar!
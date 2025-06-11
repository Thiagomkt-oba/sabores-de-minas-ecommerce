# Sabores de Minas - E-commerce

E-commerce completo para venda de manteigas artesanais com integração PIX e tracking de conversões.

## 🚀 Funcionalidades

- ✅ Catálogo de produtos responsivo
- ✅ Carrinho de compras interativo
- ✅ Checkout com PIX real (For4Payments)
- ✅ Tracking de conversões (Utmify)
- ✅ Validação de CEP automática (ViaCEP)
- ✅ Formulários com validação
- ✅ Interface moderna com Tailwind CSS
- ✅ Deploy pronto para Netlify

## 🛠 Tecnologias

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS + Shadcn/UI
- Vite
- React Hook Form + Zod
- Framer Motion

**Backend:**
- Node.js + Express
- TypeScript
- Drizzle ORM

**Integrações:**
- For4Payments (PIX)
- Utmify (Tracking)
- ViaCEP (Endereços)

## 📦 Estrutura do Projeto

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── context/        # Context API
│   │   ├── hooks/          # Hooks customizados
│   │   └── types/          # Tipos TypeScript
├── server/                 # Backend Express
├── netlify-deploy/         # Versão para Netlify
├── netlify/functions/      # Funções serverless
└── shared/                 # Schemas compartilhados
```

## 🔧 Configuração Local

1. **Clone o repositório:**
```bash
git clone [URL_DO_REPOSITORIO]
cd sabores-de-minas
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite com suas chaves de API
FOR4PAYMENTS_API_KEY=sua_chave_for4payments
UTMIFY_API_TOKEN=seu_token_utmify
```

4. **Execute o projeto:**
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5000`

## 🌐 Deploy no Netlify

1. **Configure as variáveis de ambiente no Netlify:**
   - `FOR4PAYMENTS_API_KEY`
   - `UTMIFY_API_TOKEN`

2. **Configure o build:**
   - Build command: `cd netlify-deploy && npm install && npm run build`
   - Publish directory: `netlify-deploy/dist`
   - Functions directory: `netlify/functions`

3. **Conecte seu repositório e faça o deploy**

## 📋 APIs Utilizadas

### For4Payments
- **Endpoint:** `https://app.for4payments.com.br/api/v1/transaction.purchase`
- **Método:** POST
- **Função:** Processar pagamentos PIX

### Utmify
- **Endpoint:** `https://api.utmify.com.br/api-credentials/orders`
- **Método:** POST
- **Função:** Tracking de conversões

### ViaCEP
- **Endpoint:** `https://viacep.com.br/ws/{cep}/json/`
- **Método:** GET
- **Função:** Buscar endereço por CEP

## 🔒 Segurança

- Todas as chaves de API são armazenadas como variáveis de ambiente
- Validação de dados no frontend e backend
- Sanitização de entradas do usuário
- Headers de segurança configurados

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🎨 Design System

Cores principais:
- Primária: `#9B6647` (Marrom)
- Secundária: `#F7F3EF` (Bege claro)
- Destaque: `#825539` (Marrom escuro)

## 📊 Métricas e Analytics

O projeto inclui tracking completo de:
- Visualizações de produto
- Abandono de carrinho
- Conversões de pagamento
- Parâmetros UTM
- Dados de cliente

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato através do email: suporte@sabordeminas.com.br
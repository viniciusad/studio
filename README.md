
# 🧭 FinPessoal Lite

**FinPessoal Lite** é um sistema de controle financeiro pessoal, projetado para ajudar você a organizar suas finanças de forma simples e eficiente. Com uma interface amigável, ele permite gerenciar entradas, saídas, planejamento financeiro e funcionalidades extras como geração de listas de mercado em PDF e envio via WhatsApp.

---

## 🚀 Funcionalidades Principais

- **Dashboard**: Visão geral de fluxo de caixa, vencimentos e resumos de cartão de crédito.
- **Entradas**: Registro de entradas financeiras (com data, categoria, descrição e valor).
- **Saídas**: Controle de gastos, incluindo despesas recorrentes e parceladas.
- **Cadastros**:
  - Fontes de Renda
  - Contas Bancárias
  - Cartões de Crédito
  - Metas Financeiras
- **Planejamento**: Definição de orçamentos e metas.
- **Extras**:
  - Geração de PDF com lista de mercado (`src/services/pdf-generator.ts`)
  - Envio da lista via WhatsApp (`src/services/whatsapp.ts`)

---

## 🔒 Segurança

- Autenticação de usuários via **Firebase Authentication**.
- Suporte a dois fatores de autenticação (2FA).
- Armazenamento seguro de dados.

---

## ⚙️ Tecnologias Utilizadas

- **Next.js** (com TypeScript)
- **Tailwind CSS** + Shadcn UI (componentes de interface)
- **Firebase** (autenticação e backend)
- **Genkit + Google Gemini AI** (para automações inteligentes via IA)
- **React Hook Form** e **Zod** (formulários e validações)
- **Radix UI** (componentes acessíveis)
- **Recharts** (gráficos)
- **date-fns** (manipulação de datas)

---

## 🛠️ Como Preparar o Ambiente

### 1. Pré-requisitos

- **Node.js (LTS)**: https://nodejs.org/
- **npm** (gerenciador de pacotes, incluído no Node.js)

Verifique no terminal se estão instalados:

```bash
node -v
npm -v
```

### 2. Clonar o Repositório

```bash
git clone https://github.com/viniciusad/studio.git
cd studio
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo (ajuste conforme suas credenciais):

```
GOOGLE_GENAI_API_KEY=your-google-api-key
```

Essa chave é necessária para a integração com o Google Gemini AI via Genkit.

### 5. Rodar o Projeto em Ambiente de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:9002
```

### 6. Rodar os Fluxos de Inteligência Artificial (opcional)

```bash
npm run genkit:dev
```

Este comando ativa os fluxos de IA definidos no arquivo `src/ai/dev.ts`.

### 7. Executar os Testes

```bash
npm run test
```

---

## 📂 Estrutura de Diretórios Importantes

```
src/
├── ai/                      # Configuração da integração com Genkit e Google AI
├── app/                     # Páginas da aplicação (Entradas, Saídas, Cadastros, Planejamento, Extras)
├── components/              # Componentes reutilizáveis (UI)
├── services/
│   ├── pdf-generator.ts     # Geração de PDF com a lista de mercado
│   └── whatsapp.ts          # Envio de mensagens via WhatsApp
└── hooks/                   # Hooks personalizados
```

---

## 💬 Contato

Este projeto foi desenvolvido por Vinicius A. Silva.
Contribuições, sugestões ou dúvidas? Fique à vontade para abrir uma issue ou pull request no repositório.

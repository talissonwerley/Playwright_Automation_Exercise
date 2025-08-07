# Automation Exercise - Test Automation Project with Playwright

![](automation-exercise-playwright/utils/playwright/playwright-logo.svg)

## 📋 Sobre o Projeto

Este projeto é uma suíte de testes automatizados desenvolvida com Playwright e Playwright Test para o site AutomationExercise, uma plataforma usada para aprendizado e prática de automação de testes de ponta a ponta (E2E).

O objetivo é garantir a qualidade das funcionalidades principais do site, como login, cadastro, fluxo de compra, contato, e navegação, simulando o comportamento real do usuário e validando a estabilidade do sistema.

# 🧩 Tecnologias Utilizadas

- Node.js (versão 20+ recomendada)

- Playwright

- Playwright Test Runner

- JavaScript ES6+

- GitHub Actions (CI/CD)

- Gerador de relatórios HTML com Playwright Test

📁 Estrutura do Projeto

```automation-exercise-playwright/
├── .github/                   # GitHub Actions workflows
├── node_modules/              # Project dependencies
├── pages/                     # Page Object classes
│   ├── CartPage.js            # Cart page interactions
│   ├── CheckoutPage.js        # Checkout process
│   ├── ContactPage.js         # Contact form handling
│   ├── LoginPage.js           # Authentication flows
│   ├── NavigationPage.js      # Site navigation
│   ├── ProductsPage.js        # Product listing and details
│   └── SignupPage.js          # User registration
├── playwright-report/         # HTML test reports
├── test-results/              # Test execution artifacts
├── tests/                     # Test specifications
│   ├── cart.spec.js           # Shopping cart tests
│   ├── checkout.spec.js       # Checkout process tests
│   ├── contact.spec.js        # Contact form tests
│   ├── login.spec.js          # Login functionality tests
│   ├── navigation.spec.js     # Navigation tests
│   ├── product.spec.js        # Product-related tests
│   └── signup.spec.js         # User registration tests
├── utils/                     # Utility functions and helpers
├── package-lock.json          # Dependency lock file
├── package.json               # Project configuration
└── playwright.config.js       # Playwright configuration
```

## ⚙️ Como Rodar Localmente

### Pré-requisitos

- Node.js instalado (versão 20 ou superior recomendada)

- Git instalado

### Passos

#### 1. Clone este repositório:

```
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

#### 2. Instale as dependências:

```
npm ci
```

#### 3. Instale os navegadores necessários para Playwright:

```
npx playwright install
```

#### 4. Execute todos os testes:

```
npx playwright test
```

#### 5. Para gerar e visualizar o relatório HTML após a execução:

```
npx playwright show-report
```

## 🚀 Integração Contínua (CI) - GitHub Actions

Este projeto está configurado com um workflow para GitHub Actions (`.github/workflows/playwright_ci.yml`) que:

- Executa testes em múltiplos navegadores (atualmente Chromium)

- Instala dependências e navegadores

- Gera relatórios HTML

- Salva os relatórios e artefatos para revisão pós execução

## 📄 Descrição dos Testes

- **Cart Tests:** Validações relacionadas ao carrinho de compras.

- **Checkout Tests:** Fluxos completos de compra, incluindo preenchimento de formulário e pagamento.

- **Contact Tests:** Verifica o formulário de contato e envio de mensagens.

- **Login Tests:** Testes de autenticação e segurança.

- **Navigation Tests:** Verificação dos links e navegação entre páginas.

- **Product Tests:** Busca, filtragem e adição de produtos ao carrinho.

- **Signup Tests:** Fluxos de cadastro e validação de usuários.

## 📚 Boas Práticas e Padrões

- Uso do Page Object Model (POM) para organizar elementos e ações por página.

- Separação clara entre camadas de teste e lógica da interface.

- Uso de seletores acessíveis (getByRole, getByText) sempre que possível.

- Esperas explícitas (waitFor, expect) para garantir estabilidade dos testes.

- Relatórios HTML gerados para facilitar análise de resultados.

- CI configurado para garantir qualidade em cada push e pull request.

## 📞 Contato

http://www.linkedin.com/in/talissonwerley

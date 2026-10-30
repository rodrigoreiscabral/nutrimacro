# NutriMacro

[![CI NutriMacro](https://github.com/rodrigoreiscabral/nutrimacro/actions/workflows/ci.yml/badge.svg)](https://github.com/rodrigoreiscabral/nutrimacro/actions/workflows/ci.yml)
n**Acesse a aplicacao em producao:** [NutriMacro Web](https://nutrimacro.vercel.app/)


Calculadora nutricional e gerenciador de ingestão de macronutrientes desenvolvida com React, TypeScript e Vite.

O projeto separa as regras de negócio da camada visual, mantendo 100% de cobertura de código em testes unitários e validação funcional com testes ponta a ponta (E2E).

## Funcionalidades

- Cálculo da Taxa Metabólica Basal (BMR) com suporte às equações Mifflin-St Jeor e Harris-Benedict.
- Cálculo do Gasto Energético Total Diário (TDEE), ajustado por cinco níveis de atividade física.
- Metas calóricas personalizadas para manutenção, perda ou ganho de peso, com piso de segurança de 1.200 kcal.
- Distribuição automática de macronutrientes: proteínas, carboidratos e gorduras.
- Registro e remoção de refeições, com cálculo calórico dinâmico por gramatura.
- Balanço diário em tempo real entre as metas estipuladas e os nutrientes consumidos.

## Tecnologias Utilizadas

- React 18
- TypeScript
- Vite
- Vitest (V8 Coverage)
- Playwright
- GitHub Actions

## Estrutura do Projeto

```text
nutrimacro/
├── .github/
│   └── workflows/
│       └── ci.yml               # Pipeline de integração contínua
├── src/
│   ├── components/
│   │   ├── FoodForm.tsx         # Formulário de adição de alimentos
│   │   ├── FoodList.tsx         # Tabela de refeições e remoção de itens
│   │   ├── ProfileForm.tsx      # Coleta de dados antropométricos e metas
│   │   └── SummaryCard.tsx      # Painel de métricas e saldo restante
│   ├── services/
│   │   └── calculations.ts      # Regras de negócio e cálculos matemáticos
│   ├── types.ts                 # Interfaces e tipos do TypeScript
│   ├── App.tsx                  # Componente principal e gestão de estado
│   ├── index.css                # Estilos globais
│   └── main.tsx                 # Ponto de entrada da aplicação
├── tests/
│   ├── e2e/
│   │   └── nutrimacro.spec.ts   # 5 cenários de testes E2E com Playwright
│   └── unit/
│       └── calculations.test.ts # 30 testes unitários com Vitest
├── package.json
├── playwright.config.ts         # Configuração do Playwright
├── tsconfig.json                # Configuração do compilador TypeScript
└── vite.config.ts               # Configuração do Vite e Vitest
```

## Fórmulas Matemáticas

### 1. Taxa Metabólica Basal (BMR)

A Taxa Metabólica Basal estima a energia necessária para manter as funções vitais do organismo em repouso.

#### Equação de Mifflin-St Jeor

**Homens:**

$$
BMR = 10 \times peso(kg) + 6.25 \times altura(cm) - 5 \times idade(anos) + 5
$$

**Mulheres:**

$$
BMR = 10 \times peso(kg) + 6.25 \times altura(cm) - 5 \times idade(anos) - 161
$$

#### Equação de Harris-Benedict

**Homens:**

$$
BMR = 88.362 + 13.397 \times peso(kg) + 4.799 \times altura(cm) - 5.677 \times idade(anos)
$$

**Mulheres:**

$$
BMR = 447.593 + 9.247 \times peso(kg) + 3.098 \times altura(cm) - 4.330 \times idade(anos)
$$

### 2. Gasto Energético Total Diário (TDEE)

O TDEE é estimado multiplicando-se a BMR pelo fator correspondente ao nível de atividade física.

| Nível de atividade | Multiplicador |
|---|---:|
| Sedentário | 1.200 |
| Leve | 1.375 |
| Moderado | 1.550 |
| Ativo | 1.725 |
| Muito ativo | 1.900 |

A fórmula geral é:

$$
TDEE = BMR \times Fator\ de\ Atividade
$$

### 3. Metas Calóricas e Distribuição de Macronutrientes

As metas são calculadas a partir do TDEE, conforme o objetivo selecionado.

| Objetivo | Meta calórica | Proteínas | Carboidratos | Gorduras |
|---|---|---:|---:|---:|
| Perda de peso | TDEE − 500 kcal, respeitando o piso de 1.200 kcal | 40% | 30% | 30% |
| Manutenção | Igual ao TDEE | 30% | 45% | 25% |
| Ganho de peso | TDEE + 500 kcal | 25% | 55% | 20% |

Os percentuais representam a proporção das calorias diárias destinadas a cada macronutriente.

### 4. Densidade Calórica dos Alimentos

O valor energético dos alimentos é calculado a partir da quantidade de proteínas, carboidratos e gorduras, expressa em gramas.

$$
Calorias = (Proteínas \times 4) + (Carboidratos \times 4) + (Gorduras \times 9)
$$

Os fatores energéticos utilizados são:

- **Proteínas:** 4 kcal/g.
- **Carboidratos:** 4 kcal/g.
- **Gorduras:** 9 kcal/g.

## Como Executar

### Pré-requisitos

- Node.js.
- npm.

### 1. Instalação de Dependências

Na raiz do projeto, execute:

```bash
npm install
```

### 2. Inicialização do Servidor de Desenvolvimento

Execute:

```bash
npm run dev
```

Acesse o endereço abaixo no navegador:

http://localhost:5173

### 3. Compilação para Produção

Para gerar a versão de produção da aplicação, execute:

```bash
npm run build
```

## Testes

O projeto utiliza Vitest para testes unitários e análise de cobertura, além do Playwright para testes ponta a ponta (E2E).

### Testes Unitários e Cobertura (Vitest)

Execute:

```bash
npm run test:coverage
```

O projeto declara 30 testes unitários e cobertura de 100% de branches, funções e linhas.

### Testes Ponta a Ponta (Playwright)

Execute:

```bash
npm run test:e2e
```

O comando executa os cinco cenários E2E em modo headless.

## Integração Contínua (CI)

A esteira de integração contínua está configurada em `.github/workflows/ci.yml` e é executada a cada push e pull request na branch `main`.

As etapas incluem:

1. Instalação limpa das dependências com `npm ci`.
2. Validação de tipagem TypeScript e compilação com `npm run build`.
3. Execução dos 30 testes unitários e verificação de cobertura com `npm run test:coverage`.
4. Instalação dos binários de navegadores necessários ao Playwright.
5. Execução dos cinco testes E2E com `npm run test:e2e`.

## Verificação da Formatação

Depois de salvar o arquivo, confira as primeiras 25 linhas no terminal:

```bash
head -n 25 README.md
```

Para visualizar o arquivo completo no terminal, você também pode executar:

```bash
cat README.md
```

## Atualização do Repositório Remoto

Depois de revisar o arquivo, execute os comandos abaixo para registrar e enviar a alteração:

```bash
git add README.md
git commit -m "docs: reformatar estrutura e secoes do readme"
git push origin main
```

## Registros de Decisoes de Arquitetura (ADRs)

Decisoes tecnicas documentadas no diretorio `docs/adr/`:
* `0001-escolha-do-vitest.md`: Justificativa da escolha do Vitest como executor unitario.
* `0002-escolha-do-playwright.md`: Justificativa do Playwright para os fluxos E2E.
* `0003-formula-bmr-mifflin-st-jeor.md`: Criterio para definicao da formula padrao de BMR.
* `0004-esteira-ci-github-actions.md`: Regras de validacao aplicadas na pipeline de CI.
* `0005-separacao-camada-de-servico.md`: Isolamento das regras de negocio em funcoes puras.

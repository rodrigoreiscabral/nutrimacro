# NutriMacro

[![CI NutriMacro](https://github.com/rodrigoreiscabral/nutrimacro/actions/workflows/ci.yml/badge.svg)](https://github.com/rodrigoreiscabral/nutrimacro/actions/workflows/ci.yml)

Calculadora nutricional e gerenciador de ingestao de macronutrientes desenvolvida com React, TypeScript e Vite. O projeto separa as regras de negocio da camada visual, mantendo 100% de cobertura de codigo em testes unitarios e validacao funcional com testes ponta a ponta (E2E).

## Funcionalidades

* Calculo de Taxa Metabolica Basal (BMR) com suporte as equacoes Mifflin-St Jeor e Harris-Benedict.
* Calculo de Gasto Energetico Total Diario (TDEE) ajustado por 5 niveis de atividade fisica.
* Metas caloricas personalizadas para manutencao, perda ou ganho de peso, com piso de seguranca de 1200 kcal.
* Distribuicao automatica de macronutrientes (proteinas, carboidratos e gorduras).
* Registro e remocao de refeicoes com calculo calorico dinamico por gramatura.
* Balanco diario em tempo real entre metas estipuladas e nutrientes consumidos.

## Tecnologias Utilizadas

* React 18
* TypeScript
* Vite
* Vitest (V8 Coverage)
* Playwright
* GitHub Actions

## Estrutura do Projeto

```text
nutrimacro/
├── .github/
│   └── workflows/
│       └── ci.yml               # Pipeline de integracao continua
├── src/
│   ├── components/
│   │   ├── FoodForm.tsx         # Formulario de adicao de alimentos
│   │   ├── FoodList.tsx         # Tabela de refeicoes e remocao de itens
│   │   ├── ProfileForm.tsx      # Coleta de dados antropometricos e metas
│   │   └── SummaryCard.tsx      # Painel de metricas e saldo restante
│   ├── services/
│   │   └── calculations.ts      # Regras de negocio e calculos matematicos
│   ├── types.ts                 # Interfaces e tipos do TypeScript
│   ├── App.tsx                  # Componente principal e gestao de estado
│   ├── index.css                # Estilos globais
│   └── main.tsx                 # Ponto de entrada da aplicacao
├── tests/
│   ├── e2e/
│   │   └── nutrimacro.spec.ts   # 5 cenarios de testes E2E do Playwright
│   └── unit/
│       └── calculations.test.ts # 30 testes unitarios com Vitest
├── package.json
├── playwright.config.ts         # Configuracao do Playwright
├── tsconfig.json                # Configuracao do compilador TypeScript
└── vite.config.ts               # Configuracao do Vite e Vitest
Formulas MatematicasTaxa Metabolica Basal (BMR)Mifflin-St Jeor (Homens): $10 \times \text{peso(kg)} + 6.25 \times \text{altura(cm)} - 5 \times \text{idade(anos)} + 5$Mifflin-St Jeor (Mulheres): $10 \times \text{peso(kg)} + 6.25 \times \text{altura(cm)} - 5 \times \text{idade(anos)} - 161$Harris-Benedict (Homens): $88.362 + 13.397 \times \text{peso(kg)} + 4.799 \times \text{altura(cm)} - 5.677 \times \text{idade(anos)}$Harris-Benedict (Mulheres): $447.593 + 9.247 \times \text{peso(kg)} + 3.098 \times \text{altura(cm)} - 4.330 \times \text{idade(anos)}$Multiplicadores de Nivel de Atividade (TDEE)Sedentario: 1.200Leve: 1.375Moderado: 1.550Ativo: 1.725Muito Ativo: 1.900Metas Caloricas e Distribuicao de MacronutrientesPerda de peso: deficit de 500 kcal com piso minimo de 1200 kcal (40% proteina, 30% carboidrato, 30% gordura).Manutencao: consumo igual ao TDEE (30% proteina, 45% carboidrato, 25% gordura).Ganho de peso: superavit de 500 kcal (25% proteina, 55% carboidrato, 20% gordura).Densidade Calorica dos Alimentos$$\text{Calorias} = (\text{Proteinas} \times 4) + (\text{Carboidratos} \times 4) + (\text{Gorduras} \times 9)$$Como ExecutarInstalacao de dependenciasBashnpm install
Servidor de desenvolvimentoBashnpm run dev
Acesse o endereco http://localhost:5173 no navegador.Compilacao para producaoBashnpm run build
Execucao das Suites de TestesTestes Unitarios e Cobertura (Vitest)Executa 30 testes unitarios com 100% de cobertura de branches, funcoes e linhas:Bashnpm run test:coverage
Testes Ponta a Ponta (Playwright)Executa os 5 cenarios E2E em modo headless:Bashnpm run test:e2e
Integracao Continua (CI)A esteira automatizada em .github/workflows/ci.yml roda a cada push e pull request na branch main:Instalacao limpa de dependencias via npm ci.Validacao de tipagem TypeScript e compilacao via npm run build.Execucao dos 30 testes unitarios com verificacao de cobertura via npm run test:coverage.Instalacao dos binarios de navegadores do Playwright.Execucao dos 5 testes E2E via npm run test:e2e.

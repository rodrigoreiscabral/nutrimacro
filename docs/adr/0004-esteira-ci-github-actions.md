# ADR 0004: Pipeline de CI com GitHub Actions

## Contexto
Validacao obrigatoria de tipagem estatica, cobertura de codigo e integridade E2E a cada alteracao enviada ao repositorio remoto.

## Decisao
Construir fluxo unico com checagem estrita contendo build, verificacao de 100% de cobertura no Vitest e testes E2E do Playwright.

## Consequencias
Bloqueio imediato de regressoes tecnicas antes da integracao na branch main.

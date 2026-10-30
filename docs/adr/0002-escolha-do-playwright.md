# ADR 0002: Escolha do Playwright para Testes Ponta a Ponta

## Contexto
Era necessario validar fluxos de navegacao reais da interface do usuario em ambiente simulado de navegador.

## Decisao
Adotar o Playwright em vez de Cypress pela facilidade de execucao headless em esteiras Linux de integracao continua e menor consumo de recursos no runner.

## Consequencias
Cobertura de 5 cenarios E2E completos executados confiavelmente em menos de 2 segundos.

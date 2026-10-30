# ADR 0005: Isolamento das Regras de Negocio da Camada de Interface

## Contexto
As regras nutricionais e computacoes caloricas precisavam ser testaveis de forma isolada do ciclo de vida dos componentes React.

## Decisao
Concentrar toda a logica matematica e regras de negocio em funcoes puras dentro de src/services/calculations.ts, desacopladas de estados e hooks da UI.

## Consequencias
Facilidade para atingir 100% de cobertura nos testes unitarios sem a necessidade de mocks complexos de renderizacao.

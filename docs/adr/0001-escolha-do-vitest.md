# ADR 0001: Adocao do Vitest como Executor de Testes Unitarios

## Contexto
O projeto utiliza Vite e TypeScript. Precisavamos de uma ferramenta de testes unitarios rapida e compativel nativamente com a configuracao do Vite.

## Decisao
Adotar o Vitest no lugar do Jest devido a integracao nativa com a configuracao do Vite, execucao rapida em memoria via esbuild e suporte imediato a cobertura V8.

## Consequencias
Execucao instantanea dos 30 testes unitarios sem configuracao adicional de Babel ou ts-jest.

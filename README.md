# setup-base

Setup básico para usar em projetos,
**Typescript** - Tipar a modo de deixar o javascript mais seguro a falhas
**Eslint** - Garatimos regras para validar os codigos de js e ts;
**Prettier** - Garante uma identação melhor para leitura do código
**Jest** - Serve para implementar testes na aplicação
**Husky** - Serve para conffigurar hooks.
**Lint-staged (commit hooks)** - Permirte juntamente com o husky, executar códigos em apicações onde está sendo usado o git, por exemplo rodar o eslint no momento do commit;
**Path mapping** - Permite mapear os imports ao invés de usar o " import {} from _../../import_", para importar um arquivo dois niveis acima de diretório, usamos para configurar "import {} from _@import_".

## Comandos iniciais

- git init: inicia o git;
- npm init -y: inicia o projeto node - cria o arquivo package.json;
- npm install -D typescript @types/node - instala o typescript e os types para o node;
- tsc --init - inicia o typescript criando o tsconfig.json: configurações tsconfig:

```JSON
{
  "compilerOptions": {
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "module": "commonjs",                                /* Specify what module code is generated. */
    "rootDir": "src",                                    /* Specify the root folder within your source files. */
    "outDir": "./dist",                                  /* Specify an output folder for all emitted files. */
    "moduleResolution": "node",                          /* Specify how TypeScript looks up a file from a given module specifier. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```

- Usando padrão de commits do git: _Conventional Commits_

- npm install -D ts-node - roda em tempo real o typescrit, faz o processos de verificar e ja nos mostra esses erros, e executa o código em si;
  npm install -D nodemon - automatiza o processo de parar e rodar o server quando identifica alguma alteração no codigo;
  **OBS: ts-node e nodemon vão trabalhar em conjunto.**

### "start:dev": "nodemon --watch 'scr/' --exec 'ts-node' src/index.ts -e ts"

**dentro do package configuramos a seguinte linha que:**
_"start:dev" > comando que vamos chamar para rodar o script;
_ nodemon --watch 'scr/' > deixa o nodemon "escutando alterações dentro da pasta src";
_--exec 'ts-node src/index.ts' > executa o ts-node para rodar o nodemon com arquivos typescripts, nesse caso o arquivo de index.ts iniciando a aplicação;
_ -e ts > pega todas as entenções TS.

- npm install -D eslint prettier - instala o eslint e o prettier
- npx eslint --init - configuração eslint

Configuração .prettierrc.json

```JSON
{
  "semi": true,
  "singleQuote": false,
  "tabWith": 2
}
```

vamos configurar para sempre for feito um commit, vai ser feita uma validação do prettier e do eslint, vamos usar
o husky e o lint-staged
**husky:** usado para criar hooks de commit, ou seja vamos definir comandos para ser usado antes de cada commit.
**lint-staged:** usado para executar comando que estão dentro do commit

Ou seja o husky vai configurar um pre-commit, para que antes de cada commit seja executado um lint-staged, executando aslguns comandos dentro do commit, nesse caso vai ser o eslint e o prettier e podemos por exemplo colocar o jest também.

- npm install -D husky lint-staged

Na sequecia vai temos de criar um script dentro do package:

#### "husky:prepare": "husky init"

na sequencia damos o comando **npm husky:prepare** que vai criar o git hooks

#### "prepare": "husky"

- script dentro do package.json: "husk:prepare": "husky init";

- rodar o comando que vai ser criado o script depois do comando acima: npm run prepare;

Dentro da pasta .husky abrir o arquivo shell pre-commit para configurar:

- temos de configurar o package.json com os comandos que vamos rodar no pre-commit:
  - npx lint-staged

Vamos criar **.lintstagedrc.json** para configuração do lint-staged

```JSON
{
  "src/**/*.ts": [ "eslint --fix", "prettier --write" ]
}
```

## commitlint/config-conventional

Configura um padrão para comitar as alteraçoes:
<https://www.npmjs.com/package/@commitlint/config-conventional>

Instala commitlint

**npm install --save-dev @commitlint/config-conventional @commitlint/cli**

Cria o arquivo de config

**echo "export default {extends: ['@commitlint/config-conventional']};" > commitlint.config.js**

Dentro do arquivo commitlint.config.js que vai ser criado, colocar o seguinte comando

## Tem dois comandos porque o primeiro está com erro para o modules, usando o seggundo por enquanto

```javascript
// export default {extends: ['@commitlint/config-conventional']};
module.exports = { extends: ["@commitlint/config-conventional"] };
```

No seguinte link temos a regras para commit

<https://github.com/conventional-changelog/commitlint>

Vamos criar o arquivo de mensagem do husky
**echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg**

Dentro do arquivo commit-msg vamos colocar o seguinte comando:
Esse comando garante que vamos rodar o commmit lint no código

```SHELL
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}
```

### JEST

#### npm install jest @types/jest ts-jest

Criar um arquivo de jest.config.js e colocar dentro dele a seguinte config:

```javascript
module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
```

scripts de teste:

```JSON
    "test": "jest --passWithNoTests",
    "test:watch": "npm test --watch",
    "test:staged": "npm test --findRelatedTests",
    "test:push": "npm teste --coverage"
```

lintstaged.config.json com o os testes configurados:

```JSON
{
  "src/**/*.ts": ["eslint --fix", "prettier --write", "npm run teste:staged"]
}
```

### Path Mapping

temos de configurar algumas coisas no tsconfig.json, da seguinte forma:

```JSON
{
  "compilerOptions": {
    "target": "es2020",                         /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "module": "commonjs",                       /* Specify what module code is generated. */
    "rootDir": "src",                           /* Specify the root folder within your source files. */
    "outDir": "./dist",                         /* Specify an output folder for all emitted files. */
    "moduleResolution": "node",                 /* Specify how TypeScript looks up a file from a given module specifier. */
    "forceConsistentCasingInFileNames": true,   /* Ensure that casing is correct in imports. */
    "strict": true,                             /* Enable all strict type-checking options. */
    "skipLibCheck": true,                        /* Skip type checking all .d.ts files. */
    "paths": {
      "@/*":["*"]                                /* Path mapping - Todos os imports tiver @ e qualquer coisa depois vamos usar o rootdir como referencia */
    },
    "baseUrl":"src",                             /* Path mapping - Aqui configuramos os src como caminho base dos imports */
  }
}
```

no arquivo jest.config.js temos de configurar a config moduleNameMapper, ficando da seginte forma:

```javascript
module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  collectCoverage: true,
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
```

rodamos o _test:watch_ para verificar se passou.'

**Ajustes** essas configurações vão quebrar algumas coisas na aplicação:
1 - _npm run start:dev_: para ajustar este erro temos de instalar como desenvolvimento o tsconfig_paths

**npm install -D tsconfig-paths**: Vai ser usado no package.json depois do ts node na config do start:dev da seguinte forma depois do ts-node: _tsconfig-paths/register_

```JSON
 "start:dev": "nodemon --watch \"src\" --exec \"ts-node -r tsconfig-paths/register src/index.ts\" -e ts"
```

2 - _npm run build_: também vai quebrar, vamos ter de instalar como desenvolvimento o tsc-alias.

**npm install -D tsc-alias**: ele substitui todos os arrobas no javascript pelo import mesmo, no script de build vamos configurar da seguinte forma:

```JSON
  "build": "tsc && tsc-alias",
```

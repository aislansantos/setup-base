# setup-base

Setup básico para usar em projetos, typescript, eslint, jest eHusky &amp; Lint Staged (commit hooks)

## Comandos iniciais:

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

- Usando padrão de commits do git: <i>Conventional Commits</i>

- npm install -D ts-node - roda em tempo real o typescrit, faz o processos de verificar e ja nos mostra esses erros, e executa o código em si;
  npm install -D nodemon - automatiza o processo de parar e rodar o server quando identifica alguma alteração no codigo;
  <b>OBS: ts-node e nodemon vão trabalhar em conjunto.</b>

#### "start:dev": "nodemon --watch 'scr/' --exec 'ts-node' src/index.ts -e ts",

<b>dentro do package configuramos a seguinte linha que:</b>
_ "start:dev" > comando que vamos chamar para rodar o script;
_ nodemon --watch 'scr/' > deixa o nodemon "escutando alterações dentro da pasta src";
_ --exec 'ts-node src/index.ts' > executa o ts-node para rodar o nodemon com arquivos typescripts, nesse caso o arquivo de index.ts iniciando a aplicação;
_ -e ts > pega todas as entenções TS.

<br>

- npm install -D eslint prettier - instala o eslint e o prettier
- npx eslint --init - configuração eslint

<p>Configuração .prettierrc.json</p>

```JSON
{
  "semi": true,
  "singleQuote": false,
  "tabWith": 2
}
```

vamos configurar para sempre for feito um commit, vai ser feita uma validação do prettier e do eslint, vamos usar
o husky e o lint-staged
<b>husky: </b> usado para criar hooks de commit, ou seja vamos definir comandos para ser usado antes de cada commit.
<b>lint-staged: </b>usado para executar comando que estão dentro do commit

<p>Ou seja o husky vai configurar um pre-commit, para que antes de cada commit seja executado um lint-staged, executando aslguns comandos dentro do commit, nesse caso vai ser o eslint e o prettier e podemos por exemplo colocar o jest também.</p>

- npm install -D husky lint-staged

Na sequecia vai temos de criar um script dentro do package:

#### "husky:prepare": "husky init"

<p>na sequencia damos o comando <b>npm husky:prepare</b> que vai criar o git hooks </p>

#### "prepare": "husky"

- script dentro do package.json: "husk:prepare": "husky init";

- rodar o comando que vai ser criado o script depois do comando acima: npm run prepare;

Dentro da pasta .husky abrir o arquivo shell pre-commit para configurar:

- temos de configurar o package.json com os comandos que vamos rodar no pre-commit:
  - npx lint-staged

<p>Vamos criar <b>.lintstagedrc.json</b> para configuração do lint-staged </p>

```JSON
{
  "src/**/*.ts": [ "eslint --fix", "prettier --write" ]
}
```

## commitlint/config-conventional

<p>Configura um padrão para comitar as alteraçoes:
https://www.npmjs.com/package/@commitlint/config-conventional</p>

<p>Instala commitlint</p>

<b>npm install --save-dev @commitlint/config-conventional @commitlint/cli</b>

<p>Cria o arquivo de config</p>

<b>echo "export default {extends: ['@commitlint/config-conventional']};" > commitlint.config.js</b>

<p>Dentro do arquivo commitlint.config.js que vai ser criado, colocar o seguinte comando</p>

<i>Tem dois comandos porque o primeiro está com erro para o modules, usando o seggundo por enquanto</i>

```javascript
// export default {extends: ['@commitlint/config-conventional']};
module.exports = { extends: ["@commitlint/config-conventional"] };
```

<p>No seguinte link temos a regras para commit</p>

<a href="https://github.com/conventional-changelog/commitlint">https://github.com/conventional-changelog/commitlint</a>

<p>Vamos criar o arquivo de mensagem do husky</p>
<b>echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg</b>

<p>Dentro do arquivo commit-msg vamos colocar o seguinte comando:</p>
<p>Esse comando garante que vamos rodar o commmit lint no código</p>

```SHELL
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}
```

### JEST

<b>npm install jest @types/jest ts-jest</b>

<p>Criar um arquivo de jest.config.js e colocar dentro dele a seguinte config:</p>

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



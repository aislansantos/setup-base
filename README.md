# setup-base
Setup básico para usar em projetos, typescript, eslint, jest eHusky &amp; Lint Staged (commit hooks)

## Comandos iniciais:
* git init: inicia o git;
* npm init -y: inicia o projeto node - cria o arquivo package.json;
* npm install -D typescript @types/node - instala o typescript e os types para o node;
* tsc --init - inicia o typescript criando o tsconfig.json: configurações tsconfig:
~~~JSON
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
~~~
* Usando padrão de commits do git: <i>Conventional Commits</i>

* npm install -D ts-node - roda em tempo real o typescrit, faz o processos de verificar e ja nos mostra esses erros, e executa o código em si;
* npm install -D nodemon - automatiza o processo de parar e rodar o server quando identifica alguma alteração no codigo;
<b>OBS: ts-node e nodemon vão trabalhar em conjunto.</b>
* "start:dev": "nodemon --watch 'scr/' --exec 'ts-node' src/index.ts -e ts",
<b>dentro do package configuramos a seguinte linha que:</b>
    * "start:dev" > comando que vamos chamar para rodar o script;
    * nodemon --watch 'scr/' > deixa o nodemon "escutando alterações dentro da pasta src";
    * --exec 'ts-node src/index.ts' > executa o ts-node para rodar o nodemon com arquivos typescripts, nesse caso o arquivo de index.ts iniciando a aplicação;
    * -e ts > pega todas as entenções TS.
    


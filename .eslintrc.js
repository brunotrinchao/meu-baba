module.exports = {
  root: true,
  env: {
    node: true,
    browser: true, // Para suportar a verificação de código no ambiente do browser
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended' // Isso já inclui 'eslint-config-prettier' e 'eslint-plugin-prettier'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020, // Permite a sintaxe moderna do ES
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off', // Desativa a exigência de nomes de componentes com várias palavras
    indent: ['error', 2], // Define indentação de 2 espaços
    'prettier/prettier': [
      'error',
      {
        semi: true, // Sempre usar ponto e vírgula
        singleQuote: true, // Usar aspas simples
        tabWidth: 2, // Tamanho de tabulação de 2 espaços
        useTabs: false, // Não usar tabs, apenas espaços
        trailingComma: 'none', // Sem vírgulas finais
        printWidth: 160, // Máximo de 160 caracteres por linha
        endOfLine: 'lf', // Usar CRLF como estilo de fim de linha
        htmlWhitespaceSensitivity: 'ignore' // Ignorar sensibilidade de espaços em branco em HTML
      }
    ]
  }
};

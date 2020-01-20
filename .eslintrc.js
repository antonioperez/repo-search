// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'generator-star-spacing': 'off',
    'vue/max-attributes-per-line': 0,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
	"globals": {
    "process": true,
    "module" : true,
    "FS": true
  }
};

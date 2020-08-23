module.exports = {
    env: {
        commonjs: true,
        es2020: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'prettier'
    ],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 11,
    },
    rules: {
        indent: ['error', 4, { "SwitchCase": 1 }],
        quotes: 0,
        'comma-dangle': 0,
        'eol-last': 0,
        'no-console': 0,
        'no-underscore-dangle': 0,
        'camelcase': 0,
        'no-param-reassign': 0,
        'global-require': 0,
        'no-nested-ternary': 0,
        'no-use-before-define': 0,
        'no-restricted-globals': 0,
        'no-unused-vars': 0
    },
};
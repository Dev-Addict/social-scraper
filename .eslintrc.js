/* eslint-disable */
module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ['standard', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		...require('eslint-config-prettier').rules,
		'prettier/prettier': [
			2,
			{
				trailingComma: 'es5',
				tabWidth: 2,
				semi: true,
				singleQuote: true,
				useTabs: true,
				jsxSingleQuote: false,
				bracketSpacing: false,
				jsxBracketSameLine: true,
				arrowParens: 'always',
				cursorOffset: 0,
			},
		],
	},
};

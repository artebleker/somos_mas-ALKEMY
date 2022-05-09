module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: ['plugin:react/recommended', 'standard', 'eslint-config-prettier'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
	},
};

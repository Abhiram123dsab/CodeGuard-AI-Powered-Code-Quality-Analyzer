import js from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';

export default [
    js.configs.recommended,
    reactRecommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                React: true,
                JSX: true,
                document: true
            }
        },
        rules: {
            'indent': ['error', 2],
            'quotes': ['error', 'single'],
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error'
        },
        settings: {
            react: {
                version: '18.2'
            }
        },
        rules: {
            'semi': ['error', 'always'],
            'react/prop-types': 'off'
        }
    }
];
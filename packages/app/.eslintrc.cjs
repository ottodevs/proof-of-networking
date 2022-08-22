module.exports = {
    extends: ['next/core-web-vitals', 'turbo', 'prettier', 'next/babel'],
    rules: {
        '@next/next/no-html-link-for-pages': ['error', 'src/pages'],
        '@next/no-page-custom-font': 'off',
    },
}

/* global module */
module.exports = {
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'prettier'
  ],
  rules: {
    'vue/no-unused-vars': 'error',
    'vue/attribute-hyphenation': 'error',
    'no-plusplus': 0,
    quotes: [
      'error',
      'single',
    ],
  },
};

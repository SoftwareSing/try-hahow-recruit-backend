module.exports = {
  env: {
    mocha: true
  },
  plugins: [
    'chai-expect',
    'chai-friendly'
  ],
  extends: [
    'plugin:chai-expect/recommended',
    'plugin:chai-friendly/recommended'
  ]
}

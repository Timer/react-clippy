module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactClippy',
      externals: {
        react: 'React'
      }
    }
  }
}

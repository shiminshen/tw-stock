const path = require('path')

// ref: https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
module.exports = {
  webpack: (config) => {
    config.resolve.alias.src = path.join(__dirname, './src')
    config.resolve.alias.gql = path.join(__dirname, './src/gql')
    config.resolve.alias.components = path.join(__dirname, './src/components')
    config.resolve.alias.lib = path.join(__dirname, './src/lib')
    config.resolve.alias.styles = path.join(__dirname, './src/styles')
    return config
  }
}

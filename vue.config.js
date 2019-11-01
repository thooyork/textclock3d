module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? ''
      : '/',

      configureWebpack: {
        module: {
          rules: [
            {
              test: /\.(obj|fbx|gltf|bin)(\?.*)?$/,
              use: [
                {
                  loader: 'file-loader'
                }
              ]
            },
            {
              test: /\.json$/,
              use: [
                {
                  loader: 'json-loader'
                }
              ]
            }
          ]
        }
      }
  }
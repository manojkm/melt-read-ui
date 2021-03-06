const path = require('path');

const modulesPath = path.resolve(__dirname, '../modules')

module.exports = (config, env) => {

  if (env === 'PRODUCTION') {
    config.plugins = config.plugins
      .filter(plugin => plugin.constructor.name !== 'UglifyJsPlugin')
  }

  const rules = config.module.rules

  rules.forEach((rule, index) => {
    if ('README.md'.match(rule.test)) {
      // console.warn('replacing MD rule:', rule)
      rules.splice(index, 1, {
        test: /\.md$/,
        loader: 'raw-loader',
      })
    }
  })

  rules.push(
    {
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: require.resolve('./postcss.config.js'),
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: [
              modulesPath,
            ],
          }
        },
      ],
      include: modulesPath,
    }
  )

  return config
}

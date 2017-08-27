const fs = require('fs')
const path = require('path')
const del = require('del')

const distDir = 'build'

module.exports = {
  distDir,
  webpack: config => {
    config.module.rules = config.module.rules.concat(
      {
        test: /\.css$/,
        loader: 'emit-file-loader',
        options: { name: 'dist/[path][name].[ext]' },
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader'],
      }
    )
    // config.module.rules = config.module.rules.concat({
    //   test: /\.css$/,
    //   use: ['raw-loader'],
    //   include: [
    //     path.resolve(__dirname, 'components')
    //   ]
    // })
    // console.log('config.module.rules[4]', config.module.rules[4])
    // console.log('config.module.rules[5]', config.module.rules[5])
    // config.module.rules = config.module.rules.concat({
    //   test: /\.js$/,
    //   include: [
    //     /analytics-node/,
    //   ],
    //   loader: 'babel-loader',
    //   options: { cacheDirectory: true, presets: [], babelrc: true },
    // })
    // config.module.rules = config.module.rules.concat({
    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: [
    //     {
    //       loader: 'emit-file-loader',
    //       options: {
    //         name: `${distDir}/[path][name].[ext]`,
    //       },
    //     },
    //     {
    //       loader: 'skeleton-loader',
    //       options: {
    //         procedure: function (content) { // can't be used allow function
    //           const fileName = `${this._module.userRequest}.json`
    //           const classNames = fs.readFileSync(fileName, 'utf8')
    //
    //           del.sync(fileName)
    //
    //           return [
    //             'module.exports = {',
    //               `classNames: ${classNames},`,
    //               `stylesheet: \`${content}\`,`,
    //             '}'
    //           ].join('')
    //         },
    //       },
    //     },
    //     'postcss-loader',
    //   ],
    // })

    return config
  },
}

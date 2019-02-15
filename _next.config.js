module.exports = {
  distDir: 'build',
  webpack: config => {
    config.module.rules = config.module.rules.concat(
      {
        test: /\.css$/,
        loader: 'emit-file-loader',
        options: { name: 'dist/[path][name].[ext]' }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      }
    )
    return config
  }
}

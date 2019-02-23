export default {
  mode: 'universal',
  srcDir: 'src/',
  buildDir: 'build',
  dev: process.env.NODE_ENV !== 'production',
  head: {
    title: 'mo - CircleCI Client for Mobile Web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'CircleCI Client for Mobile Web' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: [],
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
  ],
  proxy: {
    '/api': { target: 'https://circleci.com' },
  },
}

const next = require('next')
const Koa = require('koa')
const Router = require('koa-router')
const proxies = require('koa-proxies')
const connect = require('koa-connect')
const compression = require('compression')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('*', async (ctx, next) => {
    if (!ctx.cookies.get('__ct')) {
      await app.render(ctx.req, ctx.res, '/authorize', ctx.query)
      ctx.respond = false
    } else {
      await next()
    }
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res, ctx.req.url, ctx.query)
    ctx.respond = false
  })

  server.use(connect(compression()))

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(proxies('/api', {
    target: 'https://circleci.com/api',
    changeOrigin: true,
    rewrite: path => path.replace(/^\/api/, ''),
    logs: dev === true,
  }))

  server.use(router.routes())

  server.listen(port, err => {
    if (err) throw err
    if (dev) {
      console.log(`> Ready on http://localhost:${port}`)
    }
  })
})

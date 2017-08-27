const next = require('next')
const Koa = require('koa')
const Router = require('koa-router')
const proxies = require('koa-proxies')
const useragent = require('koa-useragent')
const connect = require('koa-connect')
const compression = require('compression')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()

  const rootRouter = new Router()
  const userRouter = new Router()
  const projectRouter = new Router()

  rootRouter.get('*', async (ctx, next) => {
    if (!ctx.cookies.get('__ct')) {
      await app.render(ctx.req, ctx.res, '/authorize', ctx.query)
      ctx.respond = false
    } else {
      await next()
    }
  })

  projectRouter.get('/', async ctx => {
    const query = { ...ctx.query, params: ctx.params }
    await app.render(ctx.req, ctx.res, '/_project', query)
    ctx.respond = false
  })
  projectRouter.get('/tree/:branch', async ctx => {
    const query = { ...ctx.query, params: ctx.params }
    await app.render(ctx.req, ctx.res, '/_tree', query)
    ctx.respond = false
  })
  projectRouter.get('/:buildNum', async (ctx, next) => {
    if (Number.isInteger(parseInt(ctx.params.buildNum, 10))) {
      const query = { ...ctx.query, params: ctx.params }
      await app.render(ctx.req, ctx.res, '/_single', query)
      ctx.respond = false
    } else {
      await next()
    }
  })

  userRouter.get('/', async ctx => {
    const query = { ...ctx.query, params: ctx.params }
    await app.render(ctx.req, ctx.res, '/_user', query)
    ctx.respond = false
  })
  userRouter.use('/:project', projectRouter.routes())

  rootRouter.use('/:vcsType/:username', userRouter.routes())

  rootRouter.get('*', async ctx => {
    await handle(ctx.req, ctx.res, ctx.req.url, ctx.query)
    ctx.respond = false
  })

  server.use(connect(compression()))

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(useragent)

  server.use(proxies('/api', {
    target: 'https://circleci.com/api',
    changeOrigin: true,
    rewrite: path => path.replace(/^\/api/, ''),
    logs: dev === true,
  }))

  server.use(rootRouter.routes())

  server.listen(port, err => {
    if (err) throw err
    if (dev) {
      console.log(`> Ready on http://localhost:${port}`)
    }
  })
})

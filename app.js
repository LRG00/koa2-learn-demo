const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const pv = require('./middleware//middleware')
const m1 = require('./middleware//m1')
const m2 = require('./middleware//m2')
const m3 = require('./middleware//m3')
const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// mongoose
mongoose.connect(dbConfig.dbs)
mongoose.connection.on('connected', () => console.log('已启动mongo'))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(pv())
app.use(m1())
app.use(m2())
app.use(m3())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

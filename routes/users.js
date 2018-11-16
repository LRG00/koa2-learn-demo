const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/leeruigan', function (ctx, next) {
  ctx.body = 'this is a users/leeruigan response'
})

module.exports = router

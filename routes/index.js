const express = require('express') // 引用 Express 與 Express 路由器
const router = express.Router() // 準備引入路由模組
const home = require('./modules/home') // 引入 home 模組程式碼
const restaurant = require('./modules/restaurant')  // 引入 restaurant 模組程式碼
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')  // 掛載 middleware
const auth = require('./modules/auth')

router.use('/restaurants', authenticator, restaurant) // 加入驗證程序
router.use('/users',users)
router.use('/auth', auth)
router.use('/', authenticator, home) // 加入驗證程序

module.exports = router // 匯出路由器
const express = require('express') // 引用 Express 與 Express 路由器
const router = express.Router() // 準備引入路由模組
const home = require('./modules/home') // 引入 home 模組程式碼
const restaurant = require('./modules/restaurant')  // 引入 restaurant 模組程式碼
 
router.use('/', home)  // 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/restaurants', restaurant)  // 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurant 模組

module.exports = router // 匯出路由器
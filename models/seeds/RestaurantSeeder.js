const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('../Restaurant')
const db = mongoose.connection
const restaurantList = require('../../restaurant.json').results

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
    console.log(process.env.MONGODB_URI) //確認是否成功輸入MONGODB_URI
})
// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
    Restaurant.create(restaurantList)
            
    console.log('done!')
})
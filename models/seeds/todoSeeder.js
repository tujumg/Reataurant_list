const mongoose = require('mongoose') // 載入 mongoose
const todo = require('../todo')
const db = mongoose.connection
const restaurantList = require('./restaurant.json')

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
const app = express()

// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
    for(let i = 1; i < 9;i++){
        todo.create(restaurantList.results)
    }
    console.log('done')
})
// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})
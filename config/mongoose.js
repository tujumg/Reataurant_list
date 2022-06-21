const mongoose = require('mongoose') // 載入 mongoose
MONGODB_URI = process.env.MONGODB_URI
const db = mongoose.connection

mongoose.connect(MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})
module.exports = db
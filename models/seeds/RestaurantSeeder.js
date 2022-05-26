const Restaurant = require('../Restaurant')
const db = require('../../config/mongoose')
const restaurantList = require('../../restaurant.json').results

// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
    Restaurant.create(restaurantList)
        .then(() => {
            console.log('MongoDB restaurantSeeder created!')
        })
        .catch(error => console.log(error))
        .finally(() => db.close())
})
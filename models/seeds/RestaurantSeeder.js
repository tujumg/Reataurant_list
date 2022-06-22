const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const Restaurant = require('../Restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const restaurantList = require('../../restaurant.json').results
const SEED_USERS = [
    {
        name: 'user1',
        email: 'user1@example.com',
        password: '12345678',
        restaurantId:[1,2,3]
    },
    {
        name: 'user2',
        email: 'user2@example.com',
        password: '12345678',
        restaurantId:[4,5,6]
    }
]
// 連線成功
db.once('open', () => {
    return Promise.all(Array.from(SEED_USERS, SEED_USER => {
        return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(SEED_USER.password, salt))
            .then(hash => {
                return User.create({
                    name: SEED_USER.name,
                    email: SEED_USER.email,
                    password: hash
                }).then((user) => {
                    const addRestaurants = restaurantList.filter(restaurant => {
                        return SEED_USER.restaurantId.includes(restaurant.id)
                    })
                    return Promise.all(Array.from(addRestaurants, addRestaurant => {
                        addRestaurant.userId = user._id
                        return Restaurant.create(addRestaurant)
                    }))
                })
            })
    }))
        .then(()=>{
            console.log('Seeds done')
            process.exit()
        })
        .catch(err => console.log('err'))   
})
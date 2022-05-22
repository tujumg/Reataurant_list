const express = require('express')
const app = express()
const mongoose = require('mongoose') // 載入 mongoose
const db = mongoose.connection
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
const app = express()
const port = 3000

// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    
    res.render('index',{restaurants : restaurantList.results})
})
app.get('/restaurants/:restaurant_id',(req,res)=>{
    const restaurant = restaurantList.results.find(restaurant => 
        restaurant.id.toString() === req.params.restaurant_id)
    res.render('show',{restaurant:restaurant})
})
app.get('/search',(req,res)=>{
    console.log('req.query',req.query.keyword)
    const keyword = req.query.keyword.toLocaleLowerCase()
    const restaurants = restaurantList.results.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword) ||
        restaurant.category.toLowerCase().includes(keyword)
    })
    res.render('index',{restaurants : restaurants,keyword:keyword})
})

app.listen(port, ()=>{
    console.log(`Express is listening on localhost:${port}`)
})
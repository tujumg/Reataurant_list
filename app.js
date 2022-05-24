const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const mongoose = require('mongoose') // 載入 mongoose
const db = mongoose.connection
const bodyParser = require('body-parser')
const Restaurant = require('./models/Restaurant')
const { redirect } = require('express/lib/response')
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//餐廳首頁
app.get('/',(req,res)=>{
    Restaurant.find() // 取出 Restaurant model 裡的所有資料
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .then(restaurantData => res.render('index',{restaurantData}))  // 將資料傳給 index 樣板
        .catch(error=>console.error(error)) // 錯誤處理
})

//新增餐廳
app.get('/restaurants/new',(req,res)=>{
    res.render('new')
})
app.post('/restaurants',(req,res)=>{
    Restaurant.create(req.body)
        .then(()=>res.redirect('/'))
        .catch(err => console.log(err))
})
//選定特定餐廳
app.get('/restaurants/:id',(req,res)=>{
    const id = req.params.id
    Restaurant.findById(id)
        .lean()
        .then(restaurantData => res.render('show',{restaurantData}))
        .catch(err => console.log(err))
})
//搜尋餐廳
app.get('/search',(req,res)=>{
    
    const keyword = req.query.keyword.trim().toLowerCase()
    Restaurant.find()
        .lean()
        .then(restaurantData => {
            const filterRestaurantsData = restaurantData.filter(
                data =>
                    data.name.toLowerCase().includes(keyword) ||
                    data.category.includes(keyword)
            )
            res.render('index', { restaurantData: filterRestaurantsData, keyword })
        })
        .catch(err => console.log(err))
})

//編輯餐廳
app.get('/restaurants/:id/edit', (req, res) => {
    const  id  = req.params.id
    Restaurant.findById(id)
        .lean()
        .then(restaurantData => res.render('edit', {restaurantData}))
        .catch(err => console.log(err))
})
//更新餐廳
app.post('/restaurants/:id/edit',(req,res) =>{
    const id = req.params.id
    const body = req.body
    Restaurant.findById(id)
        .then(restaurantData =>{
            restaurantData.name = body.name
            restaurantData.name_en = body.name_en
            restaurantData.category = body.category
            restaurantData.image = body.image
            restaurantData.location = body.location
            restaurantData.phone = body.phone
            restaurantData.google_map = body.google_map
            restaurantData.rating = body.rating
            restaurantData.description = body.description
            return restaurantData.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(err => console.log(err))
})
//刪除餐廳
app.post('/restaurants/:id/delete', (req, res) => {
    const id = req.params.id
    Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

app.listen(port, ()=>{
    console.log(`Express is listening on localhost:${port}`)
})
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/Restaurant')

//餐廳首頁
router.get('/',(req,res)=>{
    Restaurant.find() // 取出 Restaurant model 裡的所有資料
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .then(restaurantData => res.render('index',{restaurantData}))  // 將資料傳給 index 樣板
        .catch(error=>console.error(error)) // 錯誤處理
})

// 搜尋餐廳
router.get('/search',(req,res)=>{
    
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
module.exports = router
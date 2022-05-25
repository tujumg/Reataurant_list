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

//排序
router.get('/sort', (req, res) => {
    const sort = req.query.sort
    const sortRule = {
        name_asc: { name: 'asc' },
        name_desc: { name: 'desc' },
        rating_asc: { rating: 'asc' },
        rating_desc: { rating: 'desc' }
    }
    console.log('sortRule:', sortRule[sort])
    console.log('sort:', sort)
    Restaurant.find()
        .lean()
        .sort(sortRule[sort])
        .then(restaurantData => {
            res.render('index', {restaurantData})
        })
        .catch(error => console.log(error))
})

// 搜尋餐廳
router.get('/search',(req,res)=>{
    const keyword = req.query.keyword.trim() 
    Restaurant.find({
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { name_en: { $regex: keyword, $options: 'i' } },
            { category: { $regex: keyword, $options: 'i' } }
        ]
    })
        .lean()
        .then(restaurantData => {res.render('index', {restaurantData,keyword})})
        .catch(err => console.log(err))
})
module.exports = router
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

//新增餐廳
router.get('/new',(req,res)=>{
    res.render('new')
})
router.post('/',(req,res)=>{
    console.log(req.body)
    const userId = req.user._id
    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

    return Restaurant.create({
        name,
        name_en,
        category,
        image,
        location,
        phone,
        google_map,
        rating,
        description,
        userId,
    })
        .then(console.log('new restaurant added,req.body', req.body))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})
//選定特定餐廳
router.get('/:id',(req,res)=>{
    const userId = req.user._id
    const id = req.params.id
    Restaurant.findOne({_id : id , userId})
        .lean()
        .then(restaurantData => res.render('show',{restaurantData}))
        .catch(err => console.log(err))
})

//編輯餐廳
router.get('/:id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Restaurant.findOne({_id , userId})
        .lean()
        .then(restaurantData => res.render('edit', {restaurantData}))
        .catch(err => console.log(err))
})
//更新餐廳
router.put('/:id',(req,res) =>{
    const userId = req.user._id
    const _id = req.params.id
    const body = req.body
    Restaurant.findOne({_id,userId})
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
        .then(() => res.redirect(`/restaurants/${_id}`))
        .catch(err => console.log(err))
})
//刪除餐廳
router.delete('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Restaurant.findOne({_id,userId})
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})
module.exports = router
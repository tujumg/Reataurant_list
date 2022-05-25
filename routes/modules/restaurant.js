const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

//新增餐廳
router.get('/new',(req,res)=>{
    res.render('new')
})
router.post('/',(req,res)=>{
    Restaurant.create(req.body)
        .then(()=>res.redirect('/'))
        .catch(err => console.log(err))
})
//選定特定餐廳
router.get('/:id',(req,res)=>{
    const id = req.params.id
    Restaurant.findById(id)
        .lean()
        .then(restaurantData => res.render('show',{restaurantData}))
        .catch(err => console.log(err))
})

//編輯餐廳
router.get('/:id/edit', (req, res) => {
    const  id  = req.params.id
    Restaurant.findById(id)
        .lean()
        .then(restaurantData => res.render('edit', {restaurantData}))
        .catch(err => console.log(err))
})
//更新餐廳
router.put('/:id',(req,res) =>{
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
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})
module.exports = router
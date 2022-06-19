const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
require('./config/mongoose')
const session = require('express-session')
const routes = require('./routes') // 引用路由器
const app = express()
const usePassport = require('./config/passport')

const port = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
    secret:'ThisIsMySecret',
    resave:false ,
    saveUninitialized:true
}))
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(routes)  // 將 request 導入路由器

app.listen(port, ()=>{
    console.log(`Express is listening on localhost:${port}`)
})
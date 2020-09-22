let express = require("express")

let router = require("./router.js")

let bodyParser = require("body-parser")

let app = express()

app.engine('html', require('express-art-template'))

// 开放静态资源
app.use('/public/', express.static("./public"))

// 配置中间体
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// 把路由容器挂载到 app服务中
app.use(router)

app.listen(3000, () => {
  console.log("running ....");
})
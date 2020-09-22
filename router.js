let express = require("express")
let fs = require("fs")

let router = express.Router()

let Students = require("./students.js")

// 渲染首页
router.get("/students", (req, res) => {
  Students.find(null, function (err, data) {
    if (err) {
      res.status(500).send("server error")
    }
    res.render('index.html', {
      students: JSON.parse(data).students
    })
  })
})

// 渲染添加学生页面
router.get("/students/new", (req, res) => {
  res.render("addStudent.html")
})

// 处理添加学生请求
router.post("/students/new", (req, res) => {
  Students.addStudent(req.body, function (err, data) {
    if (err) {
      res.status(500).send("server error")
    }
    res.redirect('/students')
    // res.statusCode = 302
    // res.setHeader('Location', '/students')
    // 需要 res.end() 结束响应
  });
})

// 渲染单个学生信息
router.get("/students/edit", (req, res) => {
  Students.find(req.query.id * 1, function(err, data) {
    if (err) {
      return console.log(err)
    }
    res.render('editStudentInfo.html', {
      studentInfo: data
    })
  })
})

// 修改学生信息
router.post("/students/edit", (req, res) => {
  let student = req.body
  Students.editStudentInfo(student, function(err) {
    if (err) {
      res.status(500).send('server error')
    }
    res.redirect('/students')
  })
})

// 删除学生信息
router.get("/students/delete", (req, res) => {
  // 1. 查找到 id 对应的对象
  Students.delStudent(req.query.id * 1, function(err, data) {
    if (err) {
      res.status(500).send("server error")
    }
    res.redirect("/students")
  })
})

module.exports = router
/**
 * 学生模块相关处理函数
 */

let fs = require("fs");

/**
 * 查询所有学生
 */
exports.find = function (id, callback) {
	fs.readFile("./db.json", "utf-8", (err, data) => {
		if (err) {
			return callback(err);
    }
    if (id) {
      let studentObj = null
      studentObj = JSON.parse(data).students.find(item => {
        return item.id === id
      })
      return callback(null, studentObj)
    }
		callback(null, data);
	});
};

/**
 * 添加学生
 */
exports.addStudent = function (student, callback) {
	// 1. 先读出文件里的数据
	fs.readFile("./db.json", "utf8", (err, data) => {
		if (err) {
			return callback(err);
		}
		// 2. 将 student push 进去
		let fileData = JSON.parse(data);
		student.id = fileData.students.length !== 0 ? fileData.students[fileData.students.length - 1].id + 1 : 1
		fileData.students.push(student);
		// 3. 写入到文件
		fs.writeFile("./db.json", JSON.stringify(fileData), (err) => {
      if (err) {
        return callback(err)
      }
      callback(null)
    });
	});
};


/**
 * 修改学生信息
 */
exports.editStudentInfo = function(student, callback) {
  // 1. 读取文件
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    student.id = parseInt(student.id)
    let stuArr = JSON.parse(data).students
    let stuObj = stuArr.find(item => {
      return item.id === student.id
    }) 
    for (let key in stuObj) {
      stuObj[key] = student[key]
    }
    // 转化 格式
    let stuData = JSON.stringify({
      students: stuArr
    }) 
    // 写入文件
    fs.writeFile('./db.json', stuData, (err) => {
      callback(err)
    })
    // console.log(JSON.parse(data));
  })
}

/**
 * 删除学生
 */
exports.delStudent = function(id, callback) {
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    let studentArr = students.filter(item => {
      return item.id !== id
    })
    studentArr = JSON.stringify({
      students: studentArr
    })
    // 写入文件
    fs.writeFile('./db.json', studentArr, (err) => {
      callback(err)
    })
  })
}

const sql = require("./tools/linkSql");
const tk = require("jsonwebtoken")
/* 
  登录
    userName passWord
  返回参数
    userId
    code 
      1 成功
      2 账号或密码错误
      3 参数缺失
      4 服务器繁忙
*/
module.exports = (req, res) => {
  const {userName, passWord} = req.body;
  const sqlStr = `select * from users where userName = "${userName}" and passWord = "${passWord}"`;
  sql(sqlStr, (err, data) => {
    if (err) {
      res.json({
        code: 4,
        msg: '服务器繁忙',
      })
      return;
    }

    if (data.length) {
      res.json({
        code: 1,
        msg: '登录成功',
        userName: data[0].userName,
        userId: data[0].userId,
        headImg: data[0].headImg,
        token: tk.sign({userInfo: data[0]}, "772567615", {
          expiresIn: 60 * 60 * 24
        })
      })
    } else {
      res.json({
        code: 2,
        msg: '账号或密码错误',
      })
    }
  })
}
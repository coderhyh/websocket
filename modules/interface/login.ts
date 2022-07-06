import sql from "../utils/linkSql";
import tk from 'jsonwebtoken'
import { Request, Response } from "express";
/* 
  登录
    userName passWord
  返回参数
    userId
    code 
      200 成功
      500 账号或密码错误
      500 参数缺失
      500 服务器繁忙
*/
export default async (req: Request, res: Response) => {
  const { userName, passWord } = req.body;
  const sqlStr = `select * from user_list where userName = "${userName}" and passWord = "${passWord}"`;
  const data = await sql(sqlStr).catch(err => [])
  if (data.length) {
    res.json({
      code: 200,
      msg: '登录成功',
      userName: data[0].userName,
      userId: data[0].userId,
      avatar: data[0].avatar,
      token: tk.sign({ userInfo: data[0] }, "772567615", {
        expiresIn: 60 * 60 * 24
      })
    })
  } else {
    res.json({
      code: 500,
      msg: '账号或密码错误',
    })
  }
}
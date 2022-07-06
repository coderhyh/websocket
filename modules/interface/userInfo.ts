import sql from "../utils/linkSql";
import tk from 'jsonwebtoken'
import { Request, Response } from "express";
import { UserInfo } from "../../types/user";
/* 
  登录
    token
  返回参数
    msg: string
    userName: string
    userId: string
    avatar: string
    code 
      200 成功
      500 账号或密码错误
      500 参数缺失
      500 服务器繁忙
*/

export default async (req: Request, res: Response) => {
  const { token } = req.body;
  tk.verify(token, '772567615', (err: any, data: any) => {
    if (err) return res.json({
      code: 500,
      msg: '无效token'
    })
    hasToken(data.userInfo, res)
  })
}

async function hasToken({ userId }: UserInfo, res: Response) {
  const sqlStr = `select * from user_list where userId="${userId}"`;
  const data: UserInfo[] = await sql(sqlStr).catch(err => [])
  if (data.length) {
    res.json({
      code: 200,
      msg: '获取成功',
      userName: data[0].userName,
      userId: data[0].userId,
      avatar: data[0].avatar,
    })
  } else {
    res.json({
      code: 500,
      msg: '无效token',
    })
  }
}
import { v1 as uuidv1 } from "uuid";
import sql from "../utils/linkSql";
import fs from "fs";
import { Request, Response } from "express";
import moment from "moment";

/* 
  注册
    userName passWord avatar
  返回参数
    code 
      200 成功
      500 用户名被占用
      500 参数缺失
      500 服务器繁忙
*/
export default async (req: Request, res: Response) => {
  const { userName, passWord } = req.body;
  const filePath = req.file?.path ?? "";
  if (!/^\w{6,12}$/g.test(passWord)) {
    fs.unlinkSync(filePath);
    res.json({
      code: 500,
      msg: "请输入数字、字母、下划线6-12位密码 !",
    });
    return;
  }

  const data = await sql(`select * from user_list where userName="${userName}"`).catch(err => err);
  if (!data.length) {
    const keys = `userName, passWord, avatar, userId, role, createTime, userMessage`;
    const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
    const newData = `'${userName}','${passWord}',
        'http://127.0.0.1:5000/images/${req.file?.filename}',
        '${uuidv1()}', 'visitor', '${nowDate}', '[]'`;
    const sqlStr = `insert into user_list (${keys}) value(${newData})`;
    const data = await sql(sqlStr).catch(err => err)
    res.json({
      code: 200,
      msg: "注册成功",
    });
  } else {
    fs.unlinkSync(filePath)
    res.json({
      code: 500,
      msg: "用户名被占用",
    });
  }
};

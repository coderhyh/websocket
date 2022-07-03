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
      1 成功
      2 用户名被占用
      3 参数缺失
      4 服务器繁忙
*/
export default (req: Request, res: Response) => {
  const { userName, passWord } = req.body;
  const filePath = req.file?.path ?? "";
  sql(`select * from userList where userName="${userName}"`, (err, data) => {
    if (err) {
      fs.unlink(req.file?.path ?? "", (err) => {
        res.json({
          code: 4,
          msg: "服务器繁忙",
        });
      });
      return;
    }

    if (!data.length) {
      const keys = `userName, passWord, avatar, userId, role, createTime, userMessage`;
      const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
      const newData = `'${userName}','${passWord}',
        'http://127.0.0.1:8080/images/${req.file?.filename}',
        '${uuidv1()}', 'visitor', '${nowDate}', '[]'`;
      const sqlStr = `insert into userList (${keys}) value(${newData})`;
      sql(sqlStr, (err, data) => {
        console.log(err, data);
        
        if (err) {
          fs.unlink(filePath, (err) => {
            res.json({
              code: 4,
              msg: "服务器繁忙",
            });
          });
        } else {
          res.json({
            code: 1,
            msg: "注册成功",
          });
        }
      });
    } else {
      fs.unlink(filePath, (err) => {
        res.json({
          code: 2,
          msg: "用户名被占用",
        });
      });
    }
  });
};

import mysql, { MysqlError, PoolConnection } from "mysql";
var pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  // user: "wechat",
  // password: "772567615",
  user: "root",
  password: "root",
  database: "wechat",
});

export default (sql: string): Promise<MysqlError | any> => {
  return new Promise((resolve, inject) => {
    pool.getConnection((err: MysqlError, connection: PoolConnection) => {
      connection.query(sql, (err: MysqlError, data: any) => {
        if (err) inject(err)
        else resolve(data)
          
        // 释放资源
        connection.release();
      });
    });
  })
};

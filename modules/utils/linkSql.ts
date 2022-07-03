import mysql, { MysqlError, PoolConnection } from "mysql";
var pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "772567615",
  database: "wechat",
});

export default (sql: string, hook: (err: MysqlError, data: any) => void) => {
  pool.getConnection((err: MysqlError, connection: PoolConnection) => {
    connection.query(sql, (err: MysqlError, data: any) => {
      hook(err, data);
      // 释放资源
      connection.release();
    });
  });
};

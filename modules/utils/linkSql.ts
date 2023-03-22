import mysql, { MysqlError, PoolConnection } from "mysql";

import config from '../../config'

const pool = mysql.createPool(config.MYSQL);

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

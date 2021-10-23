const { Pool } = require('pg');
const conf = require('config')

class Database {
  constructor() {
    this.config = {
      user: conf.get('database.username'),
      host: conf.get('database.host'),
      database: conf.get('database.dbName'),
      password: conf.get('database.password'),
      port: conf.get('database.port'),
    };

    this.pool = new Pool(this.config);
  }

  query(sql) {
    return this.pool.query(sql);
  }

  close() {
    this.pool.end();
  }
}

module.exports = new Database();
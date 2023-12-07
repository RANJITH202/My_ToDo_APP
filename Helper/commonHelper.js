const db = require('../config/dbConnection');

const queryRunner = function queryRunner(query, params) {
  /*
      1. query is string datatype any sql query you can pass.
      2. params is array of values(string, number contains) datatype any sql query you can pass. 
      3. modelName is string datatype pass module name with functions like suppose you can calling the this function on posTransactions.add then module will be posTransactions - add : . 
  */
  return new Promise((resolve, reject) => {
      db.connection.query(query, params, (error, data) => {
          if (error) {
              // logger.error(moment().format('YYYY-MM-DD HH:mm:ss') + ' ' + modelName +  ' - '+ functionName + ': sql error While running query ', error);
              return resolve({ error, data: [], isError: true });
          }
          return resolve({ error: {}, data, isError: false })
      })
  })
}

module.exports = {
  queryRunner
}
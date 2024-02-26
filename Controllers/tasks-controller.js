const commonHelper = require('../Helper/commonHelper');
const moment = require('moment');

const getTasksList = async (req, res) => {
  try {
    let {userId, filter} = req.body; 
    filter = filter ? JSON.parse(filter) : {};
    let startLimit = 0;
    let endLimit = 15;
    let whereQuery = ` is_deleted = 0`;
    let whereQueryParams = [];
    if(userId){
      whereQuery += ` AND user_id = ?`;
      whereQueryParams = [...whereQueryParams, userId];
    }
    if(filter){
      if(filter.search){
        const search = `%${filter.search}%`;
        whereQuery += ` AND (task_name LIKE ? OR task_description LIKE ? OR status LIKE ? DATE_FORMAT(complete_date,"%d-%m-%Y") LIKE ? OR DATE_FORMAT(expiry_date,"%d-%m-%Y") LIKE ? OR DATE_FORMAT(created_date,"%d-%m-%Y") LIKE ? ) `;
        whereQueryParams = [...whereQueryParams, search, search, search, search, search, search];
      }
      if(filter.startLimit && filter.endLimit){
        startLimit = filter.startLimit;
        endLimit = filter.endLimit;
      }
    }
    const taskListSql = `SELECT * FROM tbl_tasks WHERE ${whereQuery}`;
    const taskListSqlWithLimit = `${taskListSql} LIMIT ${startLimit}, ${endLimit}`
    const getTasks = await commonHelper.queryRunner(taskListSqlWithLimit, whereQueryParams);
    if(getTasks.isError) {
      res.status(400).send({ message: "Error in fetching data.", data: [] , error: getTasks.error });
    } else{
      if(getTasks.data && getTasks.data.length > 0) {
        const taskCountSql = `SELECT COUNT(*) AS total_count FROM tbl_tasks WHERE ${whereQuery}`;
        const getAllTasksCount = await commonHelper.queryRunner(taskCountSql, whereQueryParams);
        if(getAllTasksCount.isError) {
          res.status(400).send({ message: "Error in fetching data.", data: [] , error: getAllTasksCount.error });
        } else{
          const data = {
            data: getTasks.data,
            totalCount: getAllTasksCount.data[0].total_count
          }
          res.status(200).send({ message: "Records Fetched Successfully", data: data });
        }
      } else{
        res.status(200).send({ message: "No Records Found", data: [] });
      }
    }
  } catch (error) {
    res.status(400).send({ message: "Exception Occurred.", data: [] , error: error.message });
  }
}

const addTask = async (req, res) => {
  try {
    const { taskName, taskDescription, status, expiryDate, userId } = req.body;
    if( !taskName || !taskDescription || !expiryDate || !status || !userId ) {
      res.status(400).send({ message: "All fields are mandatory." });
    } 
    const insertTask = "INSERT INTO tbl_tasks (task_name, task_description, expiry_date, status, user_id, created_date) VALUES (?, ?, ?, ?, ?)";
    const insertTaskParams = [taskName, taskDescription, expiryDate, status, userId, moment().format('YYYY-MM-DD HH:mm:ss')];
    const insertTaskResult = await commonHelper.queryRunner(insertTask, insertTaskParams);
    if(insertTaskResult.isError) {
      res.status(400).send({ message: "Error in inserting data.", data: [] , error: insertTaskResult.error });
    } else{
      res.status(200).send({ message: "Task Added Successfully", data: insertTaskResult.data });
    }
  } catch (error) {
    res.status(400).send({ message: "Exception Occurred.", data: [] , error: error.message });
  }
}
module.exports = { getTasksList }
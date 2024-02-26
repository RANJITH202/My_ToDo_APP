const express = require('express');
const { getTasksList } = require('../Controllers/tasks-controller');
const router = express.Router();

router.route('/getTasksList').put(getTasksList);

module.exports = router;
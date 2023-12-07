const express = require('express');
const errorhandler = require('./Middleware/errorHandler');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', require('./Routes/usersRoute'));
app.use('/api/v1/tasks', require('./Routes/tasksRoute'));

// app.use(errorhandler);

app.listen(port, () => 
console.log(`Server running on port ${port}`)
);

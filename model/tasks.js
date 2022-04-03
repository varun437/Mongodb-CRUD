const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dbSchema = new schema({
    Description: String,
    Completed:Boolean
});

const tasks = mongoose.model('tasks',dbSchema);
module.exports=tasks;
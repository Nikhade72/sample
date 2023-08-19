const express = require('express');
const mongoose = require('mongoose');

const Task = require('./model/task');

const app = express();
require('dotenv').config();

require('./db/mongodb');

app.use(express.json());
mongoose.connect('mongodb+srv://HarshaVilasraoNikhade:Harsha1234@cluster0.znhrbrv.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/api/tasks', async (req, res) =>{
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({error : 'Error Fetching tasks'});
    }
});


app.post('/api/tasks', async (req,res) =>{
    const {description, completed} = req.body; 
    try {
        const task = new Task({description, completed});
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({error: 'Error adding task'});
    }
});

app.delete('/api/tasks/:id', async (req,res) =>{
    const taskId = req.params.id;
    try {
        await Task.findByIdAndRemove(taskId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({error: 'Error deleting task'});
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});
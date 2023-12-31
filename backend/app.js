
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());


const Task = require('./model/task');
require('./db/mongodb');


mongoose.connect('mongodb+srv://HarshaVilasraoNikhade:Harsha1234@cluster0.znhrbrv.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/api/tasks', async (req, res) =>{
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(400).json({error : 'Error Fetching tasks'});
    }
});


app.post('/api/tasks', async (req,res) =>{
    const {description, completed} = req.body; 
    try {
        const task = new Task({description, completed});
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({error: 'Error adding task'});
    }
});

app.delete('/api/tasks/:id', async (req,res) =>{
    const taskId = req.params.id;
    try {
        await Task.findByIdAndRemove(taskId);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).json({error: 'Error deleting task'});
    }
})
app.put('/api/tasks/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      const { completed } = req.body;
  
      // Update the task's completion status in the database
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { completed },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json(updatedTask);
    } catch (error) {
      console.error('Error updating task completion status:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});
var express = require('express');
var router = express.Router();

const task1 = {
  id: 1,
  name: 'Task 1',
  description: 'Description of task 1',
  completed: true,
};
const task2 = {
  id: 2,
  name: 'Task 2',
  description: 'Description of task 2',
  completed: true,
};
const task3 = {
  id: 3,
  name: 'Task 3',
  description: 'Description of task 3',
  completed: false,
};
const task4 = {
  id: 4,
  name: 'Task 4',
  description: 'Description of task 4',
  completed: false,
};
let lastId = 4;
let tasks = [task1, task2, task3, task4];

const validateTask = ({ name, description }, res, onSuccess) => {
  if (name) {
    if (description) {
      onSuccess();
    } else {
      res.status(400);
      res.send({ description: 'the description should not be blank' });
    }
  } else {
    res.status(400);
    res.send({ name: 'the name should not be blank' });
  }
};

const validateId = (id, res, onSuccess) => {
  const task = tasks.find((item) => item.id === id);
  if (task) {
    onSuccess(task);
  } else {
    res.status(400);
    res.send({ id: 'invalid id' });
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tasks', function(req, res, next) {
  res.send(tasks);
});

router.get('/tasks/:taskId', function(req, res, next){
  const { params: { taskId } } = req;
  res.send({ task: tasks.find(({ id }) => id === parseInt(taskId) )});
});

router.post('/tasks', function(req, res, next) {
  console.log(req.body);
  const { body: { name, description } } = req;
  
  validateTask({ name, description }, res, () => {
    lastId += 1;
    const newTask = { id: lastId, name, description, completed: false }
    tasks = [...tasks, newTask ];
    res.status(201);
    res.send({ task: newTask });
  });
});

router.put('/tasks/:taskId', function(req, res, next) {
  const { params: { taskId } } = req;
  const id = parseInt(taskId);
  const { body: { name, description, completed } } = req;

  validateId(id, res, (task) => {
    validateTask({ name, description }, res, () => {
      task.name = name;
      task.description = description;
      task.completed = completed;
      res.status(200);
      res.send({ task: task });
    });
  });
});

router.delete('/tasks/:taskId', function(req, res, next) {
  const { params: { taskId } } = req;
  const id = parseInt(taskId);

  validateId(id, res, (task) => {
    tasks = tasks.filter((item) => item.id !== task.id);
    res.status(200);
    res.send({ task: task });
  });
});



module.exports = router;

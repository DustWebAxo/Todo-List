const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/TodoController');


router.get('/', TodoController.listTasks);

router.post('/', TodoController.createTasks);

router.put('/:id', TodoController.updateTasks);

router.delete('/:id', TodoController.deleteTasks);

module.exports = router;
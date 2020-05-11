const express = require('express');
const indexRouter = express.Router();
const { indexPage, todosPage, addTodo, updateTodo, deleteTodo, getTodo } = require('../controllers');

indexRouter.get('/', indexPage);
indexRouter.get('/todos', todosPage);
indexRouter.post('/todos', addTodo);
indexRouter.put('/todos/:id', updateTodo)
indexRouter.delete('/todos/:id', deleteTodo)
indexRouter.get('/todos/:id', getTodo)

indexRouter.use(function(req,res){
    res.status(404).json('404 Not Found');
});

module.exports = indexRouter;
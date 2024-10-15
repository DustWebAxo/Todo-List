const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// GET /todos - Listar todas as tarefas
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

// POST /todos - Criar nova tarefa
router.post('/todos', async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTodo = new Todo({
      title,
      description,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

// PUT /todos/:id - Atualizar tarefa existente
router.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description, status }, { new: true });
    if (!updatedTodo) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

// DELETE /todos/:id - Remover tarefa
router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.status(200).json({ message: 'Tarefa removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover tarefa' });
  }
});

module.exports = router;

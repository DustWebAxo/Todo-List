const Todo = require('../models/Todo');
const mongoose = require('mongoose');

exports.listTasks = async (req, res) => {
  try {
    const todo = await Todo.find();
    res.status(200).send(todo);

  } catch (error) {
    console.error('Erro ao listar tarefas', error);
    res.status(500).send({ message: 'Erro ao listar tarefas' });
  }
};

exports.createTasks = async (req, res) => {
  const todo = new Todo(req.body);
  try {
    await todo.save();
    res.status(201).send({ message: 'Tarefa criada com sucesso!' });
    
  } catch (error) {
    console.error('Erro ao salvar tarefa:', error);
    res.status(400).send({ message: 'Falha ao salvar cliente', error });
  }
};

exports.updateTasks = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID inválido' });
  }
  try {
    const todoUpdate = await Todo.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!todoUpdate) {
      return res.status(404).send({ message: 'Tarefa não encontrada' });
    }
    res.status(200).send({ message: 'Tarefa atualizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).send({ message: 'Erro ao atualizar cliente', error });
  }
};

exports.deleteTasks = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID inválido' });
  }

  try {
    const todoDeleted = await Todo.findByIdAndDelete(id);

    if (!todoDeleted) {
      return res.status(404).send({ message: 'Cliente não encontrado' });
    }
    res.status(200).send({ message: 'Cliente deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    res.status(500).send({ message: 'Erro ao deletar cliente', error });
  }
};
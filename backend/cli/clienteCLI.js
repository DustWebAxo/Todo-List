const { program } = require("commander");
const mongoose = require("mongoose");
const Todo = require("../models/Todo");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado com sucesso"))
  .catch((error) => console.error("Erro ao conectar no MongoDB:", error));

program
  .command("listar")
  .description("Lista todas as tarefas")
  .action(async () => {
    try {
      const todo = await Todo.find();
      console.log(todo);
    } catch (error) {
      console.error("Erro ao listar tarefas:", error);
    } finally {
      process.exit();
    }
  });

program
  .command("criar")
  .description("Cria uma nova tarefa")
  .requiredOption("-t, --titulo <titulo>", "Titulo da tarefa")
  .requiredOption("-d, --descricao <descricao>", "Descricao da tarefa")
  .option("-s, --status <status>", "Status da Tarefa")
  .action(async (cmd) => {
    try {
      const newTodo = new Todo({
        title: cmd.tiulo,
        description: cmd.descricao,
        status: cmd.status,
      });
      await newTodo.save();
      console.log("Tarefa criada com sucesso:", newTodo);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    } finally {
      process.exit();
    }
  });

program
  .command("atualizar")
  .description("Atualiza uma tarefa existente")
  .requiredOption("-i, --id <id>", "ID da tarefa a ser atualizada")
  .option("-t, --titulo <titulo>", "Novo titulo da tarefa")
  .option("-d, --descricao <descricao>", "Nova descricao da tarefa")
  .option("-s, --status <status>", "Novo status da Tarefa")
  .action(async (cmd) => {
    const { id, title, description, status } = cmd;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("ID inválido");
      return process.exit(1);
    }

    try {
      const todoUpdate = await Todo.findByIdAndUpdate(
        id,
        { title, description, status },
        { new: true, runValidators: true }
      );

      if (!todoUpdate) {
        console.error("Tarefa não encontrada");
        return process.exit(1);
      }

      console.log("Tarefa atualizada com sucesso:", todoUpdate);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    } finally {
      process.exit();
    }
  });

program
  .command("deletar")
  .description("Deleta uma tarefa existente")
  .requiredOption("-i, --id <id>", "ID da tarefa a ser deletada")
  .action(async (cmd) => {
    const { id } = cmd;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("ID inválido");
      return process.exit(1);
    }

    try {
      const todoDeleted = await Todo.findByIdAndDelete(id);

      if (!todoDeleted) {
        console.error("Tarefa não encontrada");
        return process.exit(1);
      }
      console.log("Tarefa deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    } finally {
      process.exit();
    }
  });

program.parse(process.argv);

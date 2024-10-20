const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database'); 
const todoRoutes = require('./router/TodoRoutes');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use('/api', todoRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
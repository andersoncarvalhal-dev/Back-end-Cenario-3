//importações necessárias para o projeto
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 10000;
const bodyParser = require("body-parser");
const cors = require("cors");

//configuração de json e cors
app.use(bodyParser.json());
app.use(cors());

//rota que lista todos os usuários cadastrados
app.get("/users", async (req, res) => {
});

//rota que cadastra um usuário
app.post("/user", async (req, res) => {
});

//rota que apaga um usuário, passando o id
app.delete("/user/:id", async (req, res) => {
  
    try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
  
});

//rota que atualiza um usuário, pelo id
app.put("/user/:id", async (req, res) => {
 
  
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, { nome: req.body.nome }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }


});

//rota que lista usuários que contenham o nome específico
app.get("/users/:name", async (req, res) => {
});

//rota que lista um usuário pelo id
app.get("/user/:id", async (req, res) => {
});

// Inicie o servidor na porta especificada
const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = { app, server };
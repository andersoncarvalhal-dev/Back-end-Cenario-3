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


app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  if (users.length > 0) return res.status(200).send(users);
  return res.status(404).send("No users found");
});

app.post("/user", async (req, res) => {
  const data = req.body;
  await prisma.user.create({
    data: {
      name: data.nome,
    },
  });
  return res.sendStatus(201);
});

//rota para buscar um usuário pelo nome
app.get("/user/:name", async (req, res) => {
  const nome = req.params.name;
  const user = await prisma.user.findMany({
    where: {
      name: nome,
    },
  });
  if (user.length > 0) return res.status(200).send(user);
  return res.send("No user found");
});


/* app.delete("/user/:id", async (req, res) => {
  
// Rota que apaga um usuário, passando o nome */
app.delete("/user", async (req, res) => {
  try {
    const name = req.query.name;

    if (!name) {
      return res.status(400).json({ error: 'Name parameter is required' });
    }

    const deletedUser = await User.findOneAndDelete({ nome: name });

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put("/user/:id", async (req, res) => {
 
  
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, { name: req.body.nome }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }


});


const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = { app, server };
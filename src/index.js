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
  return res.send("No users found");
});

app.post("/user", async (req, res) => {
  const data = req.body;
  await prisma.user.create({
    data: {
      nome: data.nome,
    },
  });
  return res.sendStatus(201);
});

//rota para buscar um usuário pelo nome
app.get("/user/:name", async (req, res) => {
  const nome = req.params.name;
  const user = await prisma.user.findMany({
    where: {
      nome: nome,
    },
  });
  if (user.length > 0) return res.status(200).send(user);
  return res.send("No user found");
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


const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = { app, server };
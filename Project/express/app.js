import express from "express";
import { PrismaClient } from "@prisma/client";
import { setupSwagger } from "./swagger.js";

const PORT = 3000;
const app = express();
const prisma = new PrismaClient();

setupSwagger(app); // Настройка Swagger

app.get("/api/users", async (req, res) => {
  const users = await prisma.users.findMany();
  res.status(200).json(users);
});

app.post("/api/users", async (req, res) => {
  try {
    const { login, password } = req.body; // Предположим, что в запросе передаются name и description

    const newItem = await prisma.users.create({
      data: {
        login,
        password,
      },
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при добавлении записи" });
  }
});

app.listen(PORT, () => {
  console.log("Сервер запущен на http://localhost:3000");
});

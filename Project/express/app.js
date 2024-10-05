import express from "express";
import { PrismaClient } from "@prisma/client";
import { setupSwagger } from "./swagger.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

const PORT = 3000;
const app = express();
const prisma = new PrismaClient();

setupSwagger(app); // Настройка Swagger

app.use(express.json());

app.get("/api/users", async (req, res) => {
  const users = await prisma.users.findMany();
  res.status(200).json(users);
});

app.post("/api/register", async (req, res) => {
  try {
    const { login, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        login,
        password: hashedPassword
      },
    });
    res.status(201).json("Успешная регистрация");
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Ошибка регистрации" });
  }
});

app.post("/api/login", async (req, res) => {
  const { login, password } = req.body;
  const user = await prisma.users.findUnique({ where: { login: login } });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({token})
  } else {
    res.status(401).json({status: "Неверный пароль"});
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const { password } = req.body; // Предположим, что в запросе передаются name и description

    const user = await prisma.users.findUnique({ where: { id: userId } });

    if (user) {
      const updatedUser = await prisma.users.update({
        where: { id: userId },
        data: {
          password,
        },
      });

      res.status(201).json({
        updatedId: userId,
        updatedPassword: password,
      });
    } else {
      res.status(400).json({ error: "Такого id не существует" });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Ошибка при изменении записи" });
  }
});

app.delete("/api/users", async (req, res) => {
  try {
    const { id } = req.body; // Предположим, что в запросе передаются name и description

    const user = await prisma.users.findUnique({ where: { id: id } });
    if (user) {
      await prisma.users.delete({ where: { id: id } });

      res.status(201).json({
        deletedId: id,
      });
    } else {
      res.status(300).json({ error: "Такого id не существует" });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Ошибка при добавлении записи" });
  }
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

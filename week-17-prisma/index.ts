import express from "express";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.ts";
import { deserializeJsonObject } from "@prisma/client/runtime/client";
import { todo } from "node:test";
import { Client } from "pg";

const app = express();

app.get("/users",async(req,res) => {
  const users = await prisma.user.findMany()
res.json({
  message: users
})
})
app.get("/todos/:id",async(req,res) => {
  const id = Number(req.params.id);
  const users = await prisma.user.findFirst({
    where:{
      id:id
    },select:{
      todos:true
    }
  })
res.json({
  message: users
})
  
})

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
  
});



async function getUser() {
  const user = await prisma.user.findFirst({
    where: {
        id: 2
    },include:{
      todos: true
    }

  });

  console.log(user);
}

getUser();


app.listen(3000);
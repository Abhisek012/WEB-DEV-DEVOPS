import "dotenv/config";

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const connectionString = process.env.DATABASE_URL!;

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Starting seed...");

  // Delete child table first because of foreign key constraints
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  console.log("Old data removed");

  await prisma.user.create({
    data: {
      username: "abhi",
      password: "123456",
      age: 22,
      city: "Delhi",
      todos: {
        create: [
          {
            title: "Learn Prisma",
            description: "Learn relations and migrations",
            done: true,
          },
          {
            title: "Build Express API",
            description: "Create CRUD endpoints",
            done: false,
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      username: "john",
      password: "password",
      age: 25,
      city: "Mumbai",
      todos: {
        create: [
          {
            title: "Go Gym",
            description: "Workout for 1 hour",
            done: false,
          },
          {
            title: "Read Book",
            description: "Read Atomic Habits",
            done: true,
          },
        ],
      },
    },
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed");
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
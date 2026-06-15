import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { deserializeJsonObject } from "@prisma/client/runtime/client";

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});



async function createUser() {
  const user = await prisma.user.findFirst({
    where: {
        id: 2
    }
  });

  console.log(user?.email);
}

createUser();

const users = await prisma.user.findMany();

console.log(users);
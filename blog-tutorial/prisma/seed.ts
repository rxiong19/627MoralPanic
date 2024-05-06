import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "admin@moraldisco.com";
  const username = "admin";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const topic = await prisma.topic.create({
    data: {
      title: "Social"
    }
  });

  await prisma.topic.create({
    data: {
      title: "Advice"
    }
  });

  await prisma.topic.create({
    data: {
      title: "News"
    } 
  });

  await prisma.topic.create({
    data: {
      title: "Investigation"
    }
  });

  await prisma.topic.create({
    data: {
      title: "Organization"
    }
  });

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      admin: true,
      approved: true,
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Welcome!",
      userId: user.id,
      topicId: topic.id,
      priority: 1,
      approved: true,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Have a great day!",
      userId: user.id,
      topicId: topic.id,
      priority: 1,
      approved: true,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";
  const username = "rachel";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const topic = await prisma.topic.create({
    data: {
      title: "Main Topic"
    }
  });

  await prisma.topic.create({
    data: {
      title: "Topic 2"
    }
  });

  await prisma.topic.create({
    data: {
      title: "Cute cats"
    } 
  });

  await prisma.topic.create({
    data: {
      title: "Leftist Qanon!"
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
      admin: true
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
      topicId: topic.id,
      priority: 1
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
      topicId: topic.id,
      priority: 1
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

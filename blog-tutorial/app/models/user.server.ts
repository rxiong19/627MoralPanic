import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function userIsAdmin(id: User["id"]) {
  const user = await getUserById(id);
  if (user) {
    const isAdmin = user.admin;
    return isAdmin;
  }
  return false;
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserByUsername(username: User["username"]) {
  return prisma.user.findUnique({ where: { username } });
}

export async function getUnapprovedUsers() {
  return prisma.user.findMany({
    where: { approved: false },
    select: {
      id: true,
      username: true,
      essay1: true,
      essay2: true,
      essay3: true,
      essay4: true,
    },
  });
}

export async function createUser(
  email: User["email"],
  username: string,
  password: string,
  essay1: string,
  essay2: string,
  essay3: string,
  essay4: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email: email,
      username: username,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      essay1: essay1,
      essay2: essay2,
      essay3: essay3,
      essay4: essay4,
    },
  });
}

export async function approveUser(id: User["id"]) {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      approved: true,
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function deleteUserById(id: User["id"]) {
  return prisma.user.delete({ where: { id } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

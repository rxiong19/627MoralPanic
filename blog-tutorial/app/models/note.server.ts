import type { User, Note, Comment } from "@prisma/client";

import { prisma } from "~/db.server";

export function getNote({
  id,
}: Pick<Note, "id"> & {
  userId: User["id"];
}) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true, userId: true },
    where: { id }, //previous id, userId
  });
}

export function getNoteListItems() {
  return prisma.note.findMany({
    // where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createNote({
  body,
  title,
  userId,
}: Pick<Note, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.note.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteNote({
  id,
  userId,
}: Pick<Note, "id"> & { userId: User["id"] }) {
  return prisma.note.deleteMany({
    where: { id, userId },
  });
}



export function getNoteComments({threadId}: {threadId: Note['id']}) {
  return prisma.comment.findMany({
    where: { threadId },
    select: { id: true, body: true, username: true},
    orderBy: { updatedAt: "desc" },
  });
}

export function createComment({
  body,
  username,
  threadId,
}: Pick<Comment, "body"> & {
  username: User["username"];} &
{threadId: Note["id"];}) {
  return prisma.comment.create({
    data: {
      body,
      user: {
        connect: {
          username: username,
        },
      },
      thread: {
        connect: {
          id: threadId,
        }
      }
    },
  });
}
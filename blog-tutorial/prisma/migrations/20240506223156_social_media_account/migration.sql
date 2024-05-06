-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "essay1" TEXT NOT NULL DEFAULT '',
    "essay2" TEXT NOT NULL DEFAULT '',
    "essay3" TEXT NOT NULL DEFAULT '',
    "essay4" TEXT NOT NULL DEFAULT '',
    "socialmedia" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_User" ("admin", "approved", "createdAt", "email", "essay1", "essay2", "essay3", "essay4", "id", "updatedAt", "username") SELECT "admin", "approved", "createdAt", "email", "essay1", "essay2", "essay3", "essay4", "id", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

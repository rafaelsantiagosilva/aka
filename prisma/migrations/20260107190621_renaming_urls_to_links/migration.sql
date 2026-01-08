/*
  Warnings:

  - You are about to drop the `urls` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "urls";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "original_url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "links_original_url_key" ON "links"("original_url");

-- CreateIndex
CREATE UNIQUE INDEX "links_short_url_key" ON "links"("short_url");

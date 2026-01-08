-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "original_url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links_original_url_key" ON "links"("original_url");

-- CreateIndex
CREATE UNIQUE INDEX "links_short_url_key" ON "links"("short_url");

/*
  Warnings:

  - You are about to drop the column `features` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "features",
DROP COLUMN "image",
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "Feature" (
    "id" SERIAL NOT NULL,
    "representingEmoji" TEXT NOT NULL,
    "featureName" TEXT NOT NULL,
    "shortDescription" TEXT,
    "tutorialDemo" TEXT,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technology" (
    "id" SERIAL NOT NULL,
    "representingEmoji" TEXT NOT NULL,
    "technologyName" TEXT NOT NULL,
    "usage" TEXT,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Technology" ADD CONSTRAINT "Technology_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

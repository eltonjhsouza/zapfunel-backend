/*
  Warnings:

  - You are about to alter the column `status` on the `instances` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `instances` MODIFY `status` BOOLEAN NULL;

/*
  Warnings:

  - Added the required column `email` to the `users_in_charge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_in_charge" ADD COLUMN     "email" TEXT NOT NULL;

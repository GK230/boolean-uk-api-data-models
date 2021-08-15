/*
  Warnings:

  - You are about to drop the column `outfitId` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the `_DesignerToEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToGuest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GuestToOutfit` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `season` on the `Outfit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Season" AS ENUM ('AW', 'SS');

-- DropForeignKey
ALTER TABLE "_DesignerToEvent" DROP CONSTRAINT "_DesignerToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_DesignerToEvent" DROP CONSTRAINT "_DesignerToEvent_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToGuest" DROP CONSTRAINT "_EventToGuest_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToGuest" DROP CONSTRAINT "_EventToGuest_B_fkey";

-- DropForeignKey
ALTER TABLE "_GuestToOutfit" DROP CONSTRAINT "_GuestToOutfit_A_fkey";

-- DropForeignKey
ALTER TABLE "_GuestToOutfit" DROP CONSTRAINT "_GuestToOutfit_B_fkey";

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "outfitId",
ADD COLUMN     "eventId" INTEGER;

-- AlterTable
ALTER TABLE "Outfit" DROP COLUMN "season",
ADD COLUMN     "season" "Season" NOT NULL,
ALTER COLUMN "modelId" DROP NOT NULL,
ALTER COLUMN "guestId" DROP NOT NULL;

-- DropTable
DROP TABLE "_DesignerToEvent";

-- DropTable
DROP TABLE "_EventToGuest";

-- DropTable
DROP TABLE "_GuestToOutfit";

-- CreateTable
CREATE TABLE "GuestsOnEvents" (
    "guestId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    PRIMARY KEY ("guestId","eventId")
);

-- AddForeignKey
ALTER TABLE "Designer" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestsOnEvents" ADD FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestsOnEvents" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outfit" ADD FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

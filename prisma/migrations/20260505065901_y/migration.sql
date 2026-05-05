/*
  Warnings:

  - A unique constraint covering the columns `[hotelId,roomType]` on the table `HotelRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HotelRoom_hotelId_roomType_key" ON "HotelRoom"("hotelId", "roomType");

/*
  Warnings:

  - You are about to drop the `Data` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BarrierStatus" AS ENUM ('NONE', 'SLOW', 'MID', 'FAST');

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_washedCarId_fkey";

-- AlterTable
ALTER TABLE "WashedCar" ADD COLUMN     "barrierStatus" "BarrierStatus" NOT NULL DEFAULT 'NONE';

-- DropTable
DROP TABLE "Data";

-- CreateTable
CREATE TABLE "SensorData" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sensorData" JSONB,
    "washedCarId" TEXT NOT NULL,

    CONSTRAINT "SensorData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SensorData" ADD CONSTRAINT "SensorData_washedCarId_fkey" FOREIGN KEY ("washedCarId") REFERENCES "WashedCar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

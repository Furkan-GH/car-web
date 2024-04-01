/*
  Warnings:

  - The `barrierStatus` column on the `WashedCar` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OperationStatus" AS ENUM ('NONE', 'SLOW', 'MID', 'FAST');

-- AlterTable
ALTER TABLE "WashedCar" ADD COLUMN     "fanStatus" "OperationStatus" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "waterTankStatus" "OperationStatus" NOT NULL DEFAULT 'NONE',
DROP COLUMN "barrierStatus",
ADD COLUMN     "barrierStatus" "OperationStatus" NOT NULL DEFAULT 'NONE';

-- DropEnum
DROP TYPE "BarrierStatus";

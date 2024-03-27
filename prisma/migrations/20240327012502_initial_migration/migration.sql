-- CreateEnum
CREATE TYPE "CarStatus" AS ENUM ('NONE', 'BARRIER', 'WATERTANK', 'FAN', 'CAMERA', 'FINISH');

-- CreateTable
CREATE TABLE "WashedCar" (
    "id" TEXT NOT NULL,
    "status" "CarStatus" NOT NULL DEFAULT 'NONE',
    "createdDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WashedCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sensorData" JSONB,
    "washedCarId" TEXT NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_washedCarId_fkey" FOREIGN KEY ("washedCarId") REFERENCES "WashedCar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

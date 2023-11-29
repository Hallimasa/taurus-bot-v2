-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "cetusAlertsChannel" TEXT NOT NULL,
    "gameAlertsChannel" TEXT NOT NULL,
    "archonHuntAlertsChannel" TEXT NOT NULL,
    "orbVallisAlertsChannel" TEXT NOT NULL,
    "baroKiteerAlertsChannel" TEXT NOT NULL,
    "nighwaveAlertsChannel" TEXT NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- DropForeignKey
ALTER TABLE "flights" DROP CONSTRAINT "flights_general_flight_id_fkey";

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_general_flight_id_fkey" FOREIGN KEY ("general_flight_id") REFERENCES "general_flights"("id") ON DELETE CASCADE ON UPDATE CASCADE;

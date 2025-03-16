-- DropForeignKey
ALTER TABLE "destinations" DROP CONSTRAINT "destinations_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "user_trips" DROP CONSTRAINT "user_trips_trip_id_fkey";

-- AddForeignKey
ALTER TABLE "user_trips" ADD CONSTRAINT "user_trips_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destinations" ADD CONSTRAINT "destinations_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

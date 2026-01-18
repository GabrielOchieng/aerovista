import { Stack } from "@mui/material";
import FlightCard from "./FlightCard";

export default function FlightList({ flights }: { flights: any[] }) {
  console.log("flights", flights);
  return (
    <Stack spacing={2} mt={2}>
      {flights.map((f, i) => (
        <FlightCard key={i} flight={f} />
      ))}
    </Stack>
  );
}

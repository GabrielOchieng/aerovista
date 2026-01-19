import { Stack } from "@mui/material";
import FlightCard from "./FlightCard";

export default function FlightList({ flights }: { flights: any[] }) {
  return (
    <Stack spacing={2} mt={2}>
      {flights.map((f, i) => (
        <FlightCard key={i} flight={f} />
      ))}
    </Stack>
  );
}

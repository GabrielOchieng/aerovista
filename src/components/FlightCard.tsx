"use client";

import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelectedFlight } from "@/store/useSelectedFlight";

function createFlightSlug(flight: any) {
  const airline = flight.validatingAirlineCodes[0].toLowerCase();
  const stopsCount = flight.itineraries[0].segments.length - 1;
  const stops = stopsCount === 0 ? "direct" : `${stopsCount}-stop`;
  const price = Math.round(Number(flight.price.total));

  return `${airline}-${stops}-${price}`;
}

export default function FlightCard({ flight }: { flight: any }) {
  const router = useRouter();
  const setSelectedFlight = useSelectedFlight(
    (state) => state.setSelectedFlight,
  );

  const slug = createFlightSlug(flight);

  return (
    <Card elevation={2}>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6">
            {flight.validatingAirlineCodes[0]}
          </Typography>

          <Typography>
            Stops: {flight.itineraries[0].segments.length - 1}
          </Typography>

          <Typography>Price: ${flight.price.total}</Typography>

          <Stack direction="row" justifyContent="flex-end">
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setSelectedFlight(flight);
                router.push(`/flights/${slug}`);
              }}
            >
              View more
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

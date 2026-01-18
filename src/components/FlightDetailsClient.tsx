"use client";

import { Typography } from "@mui/material";
import { useSelectedFlight } from "@/store/useSelectedFlight";
import FlightDetails from "@/components/FlightDetails";
import FlightListSkeleton from "@/components/FlightListSkeleton";

export default function FlightDetailsClient() {
  const { selectedFlight, hasHydrated } = useSelectedFlight();

  if (!hasHydrated) {
    return <FlightListSkeleton />;
  }

  if (!selectedFlight) {
    return (
      <>
        <Typography variant="h6">Flight details unavailable</Typography>
        <Typography color="text.secondary">
          Please return to results and select a flight again.
        </Typography>
      </>
    );
  }

  return <FlightDetails flight={selectedFlight} />;
}

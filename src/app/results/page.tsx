"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PriceChart from "@/components/PriceChart";
import FlightList from "@/components/FlightList";
import Filters from "@/components/Filters";
import FlightListSkeleton from "@/components/FlightListSkeleton";
import { Container, Grid, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import ResultsErrorState from "@/components/ResultsErrorState";
import { useFXAutoRefresh } from "@/hooks/useFXAutoRefresh";

type Flight = {
  price: { total: string };
  itineraries: { segments: any[] }[];
  validatingAirlineCodes: string[];
};

async function fetchFlights(origin: string, destination: string, date: string) {
  const res = await fetch(
    `/api/flights?origin=${origin}&destination=${destination}&date=${date}`,
  );
  if (!res.ok) throw new Error("Failed to fetch flights");
  const data = await res.json();
  return data.data || [];
}

export default function ResultsPage() {
  useFXAutoRefresh();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const date = searchParams.get("date") || "";

  const {
    data: flights = [],
    isLoading,
    isError,
    error,
  } = useQuery<Flight[]>({
    queryKey: ["flights", origin, destination, date],
    queryFn: () => fetchFlights(origin, destination, date),
    enabled: !!origin && !!destination && !!date,
  });

  const [filters, setFilters] = useState({
    maxPrice: 1000,
    stops: "any",
    airlines: [] as string[],
  });

  const filteredFlights = useMemo(() => {
    return flights.filter((f) => {
      const price = Number(f.price.total);
      const stops = f.itineraries[0].segments.length - 1;
      const airline = f.validatingAirlineCodes[0];
      return (
        price <= filters.maxPrice &&
        (filters.stops === "any" || stops === Number(filters.stops)) &&
        (filters.airlines.length === 0 || filters.airlines.includes(airline))
      );
    });
  }, [flights, filters]);

  if (isLoading) return <FlightListSkeleton count={5} />;
  if (isError) return <ResultsErrorState message={(error as Error)?.message} />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4} mt={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Filters
            flights={flights}
            filters={filters}
            setFilters={setFilters}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <PriceChart flights={filteredFlights} />

          <Stack
            sx={{
              mt: 2,
              maxHeight: "70vh",
              overflowY: "auto",
              pr: 1,
            }}
          >
            <FlightList flights={filteredFlights} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

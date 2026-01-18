"use client";

import { Stack, Typography, Divider } from "@mui/material";
import { useSelectedFlight } from "@/store/useSelectedFlight";

export default function FlightDetailsClient({
  flight: initialFlight,
}: {
  flight: any;
}) {
  const flightFromState = useSelectedFlight((state) => state.selectedFlight);
  const flight = flightFromState || initialFlight;

  if (!flight) return <Typography>No flight details available</Typography>;

  const itinerary = flight.itineraries[0];
  const segment = itinerary.segments[0];

  return (
    <Stack spacing={2}>
      <Typography variant="h4">{flight.validatingAirlineCodes[0]}</Typography>
      <Typography variant="h6">
        {segment.departure.iataCode} → {segment.arrival.iataCode}
      </Typography>
      <Typography color="text.secondary">
        Flight {segment.carrierCode} {segment.number}
      </Typography>
      <Divider />
      <Typography>
        Departure: {new Date(segment.departure.at).toLocaleString()}
      </Typography>
      <Typography>
        Arrival: {new Date(segment.arrival.at).toLocaleString()}
      </Typography>
      <Typography>
        Duration: {itinerary.duration.replace("PT", "").toLowerCase()}
      </Typography>
      <Typography>
        Stops: {segment.numberOfStops === 0 ? "Direct" : segment.numberOfStops}
      </Typography>
      <Divider />
      <Typography>Aircraft: {segment.aircraft?.code ?? "N/A"}</Typography>
      <Typography variant="h6">
        Total price: {flight.price.currency} {flight.price.total}
      </Typography>
      <Typography color="text.secondary">
        Base fare: {flight.price.base}
      </Typography>
      <Divider />
      <Typography color="text.secondary">
        Seats available: {flight.numberOfBookableSeats}
      </Typography>
      <Typography color="text.secondary">
        Last ticketing date: {flight.lastTicketingDate}
      </Typography>
    </Stack>
  );
}

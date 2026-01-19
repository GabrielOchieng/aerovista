"use client";

import { Stack, Typography, Divider, Button } from "@mui/material";
import { useSelectedFlight } from "@/store/useSelectedFlight";
import { useCurrency } from "@/store/useCurrency";
import { getAirlineName } from "@/utils/airlines"; // ✅ import the helper

export default function FlightDetails({
  flight: initialFlight,
}: {
  flight?: any;
}) {
  const flightFromState = useSelectedFlight((state) => state.selectedFlight);
  const flight = flightFromState || initialFlight;

  const { currency, convertFromEUR } = useCurrency();

  if (!flight) return <Typography>No flight details available</Typography>;

  const itinerary = flight.itineraries[0];
  const segment = itinerary.segments[0];

  // Airline code and full name
  const airlineCode = flight.validatingAirlineCodes[0];
  const airlineName = getAirlineName(airlineCode);

  // Convert total price from EUR to selected currency
  const totalPrice =
    flight.price.currency === "EUR"
      ? convertFromEUR(Number(flight.price.total)).toFixed(2)
      : flight.price.total;

  const baseFare =
    flight.price.currency === "EUR"
      ? convertFromEUR(Number(flight.price.base)).toFixed(2)
      : flight.price.base;

  // Booking link: use flight.bookingLink if available; fallback to airline homepage
  const bookingLink =
    flight.bookingLink ||
    `https://www.google.com/search?q=${airlineCode}+airline+official+site`;

  return (
    <Stack spacing={2}>
      {/* Show code + full name */}
      <Typography variant="h4">
        {airlineCode} — {airlineName}
      </Typography>

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
      <Typography color="text.secondary">
        Total price: {currency} {totalPrice}
      </Typography>
      <Typography color="text.secondary">
        Base fare: {currency} {baseFare}
      </Typography>

      <Divider />

      <Typography color="text.secondary">
        Seats available: {flight.numberOfBookableSeats}
      </Typography>
      <Typography color="text.secondary">
        Last ticketing date: {flight.lastTicketingDate}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => window.open(bookingLink, "_blank")}
      >
        Book Now
      </Button>
    </Stack>
  );
}

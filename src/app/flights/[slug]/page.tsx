import { Container } from "@mui/material";
import FlightDetailsClient from "@/components/FlightDetailsClient";

export default function FlightDetailsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <FlightDetailsClient />
    </Container>
  );
}

import { Container, Typography, Stack, Box, Grid, Paper } from "@mui/material";
import FeatureCard from "./FeatureCard";

export default function AboutContent() {
  return (
    <Box
      sx={{ minHeight: "100vh", backgroundColor: "background.default", py: 8 }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Stack spacing={2} textAlign="center" mb={6}>
          <Typography variant="h3" component="h1">
            About AirVista
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Empowering travelers to find the best flights, compare prices, and
            plan trips with confidence.
          </Typography>
        </Stack>

        {/* Mission & Vision */}
        <Grid container spacing={4} mb={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Our Mission
              </Typography>
              <Typography>
                To simplify flight search and planning by providing real-time
                price insights, advanced filtering, and booking redirection to
                airline sites.
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Our Vision
              </Typography>
              <Typography>
                To become the go-to platform for travelers worldwide who want
                transparent, efficient, and intelligent flight search solutions.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Features / What We Offer */}
        <Typography variant="h4" mb={4} textAlign="center">
          What We Offer
        </Typography>

        <Grid container spacing={4}>
          <FeatureCard
            title="Smart Flight Search"
            description="Find flights quickly by origin, destination, and travel dates, with results updated instantly."
          />
          <FeatureCard
            title="Live Price Tracking"
            description="Visualize flight price trends and monitor real-time changes as you apply filters."
          />
          <FeatureCard
            title="Advanced Filters"
            description="Filter flights by stops, airlines, and price range to quickly narrow down the best options."
          />
          <FeatureCard
            title="Booking Made Simple"
            description="From AirVista you can conveniently navigate to the airline’s official page to complete your booking securely."
          />
        </Grid>

        {/* Footer / Closing Statement */}
        <Stack spacing={2} textAlign="center" mt={8}>
          <Typography variant="body1" color="text.secondary">
            Built with modern web technologies and powered by the Amadeus API,
            AirVista is designed to help you make informed travel decisions
            efficiently and confidently.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Whether you're a casual traveler or a frequent flyer, AirVista
            provides the tools you need to plan smarter trips, save money, and
            travel stress-free.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

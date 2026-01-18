import { Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box sx={{ textAlign: "center", py: 12 }}>
      <Stack spacing={3} alignItems="center">
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 96, md: 140 },
            fontWeight: 700,
            color: "text.disabled",
          }}
        >
          4✈️4
        </Typography>

        <Typography variant="h5">Oops! Page not found</Typography>

        <Typography color="text.secondary" sx={{ maxWidth: 480 }}>
          The page you’re looking for doesn’t exist or may have been moved.
        </Typography>

        <Link href="/" style={{ textDecoration: "none" }}>
          <Button variant="contained">Start a New Search</Button>
        </Link>
      </Stack>
    </Box>
  );
}

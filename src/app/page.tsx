"use client";

import { useRouter } from "next/navigation";
import SearchForm from "@/components/SearchForm";
import { Box, Container, Typography } from "@mui/material";

export default function HomePage() {
  const router = useRouter();

  const handleSearch = (data: any) => {
    const query = new URLSearchParams(data).toString();
    router.push(`/results?${query}`);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url('/hero2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="md"
        sx={{ backgroundColor: "rgba(0,0,0,0)", p: 4, borderRadius: 2 }}
      >
        <Typography
          variant="h4"
          color="white"
          mb={2}
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              md: "2.5rem",
            },
          }}
        >
          Search, Compare, and Track Flight Prices in Real Time.
        </Typography>

        <SearchForm onSearch={handleSearch} />
      </Container>
    </Box>
  );
}

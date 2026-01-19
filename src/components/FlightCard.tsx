// "use client";

// import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { useSelectedFlight } from "@/store/useSelectedFlight";
// import { useCurrency } from "@/store/useCurrency";

// function createFlightSlug(flight: any) {
//   const airline = flight.validatingAirlineCodes[0].toLowerCase();
//   const stopsCount = flight.itineraries[0].segments.length - 1;
//   const stops = stopsCount === 0 ? "direct" : `${stopsCount}-stop`;
//   const price = Math.round(Number(flight.price.total));

//   return `${airline}-${stops}-${price}`;
// }

// export default function FlightCard({ flight }: { flight: any }) {
//   const router = useRouter();
//   const { currency, convertFromEUR } = useCurrency();
//   const priceEUR = Number(flight.price.total);
//   const converted = convertFromEUR(priceEUR);

//   const setSelectedFlight = useSelectedFlight(
//     (state) => state.setSelectedFlight,
//   );

//   const slug = createFlightSlug(flight);

//   return (
//     <Card elevation={2}>
//       <CardContent>
//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           spacing={2}
//           justifyContent="space-between"
//           alignItems={{ xs: "stretch", sm: "end" }}
//         >
//           <Stack spacing={0.5}>
//             <Typography variant="h6">
//               {flight.validatingAirlineCodes[0]}
//             </Typography>

//             <Typography>
//               Stops: {flight.itineraries[0].segments.length - 1}
//             </Typography>

//             <Typography>
//               Price: {currency} {converted.toFixed(2)}
//             </Typography>
//           </Stack>

//           <Button
//             size="small"
//             variant="outlined"
//             onClick={() => {
//               setSelectedFlight(flight);
//               router.push(`/flights/${slug}`);
//             }}
//             sx={{
//               width: { xs: "100%", sm: "auto" },
//               mt: { xs: 1, sm: 0 },
//               marginLeft: { xs: 0, sm: "auto" },
//             }}
//           >
//             View more
//           </Button>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// }

import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelectedFlight } from "@/store/useSelectedFlight";
import { useCurrency } from "@/store/useCurrency";
import { getAirlineName } from "@/utils/airlines"; // import the util

function createFlightSlug(flight: any) {
  const airline = flight.validatingAirlineCodes[0].toLowerCase();
  const stopsCount = flight.itineraries[0].segments.length - 1;
  const stops = stopsCount === 0 ? "direct" : `${stopsCount}-stop`;
  const price = Math.round(Number(flight.price.total));

  return `${airline}-${stops}-${price}`;
}

export default function FlightCard({ flight }: { flight: any }) {
  const router = useRouter();
  const { currency, convertFromEUR } = useCurrency();
  const priceEUR = Number(flight.price.total);
  const converted = convertFromEUR(priceEUR);

  const setSelectedFlight = useSelectedFlight(
    (state) => state.setSelectedFlight,
  );

  const slug = createFlightSlug(flight);
  const airlineCode = flight.validatingAirlineCodes[0];
  const airlineName = getAirlineName(airlineCode);

  return (
    <Card elevation={2}>
      <CardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "end" }}
        >
          <Stack spacing={0.5}>
            <Typography variant="h6">
              {airlineCode} - {airlineName}
            </Typography>

            <Typography>
              Stops: {flight.itineraries[0].segments.length - 1}
            </Typography>

            <Typography>
              Price: {currency} {converted.toFixed(2)}
            </Typography>
          </Stack>

          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setSelectedFlight(flight);
              router.push(`/flights/${slug}`);
            }}
            sx={{
              width: { xs: "100%", sm: "auto" },
              mt: { xs: 1, sm: 0 },
              marginLeft: { xs: 0, sm: "auto" },
            }}
          >
            View more
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

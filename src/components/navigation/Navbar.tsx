// "use client";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   IconButton,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";

// export default function Navbar() {
//   return (
//     <AppBar position="static">
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Box
//             component="img"
//             src="/logo.jpg"
//             alt="AirVista logo"
//             sx={{ height: 32, width: 32 }}
//           />
//           <Typography variant="h6" component="div">
//             AirVista
//           </Typography>
//         </Box>

//         <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
//           <Button color="inherit">Home</Button>
//           <Button color="inherit">About</Button>
//           <Button color="inherit">Contact</Button>
//         </Box>

//         <IconButton color="inherit" edge="end" sx={{ display: { sm: "none" } }}>
//           <MenuIcon />
//         </IconButton>
//       </Toolbar>
//     </AppBar>
//   );
// }

"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo + Title → Home */}
        <Box
          component={Link}
          href="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <Box
            component="img"
            src="/logo.jpg"
            alt="AirVista logo"
            sx={{ height: 32, width: 32 }}
          />
          <Typography variant="h6" component="div">
            AirVista
          </Typography>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/about">
            About
          </Button>
          <Button color="inherit" component={Link} href="/contact">
            Contact
          </Button>
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton color="inherit" edge="end" sx={{ display: { sm: "none" } }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

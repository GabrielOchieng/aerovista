"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
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
            {menuItems.map((item) => (
              <Button
                key={item.href}
                color="inherit"
                component={Link}
                href={item.href}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { sm: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton component={Link} href={item.href}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

// app/page.js
"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Container maxWidth="md">
        <Box sx={{ mt: 6, border: "1px solid", borderColor: "divider", p: 3, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Stock Management v1.0
          </Typography>
          <List>
            <Link href="/stock/product" passHref legacyBehavior>
              <ListItemButton component="a">
                <ListItemText primary="Products" />
              </ListItemButton>
            </Link>
            <Link href="/stock/category" passHref legacyBehavior>
              <ListItemButton component="a">
                <ListItemText primary="Category" />
              </ListItemButton>
            </Link>
          </List>
        </Box>
      </Container>
    </main>
  );
}

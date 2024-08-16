"use client";
import { blue, common, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
      contrastText: common.white,
    },
    secondary: {
      main: "#ABABAB",
      contrastText: common.white,
    },
    error: {
      main: red[500],
      contrastText: common.white,
    },
  },
  typography: {
    fontFamily: "IBM Plex Sans Thai",
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
    body2: {
      fontSize: "1rem",
    },
    button: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
  },
});

export default theme;

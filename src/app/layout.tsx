"use client";

import "./globals.css";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { oneDarkTheme } from "@uiw/react-codemirror";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <head />
            <body>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}

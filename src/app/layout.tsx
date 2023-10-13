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
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}

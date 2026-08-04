import { createTheme } from "@mui/material/styles";

export const theme = createTheme({

    palette: {

        primary: {
            main: "#1976d2",
        },

        secondary: {
            main: "#00acc1",
        },

        success: {
            main: "#2e7d32",
        },

        warning: {
            main: "#ed6c02",
        },

        error: {
            main: "#d32f2f",
        },

        background: {

            default: "#f4f6f8",

            paper: "#ffffff"

        }

    },

    typography: {

        fontFamily: [
            "Roboto",
            "Arial",
            "sans-serif",
        ].join(","),

        h4: {

            fontWeight: 700,

        },

        h5: {

            fontWeight: 600,

        },

        h6: {

            fontWeight: 600,

        }

    },

    shape: {

        borderRadius: 10,

    },

    components: {

        MuiButton: {

            styleOverrides: {

                root: {

                    borderRadius: 8,

                    textTransform: "none",

                    fontWeight: 600

                }

            }

        },

        MuiCard: {

            styleOverrides: {

                root: {

                    borderRadius: 12,

                    boxShadow: "0 3px 8px rgba(0,0,0,.08)"

                }

            }

        }

    }

});
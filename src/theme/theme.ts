import {
    createTheme,
} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",

        primary: {
            main: "#1976d2",
            dark: "#115293",
            light: "#63a4ff",
            contrastText: "#ffffff",
        },

        secondary: {
            main: "#9c27b0",
            dark: "#6a0080",
            light: "#d05ce3",
            contrastText: "#ffffff",
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

        info: {
            main: "#0288d1",
        },

        background: {
            default: "#f5f7fa",
            paper: "#ffffff",
        },

        text: {
            primary: "#1f2937",
            secondary: "#6b7280",
        },
    },

    typography: {
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',

        h1: {
            fontSize: "32px",
            fontWeight: 700,
        },

        h2: {
            fontSize: "28px",
            fontWeight: 700,
        },

        h3: {
            fontSize: "24px",
            fontWeight: 700,
        },

        h4: {
            fontSize: "22px",
            fontWeight: 700,
        },

        h5: {
            fontSize: "20px",
            fontWeight: 600,
        },

        h6: {
            fontSize: "18px",
            fontWeight: 600,
        },

        body1: {
            fontSize: "16px",
        },

        body2: {
            fontSize: "14px",
        },
    },

    shape: {
        borderRadius: 8,
    },

    spacing: 8,

    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },

            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: "none",
                    fontWeight: 600,
                    padding: "9px 18px",
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                size: "small",
                fullWidth: true,
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow:
                        "0 2px 8px rgba(0, 0, 0, 0.08)",
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },

        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: "#f5f7fa",
                },
            },
        },

        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 700,
                    color: "#1f2937",
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontWeight: 500,
                },
            },
        },
    },
});

export default theme;
import { Box, Button, Paper, Typography } from "@mui/material";

function Login() {
    return (
       <Box
    sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    }}
>
            <Paper
                elevation={4}
                sx={{
                    padding: 4,
                    width: 400,
                }}
            >
                <Typography
    variant="h4"
    sx={{ mb: 3 }}
>
                    SISMEDICO
                </Typography>

             <Typography sx={{ mb: 3 }}>
                    Pantalla de inicio de sesión
                </Typography>

                <Button variant="contained" fullWidth>
                    Iniciar sesión
                </Button>
            </Paper>
        </Box>
    );
}

export default Login;
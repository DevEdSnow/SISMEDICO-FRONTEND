
import {
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";

interface LoaderProps {
    message?: string;
    fullScreen?: boolean;
    size?: number;
}

function Loader({
    message = "Cargando...",
    fullScreen = false,
    size = 40,
}: LoaderProps) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
            sx={{
                width: "100%",
                minHeight: fullScreen ? "100vh" : 200,
            }}
        >
            <CircularProgress size={size} />

            {message && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {message}
                </Typography>
            )}
        </Box>
    );
}

export default Loader;


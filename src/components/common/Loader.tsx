
import {
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
        <div
            style={{
                width: "100%",
                minHeight: fullScreen
                    ? "100vh"
                    : "200px",

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
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
        </div>
    );
}

export default Loader;


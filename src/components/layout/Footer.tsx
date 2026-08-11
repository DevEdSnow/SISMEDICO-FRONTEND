
import {
    Divider,
    Typography,
} from "@mui/material";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            style={{
                width: "100%",
                marginTop: "auto",
            }}
        >
            <Divider />

            <div
                style={{
                    minHeight: "70px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 24px",
                    gap: "16px",
                    flexWrap: "wrap",
                }}
            >
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    © {currentYear} SISMEDICO
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Sistema de Gestión Médica
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Todos los derechos reservados
                </Typography>
            </div>
        </footer>
    );
}

export default Footer;


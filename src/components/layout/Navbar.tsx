
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Avatar,
    Menu,
    MenuItem,
    Divider,
} from "@mui/material";

import {
    useState,
} from "react";

import {
    Link as RouterLink,
    useNavigate,
} from "react-router-dom";

interface NavbarProps {
    nombreUsuario?: string;
    fotoPerfil?: string;
    onLogout?: () => void;
}

function Navbar({
    nombreUsuario = "Usuario",
    fotoPerfil,
    onLogout,
}: NavbarProps) {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] =
        useState<null | HTMLElement>(null);

    const menuOpen = Boolean(anchorEl);

    const handleMenuOpen = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        handleMenuClose();
        navigate("/perfil");
    };

    const handleLogout = () => {
        handleMenuClose();

        if (onLogout) {
            onLogout();
        } else {
            navigate("/login");
        }
    };

    return (
        <AppBar
            position="sticky"
            elevation={2}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    gap: 2,
                }}
            >
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                        color: "inherit",
                        textDecoration: "none",
                        fontWeight: "bold",
                    }}
                >
                    SISMEDICO
                </Typography>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                    }}
                >
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/dashboard"
                    >
                        Dashboard
                    </Button>

                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/citas"
                    >
                        Citas
                    </Button>

                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/pacientes"
                    >
                        Pacientes
                    </Button>

                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/medicos"
                    >
                        Médicos
                    </Button>

                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/especialidades"
                    >
                        Especialidades
                    </Button>

                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/notificaciones"
                    >
                        Notificaciones
                    </Button>

                    <Button
                        onClick={handleMenuOpen}
                        color="inherit"
                        sx={{
                            minWidth: "auto",
                        }}
                    >
                        <Avatar
                            src={fotoPerfil}
                            alt={nombreUsuario}
                            sx={{
                                width: 36,
                                height: 36,
                            }}
                        >
                            {nombreUsuario
                                .charAt(0)
                                .toUpperCase()}
                        </Avatar>
                    </Button>

                    <Menu
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={
                            handleMenuClose
                        }
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <MenuItem
                            onClick={
                                handleProfile
                            }
                        >
                            Mi perfil
                        </MenuItem>

                        <Divider />

                        <MenuItem
                            onClick={
                                handleLogout
                            }
                        >
                            Cerrar sesión
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;


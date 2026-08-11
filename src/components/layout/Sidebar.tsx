
import {
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Divider,
    Typography,
} from "@mui/material";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

interface SidebarProps {
    open?: boolean;
    onClose?: () => void;
    width?: number;
}

interface MenuItem {
    label: string;
    path: string;
}

const menuItems: MenuItem[] = [
    {
        label: "Dashboard",
        path: "/dashboard",
    },
    {
        label: "Citas",
        path: "/citas",
    },
    {
        label: "Pacientes",
        path: "/pacientes",
    },
    {
        label: "Médicos",
        path: "/medicos",
    },
    {
        label: "Especialidades",
        path: "/especialidades",
    },
    {
        label: "Horarios",
        path: "/horarios",
    },
    {
        label: "Diagnósticos",
        path: "/diagnosticos",
    },
    {
        label: "Recetas",
        path: "/recetas",
    },
    {
        label: "Notificaciones",
        path: "/notificaciones",
    },
    {
        label: "Usuarios",
        path: "/usuarios",
    },
];

function Sidebar({
    open = true,
    onClose,
    width = 250,
}: SidebarProps) {
    const navigate = useNavigate();

    const location = useLocation();

    const handleNavigation = (
        path: string
    ) => {
        navigate(path);

        if (onClose) {
            onClose();
        }
    };

    return (
        <Drawer
            variant="persistent"
            open={open}
            onClose={onClose}
            sx={{
                width,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width,
                    boxSizing: "border-box",
                },
            }}
        >
            <div
                style={{
                    minHeight: "64px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 20px",
                }}
            >
                <span
    style={{
        fontSize: "20px",
        fontWeight: "bold",
    }}
>
    SISMEDICO
</span>
            </div>

            <Divider />

            <List>
                {menuItems.map((item) => {
                    const active =
                        location.pathname ===
                            item.path ||
                        location.pathname.startsWith(
                            `${item.path}/`
                        );

                    return (
                        <ListItemButton
                            key={item.path}
                            selected={active}
                            onClick={() =>
                                handleNavigation(
                                    item.path
                                )
                            }
                            sx={{
                                margin: "4px 8px",
                                borderRadius: 1,
                            }}
                        >
                            <ListItemText
                                primary={
                                    item.label
                                }
                            />
                        </ListItemButton>
                    );
                })}
            </List>
        </Drawer>
    );
}

export default Sidebar;


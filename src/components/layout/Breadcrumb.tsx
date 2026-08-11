
import {
    Breadcrumbs,
    Link,
    Typography,
} from "@mui/material";

import {
    Link as RouterLink,
    useLocation,
} from "react-router-dom";

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbProps {
    items?: BreadcrumbItem[];
}

function Breadcrumb({
    items,
}: BreadcrumbProps) {
    const location = useLocation();

    const defaultItems: BreadcrumbItem[] =
        location.pathname
            .split("/")
            .filter(Boolean)
            .map((segment) => ({
                label: segment
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (letter) =>
                        letter.toUpperCase()
                    ),
            }));

    const breadcrumbItems =
        items ?? defaultItems;

    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
                marginBottom: 2,
            }}
        >
            <Link
                component={RouterLink}
                to="/"
                underline="hover"
                color="inherit"
            >
                Inicio
            </Link>

            {breadcrumbItems.map(
                (item, index) => {
                    const isLast =
                        index ===
                        breadcrumbItems.length - 1;

                    return isLast || !item.path ? (
                        <Typography
                            key={`${item.label}-${index}`}
                            color="text.primary"
                        >
                            {item.label}
                        </Typography>
                    ) : (
                        <Link
                            key={`${item.label}-${index}`}
                            component={RouterLink}
                            to={item.path}
                            underline="hover"
                            color="inherit"
                        >
                            {item.label}
                        </Link>
                    );
                }
            )}
        </Breadcrumbs>
    );
}

export default Breadcrumb;

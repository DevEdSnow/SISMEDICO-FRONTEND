
import {
    Card as MuiCard,
    CardContent,
    CardHeader,
    CardActions,
} from "@mui/material";

import type { CardProps as MuiCardProps } from "@mui/material/Card";
import type { ReactNode } from "react";

interface CardComponentProps extends MuiCardProps {
    title?: string;
    subtitle?: string;
    children?: ReactNode;
    actions?: ReactNode;
}

function Card({
    title,
    subtitle,
    children,
    actions,
    ...props
}: CardComponentProps) {
    return (
        <MuiCard
            {...props}
            sx={{
                width: "100%",
                borderRadius: 2,
                ...props.sx,
            }}
        >
            {(title || subtitle) && (
                <CardHeader
                    title={title}
                    subheader={subtitle}
                />
            )}

            {children && (
                <CardContent>
                    {children}
                </CardContent>
            )}

            {actions && (
                <CardActions>
                    {actions}
                </CardActions>
            )}
        </MuiCard>
    );
}

export default Card;

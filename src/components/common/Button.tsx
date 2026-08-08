
import {
    Button as MuiButton,
    CircularProgress,
} from "@mui/material";

import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";

interface ButtonProps extends MuiButtonProps {
    loading?: boolean;
}

function Button({
    loading = false,
    children,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <MuiButton
            {...props}
            disabled={disabled || loading}
        >
            {loading ? (
                <CircularProgress
                    size={24}
                    color="inherit"
                />
            ) : (
                children
            )}
        </MuiButton>
    );
}

export default Button;


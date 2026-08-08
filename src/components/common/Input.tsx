
import {
    TextField,
} from "@mui/material";

import type { TextFieldProps } from "@mui/material/TextField";

interface InputProps extends Omit<TextFieldProps, "variant"> {
    label?: string;
    errorMessage?: string;
}

function Input({
    label,
    errorMessage,
    error,
    helperText,
    ...props
}: InputProps) {
    return (
        <TextField
            {...props}
            label={label}
            error={error || Boolean(errorMessage)}
            helperText={errorMessage || helperText}
            fullWidth
            variant="outlined"
        />
    );
}

export default Input;


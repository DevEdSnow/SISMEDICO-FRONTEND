
import {
    TextField,
    InputAdornment,
    IconButton,
} from "@mui/material";

import type { ChangeEvent } from "react";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onSearch?: () => void;
    disabled?: boolean;
}

function SearchBar({
    value,
    onChange,
    placeholder = "Buscar...",
    onSearch,
    disabled = false,
}: SearchBarProps) {
    const handleChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        onChange(event.target.value);
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter" && onSearch) {
            onSearch();
        }
    };

    return (
        <TextField
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            fullWidth
            size="small"
            variant="outlined"
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <span
                                style={{
                                    fontSize: "20px",
                                }}
                            >
                                🔍
                            </span>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
}

export default SearchBar;

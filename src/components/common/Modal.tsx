
import {
    Modal as MuiModal,
    Paper,
    Typography,
    IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import type { ReactNode } from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    width?: number | string;
}

function Modal({
    open,
    onClose,
    title,
    children,
    width = 500,
}: ModalProps) {
    return (
        <MuiModal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
        >
            <Paper
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width,
                    maxWidth: "90%",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    borderRadius: 2,
                    padding: 3,
                    outline: "none",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    {title && (
                        <Typography
                            id="modal-title"
                            variant="h6"
                        >
                            {title}
                        </Typography>
                    )}

                    <IconButton
                        onClick={onClose}
                        aria-label="Cerrar"
                    >
                        <CloseIcon />
                    </IconButton>
                </div>

                <div>
                    {children}
                </div>
            </Paper>
        </MuiModal>
    );
}

export default Modal;


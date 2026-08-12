
import type {
    ReactNode,
} from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

function AuthLayout({
    children,
}: AuthLayoutProps) {
    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "24px",
                boxSizing: "border-box",
                backgroundColor: "#f5f7fa",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "450px",
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "24px",
                    }}
                >
                    <span
                        style={{
                            fontSize: "28px",
                            fontWeight: "bold",
                        }}
                    >
                        SISMEDICO
                    </span>

                    <div
                        style={{
                            marginTop: "8px",
                            fontSize: "14px",
                            color: "#666",
                        }}
                    >
                        Sistema de Gestión Médica
                    </div>
                </div>

                {children}
            </div>
        </div>
    );
}

export default AuthLayout;


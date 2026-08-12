
import type {
    ReactNode,
} from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Breadcrumb from "../components/layout/Breadcrumb";
import Footer from "../components/layout/Footer";

interface DashboardLayoutProps {
    children: ReactNode;
}

function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f5f7fa",
            }}
        >
            <Navbar />

            <div
                style={{
                    display: "flex",
                    flex: 1,
                    minHeight: 0,
                }}
            >
                <Sidebar />

                <main
                    style={{
                        flex: 1,
                        minWidth: 0,
                        padding: "24px",
                        boxSizing: "border-box",
                        overflow: "auto",
                    }}
                >
                    <Breadcrumb />

                    <div
                        style={{
                            width: "100%",
                        }}
                    >
                        {children}
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}

export default DashboardLayout;


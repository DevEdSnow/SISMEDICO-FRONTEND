import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// Usuarios
import Usuarios from "../pages/usuarios/Usuarios";
import UsuarioDetalle from "../pages/usuarios/UsuarioDetalle";

// Pacientes
import Pacientes from "../pages/pacientes/Pacientes";

// Médicos
import Medicos from "../pages/medicos/Medicos";

// Citas
import Citas from "../pages/citas/Citas";

// Diagnósticos
import Diagnosticos from "../pages/diagnosticos/Diagnosticos";

// Especialidades
import Especialidades from "../pages/especialidades/Especialidades";

// Horarios
import Horarios from "../pages/horarios/Horarios";

// Notificaciones
import Notificaciones from "../pages/notificaciones/Notificaciones";

// Recetas
import Recetas from "../pages/recetas/Recetas";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                {/* =========================
                    AUTENTICACIÓN
                ========================== */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/forgot-password"
                    element={
                        <ForgotPassword />
                    }
                />

                {/* =========================
                    DASHBOARD
                ========================== */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                {/* =========================
                    USUARIOS
                ========================== */}

                <Route
                    path="/usuarios"
                    element={<Usuarios />}
                />

                <Route
                    path="/usuarios/:id"
                    element={
                        <UsuarioDetalle />
                    }
                />

                {/* =========================
                    PACIENTES
                ========================== */}

                <Route
                    path="/pacientes"
                    element={<Pacientes />}
                />

                {/* =========================
                    MÉDICOS
                ========================== */}

                <Route
                    path="/medicos"
                    element={<Medicos />}
                />

                {/* =========================
                    CITAS
                ========================== */}

                <Route
                    path="/citas"
                    element={<Citas />}
                />

                {/* =========================
                    DIAGNÓSTICOS
                ========================== */}

                <Route
                    path="/diagnosticos"
                    element={
                        <Diagnosticos />
                    }
                />

                {/* =========================
                    ESPECIALIDADES
                ========================== */}

                <Route
                    path="/especialidades"
                    element={
                        <Especialidades />
                    }
                />

                {/* =========================
                    HORARIOS
                ========================== */}

                <Route
                    path="/horarios"
                    element={<Horarios />}
                />

                {/* =========================
                    NOTIFICACIONES
                ========================== */}

                <Route
                    path="/notificaciones"
                    element={
                        <Notificaciones />
                    }
                />

                {/* =========================
                    RECETAS
                ========================== */}

                <Route
                    path="/recetas"
                    element={<Recetas />}
                />

                {/* =========================
                    RUTA PRINCIPAL
                ========================== */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

                {/* =========================
                    RUTA NO ENCONTRADA
                ========================== */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
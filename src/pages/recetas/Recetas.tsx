import {
    useEffect,
    useState,
} from "react";

import {
    Button,
    Paper,
    TextField,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";

import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

import {
    fetchRecetas,
    removeReceta,
} from "../../store/receta/recetaSlice";

import RecetaTable from "../../components/tables/RecetaTable";

function Recetas() {
    const dispatch = useAppDispatch();

    const {
        recetas,
        loading,
        error,
    } = useAppSelector(
        (state) => state.receta
    );

    const [busqueda, setBusqueda] =
        useState("");

    useEffect(() => {
        dispatch(fetchRecetas());
    }, [dispatch]);

    const recetasFiltradas =
        recetas.filter((receta) => {
            const texto =
                busqueda
                    .toLowerCase()
                    .trim();

            if (!texto) {
                return true;
            }

            return (
                String(
                    receta.medicamento
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    receta.indicaciones
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    receta.dosis
                )
                    .toLowerCase()
                    .includes(texto) ||
                String(
                    receta.frecuencia
                )
                    .toLowerCase()
                    .includes(texto)
            );
        });

    const handleDelete = async (
        id: number
    ) => {
        const confirmar =
            window.confirm(
                "¿Deseas eliminar esta receta?"
            );

        if (!confirmar) {
            return;
        }

        await dispatch(
            removeReceta(id)
        );
    };

    return (
        <DashboardLayout>
            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                    gap: "16px",
                }}
            >
                <div>
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "28px",
                        }}
                    >
                        Recetas
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            marginTop: "8px",
                        }}
                    >
                        Administración de
                        recetas médicas.
                    </p>
                </div>

                <Button
                    variant="contained"
                    onClick={() =>
                        console.log(
                            "Nueva receta"
                        )
                    }
                >
                    Nueva receta
                </Button>
            </div>

            <Paper
                elevation={2}
                sx={{
                    padding: 2,
                    marginBottom: 3,
                }}
            >
                <TextField
                    label="Buscar receta"
                    placeholder="Medicamento, dosis, frecuencia o indicaciones..."
                    value={busqueda}
                    onChange={(event) =>
                        setBusqueda(
                            event.target.value
                        )
                    }
                    fullWidth
                />
            </Paper>

            {error && (
                <div
                    style={{
                        marginBottom: "16px",
                        padding: "12px",
                        borderRadius: "6px",
                        backgroundColor:
                            "#ffebee",
                        color: "#c62828",
                    }}
                >
                    {error}
                </div>
            )}

            <RecetaTable
                recetas={
                    recetasFiltradas
                }
                loading={loading}
                onView={(receta) => {
                    console.log(
                        "Ver receta:",
                        receta
                    );
                }}
                onEdit={(receta) => {
                    console.log(
                        "Editar receta:",
                        receta
                    );
                }}
                onDelete={(receta) =>
                    handleDelete(
                        receta.id
                    )
                }
            />
        </DashboardLayout>
    );
}

export default Recetas;
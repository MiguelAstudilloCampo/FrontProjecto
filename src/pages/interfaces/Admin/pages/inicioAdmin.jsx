import React, { useEffect, useState } from "react";

import Navbar from "../../../../components/Navbar/Navbar";
import { useAuth } from "../../../../context/AuthContext";

import Loader from "../../../../components/Loader/loader";

const InicioAdmin = () => {
  const [loading, setLoading] = useState(true);

  // los hooks solo pueden ser llamados dentro de un componente funcional
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      {/* {loading && (
        <div className="">
          <Loader></Loader>
        </div>
      )} */}
      {isAuthenticated && user.rol_usuario === "Administrador" ? (
        <div>
          <Navbar
            item1="Inicio"
            item2="Reportes"
            item3="Graficas"
            ruta1="/inicioAdmin"
            ruta2="/ReportesAdmin"
            ruta3="/GraficasAdmin"
            color3="activo"
          />

          <h1 className="text-2xl font-bold text-center mt-10">
            {`Inicio Administrador ${user.username}`}
          </h1>
        </div>
      ) : (
        <p className="text-red-500 ">
          Error: No tienes permiso para acceder a esta página.
        </p>

        //  se redirecciona al login si no esta autenticado
        // <Navigate to="/" />
      )}
    </>
  );
};

export default InicioAdmin;

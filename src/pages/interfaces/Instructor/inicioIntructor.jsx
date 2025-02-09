import React, { useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { useAuth } from "../../../context/AuthContext";
import { inicioSesion } from "../../../api/userController";

// import Footer from "../../../components/Footer/Footer";



const InicioIntructor = () => {



  // traer el rol de la base de datos
  const rol2 = "Instructor";

  // los hooks solo pueden ser llamados dentro de un componente funcional
  const Autenticador = useAuth();
  const nombre = "Daniel"
  const nombre2 = inicioSesion()

  useEffect(()=>{
    
  })


  return (
    <>
      {Autenticador.isAuthenticated && rol2 === "Instructor" ? (
        <div>
          <Navbar
            item1="Inicio"
            item2="Reportes"
            item3="Graficas"
            ruta1="/inicioInstructor"
            ruta2="/ReportesInstructor"
            ruta3="/GraficasInstructor"
            color="activo"
          ></Navbar>

          <div className="p-4">
            <h1 className="text-2xl font-bold text-left mb-4 inline-block">
              Bienvenido {nombre}
            </h1>
          </div>
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

export default InicioIntructor;

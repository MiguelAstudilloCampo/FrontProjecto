import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../../../components/Navbar/Navbar";
import { useAuth } from "../../../context/AuthContext";

import "./style/formularioDesconocidos.css"
const InicioGuardia = () => {
  const [oficinas, setOficinas] = useState([]);
  const [selectedOficina, setSelectedOficina] = useState("");
  const rol3 = "Guardia de seguridad";
  const Autenticador = useAuth();

  useEffect(() => {
    // Hacer la petición a la API para obtener las oficinas
    const fetchOficinas = async () => {
      try {
        const response = await axios.get(
          "https://senauthenticator.onrender.com/api/oficina/"
        );
        setOficinas(response.data); // Asumimos que la respuesta es un array de oficinas
      } catch (error) {
        console.error("Error al obtener las oficinas:", error);
      }
    };

    fetchOficinas();
  }, []);

  return (
    <>
      {Autenticador.isAuthenticated && rol3 === "Guardia de seguridad" ? (
        <div className="bg-gray-100 h-screen flex flex-col">
          <Navbar
            item1="Registro Facial"
            item2="Registro Personas"
            item3="Historial de ingreso"
            ruta1="/InicioGuardia"
            ruta2="/ReconocimientoGuardia"
            ruta3="/PersonasEntrantes"
            color=""
          />
          {/* Main Content */}
          <div className="flex-1 flex flex-col md:flex-row">
            {/* Formulario de Registro */}
            <div className="flex-1 flex items-center  justify-center bg-white border border-gray-300 rounded-lg shadow-md">
              <div className="w-full max-w-xl">
                <h2 className="text-2xl font-semibold text-black mb-4 text-center">
                  Formulario de Registro
                </h2>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="nombresC"
                      className="block text-sm font-medium text-black"
                    >
                      Nombres completos
                    </label>
                    <input
                      type="text"
                      id="nombresC"
                      name="nombresC"
                      required
                      className="mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="documento"
                      className="block text-sm font-medium text-black"
                    >
                      Documento de identificación
                    </label>
                    <input
                      type="text"
                      id="documento"
                      name="documento"
                      required
                      className="mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="oficina"
                      className="block text-sm font-medium text-black"
                    >
                      Oficina
                    </label>
                    <select
                      id="oficina"
                      name="oficina"
                      value={selectedOficina}
                      onChange={(e) => setSelectedOficina(e.target.value)}
                      className="mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="" hidden>
                        Seleccione Oficina
                      </option>
                      {oficinas.map((oficina) => (
                        <option key={oficina.id} value={oficina.id}>
                          {oficina.nombre_oficina}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="diligencia"
                      className="block text-sm font-medium text-black"
                    >
                      Diligencia a realizar
                    </label>
                    <textarea
                      id="diligencia"
                      name="diligencia"
                      rows="3"
                      className="mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Registrar
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Imagen de Indicaciones */}
            <div className="flex-1 flex flex-col items-center justify-center ">
              <img
                src="https://cdn-icons-png.flaticon.com/512/8991/8991839.png"
                alt="Indicaciones"
                className="img rounded  mb-10"
              />
              <p className="p-7 text-center text-black">
                {/* Formulario de registro para personas no pertenecientes al SENA
                y no necesitan de un registro completo en el aplicativo. */}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-center mt-4">
          Error: No tienes permiso para acceder a esta página.
        </p>
      )}
    </>
  );
};

export default InicioGuardia;

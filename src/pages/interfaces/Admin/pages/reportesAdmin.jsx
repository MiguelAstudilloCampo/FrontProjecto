import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { MdOutlineRefresh } from "react-icons/md";
import { useAuth } from "../../../../context/AuthContext";
import { getAllUsers } from "../../../../api/userController";

import "../media/style/reportesAdministrador.css";

import Navbar from "../../../../components/Navbar/Navbar";
import Loader from "../../../../components/Loader/loader"

const ReportesAdmin = () => {
  const rol2 = "Administrador";
  const Autenticador = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentoFiltro, setDocumentoFiltro] = useState("");
  const [datos, setDatos] = useState([]);
  const [refrescar, setRefrescar] = useState(false);

  // Estados para la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  useEffect(() => {
    const recibirDatos = async () => {
      try {
        const result = await getAllUsers();

        if (result) {
          const aprendices = result.filter(
            (registro) => registro.rol_usuario === "Aprendiz"
          );
          setDatos(aprendices);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    recibirDatos();
  }, [refrescar]);

  // se filtra por numero de documento
  const datosFiltrados = documentoFiltro
    ? datos.filter((registro) =>
        registro.numero_documento_usuario.toString().includes(documentoFiltro)
      )
    : datos;

  // Calcular el número total de páginas
  const totalPaginas = Math.ceil(datosFiltrados.length / registrosPorPagina);

  // Obtener los registros correspondientes a la página actual
  const indiceUltimoRegistro = paginaActual * registrosPorPagina;
  const indicePrimerRegistro = indiceUltimoRegistro - registrosPorPagina;
  const registrosActuales = datosFiltrados.slice(
    indicePrimerRegistro,
    indiceUltimoRegistro
  );

  // Funciones para cambiar de página
  const irAPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const irAPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const actualizarUsers = () => {
    setLoading(true);
    setRefrescar((prevRefresh) => !prevRefresh); // Alterna el valor de `refrescar`
  };

  return (
    <>
      {Autenticador.isAuthenticated && rol2 === "Administrador" ? (
        <div className="relative min-h-screen flex flex-col contenedor ">
          <div className="relative">
            <div className="sticky top-0 z-40 bg-white">
              <Navbar
                item1="Inicio"
                item2="Reportes"
                item3="Graficas"
                ruta1="/inicioAdmin"
                ruta2="/ReportesAdmin"
                ruta3="/GraficasAdmin"
                color3="activo"
              />
            </div>

            <div className="max-w-full mx-auto px-4 md:px-6">
              <form
                action=""
                className="flex flex-col gap-4 justify-center mt-12 md:flex-row md:gap-6 lg:gap-10"
              >
                <select
                  name=""
                  id=""
                  className="bg-white p-3 border rounded-lg w-full md:w-auto"
                >
                  <option value="">2669742</option>
                  <option value="">2669756</option>
                  <option value="">2669723</option>
                </select>

                <input
                  type="text"
                  className="border rounded-lg pl-4 bg-white text-black w-full md:w-auto"
                  placeholder="# Documento"
                  value={documentoFiltro}
                  onChange={(e) => setDocumentoFiltro(e.target.value)}
                />

                <select
                  name=""
                  id=""
                  className="bg-white p-3 border rounded-lg w-full md:w-auto"
                >
                  <option value="">Hoy</option>
                  <option value="">Semanal</option>
                  <option value="">Mensual</option>
                </select>

                <Link to="/GraficasAdmin">
                  <button className="btn bg-white flex-1 md:flex-none">
                    Graficas
                  </button>
                </Link>
              </form>

              {loading && (
                <div className="">
                  <Loader></Loader>

                </div>
                // <div className="flex justify-center items-center mt-10">
                //   <div className="loader text-center"></div>
                //   <p className="text-gray-400 z-50 text-lg font-serif mt-4">
                //     Cargando...
                //   </p>
                // </div>
              )}

              {error && (
                <p className="text-red-500 text-center mt-4">Error: {error}</p>
              )}

              <div className="relative max-w-full mt-4  overflow-x-auto p-6">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3 ">
                          Puesto
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                          Nombre
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                          Tipo Identificación
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                          Número Identificación
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Ingreso
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Fecha
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Hora
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {registrosActuales.map((registro, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-4">
                            {indicePrimerRegistro + index + 1}
                          </td>
                          <td className="px-6 py-4 font-semibold">
                            {registro.first_name}
                          </td>
                          <td className="px-6 py-4">
                            {registro.tipo_documento_usuario}
                          </td>
                          <td className="px-6 py-4">
                            {registro.numero_documento_usuario}
                          </td>
                          <td className="px-6 py-4 text-green-500 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#7DDF0C"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                          </td>
                          <td className="px-6 py-4 text-center">05/06/2020</td>
                          <td className="px-6 py-4 text-center">10:00</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <nav className="flex items-center justify-between pt-4 bg-white p-6">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Mostrando {indicePrimerRegistro + 1}-
                      {indiceUltimoRegistro > datosFiltrados.length
                        ? datosFiltrados.length
                        : indiceUltimoRegistro}{" "}
                      de {datosFiltrados.length}
                    </span>
                    <div className="inline-flex">
                      <button
                        onClick={irAPaginaAnterior}
                        disabled={paginaActual === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l hover:bg-blue-200"
                      >
                        Anterior
                      </button>
                      <button
                        onClick={irAPaginaSiguiente}
                        disabled={paginaActual === totalPaginas}
                        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r hover:bg-blue-200"
                      >
                        Siguiente
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className={`${loading ? "mt-52" : ""}`} />
        </div>
      ) : (
        <p className="text-red-500 text-center mt-4">
          Error: No tienes permiso para acceder a esta página.
        </p>
      )}
    </>
  );
};

export default ReportesAdmin;

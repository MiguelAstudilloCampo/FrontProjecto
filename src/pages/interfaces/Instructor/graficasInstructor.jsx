import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Navbar from "../../../components/Navbar/Navbar";
import { useAuth } from "../../../context/AuthContext";

const GraficasInstructor = () => {
  const [fechaInicio, setfechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [selectedFicha, setSelectedFicha] = useState("All");
  const [selectedJornada, setSelectedJornada] = useState("All");

    // traer el rol de la base de datos
    const rol2 = "Instructor";

    // los hooks solo pueden ser llamados dentro de un componente funcional
    const Autenticador = useAuth();

  // Datos de ejemplo, en un caso real estos datos se obtendrían de una API o base de datos
  const data = [
    {
      name: "2024-08-20",
      ficha: "2669742",
      jornada: "Mañana",
      Aprendices: 45,
    },
    { name: "2024-08-20", ficha: "2669756", jornada: "Tarde", Aprendices: 38 },
    { name: "2024-08-21", ficha: "2669742", jornada: "Noche", Aprendices: 20 },
    {
      name: "2024-08-21",
      ficha: "2669723",
      jornada: "Mañana",
      Aprendices: 50,
    },
    { name: "2024-08-22", ficha: "2669756", jornada: "Tarde", Aprendices: 42 },
    { name: "2024-08-22", ficha: "2669723", jornada: "Noche", Aprendices: 35 },
  ];

  // Filtrar los datos según los filtros seleccionados
  const filteredData = data.filter(
    (item) =>
      (selectedFicha === "All" || item.ficha === selectedFicha) &&
      (selectedJornada === "All" || item.jornada === selectedJornada) &&
      (fechaInicio === "" || new Date(item.name) >= new Date(fechaInicio)) &&
      (fechaFin === "" || new Date(item.name) <= new Date(fechaFin))
  );

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6F61",
    "#6A5ACD",
    "#FFD700",
  ];

  // Función para manejar la descarga del reporte
  const descargarGrafica = () => {
    console.log("Descargando reporte...");
  };

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

          {/* Filtros Avanzados */}
          <form className="flex flex-col md:flex-row sm:px-10 gap-4 justify-center mt-6 mb-10">
            <div className="flex flex-col w-full md:w-auto">
              <label
                htmlFor="jornada"
                className="text-gray-600 mb-1 opacity-50"
              >
                Jornada
              </label>
              <select
                id="jornada"
                className="bg-white p-3 border border-gray-300 rounded-lg w-full"
                value={selectedJornada}
                onChange={(e) => setSelectedJornada(e.target.value)}
              >
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
              </select>
            </div>

            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="ficha" className="text-gray-600 mb-1 opacity-50">
                Ficha
              </label>
              <select
                id="ficha"
                className="bg-white p-3 border border-gray-300 rounded-lg w-full"
                value={selectedFicha}
                onChange={(e) => setSelectedFicha(e.target.value)}
              >
                <option value="2669742">2669742</option>
                <option value="2669756">2669756</option>
                <option value="2669723">2669723</option>
              </select>
            </div>

            <div className="flex flex-col w-full md:w-auto">
              <label
                htmlFor="fechaInicio"
                className="text-gray-600 mb-1 opacity-50"
              >
                Fecha de Inicio
              </label>
              <input
                type="date"
                id="fechaInicio"
                className="bg-white p-3 border border-gray-300 rounded-lg w-full"
                value={fechaInicio}
                onChange={(e) => setfechaInicio(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full md:w-auto">
              <label
                htmlFor="FechaFin"
                className="text-gray-600 mb-1 opacity-50"
              >
                Fecha de Fin
              </label>
              <input
                type="date"
                id="FechaFin"
                className="bg-white p-3 border border-gray-300 rounded-lg w-full"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
          </form>

          {/* Botón de Descarga */}
          <div className="flex justify-center mt-10">
            <button
              onClick={descargarGrafica}
              className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Descargar Reporte
            </button>
          </div>

          {/* Indicadores Clave de Rendimiento (KPIs) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="kpi-card bg-blue-500 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Total Aprendices</h3>
              <p className="text-3xl font-bold">
                {filteredData.reduce((acc, curr) => acc + curr.Aprendices, 0)}
              </p>
              <span className="text-sm">Rango de fechas seleccionado</span>
            </div>
            <div className="kpi-card bg-green-500 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Promedio por Día</h3>
              <p className="text-3xl font-bold">
                {(
                  filteredData.reduce((acc, curr) => acc + curr.Aprendices, 0) /
                  (filteredData.length || 1)
                ).toFixed(2)}
              </p>
              <span className="text-sm">Rango de fechas seleccionado</span>
            </div>
            <div className="kpi-card bg-yellow-500 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Día con Mayor Entrada</h3>
              <p className="text-3xl font-bold">
                {filteredData.reduce(
                  (max, curr) =>
                    curr.Aprendices > max ? curr.Aprendices : max,
                  0
                )}
              </p>
              <span className="text-sm">Rango de fechas seleccionado</span>
            </div>
          </div>

          <main className="p-4 mb-40 [@media(max-width:425px)]:mb-96 mt-7">
            <div className="charts grid gap-4 md:grid-cols-2 mb-10">
              <div className="chart-container p-2 bg-white rounded-lg shadow-md">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={filteredData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      label={{
                        value: "Fecha",
                        position: "insideBottom",
                        offset: -8,
                      }}
                    />
                    <YAxis
                      label={{
                        value: "Aprendices",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
                    <Legend />
                    <Bar
                      dataKey="Aprendices"
                      fill="#82ca9d"
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container p-2 bg-white rounded-lg shadow-md">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={filteredData}
                      dataKey="Aprendices"
                      nameKey="name"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {filteredData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </main>

        
        </div>
      ) : (
        <p className="text-red-500 ">
          Error: No tienes permiso para acceder a esta página.
        </p>

        //  se redirecciona al login si no esta autenticado
        // <Navigate to="/" />
      )}
      ;
    </>
  );
};

export default GraficasInstructor;

import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import RutasProtegidas from "./auth/authRoutes.jsx";

import Loader from "./components/Loader/loader.jsx";

// Importaciones dinámicas

// Principales

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));

// Instructor

const InicioIntructor = lazy(() =>
  import("./pages/interfaces/Instructor/inicioIntructor.jsx")
);
const ReportesInstructor = lazy(() =>
  import("./pages/interfaces/Instructor/reportesInstructor.jsx")
);
const GraficasInstructor = lazy(() =>
  import("./pages/interfaces/Instructor/graficasInstructor.jsx")
);

// Vigilante

const GuardiaHome = lazy(() =>
  import("./pages/interfaces/Vigilante/GuardaHome.jsx")
);
const Sobrenosotros = lazy(() =>
  import("./pages/interfaces/Vigilante/Sobrenosotros.jsx")
);
const InicioGuardia = lazy(() =>
  import("./pages/interfaces/Vigilante/InicioGuardia.jsx")
);

// Administrador

const InicioAdmin = lazy(() =>
  import("./pages/interfaces/Admin/pages/inicioAdmin.jsx")
);
const ReportesAdmin = lazy(() =>
  import("./pages/interfaces/Admin/pages/reportesAdmin.jsx")
);
const GraficasAdmin = lazy(() =>
  import("./pages/interfaces/Admin/pages/graficasAdmin.jsx")
);

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <Routes>
          {/* Publicas */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />

          {/* Privadas */}
          <Route element={<RutasProtegidas />}>
            {/* Guardia */}
            <Route path="/InicioGuardia" element={<GuardiaHome />} />
            <Route path="/ReconocimientoGuardia" element={<InicioGuardia />} />
            <Route path="/PersonasEntrantes" element={<Sobrenosotros />} />

            {/* Instructor */}
            <Route path="/inicioInstructor" element={<InicioIntructor />} />
            <Route
              path="/ReportesInstructor"
              element={<ReportesInstructor />}
            />
            <Route
              path="/GraficasInstructor"
              element={<GraficasInstructor />}
            />

            {/* Administrador */}
            <Route path="/inicioAdmin" element={<InicioAdmin />} />
            <Route path="/ReportesAdmin" element={<ReportesAdmin />} />
            <Route path="/GraficasAdmin" element={<GraficasAdmin />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </AuthProvider>
);

export default App;

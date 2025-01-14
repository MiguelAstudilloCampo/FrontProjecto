import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/Logo Reconocimiento Facial - Blanco.png";
import Register from "../ModalRegister/Registro";
import toast from "react-hot-toast";

const NavbarInicio = ({
  item1,
  item2,
  item3,
  ruta1,
  ruta2,
  ruta3,
  color,
  color2,
  color3,
}) => {
  // Estado para controlar la visibilidad del menú móvil y del modal
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [abrirRegister, setAbrirRegister] = useState(false);

  // Función para alternar el estado del menú móvil
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Función para manejar clics fuera del menú móvil
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  // Configurar el event listener para clics fuera del menú móvil
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Función para cerrar el modal de registro
  const cerrarModal = (e) => {
    setAbrirRegister(e);
  };

  // Limpieza de errores al abrir el modal de registro
  useEffect(() => {
    if (abrirRegister) {
      toast("Formulario de registro abierto.");
    }
  }, [abrirRegister]);

  return (
    <>
      {abrirRegister && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white md:max-w-2xl max-w-4xl mx-auto p-8 rounded-lg shadow-lg lg:max-w-6xl max-h-[90vh] overflow-auto">
            <Register cerrarModal={cerrarModal} />
          </div>
        </div>
      )}
      
      <div className="flex w-full z-50 flex-col">
        <nav className="flex items-center justify-between border-b bg-[rgb(39,169,0)] p-4">
          {/* Logo y nombre */}
          <div className="flex items-center xl:ml-16">
            <img src={Logo} alt="Logo" className="w-12 text-black" />
            <a href="#" className="text-xl ml-2 font-medium text-white">
              SENAuthenticator
            </a>
          </div>

          {/* Links del navbar */}
          <div className="flex gap-10 justify-center items-center">
            <div className="hidden md:flex space-x-14">
              <a
                href="#nuestros-servicios"
                to={ruta1}
                className={`text-base font-medium ${
                  color === "activo" ? "text-red-700" : "text-white"
                } hover:text-green-800`}
              >
                {item1}
              </a>
              <a
                href="#sobre-la-app"
                to={ruta2}
                className={`text-base font-medium ${
                  color2 === "activo" ? "text-red-700" : "text-white"
                } hover:text-green-800`}
              >
                {item2}
              </a>
              <a
                href="#testimonios"
                to={ruta3}
                className={`text-base font-medium ${
                  color3 === "activo" ? "text-red-700" : "text-white"
                } hover:text-green-800`}
              >
                {item3}
              </a>
            </div>

            {/* Botones de Iniciar Sesión y Registrarse */}
            <div>
              <Link to="/Login">
                <button className="w-full text-base  rounded-btn hover:bg-white hover:text-lime-600 bg-gradient-to-r bg-green text-white font-medium py-3 px-5 rounded-full ">
                  Iniciar Sesión
                </button>
              </Link>
            </div>

            <div>
              <button
                className="w-full  rounded-btn hover:bg-white hover:text-lime-600 bg-gradient-to-r bg-green text-white font-medium py-3 px-5 rounded-full text-base"
                onClick={() => setAbrirRegister(true)}
              >
                Registrarse
              </button>
            </div>
          </div>

          {/* Menú para móviles */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg"
            >
              <Link
                to={ruta1}
                className={`block px-4 py-2 text-lg font-medium ${
                  color === "activo" ? "text-red-700" : "text-gray-800"
                } hover:bg-gray-200`}
                onClick={toggleMenu}
              >
                {item1}
              </Link>
              <Link
                to={ruta2}
                className={`block px-4 py-2 text-lg font-medium ${
                  color2 === "activo" ? "text-red-700" : "text-gray-800"
                } hover:bg-gray-200`}
                onClick={toggleMenu}
              >
                {item2}
              </Link>
              <Link
                to={ruta3}
                className={`block px-4 py-2 text-lg font-medium ${
                  color3 === "activo" ? "text-red-700" : "text-gray-800"
                } hover:bg-gray-200`}
                onClick={toggleMenu}
              >
                {item3}
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavbarInicio;

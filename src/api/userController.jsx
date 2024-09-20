import { toast } from 'react-hot-toast';
import axios from "./axios";

export const inicioSesion = async (values, guardarUserLocal) => {
  try {
    // Creo la petición HTTP
    const response = await axios.post(
      "inicioSesion/",
      {
        numero_documento_usuario: values.numID,
        password: values.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Usuario logueado correctamente");

      // Accedo al objeto dataUser
      const dataUser = response.data.user;

      // Notificación exitosa
      // toast.success("Usuario logueado correctamente");

      // Llamo a los hooks del contexto, que lo traigo como parámetro desde el componente Login
      guardarUserLocal(dataUser);
      return dataUser;
    } else {
      console.log("El usuario no fue encontrado");
      // toast.error("El usuario no fue encontrado");
    }
  } catch (error) {
    // Notificación de error
    // toast.error("Error al iniciar sesión: " + (error.response?.data?.error || error.message));

    if (error.response) {
      throw new Error(error.response.data.error);
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      throw new Error(error.message);
    }
  }
};

// /////////////////////////////////////////// Register
export const registerUser = async (data) => {
  try {
    // Toma el primer nombre para ponerlo de username
    const userName = data.nombre.split(" ")[0];

    const response = await axios.post(
      "usuario/",
      {
        username: userName,
        first_name: data.nombre,
        tipo_documento_usuario: data.tipoID,
        numero_documento_usuario: data.numID,
        email: data.correo,
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      toast.success("Usuario creado correctamente");
      return response;
    } else {
      toast.error(response.data.error || "Ocurrió un error desconocido en el registro");
    }
  } catch (error) {
    toast.error("Error en la solicitud de registro: " + (error.response?.data?.error || error.message));
  }
};

// /////////////////////////////////////////// Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await axios.get("usuario/", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    toast.error("Error al obtener los usuarios: " + (error.response?.data?.error || error.message));
    if (error.response) {
      throw new Error(error.response.data.error);
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      throw new Error(error.message);
    }
  }
};

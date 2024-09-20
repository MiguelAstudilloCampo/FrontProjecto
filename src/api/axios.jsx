import axios from "axios";

const instancia = axios.create({
    baseURL: "https://senauthenticator-6nrt.onrender.com/api/",
    
    withCredentials: true  // Enviar cookies automáticamente con la solicitud
})

export default instancia;
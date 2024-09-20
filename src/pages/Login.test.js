import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext"; // Ajusta según tu contexto
import Login from "./Login";

describe("Login Component", () => {
  test("renders the login form correctly", () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    expect(screen.getByLabelText(/Número identificación/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Aceptar/i })).toBeInTheDocument();
  });

  test("should show error messages when inputs are empty", async () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    fireEvent.click(screen.getByRole("button", { name: /Aceptar/i }));

    expect(await screen.findByText(/El número de identidad es requerido/i)).toBeInTheDocument();
    expect(await screen.findByText(/La contraseña es requerida/i)).toBeInTheDocument();
  });

  test("should toggle password visibility", () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText(/Contraseña/i);
    const toggleButton = screen.getByRole("button", { hidden: true });

    // Initial state should be password type
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click to toggle visibility
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click again to hide password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});

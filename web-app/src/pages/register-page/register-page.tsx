import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../shared/api/authApi";
import { cn } from "@shared/lib/styles";

import s from "./register-page.module.scss";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await register(email, password);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };
  return (
    <div className={cn(s.pageRegister, "container")}>
      <div className={s.registerContainer}>
        <h1 className={s.registerTitle}>Register</h1>
        <form
          className={s.registerForm}
          onSubmit={handleSubmit}
        >
          <input
            className={s.registerPasswordInput}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={s.registerPasswordInput}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={s.registerError}>{error}</p>}
          <button
            className={s.registerButton}
            type="submit"
          >
            Register
          </button>
        </form>
        <p className={s.registerFooter}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

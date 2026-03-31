import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../shared/api/authApi";
import { cn } from "@shared/lib/styles";

import s from "./login-page.module.scss";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };
  return (
    <div className={cn(s.pageLogin, "container")}>
      <div className={s.loginContainer}>
        <h1 className={s.loginTitle}>Login</h1>

        <form
          className={s.loginForm}
          onSubmit={handleSubmit}
        >
          <input
            className={s.loginInput}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className={s.passwordInput}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p
              className={s.loginError}
            >
              {error}
            </p>
          )}
          <br />
          <button
            className={s.loginButton}
            type="submit"
          >
            Login
          </button>
        </form>
        <p className={s.loginFooter}>
          Already have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

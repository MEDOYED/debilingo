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
        <h1 className={s.loginTitle}>Вхід</h1>

        <form
          className={s.loginForm}
          onSubmit={handleSubmit}
        >
          <input
            className={s.loginPasswordInput}
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={s.inputErrorsContainer}>
            <input
              className={s.loginPasswordInput}
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className={s.loginError}>{error}</p>}
          </div>

          <button
            className={s.loginButton}
            type="submit"
          >
            Війти
          </button>
        </form>
        <p className={s.loginFooter}>
          Немає облікового запису?{" "}
          <Link
            className={s.registerLink}
            to="/register"
          >
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  );
};

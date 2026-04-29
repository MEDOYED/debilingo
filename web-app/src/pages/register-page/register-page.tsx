import { cn } from "@shared/lib/styles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../shared/api/authApi";

import s from "./register-page.module.scss";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await register(email, password, username);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Реєстрація не вдалася");
    }
  };
  return (
    <div className={cn(s.pageRegister, "container")}>
      <div className={s.registerContainer}>
        <h1 className={s.registerTitle}>Реєстрація</h1>
        <form
          autoComplete="off"
          className={s.registerForm}
          onSubmit={handleSubmit}
        >
          <input
            className={s.registerPasswordInput}
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className={s.inputErrorsContainer}>
            <input
              className={s.registerPasswordInput}
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className={s.registerError}>{error}</p>}
          </div>

          <input
            className={s.registerPasswordInput}
            type="text"
            placeholder="Придумайте нікнейм"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />

          <button
            className={s.registerButton}
            type="submit"
          >
            Зареєструватися
          </button>
        </form>
        <p className={s.registerFooter}>
          Вже маєте обліковий запис? <Link to="/login">Вхід</Link>
        </p>
      </div>
    </div>
  );
};

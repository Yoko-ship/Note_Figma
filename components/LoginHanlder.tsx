"use client";
import React, { FormEvent, useState } from "react";
import classes from "@/app/signUp/page.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { loginHanlder } from "@/lib/FetchData";
import { useAppSelect } from "@/store/hooks";
import { useAppDispatch } from "@/store/hooks";
import { addToken } from "@/store/handler";
import { useDispatch } from "react-redux";

function LoginHanlder() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const dispatch = useDispatch();

  const formHanlder = async (e: FormEvent) => {
    e.preventDefault();
    if (pathname === "/signUp") {
      if (password !== confirmPassword) {
        setError("Пароли не совпадают");
      } else {
        const token = await loginHanlder(
          "/api/register",
          { email, password },
          setError,
          setSuccess
        );
        dispatch(addToken(token));
        localStorage.setItem("token", token);
      }
    } else {
      const token = await loginHanlder(
        "/api/login",
        { email, password },
        setError,
        setSuccess
      );
      dispatch(addToken(token));
      localStorage.setItem("token", token);
    }
  };

  return (
    <main className={classes.main}>
      <div className={classes.left}>
        <Image
          src={"/Group.svg"}
          alt="todo-image"
          width={282}
          height={285}
        ></Image>
        <h3>Организуйте свои задачи здесь!</h3>
        <p>Практично, быстро и бесплатно!</p>
      </div>
      <div className={classes.right}>
        <form onSubmit={formHanlder}>
          <label>Почта</label>
          <input
            type="email"
            placeholder="Почта"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label>Пароль</label>
          <input
            type="password"
            placeholder="Пароль"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            minLength={8}
          />
          {pathname === "/signUp" && (
            <>
              <label>Подтверждение</label>
              <input
                type="password"
                placeholder="Подтвердите пароль"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </>
          )}
          <div className={classes.buttons}>
            {pathname === "/login" && (
              <Link href="/signUp">Создать аккаунт</Link>
            )}
            <button>Подтвердить</button>
          </div>

          {error && <p className={classes.error}>{error}</p>}
          {success && <p className={classes.success}>{success}</p>}
        </form>
      </div>
    </main>
  );
}

export default LoginHanlder;

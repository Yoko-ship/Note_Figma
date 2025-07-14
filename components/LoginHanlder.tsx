"use client";
import React, {useState } from "react";
import classes from "@/app/signIn/page.module.css";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginHanlder() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter()

  const formHanlder: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password === confirmPassword) {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data?.error) {
        setError(data.error);
      }
      if (data?.success) {
        setSuccess(data.success);
        const res = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        });
        if (res && !res.error) {
          router.push("/profile");
        }
      }
    } else {
      setError("Пароли не совпадают");
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
          <input type="email" placeholder="Почта" name="email" required />
          <label>Пароль</label>
          <input
            type="password"
            placeholder="Пароль"
            required
            name="password"
            minLength={8}
          />

          <label>Подтверждение</label>
          <input
            type="password"
            placeholder="Подтвердите пароль"
            name="confirmPassword"
            required
          />
          <div className={classes.buttons}>
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

"use client";
import React, { Suspense, useState } from "react";
import classes from "@/app/signIn/page.module.css";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleButton from "./GoogleButton";
import Link from "next/link";
function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null | undefined>("");
  const formHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res && !res.error) {
      router.push("/profile");
    } else {
      setError(res?.error);
    }
  };

  return (
    <Suspense>
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
          <GoogleButton />
          <form onSubmit={formHandler}>
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
            <div className={classes.buttons}>
              <Link href="/register">Создать аккаунт</Link>
              <button type="submit">Подтвердить</button>
            </div>

            {error && <p className={classes.error}>{error}</p>}
          </form>
        </div>
      </main>
    </Suspense>
  );
}

export default SignInForm;

"use client";
import React from "react";
import Link from "next/link";

import { useSession, signOut } from "next-auth/react";
function HeaderLogin() {

  const session = useSession();

  return (
    <>

      {session?.data && <Link href="/profile">Профиль</Link>}
      {session?.data ? (
        <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
          Выйти
        </Link>
      ) : (
        <Link href="/signIn">Войти</Link>
      )}
    </>
  );
}

export default HeaderLogin;

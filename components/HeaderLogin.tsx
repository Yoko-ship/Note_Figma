"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelect } from "@/store/hooks";
import { useAppDispatch } from "@/store/hooks";
import { addToken } from "@/store/handler";
function HeaderLogin() {
  const data = useAppSelect((state) => state.note.token);
  const dispatch = useAppDispatch()
  

  const leaveBtn = () => {
    localStorage.removeItem("token");
    dispatch(addToken(""));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(addToken(token));
    }
  }, [dispatch]);

  return (
    <>
      {data ? (
        <Link href={""} onClick={leaveBtn}>
          Выйти
        </Link>
      ) : (
        <Link href={"/login"}>Войти</Link>
      )}
    </>
  );
}

export default HeaderLogin;

"use client";
import React, { useEffect } from "react";
import classes from "@/app/page.module.css";
import Image from "next/image";
import { ViewToggle } from "./List";
import { useState } from "react";
import Modal from "./Modal";
import { useSession } from "next-auth/react";
import Grids from "./Grids";

export type Data = {
  id: number;
  deadline: string;
  description: string;
  priority: string;
  title: string;
  user_email: string;
};
function Main() {
  const [view, setView] = useState<string>("grids");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [urgent, setUrgent] = useState<Data[]>();
  const [short, setShort] = useState<Data[]>();
  const [chill, setChill] = useState<Data[]>();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated" || !session.user?.email) return;

    const getData = async () => {
      const response = await fetch(
        `/api/notes?userEmail=${session.user?.email}`,
        {
          method: "GET",
        }
      );
      const data: Data[] = await response.json();
      const urgent = data.filter((type) => type.priority === "urgent");
      const short = data.filter((type) => type.priority === "short");
      const chill = data.filter((type) => type.priority === "chill");
      setUrgent(urgent);
      setShort(short);
      setChill(chill);
    };
    getData();
  }, [status, session, isOpen]);



  return (
    <>
      <section className={classes.addMenu}>
        <button onClick={() => setIsOpen(true)}>Добавить</button>
        <ViewToggle setView={setView} view={view} />
      </section>
      {!urgent && !short && !chill && (
        <section className={classes.emptyData}>
          <Image
            src={"/Empty-icon.png"}
            alt="Illustration"
            width={202}
            height={180}
          ></Image>
          <h2>Здесь пока нет заметок...</h2>
          <p>Добавьте заметки и организуйтесь наилучшим образом</p>
        </section>
      )}
      <section className={view === "grids" ? classes.grids : classes.list}>
        <Grids data={urgent!} setData={setUrgent} />
        <Grids data={short!} setData={setShort} />
        <Grids data={chill!} setData={setChill} />
      </section>
      {session?.user && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
      {!session?.user && (
        <h2 className={classes.logNote}>Пожалуста войдите в аккаунт чтобы добавить заметки</h2>
      )}
    </>
  );
}

export default Main;

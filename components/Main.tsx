"use client";
import React from "react";
import classes from "@/app/page.module.css";
import Image from "next/image";
import { ViewToggle } from "./List";
import { useState } from "react";
import Modal from "./Modal";
function Main() {
  const [view, setView] = useState<string>("grid");
  const [isOpen, setIsOpen] = useState<boolean>(false);




  return (
    <>
      <section className={classes.addMenu}>
        <button onClick={() => setIsOpen(true)}>Добавить</button>
        <ViewToggle setView={setView} view={view} />
      </section>
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
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Main;

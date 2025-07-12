"use client";
import React, { FormEvent } from "react";
import classes from "@/app/page.module.css";
import Image from "next/image";
import { ViewToggle } from "./List";
import { useState } from "react";
import Modal from "./Modal";
function Main() {
  const [view, setView] = useState<string>("grid");
  const [isOpen, setIsOpen] = useState<boolean>(false);


  const testHanlder = async() =>{
    const response = await fetch("/api/user",{
      method:"GET"
    })
    setIsOpen(true)
  }


  return (
    <>
      <section className={classes.addMenu}>
        <button onClick={testHanlder}>Добавить</button>
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

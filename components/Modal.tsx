"use client";
import React, { FormEvent, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./modal.module.css";
function Modal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [type, setType] = useState("chill");

  useEffect(() => {
    setMounted(true);
  }, []);

  const formHanlder = (e: FormEvent) => {
    e.preventDefault();
    console.log(title);
    console.log(description);
    console.log(type);
    console.log(data);
  };

  if (!mounted) return;

  return createPortal(
    <>
      <div className={isOpen ? classes.backdrop : undefined}></div>
      <dialog open={isOpen} className={classes.dialog}>
        <div>
          <button onClick={() => setIsOpen(false)}>✖</button>
        </div>
        <h2>Добавить заметку</h2>

        <section className={classes.inputs}>
          <form onSubmit={formHanlder}>
            <label>Заголовок</label>
            <input
              type="text"
              placeholder="Заголовок"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
            <label>Описание</label>
            <input
              type="text"
              placeholder="Что вам нужно сделать?"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
            <label>Крайник срок</label>
            <input
              type="date"
              onChange={(e) => setData(e.target.value)}
              value={data}
              required
            />

            <h3>Уровень приоритета</h3>
            <section className={classes.prioritize}>
              <button
                className={classes.urgent}
                onClick={(e) => setType(e.currentTarget.value)}
                type="button"
                value={"urgent"}
              >
                Срочный
              </button>
              <button
                className={classes.short}
                onClick={(e) => setType(e.currentTarget.value)}
                type="button"
                value={"short"}
              >
                Короткий срок
              </button>
              <button
                className={classes.chill}
                onClick={(e) => setType(e.currentTarget.value)}
                type="button"
                value={"chill"}
              >
                Никакой спешки
              </button>
            </section>
            <button className={classes.add}>Добавить</button>
          </form>
        </section>
      </dialog>
    </>,
    document.getElementById("modal")!
  );
}

export default Modal;

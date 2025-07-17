"use client";
import React, { FormEvent, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./modal.module.css";
import { useSession } from "next-auth/react";
function Modal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [mounted, setMounted] = useState(false);
  const [priority, setPriority] = useState("chill");
  const [success,setSuccess] = useState("")
  const session = useSession()

  useEffect(() => {
    setMounted(true);
  }, []);

  const formHanlder:React.FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const description = formData.get("description");
    const deadline = formData.get("deadline");
    const userEmail = session.data?.user?.email
    
    const response = await fetch("/api/notes",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({title,deadline,description,priority,userEmail})
    })
    const data = await response.json()
    if(data.success){
      setSuccess(data.success)
      setIsOpen(false)
      
    }
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
              name="title"
              required
            />
            <label>Описание</label>
            <input
              type="text"
              placeholder="Что вам нужно сделать?"
              name="description"
              required
            />
            <label>Крайник срок</label>
            <input
              type="date"
              name="deadline"
              required
            />

            <h3>Уровень приоритета</h3>
            <section className={classes.prioritize}>
              <button
                className={classes.urgent}
                onClick={(e) => setPriority(e.currentTarget.value)}
                type="button"
                value={"urgent"}
              >
                Срочный
              </button>
              <button
                className={classes.short}
                onClick={(e) => setPriority(e.currentTarget.value)}
                type="button"
                value={"short"}
              >
                Короткий срок
              </button>
              <button
                className={classes.chill}
                onClick={(e) => setPriority(e.currentTarget.value)}
                type="button"
                value={"chill"}
              >
                Никакой спешки
              </button>
            </section>
            <button className={classes.add}>Добавить</button>
            <p className={classes.success}>{success}</p>
          </form>
        </section>
      </dialog>
    </>,
    document.getElementById("modal")!
  );
}

export default Modal;

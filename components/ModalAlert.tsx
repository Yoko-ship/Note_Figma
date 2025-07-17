"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./modalAlert.module.css"
const ModalAlert: React.FC<{
  alertOpen: boolean;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id:number;
  deleteBtn:(id: number) => Promise<void>
}> = ({ alertOpen, setAlertOpen,id,deleteBtn}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);




  if (!mounted) return;
  return createPortal(
    <>
    <div className={alertOpen ? classes.backdrop : undefined}></div>
      <dialog open={alertOpen} className={classes.dialog}>
        <h2>Хотите удалить заметку?</h2>
        <p>После подтверждения восстановить удалённую заметку будет невозможно.</p>
        <div>
            <button onClick={() => setAlertOpen(false)} className={classes.remain}>Нет, отменить</button>
            <button className={classes.delete} onClick={() => deleteBtn(id)}>Да, удалить</button>
        </div>
      </dialog>
    </>,
    document.querySelector("#modal")!
  );
};

export default ModalAlert;

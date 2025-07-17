"use client";

import React from "react";
import classes from "@/app/page.module.css";
import { Data } from "./Main";
import { useState } from "react";
import ModalAlert from "./ModalAlert";
const Grids: React.FC<{
  data: Data[];
  setData: React.Dispatch<React.SetStateAction<Data[] | undefined>>;
}> = ({ data, setData }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [id,setId] = useState<number>()

  const deleteBtn = async (id: number) => {
    const filteredElements = data.filter((item) => item.id !== id);
    setData(filteredElements);
    const response = await fetch(`/api/notes?id=${id}`, {
      method: "DELETE",
    });
    setAlertOpen(false)
  };


  const deleteWarning = (id:number)=>{
    setAlertOpen(true)
    setId(id)
  }
  return (
    <>
      <div className={classes.column}>
        {data?.map((type) => (
          <div
            className={`${classes.note} ${
              type.priority === "urgent"
                ? classes.urgent
                : type.priority === "short"
                ? classes.short
                : classes.chill
            }`}
            key={type.id}
          >
            <div className={classes.closeBtn}>
              <button onClick={() => deleteWarning(type.id)}>✖️</button>
            </div>
            <div className={classes.titleDeadline}>
              <h2>{type.title}</h2>
              <p>{type.deadline}</p>
            </div>
            <p>{type.description}</p>
          </div>
        ))}
      </div>

      <ModalAlert alertOpen={alertOpen} setAlertOpen={setAlertOpen} id={id!} deleteBtn={deleteBtn}/>
    </>
  );
};

export default Grids;

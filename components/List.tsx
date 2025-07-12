"use client";
import React from "react";
import classes from "@/app/page.module.css"

export const ViewToggle: React.FC<{
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}> = ({ view, setView }) => {
  return (
    <div className={classes.toggleWrapper}>
      <button
        className={`${classes.toggleBtn} ${view === "grid" ? classes.active : ""}`}
        onClick={() => setView("grid")}
        aria-label="Grid view"
      >
        <svg width="16" height="16" fill="currentColor">
          <rect x="2" y="2" width="4" height="4" />
          <rect x="10" y="2" width="4" height="4" />
          <rect x="2" y="10" width="4" height="4" />
          <rect x="10" y="10" width="4" height="4" />
        </svg>
      </button>
      <button
        className={`${classes.toggleBtn} ${view === "list" ? classes.active : ""}`}
        onClick={() => setView("list")}
        aria-label="List view"
      >
        <svg width="16" height="16" fill="currentColor">
          <rect x="2" y="3" width="12" height="2" />
          <rect x="2" y="7" width="12" height="2" />
          <rect x="2" y="11" width="12" height="2" />
        </svg>
      </button>
    </div>
  );
};

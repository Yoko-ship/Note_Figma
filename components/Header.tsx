import React from "react";
import classes from "@/app/page.module.css";
import Image from "next/image";
import Link from "next/link";
import HeaderLogin from "./HeaderLogin";

function Header() {
  return (
    <header className={classes.header}>
      <nav>
        <div className={classes.ui}>
          <Link href="/">
            <Image
              src={"/Group 1.svg"}
              alt="menu-image"
              width={38}
              height={38}
            ></Image>
          </Link>

          <h2>Notes</h2>
          <div className={classes.loginMenu}>
            <HeaderLogin />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

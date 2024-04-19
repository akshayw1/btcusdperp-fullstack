"use client";
import Button2 from "../buttons/button2";
import { useState } from "react";
import styles from "./styles.module.css";
export default function Carrers() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  return (
    <main className={styles.main}>
      <h2 className="blue">E-mail us:- support@btcusdperp.com</h2>
      <div>
        <div className="input1">
          <input type="text" required></input>
          <label>First Name</label>
        </div>
        <div className="input1">
          <input type="text" required></input>
          <label>Last Name</label>
        </div>
      </div>
      <div>
        <div className="input1">
          <input type="text" required></input>
          <label>Phone Number</label>
        </div>
        <div className="input1">
          <input type="text" required></input>
          <label>E-mail ID</label>
        </div>
      </div>
      <div className="input1">
        <textarea
          placeholder="Type Your Message Here"
          type="text"
          required
        ></textarea>
      </div>
      <Button2
        style1={{ "--blue1": "rgb(27,42,80)" }}
        style2={{
          fontWeight: 600,
          fontSize: "1.5rem",
          height: 46,
          paddingRight: 48,
          paddingLeft: 48,
        }}
      >
        Send
      </Button2>
    </main>
  );
}

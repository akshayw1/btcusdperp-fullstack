"use client";
import Button2 from "../buttons/button2";
import { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingToast from "../usersTable/loading";
export default function ContactUs() {
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const sendContact = async (e) => {
    e.preventDefault();

    let newErrors = [];

    if (email === "") {
      newErrors.push("email required");
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.push("email invalid");
    }

    for (let i = 0; i < newErrors.length; i++) {
      toast.warning(newErrors[i]);
    }
    if (newErrors.length > 0) {
      return;
    }
    let toastId;
    try {
      toastId = toast(<LoadingToast text={"sending email..."} />, {
        autoClose: false,
      });
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, first, last, message, phone }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.message !== "user no exist") {
          toast.update(toastId, {
            render: data.message,
            type: "success",
            autoClose: 5000,
          });
        } else {
          toast.update(toastId, {
            render: data.message,
            type: toast.TYPE.ERROR,
            autoClose: 5000,
          });
        }
      } else {
        toast.update(toastId, {
          render: res.error,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: error,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });
      console.log("error");
    }
  };
  return (
    <main className={styles.main}>
      <h2 className="blue">
        Email us at :{" "}
        <a href="mailto: support@btcusdperp.com">support@btcusdperp.com</a>
      </h2>
      <div>
        <div className="input1">
          <input
            onChange={(e) => setFirst(e.target.value)}
            value={first}
            type="text"
            required
          ></input>
          <label>First Name</label>
        </div>
        <div className="input1">
          <input
            onChange={(e) => setLast(e.target.value)}
            value={last}
            type="text"
            required
          ></input>
          <label>Last Name</label>
        </div>
      </div>
      <div>
        <div className="input1">
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="text"
            required
          ></input>
          <label>Phone Number</label>
        </div>
        <div className="input1">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            required
          ></input>
          <label>E-mail ID</label>
        </div>
      </div>
      <div className="input1">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Type Your Message Here"
          type="text"
          required
        ></textarea>
      </div>
      <Button2
        onClick={sendContact}
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

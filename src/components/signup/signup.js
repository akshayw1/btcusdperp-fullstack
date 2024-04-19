"use client";
import Button2 from "../buttons/button2";
import styles from "./../login/styles.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  const register = async (e) => {
    e.preventDefault();

    let newErrors = [];

    if (email === "") {
      newErrors.push("email required");
    }
    if (name === "") {
      newErrors.push("name required");
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.push("email invalid");
    }
    if (password === "") {
      newErrors.push("pass required");
    }
    if (password.length < 6) {
      newErrors.push("password of at least 6 characters");
    }
    if (password.length < 4) {
      newErrors.push("name of at least 4 characters");
    }

    for (let i = 0; i < newErrors.length; i++) {
      toast.warning(newErrors[i]);
    }
    setErrors((arr) => [...newErrors]);
    if (newErrors.length > 0) {
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.message !== "user created") {
          toast.warning(data.message);
        } else {
          toast.success("Registered");
          router.replace("/auth/login");
        }
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <>
      <main className={styles.main}>
        <h2 className={styles.h2}>Get Started</h2>
        <div className="input1">
          <input
            onBlur={() => setErrors([])}
            value={name}
            onChange={(e) => {
              setName(e.target.value.replace(" ", ""));
              setErrors([]);
            }}
            type="text"
            required
          ></input>
          <label>Name</label>
        </div>
        <div className="input1">
          <input
            onBlur={() => setErrors([])}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.replace(" ", ""));
              setErrors([]);
            }}
            type="text"
            required
          ></input>
          <label>Email</label>
        </div>
        <div className="input1">
          <input
            onBlur={() => setErrors([])}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value.replace(" ", ""));
              setErrors([]);
            }}
            type="password"
            required
          ></input>
          <label style={{ "--color1": "rgb(30,49,93)" }}>Password</label>
        </div>
        <Button2
          onClick={register}
          style1={{ "--blue1": "rgb(27,42,80)" }}
          style2={{
            fontWeight: 600,
            fontSize: "1.5rem",
            height: 46,
            paddingRight: 48,
            paddingLeft: 48,
          }}
        >
          Sign up
        </Button2>
        <div className={styles.authOptions}>
          <p>
            <Link href="/auth/login">
              Already have an account? <span className="blue">Sign in</span>
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

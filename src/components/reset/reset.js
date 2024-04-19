"use client";
import Button2 from "../buttons/button2";
import styles from "./../login/styles.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingToast from "../usersTable/loading";
export default function ResetPass() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const resetPass = async (e) => {
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
    setErrors((arr) => [...newErrors]);
    if (newErrors.length > 0) {
      return;
    }
    let toastId;
    try {
      toastId = toast(<LoadingToast text={"sending email..."} />, {
        autoClose: false,
      });
      const res = await fetch("/api/getToken", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email }),
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
    <>
      <main className={styles.main}>
        <h2 className={styles.h2}>Enter Your email to reset the password</h2>

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

        <Button2
          onClick={resetPass}
          style1={{ "--blue1": "rgb(27,42,80)" }}
          style2={{
            fontWeight: 600,
            fontSize: "1.5rem",
            height: 46,
            paddingRight: 48,
            paddingLeft: 48,
          }}
        >
          Reset Password
        </Button2>
        <div className={styles.authOptions}>
          <p>
            <Link href="/auth/login">
              Already have an account? <span className="blue">Sign in</span>
            </Link>
          </p>
          <p>
            <Link href="/auth/signup">
              No Account? <span className="blue">Create One</span>
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

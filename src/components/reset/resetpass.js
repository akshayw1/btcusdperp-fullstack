"use client";
import Button2 from "../buttons/button2";
import styles from "./../login/styles.module.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import LoadingToast from "../usersTable/loading";
export default function Reset({ token }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validLink, setValidLink] = useState("");
  const [errors, setErrors] = useState([]);

  const resetPass = async (e) => {
    e.preventDefault();

    let newErrors = [];

    if (password === "") {
      newErrors.push("pass required");
    }
    if (password.length < 6) {
      newErrors.push("password of at least 6 characters");
    }

    if (password !== confirmPassword) {
      newErrors.push("Passwords do not match");
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
      toastId = toast(<LoadingToast text={"resetting password..."} />, {
        autoClose: false,
      });
      const res = await fetch("/api/resetPass", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ password, token }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.message === "password reset successfully") {
          toast.update(toastId, {
            render: data.message,
            type: "success",
            autoClose: 5000,
          });
          router.replace("/auth/login");
        } else {
          toast.update(toastId, {
            render: data.message,
            type: toast.TYPE.ERROR,
            autoClose: 5000,
          });
        }
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
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await fetch(`/api/checkToken`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          const data = await res.json();
          setValidLink(data.message);
        }
      } catch (error) {
        console.error("Error in the request:", error);
        return [];
      }
    };
    checkToken();
  }, [token]);

  if (validLink === "valid link")
    return (
      <>
        <main className={styles.main}>
          <h2 className={styles.h2}>reset your password</h2>

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
            <label>Password</label>
          </div>
          <div className="input1">
            <input
              onBlur={() => setErrors([])}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value.replace(" ", ""));
                setErrors([]);
              }}
              type="password"
              required
            ></input>
            <label>Confirm Password</label>
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
        </main>
      </>
    );
  else return <></>;
}

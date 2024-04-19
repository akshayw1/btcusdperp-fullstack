"use client";
import { useState, useEffect } from "react";
import styles from "../bitcoin/styles.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingToast from "./loading";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const verifyUser = async (email, isVerifiedUser) => {
    console.log({ email, isVerifiedUser });
    let toastId;
    try {
      toastId = toast(<LoadingToast />, { autoClose: false });
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, isVerifiedUser }),
      });

      if (res.ok) {
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
        toast.update(toastId, {
          render: "User update successfully",
          type: "success",
          autoClose: 5000,
        });
      } else {
        toast.update(toastId, {
          render: res.error,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: error,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const getUsers = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        return data.users;
      } else if (res.status === 404) {
        console.warn("API endpoint not found");
        return [];
      } else {
        console.error("Error in the request:", res.status);
        return [];
      }
    } catch (error) {
      console.error("Error in the request:", error);
      return [];
    }
  };

  return (
    <>
      <main className={styles.main}>
        <table className={`w-full ${styles.table} ${styles.tableAdmin}`}>
          <thead>
            <tr>
              <th className="w-[64px]">N</th>
              <th>Email</th>
              <th>isVerifiedUser</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td className="flex justify-center">
                    <input
                      onChange={(e) => verifyUser(user.email, e.target.checked)}
                      style={{ display: "block" }}
                      type="checkbox"
                      disabled={user.admin}
                      defaultChecked={user.isVerifiedUser}
                    />
                  </td>
                  <td>{user.admin ? "admin" : "user"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

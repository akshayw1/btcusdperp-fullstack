"use client";
import { useState, useEffect } from "react";
import styles from "../bitcoin/styles.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingToast from "@/components/usersTable/loading";

export default function PagesBlocksTable() {
  const [pages, setPages] = useState([]);
  const setPage = async (pageName, isPageBlock) => {
    let toastId;
    try {
      toastId = toast(<LoadingToast text="Updating Page..." />, {
        autoClose: false,
      });
      const res = await fetch("/api/tableListAdmin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ pageName, isPageBlock }),
      });

      if (res.ok) {
        const updatedPage = await getPages();
        setPages(updatedPage);
        toast.update(toastId, {
          render: "Page update successfully",
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
        const updatedpages = await getPages();
        setPages(updatedpages);
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    };

    fetchData();
  }, []);

  const getPages = async () => {
    try {
      const res = await fetch("/api/tableListAdmin", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        return data.data;
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
              <th>Page</th>
              <th>Block</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(pages) &&
              pages.map((page, index) => (
                <tr key={page.name}>
                  <td>{index + 1}</td>
                  <td>{page.name}</td>
                  <td className="flex justify-center">
                    <input
                      onChange={(e) => setPage(page.name, e.target.checked)}
                      style={{ display: "block" }}
                      type="checkbox"
                      defaultChecked={
                        page.blocked !== undefined ? page.blocked : true
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

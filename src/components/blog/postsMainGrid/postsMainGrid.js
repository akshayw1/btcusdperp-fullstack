"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles.module.css";
export default function PostsMainGrid({ tag = "" }) {
  const [mainPostsList, setMainPostsList] = useState([]);
  const [mainPostsPage, setMainPostsPage] = useState(1);
  const [mainTotalPostsPage, setMainTotalPostsPage] = useState(0);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchMainPostsList();
      fetchedRef.current = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchMainPostsList = async () => {
    try {
      const fetchUrl = `/api/blog?&page=${mainPostsPage}&tag=${tag}`;
      setMainPostsPage((prev) => prev + 1);
      const res = await fetch(fetchUrl, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      if (res.ok) {
        const resData = await res.json();
        setMainTotalPostsPage(resData.totalPages);
        setMainPostsList((prev) => [...prev, ...resData.posts]);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  console.log(mainPostsList);
  mainPostsList.sort((a, b) => new Date(b.datePost) - new Date(a.datePost));

  return (
    <div className={styles.mainEntryBox}>
      <div className={styles.entryGrid}>
        {mainPostsList.map((entry) => (
          <Link key={entry._id} href={`/blog/post/${entry._id}`}>
            <div className={styles.entry}>
              <Image
                width={1390}
                height={486}
                alt="post"
                src={entry.imageUrl}
              />
              <div className={styles.categoryLabelBox}>
                <div className={styles.categoryLabel}>{entry.tag}</div>
              </div>
              <p className={styles.entryTitle}>{entry.title}</p>
              <div className={styles.entryInfo}>
                <p className={styles.entryAuthor}>By {entry.author}</p>
                <p className={styles.entryDate}>{formatDate(entry.datePost)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {mainPostsPage !== -1 &&
      mainTotalPostsPage !== 0 &&
      mainPostsPage - 1 < mainTotalPostsPage ? (
        <div onClick={fetchMainPostsList} className={styles.entryGridShowMore}>
          Load More
        </div>
      ) : null}
    </div>
  );
}

"use client";
import { useState, useRef, useEffect } from "react";
import styles from "../styles.module.css";
import PostsMainGrid from "@/components/blog/postsMainGrid/postsMainGrid";
import RecentPostsSection from "@/components/blog/recentPostsSection/recentPostsSection";

export default function BlogHotTagsPage({ tag }) {
  const didMountRef = useRef(false);

  const [recentPostsList, setRecentPostsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchUrl = `/api/blog/recent-posts`;
        const res = await fetch(fetchUrl, {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });
        if (res.ok) {
          const resData = await res.json();
          setRecentPostsList(resData.posts);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    let ignore = false;

    if (!ignore) fetchData();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.bgWhite}>
      <main className={styles.mainHot}>
        <h2 className={styles.hotH2}>
          Hot Stories for #{tag.replace(/%20/g, " ")}
        </h2>
        <section className={`${styles.main} ${styles.mainHotSection}`}>
          <section className={styles.mainSection}>
            <PostsMainGrid tag={tag} />
          </section>
          <RecentPostsSection recentPostsList={recentPostsList} />
        </section>
      </main>
    </div>
  );
}

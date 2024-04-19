"use client";
import { useState, useRef, useEffect } from "react";
import styles from "../styles.module.css";
import Link from "next/link";
export default function HotStoriesSection() {
  const [recentTagsList, setRecentTagsList] = useState([]);
  const didMountRef = useRef(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchUrl = `/api/blog/recent-tags`;
        const res = await fetch(fetchUrl, {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });
        if (res.ok) {
          const resData = await res.json();
          setRecentTagsList(resData.tags);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };
    let ignore = false;

    if (!ignore) fetchTags();

    return () => {
      ignore = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <aside className={styles.hotStory}>
      <h3>Hot Stories</h3>
      <div className={styles.hotStoryGrid}>
        {recentTagsList.map((tag, i) => (
          <Link key={i} href={`/blog/hot-story/${tag}`}>
            <div className={styles.hotStoryLabel}>#{tag}</div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

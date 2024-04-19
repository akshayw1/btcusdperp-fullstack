"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import HotStoriesSection from "@/components/blog/hotStoriesSection/hotStoriesSection";
import RecentPostsSection from "@/components/blog/recentPostsSection/recentPostsSection";
import { useOnboardingContext } from "@/context/MyContext";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import PostsMainGrid from "@/components/blog/postsMainGrid/postsMainGrid";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";

export default function Blog() {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  const didMountRef = useRef(false);
  const { session, status } = useOnboardingContext();
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
    fetchData();
  }, []);
  let richText;
  if (recentPostsList.length > 0) {
    richText = recentPostsList[0].text;

    const div = document.createElement("div");
    div.innerHTML = richText;

    div.querySelectorAll("*").forEach((el) => el.removeAttribute("style"));

    richText = div.innerHTML;
  }
  return (
    <div className={styles.bgWhite}>
      <main className={styles.main}>
        <section className={styles.mainSection}>
          <div className={styles.top}>
            <div className={styles.entryHero}>
              {recentPostsList.length > 0 ? (
                <>
                  <div className={styles.heroPostImg}>
                    <Image
                      width={1390}
                      height={486}
                      alt="blog hero"
                      src={recentPostsList[0].imageUrl}
                    />
                  </div>
                  <div className={styles.heroPostBottom}>
                    <Link href={`/blog/post/${recentPostsList[0]._id}`}>
                      <h3>{recentPostsList[0].title}</h3>
                    </Link>
                    <p
                      className={styles.heroPostText}
                      dangerouslySetInnerHTML={{
                        __html: richText,
                      }}
                    ></p>
                    <div className={styles.entryHeroInfo}>
                      <p>By {recentPostsList[0].author}</p>
                      <p>{formatDate(recentPostsList[0].datePost)}</p>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <RecentPostsSection recentPostsList={recentPostsList} />
          </div>
          {session && session.user.admin ? (
            <Link href={"/blog/create-post"}>
              <div className={styles.createBlogButton}>Create New Post</div>
            </Link>
          ) : (
            ""
          )}
          <PostsMainGrid />
        </section>
        <HotStoriesSection />
      </main>
    </div>
  );
}

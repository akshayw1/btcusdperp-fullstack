import styles from "../styles.module.css";
import Image from "next/image";
import Link from "next/link";
export default function RecentPostsSection({ recentPostsList }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <div className={styles.recentPosts}>
      <h3>Recent Posts</h3>
      <div className={`${styles.gridRecentPosts} scrollbar1`}>
        {recentPostsList.map((entry) => (
          <Link key={entry._id} href={`/blog/post/${entry._id}`}>
            <div className={styles.recentPostEntry}>
              <div className={styles.recentPostEntryImg}>
                <Image
                  width={500}
                  height={500}
                  src={entry.imageUrl}
                  alt="recent post"
                ></Image>
              </div>
              <div className={styles.recentPostText}>
                <p className={styles.recentPostTitle}>{entry.title}</p>
                <div className={styles.recentPostEntryInfo}>
                  <p className={styles.recentPostAuthor}>By {entry.author}</p>
                  <p className={styles.recentPostDate}>
                    {formatDate(entry.datePost)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

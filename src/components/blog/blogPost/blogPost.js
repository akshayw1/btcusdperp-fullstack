"use client";
import HotStoriesSection from "@/components/blog/hotStoriesSection/hotStoriesSection";
import styles from "./styles.module.css";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import TextToSpeech from "@/components/blog/blogPost/textToSpeech/textToSpeech";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from "react-share";
import { usePathname } from "next/navigation";
import { useOnboardingContext } from "@/context/MyContext";
import HtmlParser from "../blogPost/htmlText"

import Link from "next/link";

export default function BlogPost({ id }) {
  const [richText, setRichText] = useState("");
  const [postData, setPostData] = useState(null);
  const router = useRouter();
  const didMountRef = useRef(false);
  const { session, status } = useOnboardingContext();

  const pathname = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}${usePathname()}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchUrl = `/api/blog/${id}`;
        const res = await fetch(fetchUrl, {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });
        if (res.ok) {
          const resData = await res.json();
          setPostData(resData.post);
          setRichText(resData.post.text);
        } else {
          router.push(`/blog`);
        }
      } catch (error) {
        console.log(error);
        router.push(`/blog`);
      }
    };
    if (!didMountRef.current) {
      fetchData();
      didMountRef.current = true;
    }
  }, [id, router]);

  const fetchAddShare = async () => {
    try {
      const fetchUrl = `/api/blog/${id}/share`;
      const res = await fetch(fetchUrl, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {}
  };
  const deletePost = async () => {
    const res = await fetch(`/api/blog/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push(`/blog`);
    } else {
    }
  };

  if (postData)
    return (
      <div className={styles.bgWhite}>
        <main className={styles.main}>
          <section className={styles.mainSection}>
            <h2>{postData.title} </h2>
            <div className={styles.postInfoBox}>
              <p>by {postData.author}</p>
              <div className={styles.postDate}>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.50001 0C2.91016 0 0 2.91016 0 6.5C0 10.0898 2.91015 13 6.50001 13C10.0899 13 13 10.0898 13 6.5C13 2.91016 10.0898 0 6.50001 0ZM0.932384 6.5C0.932384 3.4251 3.4251 0.932378 6.50001 0.932378C9.57492 0.932378 12.0676 3.4251 12.0676 6.5C12.0676 9.57486 9.57492 12.0677 6.50001 12.0677C3.4251 12.0677 0.932384 9.57486 0.932384 6.5ZM6.99065 3.55581C6.99065 3.28479 6.77094 3.06508 6.49992 3.06508C6.2289 3.06508 6.0092 3.28479 6.0092 3.55581V6.50017C6.0092 6.63032 6.0609 6.75514 6.15293 6.84718L8.11584 8.81008C8.30748 9.00169 8.61819 9.00169 8.80983 8.81008C9.00145 8.61845 9.00145 8.30773 8.80983 8.11609L6.99065 6.29691V3.55581Z"
                    fill="white"
                  />
                </svg>
                <p>{postData.datePost}</p>
              </div>
            </div>
            <div className={styles.postTopImgInfoBox}>
              <div className={styles.postTopImgLeft}>
                <div className={styles.postTopText}>
                  <span>{postData.totalViews}</span>
                  Total Views
                </div>
                <div className={styles.postTopText}>
                  <span>{postData.totalShare}</span>
                  Total Share
                </div>
              </div>
              <div className={styles.postTopImgRight}>
                <div className={styles.postTopText}>Listen to Article</div>
                <TextToSpeech text={richText} />
              </div>
            </div>
            <div className={styles.postHeroImg}>
              {postData.imageUrl ? (
                <Image
                  priority
                  alt="hero"
                  width={500}
                  height={500}
                  src={postData.imageUrl}
                />
              ) : null}
            </div>
            {session && session.user.admin ? (
              <div className="flex flex-row gap-4">
                <Link href={`/blog/post/${id}/edit`}>
                  <div className="relative w-full">
                    <div className="gap-2 m-auto mr-0 mt-4 cursor-pointer p-[.5rem] rounded-[8px] flex justify-center items-center right-[15px] bottom-[15px] w-[max-content] h-[3rem] bg-yellow-500">
                      Edit Post
                      <svg
                        width="1.75em"
                        height="1.75em"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <g id="SVGRepo_iconCarrier">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                            fill="#ffffff"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </Link>
                <div className="relative w-full">
                  <div
                    onClick={deletePost}
                    className="m-auto mr-0 mt-4 cursor-pointer p-[.5rem] rounded-[8px] flex justify-center items-center right-[15px] bottom-[15px] w-[max-content] h-[3rem] bg-red-500"
                  >
                    Delete Post
                    <svg
                      width="2rem"
                      height="2rem"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className={styles.mainTextBox}>
              <div className={styles.socialLinkBox}>
                <WhatsappShareButton
                  onShareWindowClose={fetchAddShare}
                  url={pathname}
                >
                  <Image
                    alt="whatsapp"
                    width={32}
                    height={32}
                    src={"/images/blog/Whatsapp.png"}
                  />
                </WhatsappShareButton>

                <FacebookShareButton
                  onShareWindowClose={fetchAddShare}
                  url={pathname}
                >
                  <Image
                    alt="facebook"
                    width={32}
                    height={32}
                    src={"/images/blog/Facebook.png"}
                  />
                </FacebookShareButton>
                <TwitterShareButton
                  onShareWindowClose={fetchAddShare}
                  url={pathname}
                >
                  <Image
                    alt="twitter"
                    width={32}
                    height={32}
                    src={"/images/blog/Twitter.png"}
                  />
                </TwitterShareButton>
                <LinkedinShareButton
                  onShareWindowClose={fetchAddShare}
                  url={pathname}
                >
                  <Image
                    alt="linkendin"
                    width={32}
                    height={32}
                    src={"/images/blog/Linkedin.png"}
                  />
                </LinkedinShareButton>
                <RedditShareButton
                  onShareWindowClose={fetchAddShare}
                  url={pathname}
                >
                  <Image
                    alt="reddit"
                    width={32}
                    height={32}
                    src={"/images/blog/Reddit.png"}
                  />
                </RedditShareButton>
                <TelegramShareButton
                  onShareWindowClose={fetchAddShare}
                  url={pathname}
                >
                  <Image
                    alt="telegram"
                    width={32}
                    height={32}
                    src={"/images/blog/Telegram.png"}
                  />
                </TelegramShareButton>
              </div>
              {/* <div dangerouslySetInnerHTML={{ __html: richText }} /> */}
                <HtmlParser htmlContent = {richText}/>
                {console.log(richText)}
            </div>
          </section>
          <aside className={styles.aside}>
            <HotStoriesSection />
          </aside>
        </main>
      </div>
    );
  return (
    <div className={styles.bgWhite}>
      <main className={styles.main}></main>
    </div>
  );
}

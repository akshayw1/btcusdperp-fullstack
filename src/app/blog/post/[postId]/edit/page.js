"use client";
import { useEffect, useState, useRef } from "react";
import BlogCreatorPost from "@/components/blog/blogCreatePost/blogCreatorPost";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();
  const id = params.postId;
  const [postData, setPostData] = useState("initial");
  const didMountRef = useRef(false);

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

  return <BlogCreatorPost postData={postData} />;
}

import BlogPost from "@/components/blog/blogPost/blogPost";

export default function Page({ params }) {
  return <BlogPost id={params.postId} />;
}

import BlogHotTagsPage from "@/components/blog/blogHotTagsPage/blogHotTagsPage";

export default function Page({ params }) {
  return <BlogHotTagsPage tag={params.tag} />;
}

import ResetPass from "@/components/reset/resetpass";

export default function Page({ params }) {
  return <ResetPass token={params.token} />;
}

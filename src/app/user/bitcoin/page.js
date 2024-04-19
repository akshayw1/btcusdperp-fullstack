import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("@/components/bitcoin/bitcoin"),
  { ssr: false }
);

export default function Page() {
  return <DynamicComponentWithNoSSR />;
}

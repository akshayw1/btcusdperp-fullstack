import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("@/components/ethereum/ethereum"),
  { ssr: false }
);

export default function Page() {
  return <DynamicComponentWithNoSSR />;
}

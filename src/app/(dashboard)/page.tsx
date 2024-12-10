import dynamic from "next/dynamic";

const OverviewPage = dynamic(() => import("./_components/overview"));

export default function Home() {
  return (
    <div>
      <OverviewPage />
    </div>
  );
}

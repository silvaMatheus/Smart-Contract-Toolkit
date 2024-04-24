import { Dashboard } from "@/components/dashboard";
import LastContracts from "@/components/last-contracts";
import News from "@/components/news";
import Stats from "@/components/stats";

export default function Home() {
  return (
    <>
      <Dashboard>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Stats />

          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <LastContracts />
            <News />
          </div>
        </main>
      </Dashboard>
    </>
  );
}

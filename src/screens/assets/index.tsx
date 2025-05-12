import { Separator } from "../../components/ui/separator";
import { AssetsTable } from "./components/assets-table";
import { RecentTrades } from "./components/recent-trades";

export function Assets() {
  return (
    <div className="grid grid-cols-[720px_1fr] gap-6">
      <div className="space-y-2.5 rounded-2xl bg-white p-6 border border-zinc-200">
        <h1 className="font-semibold text-2xl">Assets</h1>
        <AssetsTable />
      </div>
      <div className="rounded-2xl bg-white p-6 border border-zinc-200">
        <h2 className="font-semibold text-xl">Your recent trades</h2>
        <Separator className="my-4" />
        <RecentTrades />
      </div>
    </div>
  );
}

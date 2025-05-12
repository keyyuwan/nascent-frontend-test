import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import { ASSETS_IMAGES, type Asset } from "../../utils/assets-images";
import { OrderbookTable } from "./components/orderbook-table";
import { OrderEntry } from "./components/order-entry";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { TradeHistoryTable } from "./components/trade-history-table";

interface RouteParams {
  asset: Asset;
  [key: string]: string | undefined;
}

export function OrderBook() {
  const params = useParams<RouteParams>();
  const asset = params.asset!;

  const assetImage = ASSETS_IMAGES[asset];

  return (
    <Tabs defaultValue="orderbook">
      <div className="space-y-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Link to="/">
              <ChevronLeft className="size-8" strokeWidth={1.25} />
            </Link>
            <div className="flex items-center gap-2">
              <div className="relative flex items-center">
                <img
                  src={assetImage.src}
                  alt={assetImage.alt}
                  className="rounded-full size-8 z-10 border border-white"
                />
                <div className="border border-white size-8 rounded-full bg-blue-700 flex items-center justify-center text-white ml-[-6px]">
                  $
                </div>
              </div>
              <h1 className="font-semibold text-2xl">
                {asset.toUpperCase()}-USD
              </h1>
            </div>
          </div>

          <TabsList>
            <TabsTrigger
              value="orderbook"
              className="text-zinc-500 data-[state=active]:border-zinc-700 data-[state=active]:text-black"
            >
              Orderbook
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="text-zinc-500 data-[state=active]:border-zinc-700 data-[state=active]:text-black"
            >
              Trade History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="orderbook">
          <div className="grid grid-cols-[600px_1fr] gap-6">
            <div className="space-y-6 rounded-2xl bg-white p-6 border border-zinc-200 shadow-sm">
              <h2 className="font-medium text-xl">Order book</h2>
              <OrderbookTable asset={asset} />
            </div>
            <div className="rounded-2xl bg-white p-6 border border-zinc-200 shadow-sm">
              <OrderEntry asset={asset} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="history">
          <div className="space-y-6 rounded-2xl bg-white p-6 border border-zinc-200 shadow-sm">
            <h2 className="font-medium text-xl">Trade History</h2>
            <TradeHistoryTable asset={asset} />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}

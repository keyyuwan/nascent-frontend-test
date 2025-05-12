import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { LimitOrderForm } from "./limit-order-form";
import type { Asset } from "../../../../utils/assets-images";
import { MarketOrderForm } from "./market-order-form";
import { useOrderEntryStore } from "../../../../store/order-entry/use-order-entry-store";

interface OrderEntryProps {
  asset: Asset;
}

export function OrderEntry({ asset }: OrderEntryProps) {
  const { orderEntry } = useOrderEntryStore();
  const [side, setSide] = useState<"buy" | "sell">("buy");

  useEffect(() => {
    if (orderEntry?.side) {
      setSide(orderEntry.side);
    }
  }, [orderEntry?.side]);

  function handleToggleSide(selectedSide: "buy" | "sell") {
    setSide(selectedSide);
  }

  return (
    <div className="space-y-5">
      <div className="flex">
        <button
          type="button"
          data-active={side === "buy"}
          className="w-full text-center pb-4 border-b text-zinc-500 data-[active=true]:text-emerald-500 data-[active=true]:border-emerald-500 hover:text-emerald-500 transition-colors"
          onClick={() => handleToggleSide("buy")}
        >
          Buy
        </button>
        <button
          type="button"
          data-active={side === "sell"}
          className="w-full text-center pb-4 border-b text-zinc-500 data-[active=true]:text-emerald-500 data-[active=true]:border-emerald-500 hover:text-emerald-500 transition-colors"
          onClick={() => handleToggleSide("sell")}
        >
          Sell
        </button>
      </div>

      <Tabs defaultValue="limit">
        <TabsList>
          <TabsTrigger
            value="limit"
            className="w-20 text-base data-[state=active]:text-blue-700 data-[state=active]:border-blue-700 rounded-2xl hover:text-blue-700 transition-colors"
          >
            Limit
          </TabsTrigger>
          <TabsTrigger
            value="market"
            className="w-20 text-base data-[state=active]:text-blue-700 data-[state=active]:border-blue-700 rounded-2xl hover:text-blue-700 transition-colors"
          >
            Market
          </TabsTrigger>
        </TabsList>

        <TabsContent value="limit">
          <LimitOrderForm asset={asset} side={side} />
        </TabsContent>
        <TabsContent value="market">
          <MarketOrderForm asset={asset} side={side} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { ArrowDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useGetOrderbook } from "../../../hooks/use-get-orderbook";
import type { Asset } from "../../../utils/assets-images";
import { OrderbookTableRow } from "./orderbook-table-row";
import { useEffect, useRef } from "react";

interface OrderbookTableProps {
  asset: Asset;
}

export function OrderbookTable({ asset }: OrderbookTableProps) {
  const { data: orderbook, isLoading } = useGetOrderbook(asset);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;

    if (el) {
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 100);
    }
  }, []);

  return (
    <>
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="text-zinc-500 text-xs w-1/3">
              PRICE (USD)
            </TableHead>
            <TableHead className="text-zinc-500 text-xs w-1/3">
              AMOUNT ({asset.toUpperCase()})
            </TableHead>
            <TableHead className="text-zinc-500 text-xs w-1/3">
              AMOUNT (USD)
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      {/* Asks */}
      <div ref={scrollRef} className="max-h-64 overflow-y-auto scroll-smooth">
        <Table className="w-full table-fixed">
          <TableBody>
            {orderbook?.asks.map((ask, index) => {
              const key = `${index}-${ask[0]}-${ask[1]}`;
              return <OrderbookTableRow key={key} side={ask} type="ask" />;
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mid Price Row */}
      <Table className="w-full table-fixed">
        <TableBody className="border-y">
          <TableRow>
            <TableCell colSpan={2} className="text-red-500">
              <div className="flex items-center gap-2 font-normal ">
                {orderbook?.midMarketPrice}
                <ArrowDown className="size-2" />
              </div>
            </TableCell>
            <TableCell colSpan={1} className="font-normal">
              {orderbook?.spread}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Bids */}
      <div className="max-h-64 overflow-y-auto">
        <Table className="w-full table-fixed">
          <TableBody>
            {orderbook?.bids.map((bid, index) => {
              const key = `${index}-${bid[0]}-${bid[1]}`;
              return <OrderbookTableRow key={key} side={bid} type="bid" />;
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

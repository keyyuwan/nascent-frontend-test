import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useGetUserAssetTradeHistory } from "../../../hooks/use-get-user-asset-trade-history";
import type { Asset } from "../../../utils/assets-images";

interface TradeHistoryTableProps {
  asset: Asset;
}

export function TradeHistoryTable({ asset }: TradeHistoryTableProps) {
  const { data: tradeHistory, isLoading } = useGetUserAssetTradeHistory(asset);

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
              DATE/TIME
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tradeHistory?.history.map((history) => {
            return (
              <TableRow key={history.created_at} className="border-b-0">
                <TableCell
                  data-type={history.side}
                  className="data-[type=sell]:text-red-500 data-[type=buy]:text-emerald-500"
                >
                  {history.price}
                </TableCell>
                <TableCell>{history.amount}</TableCell>
                <TableCell>{history.created_at}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

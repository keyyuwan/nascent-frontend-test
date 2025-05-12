import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import bitcoinImg from "../../../assets/Bitcoin.svg.png";
import ethereumImg from "../../../assets/ethereum-eth.svg";
import { Button } from "../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function AssetsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[160px] text-zinc-500">Pair</TableHead>
          <TableHead className="w-[120px] text-zinc-500">Price</TableHead>
          <TableHead className="w-[120px] text-zinc-500">Volume</TableHead>
          <TableHead className="w-[80px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <div className="flex items-center gap-2">
              <div className="relative flex items-center">
                <img
                  src={bitcoinImg}
                  alt="Bitcoin logo"
                  className="rounded-full size-6 z-10 border border-white"
                />
                <div className="border border-white size-6 rounded-full bg-blue-700 flex items-center justify-center text-white ml-[-6px]">
                  $
                </div>
              </div>
              <span>BTC-USD</span>
            </div>
          </TableCell>
          <TableCell>$50,958.22</TableCell>
          <TableCell>14,100 BTC ($718,510.902)</TableCell>
          <TableCell>
            <Link to="/orderbook/btc">
              <Button
                variant="ghost"
                size="xs"
                className="text-blue-700 hover:text-blue-600 hover:underline"
              >
                Orderbook
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <div className="flex items-center gap-2">
              <div className="relative flex items-center">
                <img
                  src={ethereumImg}
                  alt="Ethereum logo"
                  className="rounded-full size-6 z-10 border border-white"
                />
                <div className="border border-white size-6 rounded-full bg-blue-700 flex items-center justify-center text-white ml-[-6px]">
                  $
                </div>
              </div>
              <span>ETH-USD</span>
            </div>
          </TableCell>
          <TableCell>$2,165.34</TableCell>
          <TableCell>11,050 ETH ($23,927.007)</TableCell>
          <TableCell>
            <Link to="/orderbook/eth">
              <Button
                variant="ghost"
                size="xs"
                className="text-blue-700 hover:text-blue-600 hover:underline"
              >
                Orderbook
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

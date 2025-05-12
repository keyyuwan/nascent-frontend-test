import { Link } from "react-router";
import bitcoinImg from "../../../assets/Bitcoin.svg.png";
import ethereumImg from "../../../assets/ethereum-eth.svg";
import { Button } from "../../../components/ui/button";

export function RecentTrades() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <img
          src={bitcoinImg}
          alt="Bitcoin logo"
          className="rounded-full size-6"
        />

        <div className="flex flex-col">
          <span className="text-sm">Bought BTC</span>
          <span className="text-xs text-zinc-500">
            +0.015 BTC on 05/10/2024
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <img
          src={ethereumImg}
          alt="Ethereum logo"
          className="rounded-full size-6"
        />

        <div className="flex flex-col">
          <span className="text-sm">Sold ETH</span>
          <span className="text-xs text-zinc-500">
            -0.005 ETH on 05/09/2024
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <img
          src={ethereumImg}
          alt="Ethereum logo"
          className="rounded-full size-6"
        />

        <div className="flex flex-col">
          <span className="text-sm">Sold ETH</span>
          <span className="text-xs text-zinc-500">
            -0.002 ETH on 05/05/2024
          </span>
        </div>
      </div>

      <Link to="">
        <Button variant="ghost" size="xs" className="text-blue-700">
          Show all
        </Button>
      </Link>
    </div>
  );
}

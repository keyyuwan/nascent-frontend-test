import { TableCell, TableRow } from "../../../components/ui/table";
import { useFormatOrderbookValues } from "../../../hooks/use-format-orderbook-values";
import { useState } from "react";
import { useOrderEntryStore } from "../../../store/order-entry/use-order-entry-store";
import { Check } from "lucide-react";

interface OrderbookTableRowProps {
  side: string[];
  type: "bid" | "ask";
}

export function OrderbookTableRow({ side, type }: OrderbookTableRowProps) {
  const [showOrderPlacementMessage, setShowOrderPlacementMessage] =
    useState(false);
  const [showSuccessOnPriceFill, setShowSuccessOnPriceFill] = useState(false);
  const { amount, formattedNotional, formattedPrice } =
    useFormatOrderbookValues(side);
  const { setOrderEntry } = useOrderEntryStore();

  function handleShowOrderPlacementMessage() {
    setShowOrderPlacementMessage(true);
  }

  function handleHideOrderPlacementMessage() {
    setShowOrderPlacementMessage(false);
  }

  function handleSetLimitPrice() {
    setOrderEntry({
      side: type === "ask" ? "sell" : "buy",
      limitPrice: formattedPrice,
    });
    setShowSuccessOnPriceFill(true);
    setTimeout(() => {
      setShowSuccessOnPriceFill(false);
    }, 3000);
  }

  return (
    <TableRow className="border-b-0">
      <TableCell
        data-type={type}
        className="data-[type=ask]:text-red-500 data-[type=bid]:text-emerald-500"
      >
        <button
          type="button"
          className="hover:font-semibold"
          onMouseEnter={handleShowOrderPlacementMessage}
          onMouseLeave={handleHideOrderPlacementMessage}
          onClick={handleSetLimitPrice}
        >
          {formattedPrice}
        </button>
        {showOrderPlacementMessage && (
          <span className="inline-block ml-2 text-xs text-zinc-500">
            {showSuccessOnPriceFill ? (
              <Check className="size-4 text-emerald-500" />
            ) : (
              "Use this price"
            )}
          </span>
        )}
      </TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{formattedNotional}</TableCell>
    </TableRow>
  );
}

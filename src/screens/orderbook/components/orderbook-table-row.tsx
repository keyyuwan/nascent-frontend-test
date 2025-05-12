import { TableCell, TableRow } from "../../../components/ui/table";
import { useFormatOrderbookValues } from "../../../hooks/use-format-orderbook-values";
import { useState } from "react";

interface OrderbookTableRowProps {
  side: string[];
  type: "bid" | "ask";
}

export function OrderbookTableRow({ side, type }: OrderbookTableRowProps) {
  const [showOrderPlacementMessage, setShowOrderPlacementMessage] =
    useState(false);
  const { amount, formattedNotional, formattedPrice } =
    useFormatOrderbookValues(side);

  function handleShowOrderPlacementMessage() {
    setShowOrderPlacementMessage(true);
  }

  function handleHideOrderPlacementMessage() {
    setShowOrderPlacementMessage(false);
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
        >
          {formattedPrice}
        </button>
        {showOrderPlacementMessage && (
          <span className="inline-block ml-2 text-xs text-zinc-500">
            Use this price
          </span>
        )}
      </TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{formattedNotional}</TableCell>
    </TableRow>
  );
}

import { Routes, Route } from "react-router";
import { Assets } from "../screens/assets";
import { OrderBook } from "../screens/orderbook";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Assets />} />
      <Route path="/orderbook/:asset" element={<OrderBook />} />
    </Routes>
  );
}

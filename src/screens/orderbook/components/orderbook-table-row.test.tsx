import { render, screen, fireEvent } from "@testing-library/react";
import { OrderbookTableRow } from "./orderbook-table-row";
import { useFormatOrderbookValues } from "../../../hooks/use-format-orderbook-values";
import { useOrderEntryStore } from "../../../store/order-entry/use-order-entry-store";

// Mock the hooks
jest.mock("../../../hooks/use-format-orderbook-values", () => ({
  useFormatOrderbookValues: jest.fn(),
}));

jest.mock("../../../store/order-entry/use-order-entry-store", () => ({
  useOrderEntryStore: jest.fn(),
}));

describe("OrderbookTableRow component", () => {
  const mockSetOrderEntry = jest.fn();
  const mockUseFormatOrderbookValues = useFormatOrderbookValues as jest.Mock;
  const mockUseOrderEntryStore = useOrderEntryStore as unknown as jest.Mock;

  beforeEach(() => {
    mockSetOrderEntry.mockClear();
    mockUseFormatOrderbookValues.mockReturnValue({
      amount: "10",
      formattedNotional: "1000",
      formattedPrice: "100",
    });
    mockUseOrderEntryStore.mockReturnValue({
      setOrderEntry: mockSetOrderEntry,
    });
  });

  it("should render the orderbook row with correct values", () => {
    render(<OrderbookTableRow side={["100", "10", "1000"]} type="bid" />);

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
  });

  it("should show 'Use this price' on hover", async () => {
    render(<OrderbookTableRow side={["100", "10", "1000"]} type="bid" />);

    const priceButton = screen.getByRole("button", { name: /100/i });

    fireEvent.mouseEnter(priceButton);

    expect(screen.getByText("Use this price")).toBeInTheDocument();
  });

  it("should show a success message after clicking on the limit price", async () => {
    render(<OrderbookTableRow side={["100", "10", "1000"]} type="bid" />);

    const priceButton = screen.getByRole("button", { name: /100/i });

    fireEvent.click(priceButton);

    expect(mockSetOrderEntry).toHaveBeenCalledWith({
      side: "buy",
      limitPrice: "100",
    });
    expect(screen.queryByText("Use this price")).not.toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});

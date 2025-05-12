import { render, screen } from "@testing-library/react";
import { Input } from "./input";

describe("Input component", () => {
  it("should render error message when an error message is passed", () => {
    render(<Input errorMessage="error" />);
    expect(screen.getByText("error")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button component", () => {
  it("should render the button with the correct children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should render loading spinner when isLoading is true", () => {
    render(<Button isLoading={true}>Click me</Button>);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("should not render loading spinner when isLoading is false", () => {
    render(<Button isLoading={false}>Click me</Button>);
    expect(screen.queryByTestId("loading-spinner")).toBeNull();
  });
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WeatherForecastError from "../error";

const ERROR_PAGE_TITLE = "Oh snap! You got an error!";
const ERROR_PAGE_MESSAGE =
  "It seems like your web page encounters some unexpected issues. Please press the button below to try again.";

function renderComponent() {
  const handleRetry = jest.fn();
  render(<WeatherForecastError onRetry={handleRetry} />);

  return { handleRetry };
}

describe("WeatherForecastError", () => {
  it("should render correctly handleRetry", async () => {
    renderComponent();

    expect(screen.getByText(ERROR_PAGE_TITLE)).toBeVisible();
    expect(screen.getByText(ERROR_PAGE_MESSAGE)).toBeVisible();
    expect(screen.getByLabelText("retry-btn")).toBeVisible();
  });

  it("should call handleRetry", async () => {
    const { handleRetry } = renderComponent();

    const retryBtn = screen.getByLabelText("retry-btn");
    fireEvent.click(retryBtn);

    await waitFor(() => {
      expect(handleRetry).toHaveBeenCalled();
    });
  });
});

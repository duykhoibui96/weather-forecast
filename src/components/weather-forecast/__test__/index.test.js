import { render, screen } from "@testing-library/react";
import WeatherForecast from "../";

function renderComponent() {
  render(<WeatherForecast />);
}

describe("WeatherForecast", () => {
  it("should render WEATHER FORECAST title", () => {
    renderComponent();
    expect(screen.getByText("WEATHER FORECAST")).toBeVisible();
  });
});

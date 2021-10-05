import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchField from "../";

const KEYWORD = "Ho Chi Minh City";
const PLACEHOLDER = "Type a location";

function renderComponent(
  keyword = KEYWORD,
  placeholder = PLACEHOLDER,
  disabled = false
) {
  const handleKeywordChange = jest.fn();
  const handleSubmit = jest.fn();

  render(
    <SearchField
      keyword={keyword}
      placeholder={placeholder}
      onKeywordChange={handleKeywordChange}
      onSubmit={handleSubmit}
      disabled={disabled}
    />
  );

  return { handleKeywordChange, handleSubmit };
}

describe("SearchField", () => {
  it("should display right keyword", () => {
    renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    expect(searchField.value).toBe(KEYWORD);
  });

  it("should change keyword", () => {
    const { handleKeywordChange } = renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, { target: { value: "any" } });

    expect(handleKeywordChange).toHaveBeenCalled();
  });

  it("should receive form submit event", () => {
    const { handleSubmit } = renderComponent();

    const submitButton = screen.getByLabelText("submit-button");
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalled();
  });
});

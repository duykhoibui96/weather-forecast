import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SuggestionSearch from "../";

const SUGGESTIONS = [
  {
    id: 1,
    title: "Suggestion 1",
  },
  {
    id: 2,
    title: "Suggestion 2",
  },
];

const PLACEHOLDER = "Type a location";
const SUGGESTION_FOUND_KEYWORD = "Ho Chi Minh City";
const SUGGESTION_NOT_FOUND_KEYWORD = "Dummy text";
const EXCEPTION_THROWN_KEYWORD = "Error keyword";

function renderComponent(placeholder = PLACEHOLDER, disabled = false) {
  const handleSearch = jest.fn();
  const handleLoadSuggestions = jest.fn((keyword) => {
    if (keyword === EXCEPTION_THROWN_KEYWORD) {
      throw "Exception found";
    } else if (keyword === SUGGESTION_FOUND_KEYWORD) {
      return SUGGESTIONS;
    }

    return [];
  });
  const renderSuggestion = ({ title }) => <span>{title}</span>;

  render(
    <SuggestionSearch
      onSearch={handleSearch}
      handleLoadSuggestions={handleLoadSuggestions}
      renderSuggestion={renderSuggestion}
      suggestionKeyAttribute="id"
      placeholder={placeholder}
      disabled={disabled}
    />
  );

  return {
    handleSearch,
    handleLoadSuggestions,
  };
}

describe("SuggestionSearch", () => {
  it("should not show search suggestion in the first render", () => {
    renderComponent();
    const searchSuggestionWrapper = screen.queryByLabelText(
      "search-suggestion-wrapper"
    );
    expect(searchSuggestionWrapper).toBeNull();
  });

  it("should show search suggestion when typing any key words", async () => {
    renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, { target: { value: "any keyword" } });

    const searchSuggestionWrapper = await screen.findByLabelText(
      "search-suggestion-wrapper"
    );
    expect(searchSuggestionWrapper).toBeVisible();
  });

  it("should show loading spinner when typing any key words", async () => {
    renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, { target: { value: "any keyword" } });

    await waitFor(() => {
      const spinner = screen.getByLabelText(
        "search-suggestion-loading-spinner"
      );
      expect(spinner).toBeVisible();
    });
  });

  it("should load suggestions", async () => {
    const { handleLoadSuggestions } = renderComponent(PLACEHOLDER);
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, {
      target: { value: SUGGESTION_FOUND_KEYWORD },
    });

    await waitFor(() => {
      expect(handleLoadSuggestions).toHaveBeenCalled();
    });
  });

  it("should display suggestions", async () => {
    renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, {
      target: { value: SUGGESTION_FOUND_KEYWORD },
    });

    await waitFor(() => {
      SUGGESTIONS.forEach(({ title }) =>
        expect(screen.getByText(title)).toBeVisible()
      );
    });

    // Not showing loading spinner icon when suggestions are displayed
    expect(
      screen.queryByLabelText("search-suggestion-loading-spinner")
    ).toBeNull();
  });

  it("should show valid message when no suggestions found", async () => {
    renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, {
      target: { value: SUGGESTION_NOT_FOUND_KEYWORD },
    });

    const message = await screen.findByText(
      "No data found! Please make sure you type the correct input."
    );

    expect(message).toBeVisible();

    // Not showing loading spinner icon when suggestions not found
    expect(
      screen.queryByLabelText("search-suggestion-loading-spinner")
    ).toBeNull();
  });

  it("should show error message when exceptions fired from fetching suggestions", async () => {
    renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, {
      target: { value: EXCEPTION_THROWN_KEYWORD },
    });

    const message = await screen.findByText(
      "Unexpected errors happen! Please try again!"
    );

    expect(message).toBeVisible();

    // Not showing loading spinner icon when encoutering exceptions
    expect(
      screen.queryByLabelText("search-suggestion-loading-spinner")
    ).toBeNull();
  });

  it("should submit the first suggestion when clicking on Search button", async () => {
    const { handleSearch, handleLoadSuggestions } = renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, {
      target: { value: SUGGESTION_FOUND_KEYWORD },
    });

    await waitFor(() => {
      expect(handleLoadSuggestions).toHaveBeenCalled();
    });

    const submitButton = screen.getByLabelText("submit-button");
    fireEvent.click(submitButton);

    expect(handleSearch).toHaveBeenCalledWith(SUGGESTIONS[0]);
  });

  it("should submit the right selected suggestion", async () => {
    const { handleSearch, handleLoadSuggestions } = renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, {
      target: { value: SUGGESTION_FOUND_KEYWORD },
    });

    await waitFor(() => {
      expect(handleLoadSuggestions).toHaveBeenCalled();
    });

    const secondItem = screen.getByText(SUGGESTIONS[1].title);
    fireEvent.click(secondItem);

    expect(handleSearch).toHaveBeenCalledWith(SUGGESTIONS[1]);
  });
});

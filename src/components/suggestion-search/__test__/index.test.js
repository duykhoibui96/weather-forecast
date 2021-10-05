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
  const renderSuggestion = ({ title }) => <div>{title}</div>;

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
    expect(searchSuggestionWrapper).not.toBeInTheDocument();
  });

  it("should show search suggestion when typing any key words", () => {
    renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, { target: { value: "any keyword" } });
    const searchSuggestionWrapper = screen.queryByLabelText(
      "search-suggestion-wrapper"
    );
    expect(searchSuggestionWrapper).toBeInTheDocument();
  });

  it("should show loading spinner when typing any key words", () => {
    renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, { target: { value: "any keyword" } });
    const searchSuggestionLoadingSpinner = screen.queryByLabelText(
      "search-suggestion-loading-spinner"
    );
    expect(searchSuggestionLoadingSpinner).toBeInTheDocument();
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
      // Ensure loading spinner not displayed
      const searchSuggestionWrapper = screen.queryByLabelText(
        "search-suggestion-loading-spinner"
      );
      expect(searchSuggestionWrapper).not.toBeInTheDocument();

      SUGGESTIONS.forEach(({ title }) =>
        expect(screen.queryByText(title)).toBeInTheDocument()
      );
    });
  });

  it("should show valid message when no suggestions found", async () => {
    renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, {
      target: { value: SUGGESTION_NOT_FOUND_KEYWORD },
    });

    await waitFor(() => {
      // Ensure loading spinner not displayed
      const searchSuggestionWrapper = screen.queryByLabelText(
        "search-suggestion-loading-spinner"
      );
      expect(searchSuggestionWrapper).not.toBeInTheDocument();

      const noSuggestionFoundMessage = screen.queryByText(
        "No data found! Please make sure you type the correct input."
      );
      expect(noSuggestionFoundMessage).toBeInTheDocument();
    });
  });

  it("should show error message when exceptions fired from fetching suggestions", async () => {
    renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, {
      target: { value: EXCEPTION_THROWN_KEYWORD },
    });

    await waitFor(() => {
      // Ensure loading spinner not displayed
      const searchSuggestionWrapper = screen.queryByLabelText(
        "search-suggestion-loading-spinner"
      );
      expect(searchSuggestionWrapper).not.toBeInTheDocument();

      const noSuggestionFoundMessage = screen.queryByText(
        "Unexpected errors happen! Please try again!"
      );
      expect(noSuggestionFoundMessage).toBeInTheDocument();
    });
  });

  it("should submit the first suggestion when clicking on Search button", async () => {
    const { handleSearch } = renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, {
      target: { value: SUGGESTION_FOUND_KEYWORD },
    });

    await waitFor(() => {
      // Ensure loading spinner not displayed
      const searchSuggestionWrapper = screen.queryByLabelText(
        "search-suggestion-loading-spinner"
      );
      expect(searchSuggestionWrapper).not.toBeInTheDocument();

      const submitButton = screen.getByLabelText("submit-button");
      fireEvent.click(submitButton);

      expect(handleSearch).toHaveBeenCalledWith(SUGGESTIONS[0]);
    });
  });

  it("should submit the right selected suggestion", async () => {
    const { handleSearch } = renderComponent();
    const searchField = screen.getByPlaceholderText(PLACEHOLDER);
    fireEvent.change(searchField, {
      target: { value: SUGGESTION_FOUND_KEYWORD },
    });

    await waitFor(() => {
      // Ensure loading spinner not displayed
      const searchSuggestionWrapper = screen.queryByLabelText(
        "search-suggestion-loading-spinner"
      );
      expect(searchSuggestionWrapper).not.toBeInTheDocument();

      const secondItem = screen.getByText(SUGGESTIONS[1].title);
      fireEvent.click(secondItem);

      expect(handleSearch).toHaveBeenCalledWith(SUGGESTIONS[1]);
    });
  });
});

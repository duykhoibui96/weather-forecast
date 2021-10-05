import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SuggestionSearch from "../";

describe("SuggestionSearch", () => {
    it("should not show search suggestion in the first render", () => {
        render(
            <SuggestionSearch
                onSearch={() => {}}
                handleLoadSuggestions={() => {}}
                renderSuggestion={() => {}}
                suggestionKeyAttribute=""
            />
        );
        const searchSuggestionWrapper = screen.queryByLabelText("search-suggestion-wrapper"); 
        expect(searchSuggestionWrapper).not.toBeInTheDocument();
    });

    it("should show search suggestion when typing any key words", () => {
        const placeholder = "Type a location";

        render(
            <SuggestionSearch
                placeholder={placeholder}
                onSearch={() => {}}
                handleLoadSuggestions={() => {}}
                renderSuggestion={() => {}}
                suggestionKeyAttribute=""
            />
        );
        const searchField = screen.getByPlaceholderText(placeholder);
        fireEvent.change(searchField, { target: { value: "any keyword" } });
        const searchSuggestionWrapper = screen.queryByLabelText("search-suggestion-wrapper");
        expect(searchSuggestionWrapper).toBeInTheDocument()
    });

    it("should show loading spinner when typing any key words", () => {
        const placeholder = "Type a location";

        render(
            <SuggestionSearch
                placeholder={placeholder}
                onSearch={() => {}}
                handleLoadSuggestions={() => {}}
                renderSuggestion={() => {}}
                suggestionKeyAttribute=""
            />
        );
        const searchField = screen.getByPlaceholderText(placeholder);
        fireEvent.change(searchField, { target: { value: "any keyword" } });
        const searchSuggestionLoadingSpinner = screen.queryByLabelText("search-suggestion-loading-spinner");
        expect(searchSuggestionLoadingSpinner).toBeInTheDocument()
    });

    it("should load suggestions", async () => {
        const placeholder = "Type a location";
        const suggestions = [
            {
                id: 1,
                title: 'Suggestion 1'
            },
            {
                id: 2,
                title: 'Suggestion 2'
            }
        ]

        render(
            <SuggestionSearch
                placeholder={placeholder}
                onSearch={() => {}}
                handleLoadSuggestions={() => suggestions}
                renderSuggestion={({ title }) => <span>{title}</span>}
                suggestionKeyAttribute="id"
            />
        );
        const searchField = screen.getByPlaceholderText(placeholder);
        fireEvent.change(searchField, { target: { value: "any keyword" } });
        
        await waitFor(() => {
            // Ensure loading spinner not displayed
            const searchSuggestionWrapper = screen.queryByLabelText("search-suggestion-loading-spinner");
            expect(searchSuggestionWrapper).not.toBeInTheDocument()

            suggestions.forEach(({ title }) => expect(screen.queryByText(title)).toBeInTheDocument())
        });
    });

    it("should show valid message when no suggestions found", async () => {
        const placeholder = "Type a location";
        const suggestions = []

        render(
            <SuggestionSearch
                placeholder={placeholder}
                onSearch={() => {}}
                handleLoadSuggestions={() => suggestions}
                renderSuggestion={() => {}}
                suggestionKeyAttribute="id"
            />
        );
        const searchField = screen.getByPlaceholderText(placeholder);
        fireEvent.change(searchField, { target: { value: "any keyword" } });
        
        await waitFor(() => {
            // Ensure loading spinner not displayed
            const searchSuggestionWrapper = screen.queryByLabelText("search-suggestion-loading-spinner");
            expect(searchSuggestionWrapper).not.toBeInTheDocument()

            const noSuggestionFoundMessage = screen.queryByText("No data found! Please make sure you type the correct input.")
            expect(noSuggestionFoundMessage).toBeInTheDocument()
        });
    });

    it("should show error message when exceptions fired from fetching suggestions", async () => {
        const placeholder = "Type a location";

        render(
            <SuggestionSearch
                placeholder={placeholder}
                onSearch={() => {}}
                handleLoadSuggestions={() => {
                    throw "Expected exceptions!"
                }}
                renderSuggestion={() => {}}
                suggestionKeyAttribute="id"
            />
        );
        const searchField = screen.getByPlaceholderText(placeholder);
        fireEvent.change(searchField, { target: { value: "any keyword" } });
        
        await waitFor(() => {
            // Ensure loading spinner not displayed
            const searchSuggestionWrapper = screen.queryByLabelText("search-suggestion-loading-spinner");
            expect(searchSuggestionWrapper).not.toBeInTheDocument()

            const noSuggestionFoundMessage = screen.queryByText("Unexpected errors happen! Please try again!")
            expect(noSuggestionFoundMessage).toBeInTheDocument()
        });
    });

    it("should submit the first suggestion when clicking on Search button", async () => {
        const placeholder = "Type a location";
        const suggestions = [
            {
                id: 1,
                title: 'Suggestion 1'
            },
            {
                id: 2,
                title: 'Suggestion 2'
            }
        ]

        const handleSearch = jest.fn()
        render(
            <SuggestionSearch
                placeholder={placeholder}
                onSearch={handleSearch}
                handleLoadSuggestions={() => suggestions}
                renderSuggestion={({ title }) => <span>{title}</span>}
                suggestionKeyAttribute="id"
            />
        );
        const searchField = screen.getByPlaceholderText(placeholder);
        fireEvent.change(searchField, { target: { value: "any keyword" } });

        await waitFor(() => {
            // Ensure loading spinner not displayed
            const searchSuggestionWrapper = screen.queryByLabelText("search-suggestion-loading-spinner");
            expect(searchSuggestionWrapper).not.toBeInTheDocument()

            const submitButton = screen.getByLabelText("submit-button");
            fireEvent.click(submitButton);

            expect(handleSearch).toHaveBeenCalledWith(suggestions[0])
        });
    });

    it("should submit the right selected suggestion", async () => {
        const placeholder = "Type a location";
        const suggestions = [
            {
                id: 1,
                title: 'Suggestion 1'
            },
            {
                id: 2,
                title: 'Suggestion 2'
            }
        ]

        const handleSearch = jest.fn()
        render(
            <SuggestionSearch
                placeholder={placeholder}
                onSearch={handleSearch}
                handleLoadSuggestions={() => suggestions}
                renderSuggestion={({ title }) => <span>{title}</span>}
                suggestionKeyAttribute="id"
            />
        );
        const searchField = screen.getByPlaceholderText(placeholder);
        fireEvent.change(searchField, { target: { value: "any keyword" } });

        await waitFor(() => {
            // Ensure loading spinner not displayed
            const searchSuggestionWrapper = screen.queryByLabelText("search-suggestion-loading-spinner");
            expect(searchSuggestionWrapper).not.toBeInTheDocument()

            const secondItem = screen.getByText(suggestions[1].title);
            fireEvent.click(secondItem);

            expect(handleSearch).toHaveBeenCalledWith(suggestions[1])
        });
    });
})
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchField from "../";

describe("SearchField", () => {
    it("should receive keyword prop", () => {
        const keyword = "Ho Chi Minh City";
        const placeholder = "Type a location"
        render(
            <SearchField
                keyword={keyword}
                placeholder={placeholder}
                onKeywordChange={() => {}}
                onSubmit={() => {}}
            />
        );
        const searchField = screen.getByPlaceholderText(placeholder);    
        expect(searchField.value).toBe(keyword);
    });

    it("should change keyword", () => {
        const keyword = "Ho Chi Minh City";
        const placeholder = "Type a location";

        let receivedNewKeyword
        render(
            <SearchField
                keyword={keyword}
                placeholder={placeholder}
                onKeywordChange={(keyword) => {
                    receivedNewKeyword = keyword
                }}
                onSubmit={() => {}}
            />
        );

        const expectedNewKeyword = "Ha Noi";
        const searchField = screen.getByPlaceholderText(placeholder);
        fireEvent.change(searchField, { target: { value: expectedNewKeyword } });
        expect(receivedNewKeyword).toBe(expectedNewKeyword);
    });

    it("should receive form submit event", () => {
        const keyword = "Ho Chi Minh City";
        const placeholder = "Type a location";

        const handleSubmit = jest.fn()
        render(
            <SearchField
                keyword={keyword}
                placeholder={placeholder}
                onKeywordChange={() => {}}
                onSubmit={handleSubmit}
            />
        );

        const submitButton = screen.getByLabelText("submit-button");
        fireEvent.click(submitButton);
        expect(handleSubmit).toHaveBeenCalled();
    });
})
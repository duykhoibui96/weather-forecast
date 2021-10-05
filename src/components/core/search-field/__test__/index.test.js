import { render, screen, fireEvent } from "@testing-library/react";
import SearchField from "../";

describe("SearchField", () => {
    it("should receive keyword prop", async () => {
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

    it("should change keyword", async () => {
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

    it("should receive form submit event", async () => {
        const keyword = "Ho Chi Minh City";
        const placeholder = "Type a location";

        let formSubmitted = false
        render(
            <SearchField
                keyword={keyword}
                placeholder={placeholder}
                onKeywordChange={() => {}}
                onSubmit={() => {
                    formSubmitted = true
                }}
            />
        );

        const submitButton = screen.getByRole('button', { type: /submit/i });
        fireEvent.click(submitButton);
        expect(formSubmitted).toBeTruthy();
    });
})
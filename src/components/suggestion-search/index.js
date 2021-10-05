import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, ListGroup, Spinner, Alert } from "react-bootstrap";
import useFetchingData from "../../utils/hooks/use-fetching-data";
import SearchField from "../core/search-field";
function SuggestionSearch(props) {
  const {
    placeholder,
    onSearch,
    handleLoadSuggestions,
    renderSuggestion,
    suggestionKeyAttribute,
    debounceSuggestionLoadingTimeInMs,
    disabled,
  } = props;
  const [keyword, setKeyword] = useState("");
  function resetKeyword() {
    handleKeywordChange("");
  }

  function handleKeywordChange(keyword) {
    setKeyword(keyword);
  }

  function selectFirstSuggestionIfAny() {
    if (suggestions.length) {
      search(suggestions[0]);
    }
  }

  function search(suggestion) {
    onSearch(suggestion);
    resetKeyword();
  }

  const {
    loading,
    hasError,
    data: suggestions,
  } = useFetchingData(
    keyword,
    handleLoadSuggestions,
    debounceSuggestionLoadingTimeInMs
  );

  return (
    <>
      <SearchField
        disabled={disabled}
        keyword={keyword}
        placeholder={placeholder}
        onKeywordChange={handleKeywordChange}
        onSubmit={selectFirstSuggestionIfAny}
      />
      <div>
        {keyword && (
          <Card body className="search-suggestion__wrapper">
            {suggestions && suggestions.length ? (
              <ListGroup className="search-suggestion__list">
                {suggestions.map((suggestion, index = 0) => {
                  const keyVal = suggestion[suggestionKeyAttribute] || index;

                  function handleSearchBySuggestion() {
                    return search(suggestion);
                  }

                  return (
                    <ListGroup.Item
                      className="search-suggestion__item"
                      aria-selected={index === 0}
                      action
                      key={keyVal}
                      onClick={handleSearchBySuggestion}
                    >
                      {renderSuggestion(suggestion)}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            ) : (
              !loading && (
                <Alert variant={hasError ? "danger" : "warning"}>
                  {hasError
                    ? "Unexpected errors happen! Please try again!"
                    : "No locations found! Please make sure you type the correct location."}
                </Alert>
              )
            )}
            <div className="center pt-3">
              {loading && <Spinner animation="border" />}
            </div>
          </Card>
        )}
      </div>
    </>
  );
}

SuggestionSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  handleLoadSuggestions: PropTypes.func.isRequired,
  renderSuggestion: PropTypes.func.isRequired,
  suggestionKeyAttribute: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  debounceSuggestionLoadingTimeInMs: PropTypes.number,
};

SuggestionSearch.defaultProps = {
  placeholder: "",
  disabled: false,
  debounceSuggestionLoadingTimeInMs: 0,
};

export default SuggestionSearch;

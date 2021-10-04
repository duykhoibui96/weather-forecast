import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import { Card, ListGroup, Spinner } from "react-bootstrap";
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
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  function resetKeyword() {
    setKeyword("");
  }

  function handleKeywordChange(keyword) {
    setKeyword(keyword);
  }

  useEffect(() => {
    setSuggestions([]);

    if (keyword) {
      setLoading(true);

      const debounceSearch = debounce(async (keyword) => {
        try {
          const suggestions = await handleLoadSuggestions(keyword);
          setSuggestions(suggestions);
        } finally {
          setLoading(false);
        }
      }, debounceSuggestionLoadingTimeInMs);

      debounceSearch(keyword);

      return () => debounceSearch.cancel();
    } else {
      setLoading(false);
    }
  }, [keyword, handleLoadSuggestions, debounceSuggestionLoadingTimeInMs]);

  function selectFirstSuggestionIfAny() {
    if (suggestions.length) {
      search(suggestions[0]);
    }
  }

  function search(suggestion) {
    onSearch(suggestion);
    resetKeyword();
  }

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
        {(loading || !!suggestions.length) && (
          <Card body className="search-suggestion__wrapper">
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

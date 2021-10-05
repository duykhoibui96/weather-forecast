import React from "react";
import PropTypes from "prop-types";
import { InputGroup, Form, FormControl, Button } from "react-bootstrap";

function SearchField({
  placeholder,
  keyword,
  disabled,
  onKeywordChange,
  onSubmit,
}) {
  function handleKeywordChange(e) {
    return onKeywordChange(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    return onSubmit();
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <InputGroup>
        <FormControl
          placeholder={placeholder}
          as="input"
          value={keyword}
          onChange={handleKeywordChange}
          disabled={disabled}
        />
        <Button
          aria-label="submit-button"
          variant="dark"
          type="submit"
          disabled={disabled}
        >
          Search
        </Button>
      </InputGroup>
    </Form>
  );
}

SearchField.propTypes = {
  onKeywordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  keyword: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

SearchField.defaultProps = {
  keyword: "",
  placeholder: "",
  disabled: false,
};

export default SearchField;

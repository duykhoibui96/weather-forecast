import React from "react";
import PropTypes from "prop-types";
import { Alert, Button } from "react-bootstrap";

function Error({ onRetry }) {
  return (
    <>
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          It seems like your web page encounters some unexpected issues. Please
          press the button below to try again.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            aria-label="retry-btn"
            onClick={onRetry}
            variant="outline-danger"
          >
            Retry
          </Button>
        </div>
      </Alert>
    </>
  );
}

Error.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

export default Error;

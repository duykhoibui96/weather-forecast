import React from "react";
import { Container, Navbar } from "react-bootstrap";
import Main from "./main";
import Error from "./error";
class WeatherForecast extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch() {}

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    const { hasError } = this.state;

    return (
      <div className="main__wrapper">
        <Navbar className="mb-2" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <h1>WEATHER FORECAST</h1>
            </Navbar.Brand>
          </Container>
        </Navbar>
        {hasError ? <Error onRetry={this.handleRetry} /> : <Main />}
      </div>
    );
  }
}

export default WeatherForecast;

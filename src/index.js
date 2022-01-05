import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    errorMessage: "",
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      // REACT says we have to use setState() function to change state!
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        this.setState({
          errorMessage: err.message,
        });
      }
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.latitude) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.latitude) {
      return <SeasonDisplay latitude={this.state.latitude} />;
    }

    return <Spinner />;
  }

  // REACT says we have to define render!
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));

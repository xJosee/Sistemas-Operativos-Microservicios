import React, { Component } from 'react';
import '../styles/main.css'; // Tell webpack that Button.js uses these styles

class Main extends Component {
  render() {
    // You can use them as regular CSS styles
    return (
        <div>
            <p>Jose Moran</p>
        </div>
    );
  }
}

export default Main;
import React from "react";

import { Quiz } from "./Quiz";

export class Home extends React.Component {
  render() {
    return(
      <div className="container">
        <div className="starter-template">
          <h1>Enter correct fret</h1>

          <Quiz />
        </div>
      </div>
    );
  }
}

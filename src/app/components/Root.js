import React from "react";

import { Header } from "./Header";

export class Root extends React.Component {
  render() {
    return (
      <div>
        <Header currentRoute={this.props.location.pathname}>
        </Header>

        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

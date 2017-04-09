import React from "react";
import { browserHistory } from "react-router";

export class Stats extends React.Component {
    onNavigateHome() {
        browserHistory.push("/home");
    }

    render() {
        return (
            <div>
                <h3>Stats page</h3>
            </div>
        );
    }
}

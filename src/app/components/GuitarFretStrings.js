import React from "react";

export class GuitarFretStrings extends React.Component {
  selectFret(string) {
    this.props.handleAnswer(string, this.props.fret)
  }

  render() {
    return(
      <div className="guitar-fret-strings">
        <div className="guitar-fret-strings__string guitar-fret-strings__string--high-e-string">
          <div className="guitar-fret-strings__string-selector" onClick={this.selectFret.bind(this, 1)}>
          </div>
        </div>

        <div className="guitar-fret-strings__string guitar-fret-strings__string--b-string">
          <div className="guitar-fret-strings__string-selector" onClick={this.selectFret.bind(this, 2)}>
          </div>
        </div>

        <div className="guitar-fret-strings__string guitar-fret-strings__string--g-string">
          <div className="guitar-fret-strings__string-selector" onClick={this.selectFret.bind(this, 3)}>
          </div>
        </div>

        <div className="guitar-fret-strings__string guitar-fret-strings__string--d-string">
          <div className="guitar-fret-strings__string-selector" onClick={this.selectFret.bind(this, 4)}>
          </div>
        </div>

        <div className="guitar-fret-strings__string guitar-fret-strings__string--a-string">
          <div className="guitar-fret-strings__string-selector" onClick={this.selectFret.bind(this, 5)}>
          </div>
        </div>

        <div className="guitar-fret-strings__string guitar-fret-strings__string--low-e-string">
          <div className="guitar-fret-strings__string-selector" onClick={this.selectFret.bind(this, 6)}>
          </div>
        </div>
      </div>
    );
  }
}

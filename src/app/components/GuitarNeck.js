import React from "react";

import { GuitarFretStrings } from "./GuitarFretStrings";

export class GuitarNeck extends React.Component {
  render() {
    return(
      <div className="guitar-neck">
        <div className="guitar-neck__fret guitar-neck__fret--1">
            <GuitarFretStrings fret={1} handleAnswer={this.props.handleAnswer} />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--2">
            <GuitarFretStrings fret={2}  handleAnswer={this.props.handleAnswer} />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--3 guitar-neck__fret--dotted">
            <GuitarFretStrings fret={3}  handleAnswer={this.props.handleAnswer} />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--4">
            <GuitarFretStrings fret={4}  handleAnswer={this.props.handleAnswer} />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--5 guitar-neck__fret--dotted">
            <GuitarFretStrings fret={5}  handleAnswer={this.props.handleAnswer} />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--6">
            <GuitarFretStrings fret={6}  handleAnswer={this.props.handleAnswer} />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--7 guitar-neck__fret--dotted">
            <GuitarFretStrings fret={7}  handleAnswer={this.props.handleAnswer} />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--8">
            <GuitarFretStrings fret={8}  handleAnswer={this.props.handleAnswer} />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--9 guitar-neck__fret--dotted">
            <GuitarFretStrings fret={9}  handleAnswer={this.props.handleAnswer} />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--10">
            <GuitarFretStrings fret={10} handleAnswer={this.props.handleAnswer} />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--11">
            <GuitarFretStrings fret={11} handleAnswer={this.props.handleAnswer} />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--12 guitar-neck__fret--double-dotted">
            <GuitarFretStrings fret={12} handleAnswer={this.props.handleAnswer} />
        </div>
      </div>
    );
  }
}

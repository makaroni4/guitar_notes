import React from "react";

import { GuitarFretStrings } from "./GuitarFretStrings";

export class GuitarNeck extends React.Component {
  render() {
    return(
      <div className="guitar-neck">
        <div className="guitar-neck__fret guitar-neck__fret--1">
            <GuitarFretStrings />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--2">
            <GuitarFretStrings />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--3 guitar-neck__fret--dotted">
            <GuitarFretStrings />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--4">
            <GuitarFretStrings />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--5 guitar-neck__fret--dotted">
            <GuitarFretStrings />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--6">
            <GuitarFretStrings />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--7 guitar-neck__fret--dotted">
            <GuitarFretStrings />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--8">
            <GuitarFretStrings />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--9 guitar-neck__fret--dotted">
            <GuitarFretStrings />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--10">
            <GuitarFretStrings />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--11">
            <GuitarFretStrings />
        </div>

        <div className="guitar-neck__fret guitar-neck__fret--12 guitar-neck__fret--double-dotted">
            <GuitarFretStrings />
        </div>
      </div>
    );
  }
}

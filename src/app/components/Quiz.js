import React from "react";

import { GuitarNeck } from "./GuitarNeck";

const musicNotes = ["A", "B", "C", "D", "E", "F", "G"];
const guitarStrings = [1, 2, 3, 4, 5, 6];
// TODO: fill correct frets
const notesFrets = {
  A: {
    1: [5],
    2: [10],
    3: [2],
    4: [7],
    5: [0, 12],
    6: [5]
  },
  B: {
    1: [7],
    2: [0, 12],
    3: [4],
    4: [9],
    5: [2],
    6: [7]
  },
  C: {
    1: [7],
    2: [0, 12],
    3: [4],
    4: [9],
    5: [2],
    6: [7]
  },
  D: {
    1: [7],
    2: [0, 12],
    3: [4],
    4: [9],
    5: [2],
    6: [7]
  },
  E: {
    1: [7],
    2: [0, 12],
    3: [4],
    4: [9],
    5: [2],
    6: [7]
  },
  F: {
    1: [7],
    2: [0, 12],
    3: [4],
    4: [9],
    5: [2],
    6: [7]
  },
  G: {
    1: [7],
    2: [0, 12],
    3: [4],
    4: [9],
    5: [2],
    6: [7]
  }
}

var pickRandom = function(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export class Quiz extends React.Component {
  constructor() {
    super();

    this.state = {
      answers: [],
      currentQuestion: 0,
      currentString: pickRandom(guitarStrings),
      currentNote: pickRandom(musicNotes),
      currentAnswer: ""
    }
  }

  generateNextQuestion(answerCorrect) {
    this.setState({
      answers: [answerCorrect].concat(this.state.answers),
      currentQuestion: this.state.currentQuestion + 1,
      currentString: pickRandom(guitarStrings),
      currentNote: pickRandom(musicNotes),
      currentAnswer: "",
      prevString: this.state.currentString,
      prevNote: this.state.currentNote,
      prevAnswer: answerCorrect
    });
  }

  handleAnswer(string, fret) {
    this.setState({
      currentAnswer: fret
    });

    var answerCorrect = notesFrets[this.state.currentNote][this.state.currentString].indexOf(fret) > -1;

    if(!answerCorrect) {
      var correctAnswers = notesFrets[this.state.currentNote][this.state.currentString];
      var $frets = document.getElementsByClassName("guitar-neck__fret");

      var self = this;
      correctAnswers.forEach(function(fret) {
        var $fret = $frets[fret - 1];

        var $fretSelectorCircle = $fret.getElementsByClassName("fret-selector-circle")[self.state.currentString - 1];

        console.log($fretSelectorCircle)

        $fretSelectorCircle.className += " fret-selector-circle--answer-highlight";

        setTimeout(function() {
          $fretSelectorCircle.className = $fretSelectorCircle.className.replace("fret-selector-circle--answer-highlight", "");
        }, 2000);
      });
    }

    this.generateNextQuestion(answerCorrect);
  }

  render() {
    let self = this;

    let prevResult = function() {
      if(self.state.currentQuestion === 0) {
        return "";
      }

      let prevFret = notesFrets[self.state.prevNote][self.state.prevString];

      return (
        <div className="quiz__previous-answer">
          {self.state.prevAnswer ? "correct" : "incorrect"}: {self.state.prevNote} on {self.state.prevString} string is on {prevFret}
        </div>
      )
    }

    let streak = function() {
      let totalAnswers = self.state.answers.length;

      if(totalAnswers === 0) {
        return "";
      }

      let correctAnswers = self.state.answers.reduce(function(i, x) {
        if(x) {
          i++;
        }
        return i;
      }, 0);

      return(
        <div>
          {correctAnswers} / {totalAnswers}
        </div>
      )
    }

    return (
      <div className="quiz">
        <div className="quiz__streak">
          {streak()}
        </div>

        {prevResult()}

        <h2 className="quiz__question">
          {this.state.currentNote} on {this.state.currentString} string
        </h2>

        <div className="quiz__guitar-neck">
          <GuitarNeck handleAnswer={this.handleAnswer.bind(this)}/>
        </div>
      </div>
    );
  }
}

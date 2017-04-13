import React from "react";

import { GuitarNeck } from "./GuitarNeck";

// const musicNotes = ["A", "B", "C", "D", "E", "F", "G"];
const musicNotes = ["A", "B"];
const guitarStrings = [1, 2, 3, 4, 5, 6];
const quizLength = 3;
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

  handleSubmit(event) {
    event.preventDefault();

    var answer = this.state.currentAnswer;

    var answerCorrect = notesFrets[this.state.currentNote][this.state.currentString].indexOf(answer) > -1;

    this.generateNextQuestion(answerCorrect);
  }

  handleChange(event) {
    this.setState({
      currentAnswer: parseInt(event.target.value)
    });
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

        <div className="quiz__question">
          {this.state.currentNote} on {this.state.currentString} string
        </div>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Enter number of fret:
            <input type="text" value={this.state.currentAnswer} onChange={this.handleChange.bind(this)}/>
          </label>
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>

        <div className="quiz__guitar-neck">
          <GuitarNeck/>
        </div>
      </div>
    );
  }
}

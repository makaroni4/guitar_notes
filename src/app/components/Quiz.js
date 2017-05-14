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

// https://github.com/GoogleChrome/guitar-tuner
function AudioProcessor() {
  this.FFTSIZE = 2048;
  this.stream = null;
  this.audioContext = new AudioContext();
  this.analyser = this.audioContext.createAnalyser();
  this.gainNode = this.audioContext.createGain();
  this.microphone = null;

  this.gainNode.gain.value = 0;
  this.analyser.fftSize = this.FFTSIZE;
  this.analyser.smoothingTimeConstant = 0;

  this.frequencyBufferLength = this.FFTSIZE;
  this.frequencyBuffer = new Float32Array(this.frequencyBufferLength);

  this.sendingAudioData = false;

  this.lastRms = 0;
  this.rmsThreshold = 0.006;
  this.assessedStringsInLastFrame = false;
  this.assessStringsUntilTime = 0;

  this.requestUserMedia = function () {
    var that = this;

    navigator.getUserMedia({audio:true}, (stream) => {
      that.sendingAudioData = true;
      that.stream = stream;
      that.microphone = that.audioContext.createMediaStreamSource(stream);
      that.microphone.connect(that.analyser);
      that.analyser.connect(that.gainNode);
      that.gainNode.connect(that.audioContext.destination);

      requestAnimationFrame(that.dispatchAudioData);

    }, (err) => {
      console.log('Unable to access the microphone');
      console.log(err);
    });
  }

  this.attached = function() {
    // Set up the stream kill / setup code for visibility changes.
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    // Then call it.
    this.onVisibilityChange();
  }

  this.detached = function() {
    this.sendingAudioData = false;
  }

  this.onVisibilityChange = function() {
    console.log("--> onVisibilityChange")
    if (document.hidden) {
      this.sendingAudioData = false;

      if (this.stream) {
        // Chrome 47+
        this.stream.getAudioTracks().forEach((track) => {
          if ('stop' in track) {
            track.stop();
          }
        });

        // Chrome 46-
        if ('stop' in this.stream) {
          this.stream.stop();
        }
      }

      this.stream = null;
    } else {
      this.requestUserMedia();
    }

  }

  /**
   * Autocorrelate the audio data, which is basically where you
   * compare the audio buffer to itself, offsetting by one each
   * time, up to the half way point. You sum the differences and
   * you see how small the difference comes out.
   */
  this.autocorrelateAudioData = function(time) {

    let searchSize = this.frequencyBufferLength * 0.5;
    let sampleRate = this.audioContext.sampleRate;
    let offsetKey = null;
    let offset = 0;
    let difference = 0;
    let tolerance = 0.001;
    let rms = 0;
    let rmsMin = 0.008;
    let assessedStringsInLastFrame = this.assessedStringsInLastFrame;

    // Fill up the data.
    this.analyser.getFloatTimeDomainData(this.frequencyBuffer);

    // console.log(this.frequencyBuffer)
    // var newBuff = [];
    // for (let d = 0; d < this.frequencyBuffer.length; d++) {
    //   newBuff[d] = Math.abs(this.frequencyBuffer[d]);
    // }
    // var maxIndex = newBuff.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    // console.log(maxIndex)

    // Figure out the root-mean-square, or rms, of the audio. Basically
    // this seems to be the amount of signal in the buffer.
    for (let d = 0; d < this.frequencyBuffer.length; d++) {
      rms += this.frequencyBuffer[d] * this.frequencyBuffer[d];
    }

    rms = Math.sqrt(rms / this.frequencyBuffer.length);

    // If there's little signal in the buffer quit out.
    if (rms < rmsMin)
      return 0;

    // Only check for a new string if the volume goes up. Otherwise assume
    // that the string is the same as the last frame.
    if (rms > this.lastRms + this.rmsThreshold) {
      this.assessStringsUntilTime = time + 250;
    }

    this.assessedStringsInLastFrame = time < this.assessStringsUntilTime;

    // Next for the top candidate in the set, figure out what
    // the actual offset is from the intended target.
    // We'll do it by making a full sweep from offset - 10 -> offset + 10
    // and seeing exactly how long it takes for this wave to repeat itself.
    // And that will be our *actual* frequency.
    let searchStart = 20;
    let searchEnd = 600;
    let actualFrequency = 0;
    let smallestDifference = Number.POSITIVE_INFINITY;

    for (let s = searchStart; s < searchEnd; s++) {

      difference = 0;

      // For each iteration calculate the difference of every element of the
      // array. The data in the buffer should be PCM, so values ranging
      // from -1 to 1. If they match perfectly then they'd essentially
      // cancel out. But this is real data so we'll be looking for small
      // amounts. If it's below tolerance assume a perfect match, otherwise
      // go with the smallest.
      //
      // A better version of this would be to curve match on the data.
      for (let i = 0; i < searchSize; i++) {
        difference += Math.abs(this.frequencyBuffer[i] -
            this.frequencyBuffer[i + s]);
      }

      difference /= searchSize;

      if (difference < smallestDifference) {
        smallestDifference = difference;
        actualFrequency = s;
      }

      if (difference < tolerance) {
        actualFrequency = s;
        break;
      }
    }

    this.lastRms = rms;

    return this.audioContext.sampleRate / actualFrequency;

  }

  this.dispatchAudioData = function(time) {

    // Always set up the next pass here, because we could
    // early return from this pass if there's not a lot
    // of exciting data to deal with.
    if (this.sendingAudioData)
      requestAnimationFrame(this.dispatchAudioData);

    let frequency = this.autocorrelateAudioData(time);

    if (frequency === 0)
      return;

    // Convert the most active frequency to linear, based on A440.
    let dominantFrequency = Math.log2(frequency / 440);

    // Figure out how many semitones that equates to.
    let semitonesFromA4 = 12 * dominantFrequency;

    // The octave is A440 for 4, so start there, then adjust by the
    // number of semitones. Since we're at A, we need only 3 more to
    // push us up to octave 5, and 9 to drop us to 3. So there's the magic
    // 9 in that line below accounted for.
    let octave = 4 + ((9 + semitonesFromA4) / 12);
    octave = Math.floor(octave);

    // The note is 0 for A, all the way to 11 for G#.
    let note = (12 + (Math.round(semitonesFromA4) % 12)) % 12;

    // Now tell anyone who's interested.
    let notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
    console.log([frequency, octave, notes[note]])
    // YOUR CODE GOES HERE
  }

  // Bind as we would have done for anything in the constructor so we can use
  // them without confusing what 'this' means. Yay window scoped.
  this.dispatchAudioData = this.dispatchAudioData.bind(this);
  this.onVisibilityChange = this.onVisibilityChange.bind(this);
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

  componentDidMount() {
    var processor = new AudioProcessor();
    processor.attached();
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

import './App.css';
import React from 'react';
import { TiArrowDownThick, TiArrowUpThick, TiMediaPlay, TiMediaPause, TiArrowRepeat } from "react-icons/ti";
import beepSound from './asset/beep-06.mp3';

class App extends React.Component {

  formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      timeLeft: this.formatTime(25 * 60), 
      timer: null,
      isTimerRunning: false,
      isSessionMode: true,
    };
    this.startTimer = this.startTimer.bind(this);
    this.increaseBreak = this.increaseBreak.bind(this);
    this.increaseSession = this.increaseSession.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.reset = this.reset.bind(this);
  }
  
  startTimer = () => {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({ timer: null, isTimerRunning: false });
      return;
    }
  
    this.setState({
      isTimerRunning: true,
    });
  
    let timeLeftInSeconds;
    let timerMode;
  
    if (this.state.isSessionMode) {
      timeLeftInSeconds = this.state.session * 60;
      timerMode = 'session';
    } else {
      timeLeftInSeconds = this.state.break * 60;
      timerMode = 'break';
    }
  
    if (this.state.timeLeft !== this.formatTime(timeLeftInSeconds)) {
      const timeParts = this.state.timeLeft.split(":");
      const minutes = parseInt(timeParts[0]);
      const seconds = parseInt(timeParts[1]);
      timeLeftInSeconds = minutes * 60 + seconds;
    }
  
    const timer = setInterval(() => {
      timeLeftInSeconds -= 1;
      this.setState({
        timeLeft: this.formatTime(timeLeftInSeconds),
      });
  
      if (timeLeftInSeconds === 0) {
        clearInterval(this.state.timer);
        this.playAudio();
  
        if (timerMode === 'session') {
          this.setState(
            (prevState) => ({
              isSessionMode: !prevState.isSessionMode,
              timeLeft: this.formatTime(prevState.break * 60),
            }),
            () => {
              timeLeftInSeconds = this.state.break * 60;
              timerMode = 'break'
              this.startTimer();
            }
          );
        } else {
          this.setState(
            (prevState) => ({
              isSessionMode: !prevState.isSessionMode,
              timeLeft: this.formatTime(prevState.session * 60),
            }),
            () => {
              timeLeftInSeconds = this.state.session * 60;
              timerMode = 'session'
              this.startTimer();
            }
          );
        }
        this.startTimer();
      }
  
      if (timeLeftInSeconds <= 60) {
        const timerLabel = document.getElementById("timer-label");
        const timerLeft = document.getElementById("timer-left");
        timerLabel.style.color = "red";
        timerLeft.style.color = "red";
      } else {
        const timerLabel = document.getElementById('timer-label');
        const timerLeft = document.getElementById('timer-left');
        timerLabel.style.color = 'inherit';
        timerLeft.style.color = 'inherit';
      }

      if (timerMode === 'session') {
        document.getElementById('timer-label').textContent = 'Session';
      } else if (timerMode === 'break') {
        document.getElementById('timer-label').textContent = 'Break';
      }
    }, 1000);
  
    this.setState({
      timer: timer,
    });
  };
  
  

  reset = () => {
    clearInterval(this.state.timer);

    this.setState({
      break: 5,
      session: 25,
      timeLeft: this.formatTime(25 * 60), 
      timer: null,
      isTimerRunning: false,
      isSessionMode: true,
    });

    const timerLabel = document.getElementById('timer-label');
    const timerLeft = document.getElementById('timer-left');
    timerLabel.style.color = 'inherit';
    timerLeft.style.color = 'inherit';
  };

  increaseBreak = () =>{
    if (!this.state.isTimerRunning && this.state.break < 60) {
      this.setState((prevState) => ({
        break: prevState.break + 1,
      }));
    }
  };

  decreaseBreak = () =>{
    if (!this.state.isTimerRunning && this.state.break > 1) {
      this.setState((prevState) => ({
        break: prevState.break - 1,
      }));
    }
  };

  increaseSession = () =>{
    if (!this.state.isTimerRunning && this.state.session < 60) {
      this.setState((prevState) => ({
        session: prevState.session + 1,
        timeLeft: this.formatTime((prevState.session + 1) * 60),
      }));
    }
  };

  decreaseSession = () =>{
    if (!this.state.isTimerRunning && this.state.session > 1) {
      this.setState((prevState) => ({
        session: prevState.session - 1,
        timeLeft: this.formatTime((prevState.session - 1) * 60),
      }));
    }
  };

  playAudio = () => {
    const audioElement = new Audio(beepSound);
    audioElement.loop = true;
    audioElement.play();
    setTimeout(() => {
      audioElement.loop = false;
      audioElement.pause();
      audioElement.currentTime = 0;
    }, 5000);
  };

  render(){
    return (
      <div className="App">
        <h1 className='title'>25 + 5 Clock</h1>
        <div className='length-control'>
          <div>
            <h3 id="break-label" className='fs'>Break Length</h3>
            <div className='control'>
              <button className="btn-lvl" id='break-decrement' onClick={this.decreaseBreak}>
                <TiArrowDownThick className="arrow-icon" />
              </button>
              <div id='break-length' className='fs length'>{this.state.break}</div>
              <button className="btn-lvl" id='break-increment' onClick={this.increaseBreak}>
                <TiArrowUpThick className="arrow-icon" />
              </button>
            </div>
          </div>
          <div>
            <h3 id='session-label' className='fs'>Session Length</h3>
            <div className='control'>
              <button className="btn-lvl" id='session-decrement' onClick={this.decreaseSession}>
                  <TiArrowDownThick className="arrow-icon" />
                </button>
              <div id='session-length' className='fs length'>{this.state.session}</div>
              <button className="btn-lvl" id='session-increment' onClick={this.increaseSession}>
                <TiArrowUpThick className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>
        <div className='timer'>
          <h3 id='timer-label' className='fs'>Session</h3>
          <div id='timer-left' className='fs2'>{this.state.timeLeft}</div>
        </div>
        <div className='timer-control'>
          <div id='start_stop' onClick={this.startTimer} className='controls'>
            <div className='ai'>
              <TiMediaPlay className='arrow-icon' />
            </div>
            <div className='ai'>
              <TiMediaPause className='arrow-icon' />
            </div>
          </div>
          <TiArrowRepeat id='reset' onClick={this.reset} className='arrow-icon ai2' />
        </div>
        <p><span>Designed and Coded by</span> <br/> Raphael Isla</p>
        
      </div>
    );
  }
}

export default App;

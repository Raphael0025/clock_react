import './App.css';
import { TiArrowDownThick, TiArrowUpThick, TiMediaPlay, TiMediaPause, TiArrowRepeat } from "react-icons/ti";

const handleClick = () => {
  alert("clicked")
}

function App() {
  return (
    <div className="App">
      <h1 className='title'>25 + 5 Clock</h1>
      <div className='length-control'>
        <div>
          <h3 id="break-label" className='fs'>Break Length</h3>
          <div className='control'>
            <TiArrowDownThick id='break-decrement' onClick={handleClick} className="arrow-icon" />
            <div id='break-length' className='fs'>5</div>
            <TiArrowUpThick id='break-increment' onClick={handleClick} className="arrow-icon" />
          </div>
        </div>
        <div>
          <h3 id='session-label' className='fs'>Session Length</h3>
          <div className='control'>
            <TiArrowDownThick id="session-decremnent" onClick={handleClick} className="arrow-icon" />
            <div id='session-length' className='fs'>25</div>
            <TiArrowUpThick id="session-increment" onClick={handleClick} className="arrow-icon" />
          </div>
        </div>
      </div>
      <div className='timer'>
        <h3 id='timer-label' className='fs'>Session</h3>
        <div id='timer-left' className='fs2'>25:00</div>
      </div>
      <div className='timer-control'>
        <div id='start_stop' onClick={handleClick} className='controls'>
          <div className='ai'>
            <TiMediaPlay className='arrow-icon' />
          </div>
          <div className='ai'>
            <TiMediaPause className='arrow-icon' />
          </div>
        </div>
        <TiArrowRepeat id='reset' onClick={handleClick} className='arrow-icon ai2' />
      </div>
      <p><span>Designed and Coded by</span> <br/> Raphael Isla</p>
    </div>
  );
}

export default App;

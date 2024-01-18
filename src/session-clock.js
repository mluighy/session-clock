import React from 'react';

export default class SessionClock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        timerLabel: 'Session',
        session: 25,
        break: 5,
        minute: 25,
        second: 0,
        timer: null
        };

      this.setup = function( value, limit, current, name) {
        if( current===limit)
            return null
        this.setState(state => { 
            if(name==="session") 
                if(this.state.timerLabel==='Session')
                    return {session: this.state.session+value,
                            minute: this.state.session+value,
                            second: 0}
                else
                    return {session: this.state.session+value}
            else 
                if(this.state.timerLabel==='Break')
                    return {break: this.state.break+value,
                            minute: this.state.break+value,
                            second: 0}
                else
                    return {break: this.state.break+value}
        })
      }.bind(this) 

      this.reset = () => {
        if(this.state.timer != null)
            clearInterval( this.state.timer)
        const b = document.getElementById("beep")
        b.pause()
        b.currentTime = 0
        timeLeft('black')
        
        this.setState({
            timerLabel: 'Session',
            session: 25,
            break: 5,
            minute: 25,
            second: 0,
            timer: null
            })
      } 

      this.timerOnOff = () => {
        let x = null
        if( this.state.timer === null)
            x = setInterval( this.timerSet, 1000)
        else
            clearInterval( this.state.timer)
        this.setState({timer: x})
      }
      
      this.timerSet = () => {
        let min = this.state.minute, sec = this.state.second
        if(min === 1 && sec === 0)
            timeLeft('red')
        if(min === 0 && sec === 0) {
            if(this.state.timerLabel==='Session')
                this.setState({timerLabel: 'Break',
                               minute: this.state.break,
                               second: 0})
            else
                this.setState({timerLabel: 'Session',
                               minute: this.state.session,
                               second: 0})
            const b = document.getElementById("beep")
            b.currentTime = 0
            b.play().catch(console.error)
            timeLeft('black')   
        } else {
            if(sec===0) {
                sec = 59
                min--
            } else
                sec--
            this.setState({minute: min,
                           second: sec})
        }               
      }
    }

    render() {
      // console.log(this)
      return (
        <div>
            <div id="setup">
                <div id="break-label">
                    <div className='header'>Break Lenght</div>
                    <div className="control">
                    <button id="break-decrement" onClick={()=>{this.setup(-1,1,this.state.break,"break")}}>
                        <span className="material-symbols-outlined">arrow_drop_down</span>
                    </button>
                    <div><span id="break-length">{this.state.break}</span></div>
                    <button id="break-increment" onClick={()=>{this.setup(1,60,this.state.break,"break")}}>
                        <span className="material-symbols-outlined">arrow_drop_up</span>
                    </button>
                    </div>
                </div>
                <div id="session-label">
                    <div className='header'>Session Lenght</div>
                    <div className="control">
                    <button id="session-decrement" onClick={()=>{this.setup(-1,1,this.state.session,"session")}}>
                        <span className="material-symbols-outlined">arrow_drop_down</span>
                    </button>
                    <div><span id="session-length">{this.state.session}</span></div>
                    <button id="session-increment" onClick={()=>{this.setup(1,60,this.state.session,"session")}}>
                        <span className="material-symbols-outlined">arrow_drop_up</span>
                    </button>
                    </div>
                </div>
            </div>
            <div id="timer">
                <div id="timer-label">{this.state.timerLabel}</div>
                <div id="time-left">{timeFormat(this.state.minute,this.state.second)}</div>
                <div className="control">
                    <button id="start_stop" onClick={this.timerOnOff}>
                        <span className="material-symbols-outlined">play_pause</span>
                    </button>
                    &nbsp;&ensp;
                    <button id="reset" onClick={this.reset}>
                        <span className="material-symbols-outlined">device_reset</span>
                    </button>
                </div>
            </div>    
        </div>
      );
    }
}

function timeFormat( minute, second) {
    // console.log("Paramaters:", minute,second)
    let minutes = format2Digits(minute);
    let seconds = format2Digits(second);
    return minutes + ":" + seconds;
    }

function format2Digits(n) {
    return n < 10 ? '0' + n : n;
    }

function timeLeft( color) {
    let x = document.querySelector('#time-left')
    x.style.color = color
}

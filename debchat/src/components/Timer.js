import React, {Component} from 'react';

// will just count down from one time for now

export default class Timer extends Component{
    constructor(props){
        super(props);
        // should have startTime prop

        this.state = {
            isRunning: false,
            startTime: parseInt(this.props.startTime, 10),
            timeLeft: parseInt(this.props.startTime, 10) // this is in SECONDS
        }

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    componentDidMount(){
        this.setState({
            isRunning: true
        })
        this.myInterval = setInterval(() => {
            if (this.state.isRunning){
                if (this.state.timeLeft === 0)
                {
                    // stop timer
                    this.setState({
                        isRunning: false
                    })
                }
                else{
                    this.setState(state => ({
                        timeLeft: state.timeLeft - 1
                    }))
                }
            }
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.myInterval)
    }

    // for later implementation

    startTimer(){
        this.setState({
            isRunning: true
        })
    }

    stopTimer(){
        this.setState({
            isRunning: false
        })
    }

    resetTimer(){
        this.setState({
            isRunning: false,
            timeLeft: this.state.startTime // CORRECT THIS LATER, BECAUSE STATE MIGHT HAVE BEEN CHANGED ALREADY
        })

    }

    render(){
        const minutes = Math.floor(this.state.timeLeft / 60);
        const seconds = this.state.timeLeft % 60;
        return(
            <div>
                <h4>Time Remaining: {minutes}:{seconds < 10? `0${seconds}`:seconds}</h4>
            </div>

        );
    }

}

// Functionality
// count down
// should be able to set another time and start running again on its own, (as per timeline of the debate) 
// make timeline fancy later, where there's a pointer at where we are in the debate, or the current action is highlighted
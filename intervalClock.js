//import React from "https://esm.sh/react";
//import ReactDOM from "https://esm.sh/react-dom";

const App = () => {
    const [breakLength, setBreakLength] = React.useState(5);
    const [sessionLength, setSessionLength] = React.useState(25);
    const [play, setPlay] = React.useState(false);
    const [timingType, setTimingType] = React.useState("SESSION");
    const [timeLeft, setTimeLeft] = React.useState(1500);

    const timeout = setTimeout(() => {
        if (timeLeft && play){
            setTimeLeft(timeLeft - 1)
        }
    }, 1000);

    const handleBreakDecrement = () => {
        if(breakLength > 1){
            setBreakLength(breakLength - 1)
        }
    }

    const handleBreakIncrement = () => {
        if(breakLength < 60){
            setBreakLength(breakLength + 1)
        }
    }

    const handleSessionDecrement = () => {
        if(sessionLength > 1){
            setSessionLength(sessionLength - 1)
            setTimeLeft(timeLeft - 60)
        }
    }

    const handleSessionIncrement = () => {
        if(sessionLength < 60){
            setSessionLength(sessionLength + 1)
            setTimeLeft(timeLeft + 60)
        }
    }

    const timeFormatter = () => {
        const minutes = Math.floor(timeLeft/60);
        const seconds = timeLeft - minutes * 60;
        const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    const handlePlay = () => {
        clearTimeout(timeout);
        setPlay(!play);
    }

    const resetTimer = () => {
        const audio = document.getElementById("beep");
        if(!timeLeft && timingType === "SESSION"){
            setTimeLeft(breakLength * 60)
            setTimingType("BREAK")
            audio.play()
        }
        if(!timeLeft && timingType === "BREAK"){
            setTimeLeft(sessionLength * 60)
            setTimingType("SESSION")
            audio.pause()
            audio.currentTime = 0; 
        }
    }

    const handleReset = () => {
        clearTimeout(timeout);
        setPlay(false);
        setTimeLeft(1500);
        setBreakLength(5);
        setSessionLength(25);
        setTimingType("SESSION");
        const audio = document.getElementById("beep");
        audio.pause()
        audio.currentTime = 0;
    }


    const clock = () => {
        if (play){
            timeout
            resetTimer()
        } else {
            clearTimeout(timeout)
        }
    }

    React.useEffect(() => {
        clock()
    }, [play, timeLeft, timeout])

    const title = timingType === "SESSION" ? "Session" : "Break";
    return(
        <div class="container">
            <h1 class="text-center">25 + 5 Clock</h1>
            <div class="row">
                <div class="col-md-6">
                    <div class="card mb-4 shadow-sm">
                        <div id="break-label" class="card-header">Break Length</div>
                        <div class="card-body">
                            <p class="card-text">
                                <div id="break-length">{breakLength}</div>
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button disabled={play} onClick={handleBreakDecrement} type="button" class="btn btn-sm btn-outline-secondary" id="break-decrement">Less Break</button>
                                    <button disabled={play} onClick={handleBreakIncrement} type="button" class="btn btn-sm btn-outline-secondary" id="break-increment">More Break</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card mb-4 shadow-sm">
                        <div id="session-label" class="card-header">Session length</div>
                        <div class="card-body">
                            <p class="card-text">
                                <div id="session-length">{sessionLength}</div>
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button disabled={play} onClick={handleSessionDecrement} type="button" class="btn btn-sm btn-outline-secondary" id="session-decrement">Less Work</button>
                                    <button disabled={play} onClick={handleSessionIncrement} type="button" class="btn btn-sm btn-outline-secondary" id="session-increment">More Work</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="card mb-4 shadow-sm">
                        <div id="timer-label" class="card-header">{title}</div>
                        <div class="card-body">
                            <p class="card-text">
                                <div id="time-left">{timeFormatter()}</div>
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button onClick={handlePlay} type="button" class="btn btn-sm btn-outline-secondary" id="start_stop">Start/Stop</button>
                                    <button onClick={handleReset} type="button" class="btn btn-sm btn-outline-secondary" id="reset">Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <audio
                id="beep"
                preload="auto"
                src="./clip/beep.mp3"
            />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));
let startTime, updatedTime, difference, tInterval, savedTime = 0;
let running = false;
let beep = new Audio('beep.mp3');
let lastBeepSecond = null;

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 10);
        document.getElementById('startStopBtn').innerHTML = "Stop";
        document.getElementById('startStopBtn').classList.remove('btn-start');
        document.getElementById('startStopBtn').classList.add('btn-stop');
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime = difference;
        document.getElementById('startStopBtn').innerHTML = "Start";
        document.getElementById('startStopBtn').classList.remove('btn-stop');
        document.getElementById('startStopBtn').classList.add('btn-start');
        running = false;
        storeResult();
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    savedTime = 0;
    document.getElementById('startStopBtn').innerHTML = "Start";
    document.getElementById('startStopBtn').classList.remove('btn-stop');
    document.getElementById('startStopBtn').classList.add('btn-start');
    document.getElementById('stopwatch').innerHTML = "00:00.000";
    document.getElementById('results').innerHTML = "";
    lastBeepSecond = null;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 1);

    if ((seconds >= 55 || seconds === 0) && seconds !== lastBeepSecond) {
        beep.play();
        lastBeepSecond = seconds;
    }

    document.getElementById('stopwatch').innerHTML = 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds) + "." + 
        (milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds);
}

function storeResult() {
    let result = document.getElementById('stopwatch').innerHTML;
    let li = document.createElement('li');
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(result));
    document.getElementById('results').appendChild(li);
}

document.getElementById('startStopBtn').addEventListener('click', startStop);
document.getElementById('resetBtn').addEventListener('click', reset);
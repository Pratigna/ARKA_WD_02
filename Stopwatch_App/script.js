

let timerInterval;
let ms = 0, secs = 0, mins = 0;
let running = false;

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const lapsContainer = document.getElementById('lap-records');

document.getElementById('start-btn').addEventListener('click', () => {
    if (!running) {
        running = true;
        timerInterval = setInterval(updateTimer, 10);
    }
});

document.getElementById('pause-btn').addEventListener('click', () => {
    running = false;
    clearInterval(timerInterval);
});

document.getElementById('reset-btn').addEventListener('click', () => {
    running = false;
    clearInterval(timerInterval);
    ms = secs = mins = 0;
    updateDisplay();
    lapsContainer.innerHTML = '';
});

document.getElementById('lap-btn').addEventListener('click', () => {
    if (running) {
        const lapTime = `${formatTime(mins)}:${formatTime(secs)}:${formatTime(ms / 10)}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap: ${lapTime}`;
        lapsContainer.appendChild(lapItem);
    }
});

function updateTimer() {
    ms += 10;
    if (ms === 1000) {
        ms = 0;
        secs++;
    }
    if (secs === 60) {
        secs = 0;
        mins++;
    }
    updateDisplay();
}

function updateDisplay() {
    millisecondsEl.textContent = formatTime(ms / 10);
    secondsEl.textContent = formatTime(secs);
    minutesEl.textContent = formatTime(mins);
}

function formatTime(value) {
    return value < 10 ? `0${Math.floor(value)}` : Math.floor(value);
}

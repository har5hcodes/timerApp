// extract container
const timerContainer = document.getElementById("timerContainer");
const msgContainer = document.getElementById("msgContainer");
const msgBox = document.getElementById("msgBox");
// extract input fields
const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");

// extract buttons
const startBtn = document.getElementById("startBtn");
const resumeBtn = document.getElementById("resumetBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const okBtn = document.getElementById("okBtn");

// alarm sound
const alarmSound = new Audio("./assets/audio.wav");

// inital input values
let initialHours = hoursInput.value;
let initialMinutes = minutesInput.value;
let initialSeconds = secondsInput.value;
hoursInput.oninput = () => {
  initialHours = hoursInput.value;
  hoursInput.value = initialHours.toString().padStart(2, "0");
};
minutesInput.oninput = () => {
  initialMinutes = minutesInput.value;
  minutesInput.value = initialMinutes.toString().padStart(2, "0");
};
secondsInput.oninput = () => {
  initialSeconds = secondsInput.value;
  secondsInput.value = initialSeconds.toString().padStart(2, "0");
};

// function to decrement time and display
let intervalId = null;

const timerFunc = () => {
  let totalSeconds =
    parseInt(hoursInput.value) * 3600 +
    parseInt(minutesInput.value) * 60 +
    parseInt(secondsInput.value);

  if (totalSeconds === 0) {
    return null;
  }

  setTimeout(() => {
    timerContainer.style.display = "none";
    msgContainer.style.display = "flex";
    alarmSound.loop = true;
    alarmSound.play();
  }, totalSeconds * 1000);

  intervalId = setInterval(() => {
    totalSeconds--;
    hoursInput.value = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    minutesInput.value = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    secondsInput.value = Math.floor((totalSeconds % 3600) % 60)
      .toString()
      .padStart(2, "0");
    if (totalSeconds === 0) clearInterval(intervalId);
  }, 1000);
};

// eventlisteners
startBtn.addEventListener("click", timerFunc);

pauseBtn.addEventListener("click", () => {
  clearInterval(intervalId);
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  hoursInput.value = initialHours.toString().padStart(2, "0");
  minutesInput.value = initialMinutes.toString().padStart(2, "0");
  secondsInput.value = initialSeconds.toString().padStart(2, "0");
});

okBtn.addEventListener("click", () => {
  initialHours = 0;
  initialMinutes = 0;
  initialSeconds = 0;
  hoursInput.value = "00";
  minutesInput.value = "00";
  secondsInput.value = "00";
  timerContainer.style.display = "flex";
  msgContainer.style.display = "none";
  clearInterval(intervalId);
  alarmSound.pause();
});

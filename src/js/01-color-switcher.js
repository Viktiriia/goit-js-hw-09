function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);


function onStart() {
     timerId = setInterval(() => {
    const color = getRandomHexColor();
         body.style.background = color;
         startBtn.disabled = true;
         stopBtn.disabled = false;
  }, 1000);
}

function onStop() {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}



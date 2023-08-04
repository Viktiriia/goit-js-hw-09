import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';
const refs = {
    date: document.querySelector('#datetime-picker'),
    btn: document.querySelector('[data-start]'),
    day: document.querySelector('[data-days]'),
    hour: document.querySelector('[data-hours]'),
    min: document.querySelector('[data-minutes]'),
    sec: document.querySelector('[data-seconds]'),
    spans: document.querySelectorAll('.value'),
};

let timerId = null;

refs.btn.disabled = true;

flatpickr(refs.date, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      refs.btn.disabled = true;
    } else {
      refs.btn.disabled = false;

      Notify.success('Start the timer!?');
    }
  },
});

refs.btn.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  refs.spans.forEach(item => item.classList.toggle('end'));
  refs.btn.disabled = true;
  refs.date.disabled = true;
  timerId = setInterval(() => {
    const choosenDate = new Date(refs.date.value);
    const timeToFinish = choosenDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeToFinish);

     refs.day.textContent = addLeadingZero(days);
     refs.hour.textContent = addLeadingZero(hours);
     refs.min.textContent = addLeadingZero(minutes);
     refs.sec.textContent = addLeadingZero(seconds);

    if (timeToFinish < 1000) {
       refs.spans.forEach(item => item.classList.toggle('end'));
      clearInterval(timerId);
       refs.date.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}


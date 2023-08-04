import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form')
form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  let delay = Number(form.delay.value);

  for (let i = 1; i <= form.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += Number(form.step.value);
  }
}

function createPromise(position, delay) {
  const object = { position, delay };
  const decision = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (decision) {
        resolve(object);
      } else {
        reject(object);
      }
    }, delay);
  });
}
  
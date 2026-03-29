import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

// Додаємо перевірку, щоб уникнути помилки "Cannot read properties of null"
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delay = Number(event.currentTarget.elements.delay.value);
    const state = event.currentTarget.elements.state.value;

    createPromise(delay, state)
      .then((delay) => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: '#59a10d',
          messageColor: '#fff',
          iconColor: '#fff',
          close: false, // Опціонально для чистоти макету
        });
      })
      .catch((delay) => {
        iziToast.error({
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: '#ef4040',
          messageColor: '#fff',
          iconColor: '#fff',
          close: false,
        });
      });

    form.reset();
  });
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
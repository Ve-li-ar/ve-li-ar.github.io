const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(GET_URL,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось загрузить данные');
    })

    .then(onSuccess)
    .catch(onError);
};

const sendData = (onSuccess, onError, body) => {
  fetch(POST_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      throw new Error('Ошибка передачи данных');
    })
    .catch(onError);
};

export { getData, sendData }
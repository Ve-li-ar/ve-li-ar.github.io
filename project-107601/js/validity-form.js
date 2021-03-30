const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const MAX_ROOMS = 100;

const pricesMinOnNight = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const inputFormTitle = document.querySelector('#title');
const guestsNumber = document.querySelector('#capacity');
const roomsNumber = document.querySelector('#room_number');

const selectFormType = document.querySelector('#type');
const inputFormPrice = document.querySelector('#price');

const validatePrice = () => {
  inputFormPrice.placeholder = pricesMinOnNight[selectFormType.value];
  inputFormPrice.min = pricesMinOnNight[selectFormType.value];
}

selectFormType.addEventListener('change', () => {
  validatePrice();
})

const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');

selectTimeIn.addEventListener('change', (evt) => {
  selectTimeOut.value = evt.target.value;
})

selectTimeOut.addEventListener('change', (evt) => {
  selectTimeIn.value = evt.target.value;
})

inputFormTitle.addEventListener('input', () => {
  const valueLength = inputFormTitle.value.length;

  if (valueLength < MIN_LENGTH) {
    inputFormTitle.setCustomValidity(`Минимальное количество символов 30. Введите ещё ${MIN_LENGTH - valueLength} символов`);
  } else if (valueLength > MAX_LENGTH) {
    inputFormTitle.setCustomValidity(`Максимальное количество символов 100. Удалите ${valueLength - MAX_LENGTH} символов`);
  } else {
    inputFormTitle.setCustomValidity('');
  }
  inputFormTitle.reportValidity();

});

const validateRatioOfRoomsToGuests = () => {
  const rooms = parseInt(roomsNumber.value, 10);
  const guests = parseInt(guestsNumber.value, 10);

  if (rooms === MAX_ROOMS ^ guests === 0) {
    guestsNumber.setCustomValidity('Вы выбрали вариант не подходящий для заселения');
  } else if (rooms < guests) {
    guestsNumber.setCustomValidity('Невозможно заселить. Выберите большее количество комнат');
  } else {
    guestsNumber.setCustomValidity('');
  }

  guestsNumber.reportValidity();

}

guestsNumber.addEventListener('change', () => {
  validateRatioOfRoomsToGuests();
})

roomsNumber.addEventListener('change', () => {
  validateRatioOfRoomsToGuests();
})

export { validateRatioOfRoomsToGuests, validatePrice };
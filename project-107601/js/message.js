import { isEscEvent } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

const onClick = (evt) => {
  evt.preventDefault();
  closeMessage();
};

const closeMessage = () => {
  document.querySelectorAll('.success, .error').forEach((message) => message.remove());
  document.removeEventListener('click', onClick);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const showMessage = (message) => {
  document.body.appendChild(message);
  message.classList.remove('hidden');
  message.style.zIndex = '9999999';
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  showMessage(successMessage);
};

const showErrorMessage = (error) => {
  const errorMessage = errorTemplate.cloneNode(true);
  if (error) {
    errorMessage.querySelector('.error__message').textContent = error.message;
  }
  showMessage(errorMessage);
};

export { showSuccessMessage, showErrorMessage }

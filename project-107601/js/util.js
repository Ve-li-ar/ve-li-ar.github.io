const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const debounce = (cb, ms) => {
  let timer;

  return () => {
    if (timer) {
      window.clearTimeout(timer);
    }

    timer = setTimeout(() => cb(), ms)
  }
};

export {
  debounce,
  isEscEvent
};
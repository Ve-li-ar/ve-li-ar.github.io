import './util.js';
import './map.js';
import './validity-form.js';
import { getData } from './data-server.js';
import { initMainPins, initMainPin } from './map.js';
import { adFormSubmit, adFormReset, deactivateForm, activateForm } from './form.js';
import { showErrorMessage } from './message.js';
import { setHousingTypeChange } from './filter.js';

deactivateForm();
getData(
  (apartments) => {
    initMainPin();
    initMainPins(apartments);
    setHousingTypeChange(apartments);
    activateForm();
    adFormSubmit(apartments);
    adFormReset(apartments);
  },
  showErrorMessage,
);
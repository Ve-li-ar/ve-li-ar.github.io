import { createCard } from './card.js';
import { form } from './form.js';

const MAIN_LATITUDE = 35.6894;
const MAIN_LONGITUDE = 139.692;
const MAIN_ZOOM = 10;
const PIN_SIZE_X = 50;
const PIN_SIZE_Y = 82;
const MIN_PIN_SIZE_X = 25;
const MIN_PIN_SIZE_Y = 41;
const VISIBLE_ADS = 10;

const valueForm = form.querySelector('#address')

const map = window.L.map('map-canvas')

  .setView({
    lat: MAIN_LATITUDE,
    lng: MAIN_LONGITUDE,
  }, MAIN_ZOOM);

window.L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  })
  .addTo(map);

const mainPinMarker = window.L.marker(
  {
    lat: MAIN_LATITUDE,
    lng: MAIN_LONGITUDE,
  },
  {
    draggable: true,
    icon: window.L.icon({
      iconUrl: 'img/main-pin.svg',
      iconSize: [PIN_SIZE_X, PIN_SIZE_Y],
      iconAnchor: [MIN_PIN_SIZE_X, MIN_PIN_SIZE_Y],
    }),
  },
)

const initMainPin = () => {

  mainPinMarker.on('move', (evt) => {
    const coords = evt.target.getLatLng();
    const lat = coords.lat.toFixed(5);
    const lng = coords.lng.toFixed(5);
    valueForm.value = `${lat}, ${lng}`;
  });

  mainPinMarker.addTo(map);
  mainPinMarker.fireEvent('move');
};

const markers = [];

const initMainPins = (apartments) => {
  apartments.slice(0, VISIBLE_ADS).forEach((pin) => {

    const icon = window.L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [PIN_SIZE_X, PIN_SIZE_Y],
      iconAnchor: [MIN_PIN_SIZE_X, MIN_PIN_SIZE_Y],
    });

    const marker = window.L.marker({
      lat: pin.location.lat,
      lng: pin.location.lng,
    }, { icon },
    );

    marker
      .addTo(map)
      .bindPopup(() => createCard(pin), {
        keepInView: true,
      });
    markers.push(marker);
  });
};

const resetMainMarker = () => {
  mainPinMarker.setLatLng([MAIN_LATITUDE, MAIN_LONGITUDE]);
  mainPinMarker.fireEvent('moveend');
  map.setView(new window.L.LatLng(MAIN_LATITUDE, MAIN_LONGITUDE), MAIN_ZOOM);
};

const removeMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  })
  markers.length = 0;
}

export { initMainPins, initMainPin, resetMainMarker, markers, removeMarkers }

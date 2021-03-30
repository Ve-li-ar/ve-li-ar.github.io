import { initMainPins, removeMarkers } from './map.js';
import { debounce } from './util.js';

const mapFilter = document.querySelector('.map__filters');
const houseType = document.querySelector('#housing-type');
const houseRooms = document.querySelector('#housing-rooms');
const houseGuests = document.querySelector('#housing-guests');
const housePrice = document.querySelector('#housing-price');
const RERENDER_DELAY = 500;
const MAX_NUMBER_PINS = 10;

const PRICES = {
  low: {
    MIN: 0,
    MAX: 10000,
  },
  middle: {
    MIN: 10000,
    MAX: 50000,
  },
  high: {
    MIN: 50000,
    MAX: Infinity,
  },
};

const setHousingTypeChange = (pins) => {
  mapFilter.addEventListener('change', debounce(() => {
    removeMarkers();
    const filterPins = [];
    for (let pin of pins) {
      if (
        filterByHouseType(pin.offer) &&
        filterByHouseRooms(pin.offer) &&
        filterByHousePrice(pin.offer) &&
        filterByHouseCapacity(pin.offer) &&
        filterByHousefeatures(pin.offer)
      ) {
        filterPins.push(pin);
        if (filterPins.length >= MAX_NUMBER_PINS) {
          break;
        }
      }
    }
    initMainPins(filterPins);
  }, RERENDER_DELAY))
}

const filterByHouseType = (offer) => {
  return houseType.value === 'any' || offer.type === houseType.value;
};

const filterByHouseRooms = (offer) => {
  return houseRooms.value === 'any' || offer.rooms === Number(houseRooms.value);
};

const filterByHouseCapacity = (offer) => {
  return houseGuests.value === 'any' || offer.guests === Number(houseGuests.value);
};

const filterByHousePrice = (offer) => {
  const settings = PRICES[housePrice.value]
  return housePrice.value === 'any' || (offer.price >= settings.MIN && offer.price <= settings.MAX);
};

const filterByHousefeatures = (offer) => {
  const checkedFeaturesFilter = mapFilter.querySelectorAll('.map__checkbox:checked');
  let i = 0;
  checkedFeaturesFilter.forEach((feature) => {
    if (offer.features.includes(feature.value)) {
      i++;
    }
  });
  return i === checkedFeaturesFilter.length;
};

const resetFilterForm = () => {
  mapFilter.reset();
}

export { setHousingTypeChange, resetFilterForm };

const ApartmentTypes = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
}

const isVoidElement = (element) => {
  return element.length === 0 || element.src === null
}

const createCard = ({ author, offer }) => {
  const cardTemplate = document.querySelector('#card').content;
  const cardTemplateArticle = cardTemplate.querySelector('article');

  const cardExample = cardTemplateArticle.cloneNode(true);

  const articleAvatar = cardExample.querySelector('.popup__avatar');

  if (isVoidElement(articleAvatar)) {
    articleAvatar.remove();
  }
  else {
    articleAvatar.src = author.avatar;
  }

  const articleTitle = cardExample.querySelector('.popup__title');

  if (isVoidElement(articleTitle)) {
    articleTitle.remove();
  }
  else {
    articleTitle.textContent = offer.title;
  }

  cardExample.querySelector('.popup__text--address').textContent = offer.address;
  cardExample.querySelector('.popup__text--price').textContent = `${offer.price}₽/ночь`;
  cardExample.querySelector('.popup__type').textContent = ApartmentTypes[offer.type.toUpperCase()];
  cardExample.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardExample.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;

  const articleDescription = cardExample.querySelector('.popup__description');

  if (isVoidElement(articleDescription)) {
    articleDescription.remove();
  }
  else {
    articleDescription.textContent = offer.description;
  }

  const articleFeatures = cardExample.querySelector('.popup__features');

  if (isVoidElement(articleFeatures)) {
    articleFeatures.remove();
  }
  else {
    articleFeatures.textContent = '';
    let featuresFragment = document.createDocumentFragment();
    offer.features.map((item) => {
      const liElement = document.createElement('li');
      liElement.classList.add('popup__feature');
      const specificClassOfLi = `popup__feature--${item}`
      liElement.classList.add(specificClassOfLi);
      return liElement;
    })
      .forEach((liElement) => {
        featuresFragment.appendChild(liElement);
      })

    articleFeatures.appendChild(featuresFragment);
  }

  const articlePhotos = cardExample.querySelector('.popup__photos');

  if (offer.photos.length === 0) {
    articlePhotos.remove();
  }
  else {
    const articlePhoto = cardExample.querySelector('.popup__photo');
    articlePhoto.src = offer.photos[0];

    if (offer.photos.length > 1) {
      for (let i = 1; i < offer.photos.length; i++) {
        const nextArticlePhoto = articlePhoto.cloneNode(true);
        nextArticlePhoto.src = offer.photos[i];
        articlePhotos.appendChild(nextArticlePhoto);
      }
    }
  }

  return cardExample;
}

export { createCard };
const params = {
  btnClassName: "selectors__item-btn",
  activeClassName: "is-active",
  disabledClassName: "is-disabled"
}

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(params.disabledClassName, params.activeClassName);
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(`.${params.activeClassName}`);

    if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(`[data-target="${path}"]`);

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });
}

setMenuListener();

const swiperHero = new Swiper('.hero-swiper', {
  allowTouchMove: false,
  loop: true,
  effect: 'fade',
  speed: 10000,
  autoplay: {
    delay: 10000
  }
});

function burgerMenu() {
  document.querySelector('#burger').addEventListener('click', function() {
    const nav = document.querySelector('.nav__list');
    const navItemst = nav.querySelectorAll('a');

    document.body.classList.toggle('stop-scroll');
    document.querySelector('#menu').classList.toggle('is-active');
    document.querySelector('.burger').classList.toggle('is-active');
    document.querySelector('.burger__icon-front').classList.toggle('is-back');
    document.querySelector('.burger__icon-back').classList.toggle('is-front');

    navItemst.forEach(el => {
      el.addEventListener('click', () => {
        document.body.classList.remove('stop-scroll');
        document.querySelector('#menu').classList.remove('is-active');
        document.querySelector('.burger').classList.remove('is-active');
        document.querySelector('.burger__icon-front').classList.remove('is-back');
        document.querySelector('.burger__icon-back').classList.remove('is-front');
      });
    });
  });
}

burgerMenu();

function searchBtn() {
  document.querySelector('.search-btn').addEventListener('click', function() {
      document.querySelector('.search-btn').classList.toggle('is-active');
      document.querySelector('.search-wrap').classList.toggle('is-active');
      document.querySelector('.search-btn__icon_front').classList.toggle('is-back');
      document.querySelector('.search-btn__icon_back').classList.toggle('is-front');
    });
};

searchBtn();

const selectFilter = document.querySelector('.filter__select');
const choices = new Choices(selectFilter, {
    searchEnabled: false,
    position: 'auto',
    shouldSort: false,
    placeholder: true,
    itemSelectText: 'Нажмите, чтобы выбрать',
});

const gallerySlider = new Swiper(".slides-container", {
  slidesPerView: 1,
  grid: {
    rows: 1,
    fill: "row"
  },
  spaceBetween: 20,
  pagination: {
    el: ".galery .galery__pagination",
    type: "fraction"
  },
  navigation: {
    nextEl: ".galery__btn_next",
    prevEl: ".galery__btn_prev"
  },

  breakpoints: {
    441: {
      slidesPerView: 2,
      grid: {
        rows: 2
      },
      spaceBetween: 34
    },

    1200: {
      slidesPerView: 3,
      grid: {
        rows: 2
      },
      spaceBetween: 50
    }
  },

  a11y: false,
  keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  slideVisibleClass: 'slide-visible',

  on: {
    init: function () {
      this.slides.forEach(slide => {
        if (!slide.classList.contains('slide-visible')) {
          slide.tabIndex = '-1';
        } else {
          slide.tabIndex = '';
        }
      });
    },
    slideChange: function () {
      this.slides.forEach(slide => {
        if (!slide.classList.contains('slide-visible')) {
          slide.tabIndex = '-1';
        } else {
          slide.tabIndex = '';
        }
      });
    }
  }
});

// модальнье окно

const modBtns = document.querySelectorAll('.galery__slide');
const modalsOverlay = document.querySelector('.galery__modals-overlay');
const modals = document.querySelectorAll('.galery__modal');
const modalClose = document.querySelectorAll('.modal__close-btn');


modBtns.forEach((el) => {
  el.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');

    modals.forEach((el) => {
      el.classList.remove('galery__modal_visible');
    });

    document.body.classList.add('stop-scroll');

    document.querySelector(`[data-target="${path}"]`).classList.add('galery__modal_visible');
    modalsOverlay.classList.add('galery__modals-overlay_visible');
  });
});

modalClose.forEach((el) => {
  el.addEventListener('click', (e) => {

    modals.forEach((el) => {
      el.classList.remove('galery__modal_visible');
    });
    modalsOverlay.classList.remove('galery__modals-overlay_visible');
    document.body.classList.remove('stop-scroll');
  });
});

modalsOverlay.addEventListener('click', (e) => {
  if (e.target == modalsOverlay) {
    modalsOverlay.classList.remove('galery__modals-overlay_visible');
    modals.forEach((el) => {
      el.classList.remove('galery__modal_visible');
    });
    document.body.classList.remove('stop-scroll');
  }

})

document.addEventListener('DOMContentLoaded', function () {
  $( ".js-accordion" ).accordion({
      collapsible: true,
      active: 0,
      icons: false,
      heightStyle: 'content',
    });
});

// функции для табов

function tab() {
  document.querySelectorAll('.catalog-link').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function(event) {
        const path = event.currentTarget.dataset.path;
        document.querySelectorAll('.catalog-link').forEach( (el) => el.classList.remove('catalog-link_active'))
        if (path) {
          document.querySelectorAll('.catalog__card').forEach(function(tabContent) {
              tabContent.classList.remove('catalog__card_active');
          })
          document.querySelector(`[data-target="${path}"]`).classList.add('catalog__card_active');
          event.currentTarget.classList.add('catalog-link_active')
        };
    });
  });
}

tab();

function getWindowWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  );
}

function destroySlider(params) {
  params.cardsSlider.destroy();
  params.cardsContainer.classList.remove("swiper-container");
  params.cardsWrap.classList.remove("swiper-wrapper");
  params.cardsWrap.removeAttribute("aria-live");
  params.cardsWrap.removeAttribute("id");
}
// events part
function eventsSlider() {
  const MOBILE_WIDTH = 600;
  const DESKTOP_WIDTH = 1024;
  const btn = document.querySelector(".js-show");

  const sliderMobileParams = {
    paginationClassName: "events-pagination",
    cardsContainerName: "events__slider",
    cardsWrapName: "events__slides-wrap",
    card: "events__item",
    hiddenClass: "is-hidden",
  };

  function activateEventsSlider(params) {
    const pagination = document.createElement("div");
    pagination.classList.add(params.paginationClassName);
    params.cardsContainer.append(pagination);

    params.cardsContainer.classList.add("swiper-container");
    params.cardsWrap.classList.add("swiper-wrapper");

    params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: `.${params.cardsContainerName} .${params.paginationClassName}`,
        clickable: true,

      },

      on: {
        beforeInit() {
          document.querySelectorAll(`.${params.card}`).forEach((el) => {
            el.classList.add("swiper-slide");
          });
        },

        beforeDestroy() {
          this.slides.forEach((el) => {
            el.classList.remove("swiper-slide");
            el.removeAttribute("role");
            el.removeAttribute("aria-label");
          });

          this.pagination.el.remove();
        }
      }
    });
  }

  function setHiddenCards(params, windowWidth) {
    const cards = document.querySelectorAll(`.${params.card}`);
    let quantity = cards.length;

    if (windowWidth > MOBILE_WIDTH && windowWidth < DESKTOP_WIDTH) {
      quantity = 2;
    }

    if (windowWidth >= DESKTOP_WIDTH) {
      quantity = 3;
    }

    cards.forEach((card, i) => {
      card.classList.remove(params.hiddenClass);
      if (i >= quantity) {
        card.classList.add(params.hiddenClass);
      }
    });
  }

  function showCards(e) {
    const cards = document.querySelectorAll(`.${sliderMobileParams.card}`);

    e.target.style = "display: none";

    cards.forEach((card) => {
      card.classList.remove(sliderMobileParams.hiddenClass);
    });
  }

  function checkWindowWidthMobile(params) {
    const currentWidth = getWindowWidth();
    btn.style = "";
    params.cardsContainer = document.querySelector(
      `.${params.cardsContainerName}`
    );
    params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

    if (
      currentWidth <= MOBILE_WIDTH &&
      (!params.cardsSlider || params.cardsSlider.destroyed)
    ) {
      activateEventsSlider(params);
    } else if (currentWidth > MOBILE_WIDTH && params.cardsSlider) {
      destroySlider(params);
    };

    setHiddenCards(params, currentWidth);
  };

  checkWindowWidthMobile(sliderMobileParams);
  btn.addEventListener("click", showCards);

  window.addEventListener("resize", function () {
    checkWindowWidthMobile(sliderMobileParams);
  });
};

eventsSlider();

function checkBtnArea() {
  const checkBtn = document.querySelector('.js-check-heading');

  checkBtn.addEventListener('click', function () {
      this.classList.toggle('is-active');
  });
}

checkBtnArea();

// editions part

function editionsSlider() {
  const MOBILE_WIDTH = 765;

  const sliderParamsNotMobile = {
    sliderWrap: "editions-swiper",
    cardsContainerName: "editions__slider",
    cardsWrapName: "editions__slides",
    card: "editions__slide",
    paginationClassName: "editions__pagination",
    navClassName: "editions__navigation",
    navBtnClassName: "editions__btn",
    navPrev: "editions__btn_prev",
    navNext: "editions__btn_next"
  };

  function activateSlider(params) {
    const navigation = document.createElement("div");
    const pagination = document.createElement("div");
    const navBtnPrev = document.createElement("button");
    const navBtnNext = document.createElement("button");

    navigation.classList.add(params.navClassName);

    navBtnPrev.classList.add(params.navBtnClassName);
    navBtnPrev.classList.add(params.navPrev);
    navigation.prepend(navBtnPrev);

    pagination.classList.add(params.paginationClassName);
    navigation.append(pagination);

    navBtnNext.classList.add(params.navBtnClassName);
    navBtnNext.classList.add(params.navNext);
    navigation.append(navBtnNext);

    params.sliderWrapElem.prepend(navigation);

    params.cardsContainer.classList.add("swiper-container");
    params.cardsWrap.classList.add("swiper-wrapper");

    params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
       breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 34,
          slidesPerGroup: 2,
        },
        1023: {
          slidesPerView: 2,
          spaceBetween: 50,
          slidesPerGroup: 2,
        },
         1400: {
           slidesPerView: 3,
           spaceBetween: 50,
           slidesPerGroup: 3,
         },
       },
      pagination: {
        el: `.${params.sliderWrap} .${params.paginationClassName}`,
        type: "fraction"
      },
      navigation: {
        nextEl: `.${params.navNext}`,
        prevEl: `.${params.navPrev}`
      },
      a11y: false,
      keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      slideVisibleClass: 'slide-visible',

      on: {
        beforeInit() {
          document.querySelectorAll(`.${params.card}`).forEach((el) => {
            el.classList.add("swiper-slide");
          });
        },

        beforeDestroy() {
          this.slides.forEach((el) => {
            el.classList.remove("swiper-slide");
            el.removeAttribute("role");
            el.removeAttribute("aria-label");
          });

          this.pagination.el.remove();
          navigation.remove();
        },

        init: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.querySelector('.editions__order-btn').tabIndex = '-1';
            } else {
              slide.querySelector('.editions__order-btn').tabIndex = '';
            }
          });
        },

        slideChange: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.querySelector('.editions__order-btn').tabIndex = '-1';
            } else {
              slide.querySelector('.editions__order-btn').tabIndex = '';
            }
          });
        }
      }
    });
  };

  function checkWindowWidth(params) {
    const currentWidth = getWindowWidth();
    params.sliderWrapElem = document.querySelector(`.${params.sliderWrap}`);
    params.cardsContainer = document.querySelector(
      `.${params.cardsContainerName}`
    );
    params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

    if (
      currentWidth > MOBILE_WIDTH &&
      (!params.cardsSlider || params.cardsSlider.destroyed)
    ) {
      activateSlider(params);
    } else if (currentWidth <= MOBILE_WIDTH && params.cardsSlider) {
      destroySlider(params);
    };
  };

  checkWindowWidth(sliderParamsNotMobile);

  window.addEventListener("resize", function () {
    checkWindowWidth(sliderParamsNotMobile);
  });
};

editionsSlider();

tippy(".projects__tooltip", {
  interactive: true,
  trigger: 'click',
});

// partners part

const partnersSlider = new Swiper(".partners__slider", {
  slidesPerView: 1,
  grid: {
    rows: 1,
    fill: "row"
  },
  spaceBetween: 0,
  navigation: {
    nextEl: ".partners__btn_next",
    prevEl: ".partners__btn_prev"
  },

  breakpoints: {

    441: {
      slidesPerView: 2,
      spaceBetween: 34,
    },

    1023: {
      slidesPerView: 2,
      spaceBetween: 50,
    },

    1200: {
      slidesPerView: 3,
      spaceBetween: 50,
    }
  },

  a11y: false,
  keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  slideVisibleClass: 'slide-visible',

  on: {
    init: function () {
      this.slides.forEach(slide => {
        if (!slide.classList.contains('slide-visible')) {
          slide.tabIndex = '-1';
        } else {
          slide.tabIndex = '';
        }
      });
    },
    slideChange: function () {
      this.slides.forEach(slide => {
        if (!slide.classList.contains('slide-visible')) {
          slide.tabIndex = '-1';
        } else {
          slide.tabIndex = '';
        }
      });
    }
  }
});



ymaps.ready(init);
function init() {
  const mapElem = document.querySelector('#map');
  const myMap = new ymaps.Map(
    "map",
    {
      center: [55.75846806898367, 37.60108849999989],
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl']
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition:  { top: "200px", right: "20px" },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "120px", right: "20px" }
    }
  );

  myMap.behaviors.disable('scrollZoom');

  const myPlacemark = new ymaps.Placemark(
    [55.75846806898367, 37.60108849999989],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "img/map-mark.svg",
      iconImageSize: [20, 20],
      iconImageOffset: [-2, -2],
    }
  );

  myMap.geoObjects.add(myPlacemark);

  setTimeout(() => {
    myMap.container.fitToViewport();
  }, 5000);
}

var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7(999) 999-99-99");

  im.mask(selector);

new JustValidate('.contacts__form', {
    rules: {
        name: {
            required: true,
            minLength: 2,
            maxLength: 10,
            strength: {
              custom: '^[А-ЯЁ]+[а-яё]',
            },
            errorMessage: 'Имя должно содержать не менее 2 символов, но не более 10',
            focusWrongField: false,
        },
        tel: {
            required: true,
            function: (name, value) => {
                const phone = selector.inputmask.unmaskedvalue()
                return Number(phone) && phone.length === 10
            }
        },
    },
    messages: {
      name: {
        minLength: 'Имя слишком короткое',
        maxLength: 'Имя слишком длинное',
        strength: 'Недопустимый формат',
        required: 'Заполните поле'
      },
      tel: 'Телефон должен содерфать 10 цифр'
    },
    colorWrong: '#D11616',
    focusWrongField: true,
});


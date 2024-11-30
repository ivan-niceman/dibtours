// menu
const servicesMobileBtn = document.querySelector('.services-mobile-item');
const servicesMobileList = document.querySelector(
  '.services-mobile-item_active',
);

servicesMobileBtn.addEventListener('click', () => {
  servicesMobileBtn.classList.toggle('services-mobile-item_active');
});

// mobile menu
const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.header__nav');
const closeMobileMenuBtn = document.querySelector('.close-nav');
const navLinks = document.querySelectorAll('.header__nav-list a');

function openMobileMenu() {
  mobileMenu.classList.add('header__nav_active');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  mobileMenu.classList.remove('header__nav_active');
  document.body.style.overflow = '';
}

burgerBtn.addEventListener('click', () => {
  openMobileMenu();
});

closeMobileMenuBtn.addEventListener('click', () => {
  closeMobileMenu();
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 1000) {
      closeMobileMenu();
    }
  });
});

// popup
const openPopupBtn = document.querySelectorAll('.header__feedback-btn');
const closePopupBtn = document.querySelector('.close-popup');
const popupContent = document.querySelector('.popup__form-content');
const popupForm = document.querySelector('.popup__form-block');

const closeMessagePopupBtn = document.querySelector('.message-close-popup');
const popupMessageContent = document.querySelector('.form__message');
const popupMessage = document.querySelector('.form__message-block');

closeMessagePopupBtn.addEventListener('click', () => {
  popupMessageContent.classList.remove('form__message_active');
});

popupMessageContent.addEventListener('click', (event) => {
  if (!popupMessage.contains(event.target)) {
    popupMessageContent.classList.remove('form__message_active');
  }
});

function closePopup(event) {
  event.classList.remove('popup__form_active');
  document.body.style.overflow = '';
}
function openPopup(event) {
  event.classList.add('popup__form_active');
  document.body.style.overflow = 'hidden';
}

openPopupBtn.forEach((button) => {
  button.addEventListener('click', () => {
    openPopup(popupContent);
  });
});

closePopupBtn.addEventListener('click', () => {
  closePopup(popupContent);
});

popupContent.addEventListener('click', (event) => {
  if (!popupForm.contains(event.target)) {
    closePopup(popupContent);
  }
});

// send form
document.addEventListener('DOMContentLoaded', () => {
  const sendForms = document.querySelectorAll('.form');

  sendForms.forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      try {
        const response = await fetch('form.php', {
          method: 'POST',
          body: new FormData(form),
        });

        if (response.ok) {
          const messageElement = document.querySelector('.form__message');
          messageElement.classList.add('form__message_active');
          closePopup(popupContent);
          form.reset();
        } else {
          console.error('Ошибка отправки формы:', response.statusText);
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    });
  });
});

// animation
document.addEventListener('scroll', () => {
  const items = document.querySelectorAll('.about__item');

  items.forEach((item, index) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < window.innerHeight) {
      setTimeout(() => {
        item.classList.add('about__item_visible');
      }, index * 300);
    }
  });
});

// scroll to top and fix whatsapp
const scrollToTopButton = document.querySelector('.upward');
const whatsappBtn = document.querySelector('.fixed-whatsapp');
const footer = document.querySelector('footer');

window.addEventListener('scroll', () => {
  const footerRect = footer.getBoundingClientRect();
  if (window.scrollY > 800) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }

  if (footerRect.top <= window.innerHeight) {
    scrollToTopButton.style.bottom = `${
      window.innerHeight - footerRect.top + 10
    }px`;
    whatsappBtn.style.display = 'none';
  } else {
    scrollToTopButton.style.bottom = '30px';
    whatsappBtn.style.display = 'block';
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
  });
});

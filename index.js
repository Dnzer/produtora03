//CONFIGURAÇÃO DO CARROSSEL DO HERO
const HEROslides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;

  setInterval(() => {
    HEROslides[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + 1) % HEROslides.length;

    HEROslides[currentSlide].classList.add('active');
  }, 5000);



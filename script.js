//CONFIGURAÇÃO DO CARROSSEL DO HERO
//const HEROslides = document.querySelectorAll('.hero-slide');
  //let currentSlide = 0;

  //setInterval(() => {
    //HEROslides[currentSlide].classList.remove('active');

    //currentSlide = (currentSlide + 1) % HEROslides.length;

    //HEROslides[currentSlide].classList.add('active');
  //}, 5000);


const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", navLinks.classList.contains("open"));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});


/* CARROSSEL PRINCIPAL */
const track = document.querySelector(".slider-track");
const slides = [...document.querySelectorAll(".slide")];
const dotsBox = document.querySelector(".slider-dots");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

if (track && slides.length && dotsBox && prev && next) {
  let currentSlide = 0;
  let autoPlay;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.setAttribute("aria-label", `Ir para imagem ${index + 1}`);

    dot.addEventListener("click", () => goToSlide(index));
    dotsBox.appendChild(dot);
  });

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dotsBox.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  prev.addEventListener("click", () => goToSlide(currentSlide - 1));
  next.addEventListener("click", () => goToSlide(currentSlide + 1));

  function startAutoPlay() {
    autoPlay = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  const sliderContainer = track.parentElement.parentElement;

  sliderContainer.addEventListener("mouseenter", () =>
    clearInterval(autoPlay)
  );

  sliderContainer.addEventListener("mouseleave", startAutoPlay);

  startAutoPlay();
}

/* CARROSSEL DE PROJETOS */
const projectTrack = document.querySelector(".project-track");
const projectCards = [
  ...document.querySelectorAll(".project-card")
];
const projectPrev = document.querySelector(".project-prev");
const projectNext = document.querySelector(".project-next");

if (
  projectTrack &&
  projectCards.length &&
  projectPrev &&
  projectNext
) {
  let projectIndex = 0;

  function cardsPerView() {
    return window.innerWidth <= 760 ? 1 : 3;
  }

  function updateProjects() {
    const cardWidth =
      projectCards[0].getBoundingClientRect().width;

    const trackStyle = getComputedStyle(projectTrack);
    const gap = parseFloat(trackStyle.columnGap) || 0;

    const maxIndex = Math.max(
      0,
      projectCards.length - cardsPerView()
    );

    projectIndex = Math.min(projectIndex, maxIndex);

    projectTrack.style.transform =
      `translateX(-${projectIndex * (cardWidth + gap)}px)`;

    projectPrev.disabled = maxIndex === 0;
    projectNext.disabled = maxIndex === 0;
  }

  projectNext.addEventListener("click", () => {
    const maxIndex = Math.max(
      0,
      projectCards.length - cardsPerView()
    );

    projectIndex = projectIndex >= maxIndex
      ? 0
      : projectIndex + 1;

    updateProjects();
  });

  projectPrev.addEventListener("click", () => {
    const maxIndex = Math.max(
      0,
      projectCards.length - cardsPerView()
    );

    projectIndex = projectIndex <= 0
      ? maxIndex
      : projectIndex - 1;

    updateProjects();
  });

  window.addEventListener("resize", updateProjects);

  updateProjects();
}


const slides = document.querySelectorAll('.card');

slides.forEach((slide) => {
  slide.addEventListener('click', () => {
    slides.forEach((sld) => sld.classList.remove('active'));
    slide.classList.add('active');
  })
})
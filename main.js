
const expandCard = () => {
  const slides = document.querySelectorAll(".card");
  let currentIndex = -1;
  let interval;
  const activateItem = (index) => {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  };

  const startAutoSwitch = () => {
    clearInterval(interval);
    interval = setInterval(() => {
      if(currentIndex >= 0) {
        slides[currentIndex].classList.remove("active");
      }
      currentIndex = (currentIndex + 1) % slides.length;
      activateItem(currentIndex)
    },5000);
  };

  slides.forEach((card,idx) => {
    const blurItem = card.querySelector('.card-blur');
    const plushBtn = card.querySelector('.card-plus');
    const nextBtn = card.querySelector('.next');
    const prevBtn = card.querySelector('.prev');

    [blurItem,plushBtn].forEach((element) => {
      element.addEventListener("click", () => {
        clearInterval(interval);
      if(card.classList.contains("active")) {
        card.classList.remove("active");
        currentIndex = -1;
        startAutoSwitch();
      }else {
        slides.forEach((slide) => slide.classList.remove("active"));
        card.classList.add("active");
        currentIndex = idx;
        startAutoSwitch();
      }
    });
    });
    
    nextBtn.addEventListener("click", (e) => {
      // e.stopPropagation();
      clearInterval(interval);
      currentIndex = (idx + 1) % slides.length;
      activateItem(currentIndex);
      startAutoSwitch();
    });
    prevBtn.addEventListener("click", (e) => {
      // e.stopPropagation();
      clearInterval(interval);
      currentIndex = (idx - 1 + slides.length) % slides.length;
      activateItem(currentIndex);
      startAutoSwitch();
    });
  });

  startAutoSwitch();
}
expandCard();

const expandCard = () => {
  const slides = document.querySelectorAll(".card");
  let currentIndex = -1;
  let interval;
  let progressInterval;
  let transitionTime = 8000;

  // Activate Item 
  const activateItem = (index) => {
    slides.forEach((slide) => {
      slide.classList.remove("active");
      slide.querySelector(".progress-bar").style.width = "0%";
    });
    slides[index].classList.add("active");
    startProgressBar(slides[index]);
  };

  // Progress Bar Animation
  const startProgressBar = (card) => {
    const progressBar = card.querySelector(".progress-bar");
    progressBar.style.transition = `width ${transitionTime}ms linear`;
    progressBar.style.width = "100%";
  }

  // Auto switch slider 
  const startAutoSwitch = () => {

    if(currentIndex === -1) {
      currentIndex = 0;
      activateItem(currentIndex);
    }
    // clearInterval(interval);
    interval = setInterval(() => {
      if(currentIndex >= 0) {
        slides[currentIndex].classList.remove("active");
      }
      currentIndex = (currentIndex + 1) % slides.length;
      activateItem(currentIndex)
    },transitionTime);
  };

  // onclick events 
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
        startProgressBar(card);
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
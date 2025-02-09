document.addEventListener('DOMContentLoaded', function() {
	const expandCard = () => {
  const slides = document.querySelectorAll(".webase-card");
  const nextBtn = document.querySelector(".global-next");
  const prevBtn = document.querySelector(".global-prev");
  let currentIndex = 0;
  let interval;
  let transitionTime = 15000;
  let startX = 0;
  let isDragging = false;

  const resetProgressBar = (progressbar) => {
    progressbar.style.transition = "none";
    progressbar.style.width = "0%";
    setTimeout(() => {
      progressbar.style.transition = `width ${transitionTime}ms linear`;
      progressbar.style.width = "100%";
    }, 10);
  };

  const activateItem = (index) => {
    slides.forEach((slide) => {
      slide.classList.remove("active");
      resetProgressBar(slide.querySelector(".progress-bar"));
    });
    slides[index].classList.add("active");
    updateButtons();
  };

  const startAutoSwitch = () => {
    clearInterval(interval);
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length; // Looping continues
      activateItem(currentIndex);
    }, transitionTime);
  };

  const updateButtons = () => {
    if (window.innerWidth > 767) return; // Hide global buttons on desktop
    prevBtn.style.display = currentIndex === 0 ? prevBtn.classList.add("arrow-disable") : prevBtn.classList.remove("arrow-disable");
    nextBtn.style.display = currentIndex === slides.length - 1 ? nextBtn.classList.add("arrow-disable") : nextBtn.classList.remove("arrow-disable");
  };

  nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      activateItem(currentIndex);
      startAutoSwitch();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      activateItem(currentIndex);
      startAutoSwitch();
    }
  });

  slides.forEach((card, idx) => {
    if (window.innerWidth > 767) {
      const blurItem = card.querySelector(".webase-card-blur");
      const plushBtn = card.querySelector(".webase-card-plus");
      const next = card.querySelector(".next");
      const prev = card.querySelector(".prev");

      [blurItem, plushBtn].forEach((element) => {
        element.addEventListener("click", () => {
          clearInterval(interval);
          if (card.classList.contains("active")) {
            card.classList.remove("active");
            currentIndex = -1;
            startAutoSwitch();
          } else {
            slides.forEach((slide) => slide.classList.remove("active"));
            card.classList.add("active");
            currentIndex = idx;
            startAutoSwitch();
            resetProgressBar(card.querySelector(".progress-bar"));
          }
        });
      });

      next.addEventListener("click", (e) => {
        e.stopPropagation();
        clearInterval(interval);
        currentIndex = (idx + 1) % slides.length;
        activateItem(currentIndex);
        startAutoSwitch();
      });
      prev.addEventListener("click", (e) => {
        e.stopPropagation();
        clearInterval(interval);
        currentIndex = (idx - 1 + slides.length) % slides.length;
        activateItem(currentIndex);
        startAutoSwitch();
      });
    }
  });

// ✅ Mobile Dragging Behavior (Improved)
slides.forEach((slide) => {
  slide.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY; // Track vertical start position
    isDragging = true;
  });

  slide.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    let endX = e.touches[0].clientX;
    let endY = e.touches[0].clientY; // Track vertical end position
    let diffX = startX - endX;
    let diffY = startY - endY; // Vertical movement

    // Check if horizontal movement is greater than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault(); // Prevent scrolling only if horizontal swipe detected

      if (diffX > 30 && currentIndex < slides.length - 1) {
        // Swipe left → go next
        currentIndex++;
        activateItem(currentIndex);
        startAutoSwitch();
        isDragging = false;
      } else if (diffX < -30 && currentIndex > 0) {
        // Swipe right → go previous
        currentIndex--;
        activateItem(currentIndex);
        startAutoSwitch();
        isDragging = false;
      }
    }
  });

  slide.addEventListener("touchend", () => {
    isDragging = false;
  });
});



  activateItem(currentIndex);
  startAutoSwitch();
};

expandCard();

});
const slider = document.getElementById("slider");
const sliderItems = Array.from(slider.children);
const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");
const dotsContainer = document.querySelector(".slider__dots");
const dots = Array.from(dotsContainer.children);
const btnAutoplay = document.getElementById("btn-autoplay");

let currentIndex = 0;


btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index);
    showSlide(index);
  });
});

slider.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    const nextIndex =
      currentIndex + 1 === sliderItems.length ? 0 : currentIndex + 1;
    showSlide(nextIndex);
  }
});

function nextSlide() {
  currentIndex = currentIndex + 1 === sliderItems.length ? 0 : currentIndex + 1;
  showSlide(currentIndex);
}
function prevSlide() {
  currentIndex =
    currentIndex - 1 < 0 ? sliderItems.length - 1 : currentIndex - 1;
  showSlide(currentIndex);
}

function showSlide(index) {
  sliderItems.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
  currentIndex = index;
}

let autoSlideShow = setInterval(nextSlide, 3000);
slider.addEventListener("mouseenter", () => clearInterval(autoSlideShow));
slider.addEventListener(
  "mouseleave",
  () => (autoSlideShow = setInterval(nextSlide, 3000))
);

let isPlaying = true;

btnAutoplay.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleAutoplaySlider();
});

function toggleAutoplaySlider() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    autoSlideShow = setInterval(nextSlide, 3000);
    btnAutoplay.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="2" width="3" height="12" /><rect x="9" y="2" width="3" height="12" /></svg>';
    
  } else {
    clearInterval(autoSlideShow);
    btnAutoplay.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><polygon points="4,2 14,8 4,14"/></svg>';
  }
}

sliderItems.forEach((slid) => {
  slid.addEventListener("pointerdown", (event) => {
    let startX = event.clientX;

    slid.setPointerCapture(event.pointerId);

    const onMove = (e) => {
      let endX = event.clientX;
      const diff = startX - endX;

      if (diff > 50) {
        nextSlide();
        cleanup();
      } else if (diff < -50) {
        prevSlide();
        cleanup();
      }
    };
    const onUp = () => {
      cleanup();
    };
    function cleanup() {
      slid.removeEventListener("pointermove", onMove);
      slid.removeEventListener("pointerup", onUp);
    }

    slid.addEventListener("pointermove", onMove);
    slid.addEventListener("pointerup", onUp);
  });
});

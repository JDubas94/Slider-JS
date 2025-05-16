const slider = document.getElementById("slider");
const sliderItems = Array.from(slider.children);
const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");
const dotsContainer = document.querySelector(".slider__dots");
const dots = Array.from(dotsContainer.children);

let currentIndex = 0;

sliderItems.forEach((slide, index) => {
  if (index !== currentIndex) {
    slide.classList.add("hidden");
  }
});

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
    slide.classList.toggle("hidden", i !== index);
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

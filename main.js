const slider = document.getElementById("slider");
const sliderItems = Array.from(slider.children);
const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");

let currentIndex = 0;

sliderItems.forEach((slide, index) => {
  if (index !== currentIndex) {
    slide.classList.add("hidden");
  }
});

btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);

slider.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    const nextIndex =
      currentIndex + 1 === sliderItems.length ? 0 : currentIndex + 1;
    showSlide(nextIndex);
  }
});
function nextSlide() {
  sliderItems[currentIndex].classList.add("hidden");
  currentIndex = currentIndex + 1 === sliderItems.length ? 0 : currentIndex + 1;
  sliderItems[currentIndex].classList.remove("hidden");
}
function prevSlide() {
  sliderItems[currentIndex].classList.add("hidden");
  currentIndex =
    currentIndex - 1 < 0 ? sliderItems.length - 1 : currentIndex - 1;
  sliderItems[currentIndex].classList.remove("hidden");
}

function showSlide(index) {
  sliderItems.forEach((slide, i) => {
    slide.classList.toggle("hidden", i !== index);
  });
  currentIndex = index;
}



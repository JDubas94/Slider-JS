const slider = document.getElementById("slider");
const sliderItems = Array.from(slider.children);
const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");


let currentIndex = 0;

sliderItems.forEach((slide, index) => {
    if(index !== currentIndex){
        slide.classList.add('hidden')
    }
})

btnNext.addEventListener('click', function(){
    sliderItems[currentIndex].classList.add('hidden');
    currentIndex = (currentIndex + 1 === sliderItems.length) ? 0 : currentIndex + 1;
    sliderItems[currentIndex].classList.remove('hidden');
});
btnPrev.addEventListener('click', function () {
    sliderItems[currentIndex].classList.add('hidden');
    currentIndex = (currentIndex - 1 < 0) 
  ? sliderItems.length - 1 
  : currentIndex - 1;
    sliderItems[currentIndex].classList.remove('hidden');
});

slider.addEventListener('click', function(e){
    if(e.target.tagName === 'IMG'){
        e.target.classList.add('hidden')
       e.target.nextElementSibling 
           ? e.target.nextElementSibling.classList.remove('hidden')
            :slider.firstElementChild.classList.remove('hidden');
        }
    })
const controls = document.querySelectorAll('.controls__btn');
const slides   = Array.from(document.querySelectorAll('.slide'));
const arrowLeft  = document.querySelector('.slider__arrow--left');
const arrowRight = document.querySelector('.slider__arrow--right');
let currentSlider = "0";

selectSlider(currentSlider);

controls.forEach(btn => {
    btn.addEventListener('click', () => {
        const slideNum = getSlideNum(btn);
        selectSlider(slideNum);
    });
});
/* Pour chaque boutons il créer une boucle qui va créer un évenement au clic pour récupèrer grâce à la fonction getSlideNum le nombre du menu et il va appeler la fonction selectSlider avec le numéro */

arrowRight.addEventListener('click', () => {
    const currentSlides = Array.from(document.querySelectorAll('.slide--current'));
    const selectedSlide = document.querySelector('.slide--is-selected');
    const selectedSlideIndex = currentSlides.indexOf(selectedSlide);
    if (selectedSlideIndex < currentSlides.length - 1) {
        const nextSlideIndex = selectedSlideIndex + 1;
        const nextSlide = currentSlides[nextSlideIndex];
        selectSlide(nextSlide);
    }
});


arrowLeft.addEventListener('click', () => {
    const currentSlides = Array.from(document.querySelectorAll('.slide--current'));
    const selectedSlide = document.querySelector('.slide--is-selected');
    const selectedSlideIndex = currentSlides.indexOf(selectedSlide);
    if (selectedSlideIndex > 0) {
        const nextSlideIndex = selectedSlideIndex - 1;
        const nextSlide = currentSlides[nextSlideIndex];
        selectSlide(nextSlide);
    }
});



function selectSlide (elt) {
    slides.forEach(slide => slide.classList.remove('slide--is-selected'));
    elt.classList.add('slide--is-selected');
}



function selectSlider (num) {
    const sliderSlides = slides.filter(slide => getSlideNum(slide) === num);
    currentSlider = num;
    slides.forEach(slide => slide.classList.remove('slide--current'));
    sliderSlides.forEach(slide => slide.classList.add('slide--current'));
    const firstSliderSlide = sliderSlides[0];
    selectSlide(firstSliderSlide);
}


function getSlideNum (elt) {
    return elt.getAttribute('data-menu');
}
/* Cette fonction sert à récupèrer le nombre du menu, et il passe en paremètre le nombre, donc elt = le nombre du menu */

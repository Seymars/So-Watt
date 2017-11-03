const slides      = Array.from(document.querySelectorAll(".slide"));
const controls    = document.querySelectorAll(".controls__btn");
const arrowLeft   = document.querySelector(".slider__arrow--left");
const arrowRight  = document.querySelector(".slider__arrow--right");

selectSlider("0");

controls.forEach(btn => {
    btn.addEventListener("click", () => {
        const slideNum = getSlideNum(btn);
        selectSlider(slideNum);
		document.querySelector(".slider__arrow--left").style.visibility = "visible";
		document.querySelector(".slider__arrow--right").style.visibility = "visible";
		if (slideNum === "1") {
			document.querySelector(".who").style.color = "#f1c40f";
			document.querySelector(".how").style.color ="#07a4b2";
			document.querySelector(".what").style.color ="#07a4b2";
			document.querySelector(".comments").style.color ="#07a4b2";
			document.querySelector(".me").style.color ="#07a4b2";
			document.querySelector(".slider__arrow--left").style.visibility = "hidden";
			document.querySelector(".slider__arrow--right").style.visibility = "hidden";
			
		}
		if (slideNum === "2") {
			document.querySelector(".how").style.color = "#f1c40f";
			document.querySelector(".who").style.color ="#07a4b2";
			document.querySelector(".what").style.color ="#07a4b2";
			document.querySelector(".comments").style.color ="#07a4b2";
			document.querySelector(".me").style.color ="#07a4b2";
		}
		if (slideNum === "3") {
			document.querySelector(".what").style.color = "#f1c40f";
			document.querySelector(".who").style.color ="#07a4b2";
			document.querySelector(".how").style.color ="#07a4b2";
			document.querySelector(".comments").style.color ="#07a4b2";
			document.querySelector(".me").style.color ="#07a4b2";
		}
		if (slideNum === "4") {
			document.querySelector(".comments").style.color = "#f1c40f";
			document.querySelector(".who").style.color ="#07a4b2";
			document.querySelector(".how").style.color ="#07a4b2";
			document.querySelector(".what").style.color ="#07a4b2";
			document.querySelector(".me").style.color ="#07a4b2";
		}
		if (slideNum === "5") {
			document.querySelector(".me").style.color = "#f1c40f";
			document.querySelector(".who").style.color ="#07a4b2";
			document.querySelector(".how").style.color ="#07a4b2";
			document.querySelector(".what").style.color ="#07a4b2";
			document.querySelector(".comments").style.color ="#07a4b2";
		}
    });
});

arrowRight.addEventListener("click", () => {
    selectNextSlide("next");
});

arrowLeft.addEventListener("click", () => {
    selectNextSlide("prev");
});

  function selectNextSlide(next = "next") {
  
    const currentSlides = Array.from(document.querySelectorAll(".slide--current"));
    const selectedSlide = document.querySelector(".slide--is-selected");
    const selectedSlideIndex = currentSlides.indexOf(selectedSlide);
    let nextSlideIndex;


    if (next === "next") {
      if (selectedSlideIndex < currentSlides.length - 1) {
        nextSlideIndex = selectedSlideIndex + 1;
      } else {
        nextSlideIndex = 0;
      }
    } else if (next === "prev") {
      if (selectedSlideIndex > 0) {
        nextSlideIndex = selectedSlideIndex - 1;
      } else {
        nextSlideIndex = currentSlides.length - 1;
      }
    }
	  
    const nextSlide = currentSlides[nextSlideIndex];

    selectSlide(nextSlide);
  }

function selectSlide (elt) {
    slides.forEach(slide => slide.classList.remove("slide--is-selected"));
    elt.classList.add("slide--is-selected");
}


function selectSlider (num) {
    const sliderSlides = slides.filter(slide => getSlideNum(slide) === num);

    slides.forEach(slide => slide.classList.remove("slide--current"));
    sliderSlides.forEach(slide => slide.classList.add("slide--current"));
    const firstSliderSlide = sliderSlides[0];
    selectSlide(firstSliderSlide);
}

function getSlideNum (elt) {
    return elt.getAttribute("data-menu");
}
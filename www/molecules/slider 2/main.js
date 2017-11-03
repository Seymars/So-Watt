/*******************************************************************************
 *  Initialisation des variables
 *  &
 *  Récupération des éléments du DOM qui nous intéressent
 **/

/**
 * On récupère les différents éléments HTML correspondants aux slides.
 * Comme c'est une NodeList on transforme le tout en Array avec Array.from() ,
 * ça permet de pouvoir utiliser des méthods innaccessibles par un NodeList
 * comme .filter() par exemple.
 */
const slides      = Array.from(document.querySelectorAll('.slide'));

/**
 * Les boutons de menu
 * Pas besoin de transformer le NodeList en Array ici, on a seulement besoin
 * de parcourir la liste.
 */
const controls    = document.querySelectorAll('.controls__btn');

// On récupère les flèches du slider
const arrowLeft   = document.querySelector('.slider__arrow--left');
const arrowRight  = document.querySelector('.slider__arrow--right');

/**
 * FIN Initialisation des variables
 ******************************************************************************/





/*******************************************************************************
 *  Programme principal
 **/

// On sélectionne le slider "0" par défaut.
selectSlider("0");

// On parcours les boutons de menu
controls.forEach(btn => {
    /**
     * Au clic sur un des boutons, on récupère le numéro de slider associé,
     * Puis on sélectionne ce slider.
     */
    btn.addEventListener('click', () => {
        const slideNum = getSlideNum(btn);
        selectSlider(slideNum);
    });
});

// Au clic sur la flèche de droite, on sélectionne la slide suivante
arrowRight.addEventListener('click', () => {
    selectNextSlide('next');
});


// Au clic sur la flèche de gauche, on sélectionne la slide précédente
arrowLeft.addEventListener('click', () => {
    selectNextSlide('prev');
});


/**
 *  FIN Programme Principal
 * ****************************************************************************/





/*******************************************************************************
 *  Les fonctions utilisées dans le script
 **/

/**
 * Sélectionne la slide suivante / précédente en fonction de l'argument `next`
 *
 * @param {string} [next='next']
 */
function selectNextSlide(next='next') {
    /**
     * On récupère les slides du slider actuel et on transforme le tout en Array
     * pour ouvoir utiliser la méthode .indexOf()
     */
    const currentSlides = Array.from(document.querySelectorAll('.slide--current'));

    // On récupère la slide actuellement affichée
    const selectedSlide = document.querySelector('.slide--is-selected');

    // On détermine l'index de la slide actuellement affichée.
    const selectedSlideIndex = currentSlides.indexOf(selectedSlide);

    // On déclare la variable nextSlideIndex mais on ne lui assigne pas de valeur.
    let nextSlideIndex;


    if (next === 'next') {
        /**
         * Si on a cliqué sur la flèche de droite,
         * on vérifie qu'on est pas déjà sur la dernière slide.
         * Si ce n'est pas le cas, la prochaine slide à afficher est bien la suivante
         */
        if (selectedSlideIndex < currentSlides.length - 1) {
            nextSlideIndex = selectedSlideIndex + 1;
        }
    } else if (next === 'prev') {
        /**
         * Si on a cliqué sur la flèche de gauche,
         * on vérifie qu'on est pas déjà sur la première slide.
         * Si ce n'est pas le cas, la prochaine slide à afficher est bien la précédente
         */
        if (selectedSlideIndex > 0) {
            nextSlideIndex = selectedSlideIndex - 1;
        }
    }

    /**
     * Si l'index de la prochaine slide a été assigné, alors on affiche la slide
     * qui correspond à cet index.
     * Sinon, on affiche la slide actuelle (et rien ne change)
     */
    const nextSlide = nextSlideIndex ? currentSlides[nextSlideIndex] : selectedSlide;
    selectSlide(nextSlide);
}


/**
 * Permet d'afficher la slide `elt`.
 *
 * @param {Node} elt
 */
function selectSlide (elt) {
    // On parcours les slides et on enlève la classe 'slide--is-selected' à chacune.
    // Une seule slide possède cette classe (celle affichée), cette partie pourrait donc être améliorée.
    slides.forEach(slide => slide.classList.remove('slide--is-selected'));

    // On termine en ajoutant la classe 'slide--is-selected' à 'elt' pour la sélectionner.
    elt.classList.add('slide--is-selected');
}



/**
 * Ajoute la classe `.slide--current` à toutes les slides dont le data-menu
 * équivaut à `num`.
 *
 * @param {String} num Le numéro du slider qu'on veut sélectionner.
 */
function selectSlider (num) {
    // On récupère les slides dont le data-menu est égal à 'num'
    const sliderSlides = slides.filter(slide => getSlideNum(slide) === num);

    slides.forEach(slide => slide.classList.remove('slide--current'));
    sliderSlides.forEach(slide => slide.classList.add('slide--current'));
    const firstSliderSlide = sliderSlides[0];
    selectSlide(firstSliderSlide);
}



/**
 * Récupère l'attribut `data-menu` de l'élément `elt`
 *
 * @param {Node} elt L'élément du DOM dont on veut récupérer l'attribut `data-menu`
 * @returns {String} Le `data-menu`
 */
function getSlideNum (elt) {
    return elt.getAttribute('data-menu');
}

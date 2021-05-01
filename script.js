console.clear();

var tween = new TimelineMax();
// var slideDelay = 1.5;
var imgSlideDuration = 1;
var slideDuration = 0.5;

var slideElements = document.querySelectorAll(".Home-background-slide");
var controlElements = document.querySelectorAll(".slider-control");
var descriptionElements = document.querySelectorAll(".Home-main-text__description");
var descriptionNumbers = document.querySelectorAll(".Changing-number-left__description");
var nextBtn = document.querySelector(".Home-section__small");

var slides = Array.prototype.map.call(slideElements, createSlide);

slides.forEach(function(slide, i) {
  slide.next = slides[i+1] || slides[0];
  slide.duration = slideDuration;
  slide.imgDuration = imgSlideDuration;
});

var currentSlide = slides[0];

// var autoPlay = TweenLite.delayedCall(slideDelay, setSlide);

// TweenLite.set(".works", { autoAlpha: 1 });

console.log("SLIDES", slides);

//
// SET SLIDE
// ===========================================================================
function setSlide(slide) {
    
  // autoPlay.restart(true);
  
  if (slide === currentSlide) {
    return;
  }
  
  currentSlide.setInactive();
  currentSlide = slide || currentSlide.next;
  currentSlide.setActive();
}

//
// CREATE SLIDE
// ===========================================================================
function createSlide(element, index) {
   
  var control = controlElements[index];
  var description = descriptionElements[index];
  var number = descriptionNumbers[index];
  
  // Public properties and methods for slide
  var slide = {   
    next: null, // will point to the next slide object
    duration: 0,
    index: index,
    element: element,
    control: control,
    description: description,
    number: number,
    isActive: false,
    setActive: setActive,
    setInactive: setInactive
  };
    
  if (index === 0) {
    setActive();
  } else {
    setInactive();
  }
  
  control.addEventListener("click", setSlide.bind(null, slide));
  
  nextBtn.addEventListener("click", function() {
    TweenMax.killDelayedCallsTo(setSlide);
    TweenMax.delayedCall(.01, setSlide);
  });
  
  function setActive() {
    slide.isActive = true;
    control.classList.add("active");
    tween.fromTo(element, slide.imgDuration, { xPercent: 100, ease: Power4.easeInOut}, { xPercent: 0, ease: Power4.easeInOut}, "-=2")
         .fromTo(description, slide.duration, { yPercent: 100, autoAlpha: 0, ease: Power4.easeInOut}, { yPercent: 0, autoAlpha: 1, ease: Power4.easeInOut }, "-=1")
         .fromTo(number, slide.duration, { xPercent: 100, ease: Power4.easeInOut}, { xPercent: 0, autoAlpha: 1, ease: Power4.easeInOut}, "-=0.5")
  }
  
  function setInactive() {
    slide.isActive = false;
    control.classList.remove("active");
    tween.to(element, slide.imgDuration, { xPercent: -100, ease: Power4.easeInOut})
         .to(description, slide.duration, { yPercent: -100, autoAlpha: 0, ease: Power4.easeInOut})
         .to(number, slide.duration, { xPercent: -100, autoAlpha: 0, ease: Power4.easeInOut})
  }
  
  return slide;
}

// let CTestiMenu = document.querySelector('.Testi-menu');
let TestiMenu = document.querySelectorAll('.Testi-menu h2');
let bigSection = document.querySelector('.Home-section__big');

TweenMax.set(TestiMenu, {autoAlpha: 0});

let tlOpening = new TimelineMax({paused:true, reversed:true});
tlOpening.to(nextBtn, 1.5, {width: "100%", ease: Power2.easeInOut})
           .staggerTo(TestiMenu, 1.5, {autoAlpha: 1}, .3)


$('.nav p').on('click', function() {
  tlOpening.reversed() ? tlOpening.play() : tlOpening.reverse();
});

console.log(TestiMenu);
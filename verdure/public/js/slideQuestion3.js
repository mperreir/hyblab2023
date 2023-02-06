"use strict";

// async init function (because of the awaits on fetches)
const initSlideQuestion3 = async function(currentQuestion){

  if(currentQuestion != 3){swiper.enable(); swiper.slideTo(7)}

  const page = document.getElementById(currentQuestion)
  let question = document.querySelector('.question-footer'+currentQuestion)
  let city = document.querySelector('#city'+currentQuestion)



  setTimeout(()=> {
   question.style.opacity = 100;
   city.style.top = "20%";
},1000
 )

// questions
await questions();

const indic = document.querySelector('.indic');
  anime({
    targets: '.indic',
    scale: 1.2,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });
};

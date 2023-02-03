"use strict";

// async init function (because of the awaits on fetches)
const initSlideQuestion = async function () {
    // Get logo element
    const page = document.querySelector('#question-slide')
    let city = document.querySelector('.city')

    /*page.addEventListener('click', () => {
            page.style.backgroundPositionY = "-10vh";
            indic.style.opacity = 0;
            city.style.top = "20%";
            swiper.enabled = true;
            changementThermo(10, "blue")
            changementMoney(90, "red")
            changementHappy(50, "green")
            swiper.enable();
        }
    )*/

    //question
    await questions();


// swiper.on('touchMove',function(event){
//   console.log("OKK")
//   var speed =event.velocity;
//   if (speed>0.5){
//     question.style.opacity = 100;
//   page.style.backgroundPositionY = "-5vh";
//   indic.style.opacity= 0;
//   swiper.enable();
//   }
//   else{
//     question.style.opacity = 100;
//   page.style.backgroundPositionY = "-5vh";
//   indic.style.opacity= 0;
//   swiper.enable();
//   }

// })
    const indic = document.querySelector('.indic');

    // Animate hyblab logo and make shrink on click
    anime({
        targets: '.indic',
        scale: 1.2,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
    });


};


function changementThermo(quantity, color) {
    $(".thermo").css("height", quantity + "%");
    $(".thermo").css("background-color", color);
}

function changementMoney(quantity, color) {
    $(".money").css("height", quantity + "%");
    $(".money").css("background-color", color);
}

function changementHappy(quantity, color) {
    $(".happy").css("height", quantity + "%");
    $(".happy").css("background-color", color);
}
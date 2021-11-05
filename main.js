// INTRO -------------------------------------------------
const panda = document.querySelector('#panda-intro')
const intro = document.querySelector('.intro')

  // pando logo intro animation
setTimeout(() => {
  panda.classList.add('active')
}, 1000)

  // hide intro and shrink logo
setTimeout(() => {
  gsap.to(panda, {scale: 0.1, duration: 2, top: 40})
  gsap.to(intro, {opacity: 0, onComplete: () => {
    intro.remove()
  }})
}, 3000)

// NAVIGATION -------------------------------------------------
const hamburgerBtn = document.querySelector('.hamburger-btn')
const primaryMenu = document.querySelector('.menu')
const primaryMenuLinks = document.querySelectorAll('.menu a')

  // listens for click
hamburgerBtn.addEventListener('click', () => {
  toggleMenu()
})
  // run a function
function toggleMenu(){
  primaryMenu.classList.toggle('show')
}
  // closes menu link is clicked
primaryMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    toggleMenu()
  })
})

// SECTION 1 HOME -------------------------------------------------
  // Video plays only when visible
  // create variable
const video = document.getElementById('video')
  // init controller
const controller = new ScrollMagic.Controller()
  // build scene
const scene = new ScrollMagic.Scene({triggerElement: "#video", duration: 1100}) /* 1100 = where video stops (trigger is half way down the page) */
        .addTo(controller)
        // enter trigger element and plays
        .on("enter", function () {
          video.play()
        })
        // leaves trigger element and pauses
        .on("leave", function () {
          video.pause()
        })

  //Leaves scroll trigger timeline
gsap.registerPlugin(ScrollTrigger);

 // home animation
const homeTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".leaves",
    scrub: true,
    pin: true,
    start: "top top",
  }
})

  // overlay intro
homeTl.to(".overlay" , {
  y: '-100vh',
  ease: "power4.out"
})

  // LEAF 1
homeTl.to(".leaf1", { /* scales leaf up */
  scale: 1.5, 
  ease: "none"
})
homeTl.to(".leaf1", { /* moves off screen */  
  y: '-100vh',
  ease: "none"
})
  // LEAF 2 
homeTl.from(".leaf2", { /* bring leaf up from bottom */
  y: '80vh',
  ease: "none"
}, '-=0.5') /* so leaf comes in earlier */ 
homeTl.to(".leaf2",{ /* brings leaf to center of screen */ 
  y: '-50vh'
})
homeTl.to(".leaf2", {/* scales leaf up */ 
  scale: 1.5, 
  ease: "none"
})
homeTl.to(".leaf2", { /* moves off screen */  
  y: '-150vh',
  ease: "none"
})
 // LEAF 3 
homeTl.from(".leaf3", {
  y: '80vh',
  ease: "none"
}, '-=2')
homeTl.to(".leaf3",{
  y: '-120vh'
})
homeTl.to(".leaf3", {
  scale: 1.5, 
  ease: "none"
})
homeTl.to(".leaf3", {
  scale: 1.5,
  y: '-220vh',
  ease: "none"
})
 // LEAF 4
homeTl.from(".leaf4", {
  y: '80vh',
  ease: "none"
}, '-=2')
homeTl.to(".leaf4",{
  y: '-180vh'
})
homeTl.to(".leaf4", {
  scale: 1.5, 
  ease: "none"
})

// SECTION 3 GALLERY -------------------------------------------------
  // gsap fade in animation
function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
      y = direction * 100;
  if(elem.classList.contains("gs_reveal_fromLeft")) { // reveal from left
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) { // reveal from right
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
    duration: 2, // duration of animation
    x: 0,
    y: 0, 
    autoAlpha: 1, 
    ease: "expo", 
    overwrite: "auto"
  });
}
// hidden before animation
function hide(elem) {
  gsap.set(elem, {autoAlpha: 0});
}
document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
    hide(elem); // assure that the element is hidden when scrolled into view
    
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function() { animateFrom(elem) }, 
      onEnterBack: function() { animateFrom(elem, -1) },
      onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
    });
  });
});

  // Video Carousel
let carousel = document.querySelector('.carousel');
let carouselInner = document.querySelector('.carousel-inner');
let prev = document.querySelector('.carousel-controls .prev');
let next = document.querySelector('.carousel-controls .next');
let slides =  document.querySelectorAll('.carousel-inner .carousel-item');
let totalSlides = slides.length;
let step = 100 / totalSlides;
let activeSlide = 0;
let activeIndicator = 0;
let direction = -1;
let jump = 1;
  // time on each video
let interval = 6000;
let time;

  // carousel
carouselInner.style.minWidth = (totalSlides * 100) + '%';
loadIndicators();
loop(true);

  // Carousel events
next.addEventListener('click',()=>{
    slideToNext();
});
prev.addEventListener('click',()=>{
    slideToPrev();
});

carouselInner.addEventListener('transitionend',()=>{
    if(direction === -1){
        if(jump > 1){
            for(let i = 0; i < jump; i++){
                activeSlide++;
                carouselInner.append(carouselInner.firstElementChild);
            }
        }else{
            activeSlide++;
            carouselInner.append(carouselInner.firstElementChild);
        }
    }else if(direction === 1){
        if(jump > 1){
            for(let i = 0; i < jump; i++){
                activeSlide--;
                carouselInner.prepend(carouselInner.lastElementChild);
            }
        }else{
            activeSlide--;
            carouselInner.prepend(carouselInner.lastElementChild);
        }
    }

    carouselInner.style.transition = 'none';
    carouselInner.style.transform = 'translateX(0%)';
    setTimeout(()=>{
        jump = 1;
        carouselInner.style.transition = 'all ease .5s';
    });
    updateIndicators();
});

document.querySelectorAll('.carousel-indicators span').forEach(item=>{
    item.addEventListener('click',(e)=>{
        let slideTo = parseInt(e.target.dataset.slideTo);
        
        let indicators = document.querySelectorAll('.carousel-indicators span');

        indicators.forEach((item,index)=>{
            if(item.classList.contains('active')){
                activeIndicator = index
            }
        })

        if(slideTo - activeIndicator > 1){
            jump = slideTo - activeIndicator;
            step = jump * step;
            slideToNext();
        }else if(slideTo - activeIndicator === 1){
            slideToNext();
        }else if(slideTo - activeIndicator < 0){

            if(Math.abs(slideTo - activeIndicator) > 1){
                jump = Math.abs(slideTo - activeIndicator);
                step = jump * step;
                slideToPrev();
            }
                slideToPrev();
        }
        step = 100 / totalSlides; 
    })
});

  // Carousel functions
function loadIndicators(){
    slides.forEach((slide,index)=>{
        if(index === 0){
            document.querySelector('.carousel-indicators').innerHTML +=
            `<span data-slide-to="${index}" class="active"></span>`;
        }else{
            document.querySelector('.carousel-indicators').innerHTML +=
            `<span data-slide-to="${index}"></span>`;
        }
    }); 
};

function updateIndicators(){
    if(activeSlide > (totalSlides - 1)){
        activeSlide = 0;
    }else if(activeSlide < 0){
        activeSlide = (totalSlides - 1);
    }
    document.querySelector('.carousel-indicators span.active').classList.remove('active');
    document.querySelectorAll('.carousel-indicators span')[activeSlide].classList.add('active');
};

function slideToNext(){
    if(direction === 1){
        direction = -1;
        carouselInner.prepend(carouselInner.lastElementChild);
    };
    
    carousel.style.justifyContent = 'flex-start';
    carouselInner.style.transform = `translateX(-${step}%)`;
};

function slideToPrev(){
    if(direction === -1){
        direction = 1;
        carouselInner.append(carouselInner.firstElementChild);
    };
    carousel.style.justifyContent = 'flex-end'
    carouselInner.style.transform = `translateX(${step}%)`;
};

function loop(status){
    if(status === true){
        time = setInterval(()=>{
            slideToNext();
        },interval);
    }else{
        clearInterval(time);
    }
}

// SECTION 4 GET INVOLVED -------------------------------------------------
  //auto play swiper
const swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  speed: 600,
  parallax: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// FOOTER -------------------------------------------------
  //emoji rating
const rating = document.querySelector('.rating-emojis');
  //loading symbols
rating.getSymbol = (value) => {
  const icons = ['emoji-angry', 'emoji-frown', 'emoji-expressionless', 'emoji-smile', 'emoji-laughing'];
    return `<sl-icon name="${icons[value - 1]}"></sl-icon>`;
  };

  //dialog box
const dialog = document.querySelector('.dialog-overview');
const openButton = dialog.nextElementSibling;
const closeButton = dialog.querySelector('sl-button[slot="footer"]');

openButton.addEventListener('click', () => dialog.show());
closeButton.addEventListener('click', () => dialog.hide());
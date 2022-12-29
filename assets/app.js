'use strict'

const burgerMenu = document.querySelector('.navMobileBurgerMenu');
const navActive = document.querySelector('.navActive');
const bmline2 = document.querySelector('.bmline2');


const heroHeader = document.querySelector('.heroHeader');
const navWho = document.querySelector('.navWho');
const navContact = document.querySelector('.navContact');
const navWork = document.querySelector('.navWork');
const navHome = document.querySelector('.navHome');
const whoHeader = document.querySelector('.sectionHeaderWho');
const workHeader = document.querySelector('.sectionHeaderWork');
const contactHeader = document.querySelector('.sectionHeaderContact');


const workCards = document.querySelectorAll('.workCard');

workCards.forEach(card => {
	card.addEventListener('click', (e) => {
		if(card.classList.contains('TT')){
			location.href = 'tt.html'
		}
		if(card.classList.contains('To-Do')){
			location.href = 'todoapp.html'
		}
		if(card.classList.contains('Foodista')){
			location.href = 'foodista.html'
		}
		if(card.classList.contains('React')){
			location.href = 'reactapp.html'
		}
		})
})


function isInViewport(el) {
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 && rect.bottom <= window.innerHeight
	);
}


// https://www.w3schools.com/howto/howto_js_typewriter.asp
function typingEffect(b, el){
	if(!el.textContent){
		let i = 0;
		let text = b;
		function typing1() {
			if (i < text.length) {
				el.innerHTML += text.charAt(i);
				i++;
				setTimeout(typing1, 75);
			}
		}
		typing1();
	}
}
// function navListeners(nav, el, href ){
// 	nav.addEventListener('click', (e) => {
// 		el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
// 		switch (href) {
// 			case 'Who':
// 					typingEffect('A little bit about me...', whoHeader)
// 				break;

// 			case 'Work':
// 					typingEffect("Let me show you on what I've been working lately...", workHeader)
// 				break;

// 			case 'Contact':
// 					typingEffect("Contact me!", contactHeader)
// 				break;
// 		}
// 		location.href = `#${href}`
// 	})
// }
// console.log('a');

// MOBILE

if(window.innerWidth < 768){
  let clicked = false;
  burgerMenu.addEventListener('click', (e) => {
    clicked = !clicked
      if(!clicked) {
        navActive.classList.toggle('display')
      } else {
        navActive.classList.toggle('display')
      }
    })
}
    if(heroHeader){

    // navListeners(navWho, whoHeader, 'Who')
    // navListeners(navWork, workHeader, 'Work')
    // navListeners(navContact, contactHeader, 'Contact')
    typingEffect('Mihai-Alexandru Vistran', heroHeader)
  

    document.addEventListener('wheel', function () {
      console.log('asd');
      setTimeout(() => {
        if(isInViewport(whoHeader)){
          typingEffect('A little bit about me...', whoHeader)
        }
        if(isInViewport(workHeader)){
          typingEffect("Let me show you on what I've been working lately...", workHeader)
        }
        if(isInViewport(contactHeader)){
          typingEffect("Contact me!", contactHeader)
        }
      }, 1500);
    },
    {
      passive: true,
    }
  );



const whoButton = document.querySelector('.whoCardButton');
const whoCardBody = document.querySelector('.whoCardBody');
const whoCard = document.querySelector('.whoCard');
const whoTextWrapper = document.querySelector('.whoTextWrapper');
const whoTextWrapperClicked = document.querySelector('.whoTextWrapperClicked');

whoButton.addEventListener('click', function () {
  if(screen.width < 768){
    whoCardBody.classList.toggle('whoCardAfter')
  }
	whoCard.classList.toggle('whoCardAfter');
	if (whoTextWrapper.classList.contains('displayNone')) {
		whoTextWrapper.classList.toggle('displayNone');
		whoTextWrapperClicked.classList.toggle('displayNone');
		whoButton.innerHTML = "See More"
	} else if (whoTextWrapperClicked.classList.contains('displayNone')) {
		whoButton.innerHTML = "See Less"
		whoTextWrapperClicked.classList.toggle('displayNone');
		whoTextWrapper.classList.toggle('displayNone');
	}
	whoButton.classList.toggle('displayNone')
	setTimeout(function () {
		whoButton.classList.toggle('displayNone')
		whoTextWrapperClicked.classList.toggle('whoTextWrapperOpacity');
		whoTextWrapper.classList.toggle('whoTextWrapperOpacity');
	}, 400);
});
}

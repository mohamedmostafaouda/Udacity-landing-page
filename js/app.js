/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let nav = document.getElementById('navbar__list');
let sections = document.getElementsByTagName('section');
var time = setTimeout(()=>{
    nav.style.height = '0px';
}, 3000);

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function liMaker(id, name){
    let anchor = document.createElement('a');
    let li = document.createElement('li');
    anchor.textContent = name;
    anchor.setAttribute('href',`#${id}`);
    li.appendChild(anchor);
    return li;
}

function addActive() {
    for (const section of sections){
        let top = section.getBoundingClientRect().top;
        if (top <= 200 && top> -400){
            section.classList.add('your-active-class');
            break;
        }
    }
}

function removeActive() {
    for (const section of sections){
        section.classList.remove('your-active-class');
    }
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    let docFrag = document.createDocumentFragment();
    for (const section of sections){
        let name = section.getAttribute('data-nav');
        let id = section.getAttribute('id');
        docFrag.appendChild( liMaker(id,name) );
    }
    nav.appendChild(docFrag); 
}

// Add class 'active' to section when near top of viewport
function activeSection() {
    window.addEventListener('scroll', ()=>{
        removeActive();
        addActive();
    })
}

// Scroll to anchor ID using scrollTO event
function ScrollId(){
    nav.addEventListener('click', function(e){
        e.preventDefault();
        if (e.target.nodeName != 'A') return 0;
        let elmnt = document.getElementById( e.target.getAttribute('href').substring(1) );
        let top = elmnt.offsetTop;
        window.scrollTo({
            top: top,
            left: 0,
            behavior: 'smooth'
        });
    })
}

//Hide Navbar when no scrolling 
function hideNav() { 
    let nav = document.getElementsByClassName('navbar__menu')[0];
    window.addEventListener('scroll', ()=>{
        clearTimeout(time);
        nav.style.height = '80px';
        time = setTimeout(()=>{
            nav.style.height = '0px';
        }, 4000);
    });
    //Display the nav when hover
    nav.addEventListener('mouseover', ()=>{
        clearTimeout(time);
    });
    nav.addEventListener('mouseout', ()=>{
        time = setTimeout(()=>{
            nav.style.height = '0px';
        }, 4000);
    });
    
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click
ScrollId();

// Set sections as active
activeSection();

//Hide Navbar no scroll
hideNav();


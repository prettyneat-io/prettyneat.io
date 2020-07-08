window.onscroll = function(){
    landingAnimator();
    serviceAnimator();
}

window.typewriter_settimeout;

let prettyNeatPlayer = document.getElementById('pretty-player');
let prettyNeatPlayerPlayBtn = prettyNeatPlayer.querySelector('.play-btn');

function serviceAnimator(){
    const servicesSection = document.getElementById('services')
    var servicesBody = document.querySelectorAll(".service-body");
    if (window.scrollY > servicesSection.offsetHeight / 2){
        for(var i = 0; i < servicesBody.length; i++){
            servicesBody[i].classList.add("attention");
        }
        
    }
}

function landingAnimator(){
    if(!document.querySelectorAll('stack-image:not(.visible)')){
        return;
    }
    const image = document.getElementsByClassName("stack-image")[0];
    if(image.getBoundingClientRect().top <= window.innerHeight * 0.75 && image.getBoundingClientRect().top > 0){
        document.querySelector(".stack-image img").classList.add("image-active");
        document.querySelector(".stack-image-background").classList.add("background-active");
    } else {
        document.querySelector(".stack-image img").classList.remove("image-active");
        document.querySelector(".stack-image-background").classList.remove("background-active");
    }
}
function setupTypewriter(t) {
    let HTML = document.getElementById('typewriter-htmlholder').innerHTML
    const comment = document.querySelector('.code-comment');
    t.innerHTML = ''; //comment.innerHTML;
    let cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 15,
    tempTypeSpeed = 0;
    let stop = function(){
        if(window.typewriter_settimeout){
            clearTimeout(window.typewriter_settimeout)
        }
    }
    let type = function() {

        if (writingTag === true) {
            tag += HTML[cursorPosition];
        }
        if (HTML[cursorPosition] === "<") {
            tempTypeSpeed = 0;
            if (tagOpen) {
                tagOpen = false;
                writingTag = true;
            } else {
                tag = "";
                tagOpen = true;
                writingTag = true;
                tag += HTML[cursorPosition];
            }
        }
        if (!writingTag && tagOpen) {
            tag.innerHTML += HTML[cursorPosition];
        }
        if (!writingTag && !tagOpen) {
            if (HTML[cursorPosition] === " ") {
                tempTypeSpeed = 0;
            }
            else {
                tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            }
            t.innerHTML += HTML[cursorPosition];
        }
        if (writingTag === true && HTML[cursorPosition] === ">") {
            tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            writingTag = false;
            if (tagOpen) {
                var newSpan = document.createElement("span");
                t.appendChild(newSpan);
                newSpan.innerHTML = tag;
                tag = newSpan.firstChild;
            }
        }
        cursorPosition += 1;
        if (cursorPosition < HTML.length - 1) {
            window.typewriter_settimeout = setTimeout(type, tempTypeSpeed); 
        } else {
            pulsePlayBtn()
            this.stop()
            window.typewriter_finished = true;
        }
    };
    return {
        type: type,
        stop:stop
    };
}
function initTypeWriter(){
    let typewriter = document.getElementById('typewriter');
    typewriter = setupTypewriter(typewriter);
    typewriter.type();
    
}

function resetTypeWriter(){
    let typewriter = document.getElementById('typewriter');
    typewriter = setupTypewriter(typewriter);
    typewriter.stop()
    typewriter.type();
    
}

function pulsePlayBtn(){
    prettyNeatPlayerPlayBtn.classList.add("pulse");
    setTimeout(function(){
        prettyNeatPlayerPlayBtn.classList.remove("pulse");
    },1000)
}

function flipServicesCardsOnClick(){
    var servicesBody = document.querySelectorAll(".service-body");
    var currentServiceIndex = 0
    //firt we add the click listener for each service card 
    for(var i = 0; i < servicesBody.length; i++){
        servicesBody[i].addEventListener('click', function(event){
            this.classList.toggle('active')
            //once we click the cart we need to save the index to a variable
            currentServiceIndex = Array.prototype.indexOf.call(servicesBody, this)
            //we need to loop again through the cards, and wee need to flip back to normal the cards except the current one
            for(var i = 0; i < servicesBody.length; i++){
                if(currentServiceIndex != i){
                    servicesBody[i].classList.remove('active')
                }
            }
        })
    }
}

function initEvents(){
    flipServicesCardsOnClick()
}

initTypeWriter();

initEvents();

prettyNeatPlayerPlayBtn.addEventListener('click', function(){
    resetTypeWriter()
})
window.onscroll = function(){
    landingAnimator();
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
    let HTML = t.innerHTML;
    const comment = document.querySelector('.code-comment');
    t.innerHTML = ''; //comment.innerHTML;
    let cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 15,
    tempTypeSpeed = 0;
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
            setTimeout(type, tempTypeSpeed);
        }
    };
    return {
        type: type
    };
}
let typewriter = document.getElementById('typewriter');
typewriter = setupTypewriter(typewriter);
typewriter.type();
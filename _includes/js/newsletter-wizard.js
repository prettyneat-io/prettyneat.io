var nl_wizard_step = 1;
const nl_wizard_steps = 3;
var emailRegex = /\S+@\S+\.\S+/;

var wizard = document.querySelector('.nl-subscribe__wizard');

var thisStep = wizard.children.item( nl_wizard_step - 1);

var email = '';
var nl_consent = false;

var setStep = {
    1: function(){
        document.getElementById('nl-email-box').value = '';        
    },
    2: function(){
    },
    3: function(){
        thisStep.querySelector('.nl-subscribe__wizard__step__content span').innerHTML = email;
        window.setTimeout(nl_wizard_test,2000);
    }
}

function nl_wizard_next(){
    if (!nl_wizard_test(true))
        return;

        console.log(nl_consent);

    if ( nl_wizard_step < nl_wizard_steps ){
        thisStep = wizard.children.item(nl_wizard_step);
        nl_wizard_step++;
        nl_wizard_showNext();
    }
    else{
        nl_wizard_complete();
    }
}

function nl_wizard_showNext(){
    let prev = wizard.querySelector('nl-subscribe__wizard__step--prev');
    if ( prev ){
    prev.classList.remove('nl-subscribe__wizard__step--prev');
    prev.classList.add('nl-subscribe__wizard__step--past');
    }

    if ( thisStep.previousElementSibling )
        thisStep.previousElementSibling.classList.add('nl-subscribe__wizard__step--prev');

    thisStep.classList.remove('nl-subscribe__wizard__step--next');

    if ( thisStep.nextElementSibling ){
    thisStep.nextElementSibling.classList.remove('nl-subscribe__wizard__step--future');
    thisStep.nextElementSibling.classList.add('nl-subscribe__wizard__step--next');
    }
    setStep[nl_wizard_step]();
}

function nl_wizard_complete(){
    let prev = wizard.querySelector('nl-subscribe__wizard__step--prev');
    if ( prev != null ){
    prev.classList.remove('nl-subscribe__wizard__step--prev');
    prev.classList.add('nl-subscribe__wizard__step--past');
    }

    thisStep.classList.add('nl-subscribe__wizard__step--prev');

    wizard.parentElement.classList.add('nl-subscribe__frame--collapsed');
    document.querySelector('.nl-subscribe__done').classList.add('nl-subscribe__done--shown');
    console.log(email);
}

function nl_wizard_test(resultOnly){
    let passed = false;

    switch( nl_wizard_step ){
        case 1: {
            let mail = document.getElementById('nl-email-box').value;
            passed = emailRegex.test(mail);
            if ( passed ) email = mail;
            else email = '';
        } break;
        case 2: {
            passed = nl_consent;
        } break;
        case 3: {
            passed = nl_consent && email;
        }break;
    }

    if (passed && !resultOnly)
        nl_wizard_unlock();

    return passed;
}

function nl_wizard_unlock(){
    thisStep.querySelector('.nl-subscribe__wizard__step__next').classList.add('nl-subscribe__wizard__step__next--ready');
}

nl_wizard_showNext();
var nl_wizard_step = 1;
const nl_wizard_steps = 3;
var emailRegex = /\S+@\S+\.\S+/;

var wizard = document.querySelector('.nl-subscribe__wizard');

var thisStep = wizard.children.item(nl_wizard_step - 1);

var email = '';
var nl_consent = null;

var setStep = {
    1: function () {
        document.getElementById('nl-email-box').value = '';
    },
    2: function () {
    },
    3: function () {
        thisStep.querySelector('.nl-subscribe__wizard__step__content span').innerHTML = email;
        window.setTimeout(nl_wizard_test, 2000);
    }
}

function nl_wizard_next() {
    if (!nl_wizard_test(true))
        return;

    console.log(nl_consent);

    if (nl_wizard_step < nl_wizard_steps) {
        thisStep = wizard.children.item(nl_wizard_step);
        nl_wizard_step++;
        nl_wizard_showNext();
    }
    else {
        nl_wizard_complete();
    }
}

function nl_wizard_showNext() {
    let prev = wizard.querySelector('nl-subscribe__wizard__step--prev');
    if (prev) {
        prev.classList.remove('nl-subscribe__wizard__step--prev');
        prev.classList.add('nl-subscribe__wizard__step--past');
    }

    if (thisStep.previousElementSibling)
        thisStep.previousElementSibling.classList.add('nl-subscribe__wizard__step--prev');

    thisStep.classList.remove('nl-subscribe__wizard__step--next');

    if (thisStep.nextElementSibling) {
        thisStep.nextElementSibling.classList.remove('nl-subscribe__wizard__step--future');
        thisStep.nextElementSibling.classList.add('nl-subscribe__wizard__step--next');
    }
    setStep[nl_wizard_step]();
}

async function nl_wizard_complete() {
    let prev = wizard.querySelector('nl-subscribe__wizard__step--prev');
    if (prev != null) {
        prev.classList.remove('nl-subscribe__wizard__step--prev');
        prev.classList.add('nl-subscribe__wizard__step--past');
    }

    thisStep.classList.add('nl-subscribe__wizard__step--prev');

    wizard.parentElement.classList.add('nl-subscribe__frame--collapsed');

    let data = new FormData();

    data.append('email', email);
    data.append('promo', nl_consent);

    let url = 'https://script.google.com/macros/s/AKfycbw4qqfAgT3hAEiQWSqqhI6fP_kCO0P28evR0nmzEFfrC2J-DVU/exec';

    let response = await fetch(url, {
        method: 'POST',
        body: data
    });

    if (response.ok) {
        document.querySelector('.nl-subscribe__done').classList.add('nl-subscribe__done--shown');
    }
    else {
        document.querySelector('.nl-subscribe__done').innerHTML = '...ahem. Please reload the page and try again :(';
        document.querySelector('.nl-subscribe__done').classList.add('nl-subscribe__done--shown');
    }
}

function nl_wizard_test(resultOnly) {
    let passed = false;

    switch (nl_wizard_step) {
        case 1: {
            let mail = document.getElementById('nl-email-box').value;
            passed = emailRegex.test(mail);
            if (passed) email = mail;
            else email = '';
        } break;
        case 2: {

            document.querySelectorAll('input[name="rd_promo"]').forEach(r => {

                nl_consent = r.checked ? (r.value == 'y' ? true : false) : nl_consent;
            })
            passed = (nl_consent != null);
        } break;
        case 3: {
            passed = nl_consent != null && email;
        } break;
    }

    if (passed && !resultOnly)
        nl_wizard_unlock();

    return passed;
}

function nl_wizard_unlock() {
    thisStep.querySelector('.nl-subscribe__wizard__step__next').classList.add('nl-subscribe__wizard__step__next--ready');
}

nl_wizard_showNext();
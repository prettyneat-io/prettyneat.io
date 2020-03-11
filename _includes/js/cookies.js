function cookies_checkConsent(){
    let pnCookie = document.cookie.split(';').filter(c => c.trim().startsWith('prettyneat-cookie-consent'));

    

    //not set
    if (pnCookie == null || pnCookie.length == 0){
        return null;
    }

    return pnCookie[0].endsWith('1');
}

function cookies_setConsent(consent){
    let expiry = Date.now() + (1000 * 60 * 60 * 24 * 183); //the number of milliseconds in half a year + half a day, because JS
                                                            //although once every 4 years this is exactly half a year because 29th Feb
                                                            //which also means that every very-rarely it should be half a year but it isn't
                                                            //we really suck at dates, as a race

    document.cookie = `prettyneat-cookie-consent=${ consent ? '1' : '0'}; expires=${ new Date(expiry).toGMTString()}; path=/`;

    document.querySelector('.cookies-slider__consent').classList.add('cookies-slider__consent--out')
    document.querySelector('.cookies-slider__more-info').classList.add('cookies-slider__more-info--out')
    document.querySelector('.cookies-slider__text').classList.add('cookies-slider__text--out')
    document.querySelector('.cookies-slider').classList.add('cookies-slider--out')
    document.querySelector('body').classList.add('nocookies');
    
    window.setTimeout(function(){
        let slider = document.querySelector('.cookies-slider');
        slider.parentNode.removeChild(slider);
    },1000);

    //lazy init GA
    if ( consent ){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','gall');
    
        gall('create', 'UA-159943696-1', 'auto');
        gall('send', 'pageview', { 'page': location.pathname + location.search + location.hash});
        gall('set', 'anonymizeIp', false);
    }
}

function cookies_showConsent(){
    document.querySelector('.cookies-slider').classList.add('cookies-slider--in');
    document.querySelector('body').classList.add('docookie');
}

function cookies_moreInfo(){
    let textBox = document.querySelector('.cookies-slider__text');

    if (textBox.className.indexOf('--shifting') > -1)
    {
        cookies_setConsent(false);
        return;
    }

    textBox.classList.add('cookies-slider__text--shifting');
    
    window.setTimeout(function(){
        document.querySelector('.cookies-slider__text').innerHTML = 'We rely on Google Analytics and Facebook Pixel to gather insights about your experience.<hr />These third parties have their own cookies and are responsible for gathering and storing the data. At no point is this data shared with anyone or used in any way except for analytics and statistical purposes.';
    }, 500)

    document.querySelector('.cookies-slider--in').classList.add('cookies-slider--shifting');    

    let secondButton = document.querySelector('.cookies-slider__more-info');    
    
    secondButton.innerHTML = 'No, thanks';
    secondButton.onClick = 'cookies_setConsent(false)';
    secondButton.classList.add('cookies-slider__more-info--shifted');

    document.querySelector('.cookies-slider__consent').classList.add('cookies-slider__consent--shifted');
}

var consent = cookies_checkConsent();
if (consent === null){
    cookies_showConsent();
}
else{
    let box = document.querySelector('.cookies-slider');
    box.parentNode.removeChild(box);
}
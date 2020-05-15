var cidx = document.cookie.indexOf('prettyneat-cookie-consent');
var cvidx = document.cookie.indexOf('0',cidx);
var cbidx = document.cookie.indexOf(';',cidx);

if ( (cidx > -1 && cvidx > -1 && cbidx > cvidx) || cidx == -1 )
{
    window.ga = () => {};
    Object.freeze(window.ga);
}

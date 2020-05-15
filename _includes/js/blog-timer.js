var blog_post_timer = 0;
var started = 0;

var span_pre = document.querySelector('.stopwatch-pre');
var span_post = document.querySelector('.stopwatch-post');
var span_last = document.querySelector('.stopwatch-last')
var toggle = document.querySelector('.stopwatch');
var winner = document.querySelector('.stopwatch-winner');

function toggle_stopwatch(){
    if ( started > 0 )
        reset();
    else
        run();
}

function run(){
    started = Date.now();   
    blog_post_timer = window.setTimeout(second,1000); 
    span_pre.innerHTML = ' (You took no time at all ';
    span_post.innerHTML = ')';
    toggle.innerHTML = '[reset?]';
    span_last.innerHTML = "";
    span_last.classList.add('running');
    winner.innerHTML = "[Done?]";
    winner.classList.add('running');
}

function reset(){
    span_pre.innerHTML = '';
    span_post.innerHTML = '';
    window.clearTimeout(blog_post_timer);
    toggle.innerHTML = '⏱';
    started = 0;
    span_last.classList.remove('running');
    winner.classList.remove('running');
}

function done_stopwatch(){
    winner.innerHTML = "";
    span_last.innerHTML = `You ended up taking ${timeSpanToWords(Date.now() - started)}!`;
    reset();
    span_last.classList.add('running');
}

function second(){
    span_pre.innerHTML = ` (You took ${timeSpanToWords(Date.now() - started)} so far `;
    blog_post_timer = window.setTimeout(second,1000);
}

function timeSpanToWords(ms){
    s = Math.floor(ms / 1000);
    
    if ( s >= 60 ){
        m = Math.floor( s / 60 );
        s-= m * 60;
    }
    else
        m = 0;

    let almost = (s * 1000) - ms > 800 ? true : false;

    if ( almost ) s++;

    if ( m > 59 ) return 'way too much!';

    return `${ m > 0 ? (`${m} minute${ m != 1 ? 's' : ''}`) : ''}${ s > 0 ? ( `${ almost? 'almost ' : ''} ${s} second${ s != 1 ? 's': ''}` ) : ' sharp'}`;
}
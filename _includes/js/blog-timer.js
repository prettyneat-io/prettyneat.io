var blog_post_timer = 0;
var started = 0;

var span_pre = document.querySelector('.stopwatch-pre');
var span_post = document.querySelector('.stopwatch-post');
var toggle = document.querySelector('.stopwatch');

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
}

function reset(){
    span_pre.innerHTML = '';
    span_post.innerHTML = '';
    window.clearTimeout(blog_post_timer);
    toggle.innerHTML = '⏱';
    started = 0;
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
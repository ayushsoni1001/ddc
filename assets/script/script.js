// Eye START
// ===============
const eye1 = document.querySelector('#eyeball');
window.addEventListener('mousemove', (evt) => {
    const x = -(window.innerWidth / 2 - evt.pageX) / 15;
    const y = -(window.innerHeight / 2 - evt.pageY) / 15;
    eye1.style.transform = `translateY(${y}px) translateX(${x}px)`;
});  

const eye2 = document.querySelector('#eyeball-nav');
window.addEventListener('mousemove', (evt) => {
    const x2 = -(window.innerWidth / 6 - evt.pageX) / 20;
    const y2 = -(window.innerHeight / 2 - evt.pageY) / 400;
    eye2.style.transform = `translateY(${y2}px) translateX(${x2}px)`;
});
// ===============
// Eye END

// Book START
// ===============

// ===============
// Book END

// Text Animation START
// ===============
// Wrap every letter in a span


function animateText(){
    var text = document.querySelectorAll('.ml7')
    text.forEach(
        function animateNow(selected){
            var textWrapper = selected.querySelector('.letters');
            console.log(textWrapper)
            textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
            anime.timeline({loop: false})
            .add({
                targets: '.ml7 .letter',
                translateY: ["1.1em", 0],
                translateX: ["0.55em", 0],
                translateZ: 0,
                rotateZ: [180, 0],
                duration: 750,
                easing: "easeOutExpo",
                delay: (el, i) => 50 * i
            })
        }
    )
    description.play()
}
// ===============
// Test Animation END

// Scrollify START
// ===============
$(function() {
    $.scrollify({
    section : ".section-scroll",
    });
});
$.scrollify({
    section : ".section-scroll",
    sectionName : "section-name",
    interstitialSection : "",
    easing: "easeOutExpo",
    scrollSpeed: 600,
    offset : 0,
    scrollbars: false,
    standardScrollElements: "",
    setHeights: false,
    overflowScroll: true,
    updateHash: true,
    touchScroll:true,
    before:function() {
        logo.play();
        animateText();
    },
    after:function() {
        scrollActive();
    },
    afterResize:function() {},
    afterRender:function() {}
});

function scrollActive() {
    var wH = window.pageYOffset,
        aa = $('#who-we-are').offset().top,
        bb = $('#what-we-do').offset().top,
        cc = $('#portfolio').offset().top,
        dd = $('#reach-us').offset().top;
    if ((aa-2) < wH && (bb-2) > wH){
        var Alink = document.querySelectorAll(".s-navLink-3");
        $(".s-navLink").removeClass("active");
        $(Alink).addClass("active");
    }
    if((bb-2) < wH && (cc-2) > wH){
        var Blink = document.querySelectorAll(".s-navLink-6");
        $(".s-navLink").removeClass("active");
        $(Blink).addClass("active");
    }
    if((cc-2) < wH && (dd-2) > wH){
        var Clink = document.querySelectorAll(".s-navLink-9");
        $(".s-navLink").removeClass("active");
        $(Clink).addClass("active");
    }
    if((dd-2) < wH){
        var Dlink = document.querySelectorAll(".s-navLink-10");
        $(".s-navLink").removeClass("active");
        $(Dlink).addClass("active");
    }
};
function sectionMove(name){
    $.scrollify.move("#" + name);
    $(".s-navLink").removeClass("active");
    $(".s-navLink-" + name).addClass("active");
}
// ===============
// Scrollify END


// Courser START
// ===============
// set the starting position of the cursor outside of the screen
let clientX = -100;
let clientY = -100;
const innerCursor = document.querySelector(".cursor--small");

const initCursor = () => {
  // add listener to track the current mouse position
                    document.addEventListener("mousemove", e => {
    clientX = e.clientX;
    clientY = e.clientY;
});

// transform the innerCursor to the current mouse position
// use requestAnimationFrame() for smooth performance
const render = () => {
innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
// if you are already using TweenMax in your project, you might as well
// use TweenMax.set() instead
// TweenMax.set(innerCursor, {
//   x: clientX,
//   y: clientY
// });

requestAnimationFrame(render);
};
requestAnimationFrame(render);
};

initCursor();

let lastX = 0;
let lastY = 0;
let isStuck = false;
let showCursor = false;
let group, stuckX, stuckY, fillOuterCursor;

const initCanvas = () => {
const canvas = document.querySelector(".cursor--canvas");
const shapeBounds = {
    width: 75,
    height: 75
};
paper.setup(canvas);
const strokeColor = "#fc0";
const strokeWidth = 2;
const segments = 8;
const radius = 15;

// we'll need these later for the noisy circle
const noiseScale = 150; // speed
const noiseRange = 4; // range of distortion
let isNoisy = false; // state

// the base shape for the noisy circle
const polygon = new paper.Path.RegularPolygon(
    new paper.Point(0, 0),
    segments,
    radius
);
polygon.strokeColor = strokeColor;
polygon.strokeWidth = strokeWidth;
polygon.smooth();
group = new paper.Group([polygon]);
group.applyMatrix = false;

const noiseObjects = polygon.segments.map(() => new SimplexNoise());
let bigCoordinates = [];

// function for linear interpolation of values
const lerp = (a, b, n) => {
    return (1 - n) * a + n * b;
};

// function to map a value from one range to another range
const map = (value, in_min, in_max, out_min, out_max) => {
    return (
    ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
};

// the draw loop of Paper.js
// (60fps with requestAnimationFrame under the hood)
paper.view.onFrame = event => {
    // using linear interpolation, the circle will move 0.2 (20%)
    // of the distance between its current position and the mouse
    // coordinates per Frame
    if (!isStuck) {
        // move circle around normally
        lastX = lerp(lastX, clientX, 0.2);
        lastY = lerp(lastY, clientY, 0.2);
        group.position = new paper.Point(lastX, lastY);
    } else if (isStuck) {
        // fixed position on a nav item
        lastX = lerp(lastX, stuckX, 0.2);
        lastY = lerp(lastY, stuckY, 0.2);
        group.position = new paper.Point(lastX, lastY);
    }
    
    if (isStuck && polygon.bounds.width < shapeBounds.width) { 
        // scale up the shape 
        polygon.scale(1.08);
    } else if (!isStuck && polygon.bounds.width > 30) {
        // remove noise
        if (isNoisy) {
        polygon.segments.forEach((segment, i) => {
            segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
        });
        isNoisy = false;
        bigCoordinates = [];
        }
        // scale down the shape
        const scaleDown = 0.92;
        polygon.scale(scaleDown);
    }
    
    // while stuck and big, apply simplex noise
    if (isStuck && polygon.bounds.width >= shapeBounds.width) {
        isNoisy = true;
        // first get coordinates of large circle
        if (bigCoordinates.length === 0) {
        polygon.segments.forEach((segment, i) => {
            bigCoordinates[i] = [segment.point.x, segment.point.y];
        });
        }
        
        // loop over all points of the polygon
        polygon.segments.forEach((segment, i) => {
        
        // get new noise value
        // we divide event.count by noiseScale to get a very smooth value
        const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
        const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1);
        
        // map the noise value to our defined range
        const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
        const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange);
        
        // apply distortion to coordinates
        const newX = bigCoordinates[i][0] + distortionX;
        const newY = bigCoordinates[i][1] + distortionY;
        
        // set new (noisy) coodrindate of point
        segment.point.set(newX, newY);
        });
        
    }
    polygon.smooth();
    };
    
}
initCanvas();

// find the center of the link element and set stuckX and stuckY
// these are needed to set the position of the noisy circle
const handleMouseEnter = e => {
    const navItem = e.currentTarget;
    const navItemBox = navItem.getBoundingClientRect();
    stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
    stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
    isStuck = true;
};

// reset isStuck on mouseLeave
const handleMouseLeave = () => {
    isStuck = false;
};

const initHovers = () => {

// add event listeners to all items
const linkItems = document.querySelectorAll(".link");
linkItems.forEach(item => {
    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);
});
};
initHovers();
// ===============
// Courser END
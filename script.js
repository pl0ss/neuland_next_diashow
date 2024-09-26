// Settings
// =======================================================================
// =======================================================================

const images = [    
    {src: "home.png", text: "Home"},
    {src: "timetable2.png", text: "Stundenplan"},
    {src: "timetable.png", text: "Stundenplan"},
    {src: "map.png", text: "Map"},
    {src: "food.png", text: "Food"},
    {src: "news.png", text: "News"},
    {src: "events.png", text: "Events"},
    {src: "roomsearch.png", text: "Room Search"},
    {src: "library.png", text: "Library"},
];

let intervalTime = 5; // [Sekunden] in url: ?time=5 

const frame = false; // Bilder in iP frame

// Vars
// =======================================================================
// =======================================================================

let currentIndex = 0;
let progressBars;


// functions
// =======================================================================
// =======================================================================

function init() {
    read_time_from_url();
    console.log(intervalTime)

    document.documentElement.style.setProperty('--animation_time', `${intervalTime}s`)

    if(frame) {document.getElementById('frame_img').style.removeProperty('display');}

    summon_progressbars();

    progressBars = document.querySelectorAll('.progressbar');

    // Startet die Slideshow
    updateSlideshow();
    setInterval(updateSlideshow, intervalTime * 1000);
}
init();


function read_time_from_url() {
    var url_vars = window.location.search.split('?')[1];
    if(url_vars != undefined){
        url_vars = url_vars.split("&");
        for (let index = 0; index < url_vars.length; index++) {
            if(url_vars[index].split('=')[0] == "time"){
                intervalTime = url_vars[index].split('=')[1];
            }
        }
    }
}

function summon_progressbars() {
    for (let index = 0; index < images.length; index++) {
        const code = `<div class="progressbar"> <div> <div></div> </div> </div>`;
        document.getElementById('progressbar_container').insertAdjacentHTML('beforeend', code);
    }
}

function updateSlideshow() {
    const imageElement = document.getElementById('slideshowimage');
    const textElement = document.getElementById('imagetext');

    // Setzt das neue Bild und den neuen Text
    imageElement.src = `imgs/${images[currentIndex].src}`;
    textElement.textContent = images[currentIndex].text;

    // Aktualisiert die Progress Bars
    progressBars.forEach((bar, index) => {
        if(index == currentIndex) {
            bar.classList.add('progressbar_current');
        } else {
            bar.classList.remove('progressbar_current');
        }
    });

    // Erhöht den Index für das nächste Bild
    currentIndex = (currentIndex + 1) % images.length;
}
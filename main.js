
// Declaration and Initialization of Required variables.
var prevtrack = document.getElementById('prevtrack');
var playpause = document.getElementById('playpause');
var nexttrack = document.getElementById('nexttrack');
var audiotrack = document.getElementById('audiotrack');
var songsplaylist = document.getElementById('songsplaylist');
var bgimage = document.getElementById('imgcontain');
var tracktitle = document.querySelector('.tracktitle');
bgimage.style.animationPlayState = 'paused';

// Array Of Object which Contains Song title, src(Actual Path of the song), imgsrc(Image Of the Song).
var trackarray = [
    { title: 'Heeriye', src: 'Assets/Audio/Heeriye.mp3', imgsrc: 'Assets/Images/songimg.jpg' },
    { title: 'Kesariya', src: 'Assets/Audio/Kesariya.mp3', imgsrc: 'Assets/Images/songimg.jpg' },
    { title: 'Main To Chaleya Teri Or', src: 'Assets/Audio/Main-To-Chaleya-Teri-Or.mp3', imgsrc: 'Assets/Images/songimg.jpg' },
    { title: 'O Bedardeya', src: 'Assets/Audio/O-Bedardeya.mp3', imgsrc: 'Assets/Images/songimg.jpg' },
    { title: 'Raatan Lambiyan', src: 'Assets/Audio/Raatan-Lambiyan.mp3', imgsrc: 'Assets/Images/songimg.jpg' },
    { title: 'Tere Pyar Mein', src: 'Assets/Audio/Tere-Pyar-Mein.mp3', imgsrc: 'Assets/Images/songimg.jpg' },
    { title: 'Tu Hai To Mujhe Phir Aur Kya Chahiye', src: 'Assets/Audio/Tu-Hai-To-Mujhe-Phir-Aur-Kya-Chahiye.mp3', imgsrc: 'Assets/Images/songimg.jpg' },
];

// Event Listeners To Perform Actions On Songs like Previous song, Next song, Toggle pause/play, etc.
playpause.addEventListener('click', togglePlay)
prevtrack.addEventListener('click', previoustrack)
nexttrack.addEventListener('click', nextsongtrack)

// Code to Play Next Song after the current song ends.
audiotrack.addEventListener('ended', function () {
    if (indexs < trackarray.length - 1) {
        let index = ++indexs
        audiotrack.pause();
        audiotrack.src = trackarray[index]['src'];
        bgimage.style.backgroundImage = `url('${trackarray[index]['imgsrc']}')`;
        audiotrack.load();
        audiotrack.play();
    }
})

// Code to keep Track of the silder movement with respect to songtrack duration.
audiotrack.addEventListener('play', function () {
    setInterval(rangeSlider, 1000);
})

function rangeSlider() {
    let sliderPosition = document.getElementById("myRange");
    let currenttimeing = document.querySelector('.currenttime');
    let tracklength = document.querySelector('.tracklength');

    let position = 0;
    if (!isNaN(audiotrack.duration)) {
        // Sets the Postion of Slider
        position = audiotrack.currentTime * (100 / audiotrack.duration);
        sliderPosition.value = position;

        // Converting Song Duration into Minutes & Seconds.
        const currentminutes = Math.floor(audiotrack.currentTime / 60);
        const currentseconds = audiotrack.currentTime - currentminutes * 60;

        const actualminutes = Math.floor(audiotrack.duration / 60);
        const actualseconds = audiotrack.duration - actualminutes * 60;

        currenttimeing.innerHTML = currentminutes + ":" + Math.round(currentseconds);
        tracklength.innerHTML = actualminutes + ":" + Math.round(actualseconds);
    }

    if (audiotrack.ended) {
        audiotrack.currentTime = 0;
        currentCounter += 1;
        position = 0;
        currenttimeing.innerHTML = `<span>00:00</span>`;
        tracklength.innerHTML = `<span>00:00</span>`;
    }
}

// Code To Play & Pause Song.
function togglePlay() {
    var playpauseicon = document.querySelector('.playpauseicon');
    const running = bgimage.style.animationPlayState === 'running';
    if (playpauseicon.innerHTML == 'pause_circle') {
        playpauseicon.innerHTML = 'play_circle';
    }
    else {
        playpauseicon.innerHTML = 'pause_circle'
    }
    bgimage.style.animationPlayState = running ? 'paused' : 'running';
    return audiotrack.paused ? audiotrack.play() : audiotrack.pause();
};


// Code To assign the in between time of song as per the movement of slider
function changeDuration() {
    let sliderPosition = document.getElementById("myRange");
    // Converts slider position into songs current time
    sliderPosition = audiotrack.duration * (sliderPosition.value / 100);
    audiotrack.currentTime = sliderPosition;

    // console.log(audiotrack.currentTime, "Current Time of Music");
}


// Code To Play Previous song
function previoustrack() {
    if (indexs > 0) {
        let index = --indexs;
        var playpauseicon = document.querySelector('.playpauseicon');
        playpauseicon.innerHTML = 'pause_circle'
        audiotrack.src = trackarray[index]['src'];
        bgimage.style.backgroundImage = `url('${trackarray[index]['imgsrc']}')`;
        tracktitle.innerHTML = trackarray[index]['title'];
        audiotrack.play();
        bgimage.style.animationPlayState = 'running';
    }

    // console.log(indexs);
}


// Code To Play Next song 
function nextsongtrack() {
    if (indexs < trackarray.length - 1) {
        let index = ++indexs
        var playpauseicon = document.querySelector('.playpauseicon');
        audiotrack.src = trackarray[index]['src'];
        bgimage.style.backgroundImage = `url('${trackarray[index]['imgsrc']}')`;
        tracktitle.innerHTML = trackarray[index]['title'];
        audiotrack.play();
        bgimage.style.animationPlayState = 'running';
        playpauseicon.innerHTML = 'pause_circle'
    }
    // console.log(indexs);
}

// Code To Assign the starting Song and to Display list of songs that are present in array of object
function songs() {
    const paused = bgimage.style.animationPlayState === 'paused';
    audiotrack.src = trackarray[indexs]['src'];
    audiotrack.pause;
    bgimage.style.backgroundImage = `url('${trackarray[indexs]['imgsrc']}')`;
    tracktitle.innerHTML = trackarray[indexs]['title'];
    bgimage.style.animationPlayState = paused ? 'paused' : 'running';
    songsplaylist.innerHTML = trackarray.map((val, i) => {
        return `<li class="slist" onclick="playthissong(${i},'${val.src}','${val.title}')">🎵 &nbsp; ${val['title']}</li>`
    }).join('');
}


// Code to Play song, When Clicked on any song listed in songs list.
var indexs = 0;
function playthissong(i, src, title) {
    indexs = i;
    var playpauseicon = document.querySelector('.playpauseicon');
    audiotrack.src = src;
    bgimage.style.backgroundImage = `url('${trackarray[i]['imgsrc']}')`;
    tracktitle.innerHTML = trackarray[i]['title'];
    bgimage.style.animationPlayState = 'running';
    audiotrack.play();
    if (audiotrack.paused) {
        playpauseicon.innerHTML = 'play_circle'
    }
    else {
        playpauseicon.innerHTML = 'pause_circle'
    }
}

// Function To Runs when the browser is loaded, which will assigns the song and display the list of songs.
songs();
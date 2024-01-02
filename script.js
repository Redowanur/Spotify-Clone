let currentSong = new Audio();

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    let div = document.createElement('div');
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');

    let songs = [];

    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith('.mp3')) {
            songs.push(element.href.split('/songs/'));
        }
    }

    return songs;
}

const playMusic=(track)=>{
    currentSong.src = '/songs/' + track;
    currentSong.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-pause');
    document.querySelector('.songinfo').innerHTML = track;
    document.querySelector('.songtime').innerHTML = '00:00 / 00:00';
}

async function main() {
    function formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) {
            return "00:00";
        }
    
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
    
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        return formattedTime;
    }

    let songs = await getSongs();
    
    let songUL = document.querySelector('.songList').getElementsByTagName('ul')[0];
    for (const song of songs) {
        songUL.innerHTML += `<li>
                                <i class="fa-solid fa-music"></i>
                                <div class="info">
                                    <div>${song[1].replace(/%20/g, ' ')}</div>
                                    <div>Redowan</div>
                                </div>
                                <div class="playnow">
                                    <span>Play Now</span>
                                    <i class="fa-solid fa-play"></i>
                                </div>
                            </li>`;
    }

    Array.from(document.querySelector('.songList').getElementsByTagName('li')).forEach(e=>{
        e.addEventListener('click', element=>{
            playMusic(e.querySelector('.info').firstElementChild.innerHTML.trim())
        })
    })

    play.addEventListener('click', ()=>{
        if(currentSong.paused){
            currentSong.play();
            play.classList.remove('fa-circle-play');
            play.classList.add('fa-pause');
        }
        else{
            currentSong.pause();
            play.classList.remove('fa-pause');
            play.classList.add('fa-circle-play');
        }
    })

    currentSong.addEventListener('timeupdate', ()=>{
        document.querySelector('.songtime').innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`;
        document.querySelector('.circle').style.left = (currentSong.currentTime/currentSong.duration)*100 + '%';
    })

    document.querySelector('.seekbar').addEventListener('click', e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector('.circle').style.left = percent + '%';
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    })

    document.querySelector('.hamburger').addEventListener('click', ()=>{
        document.querySelector('.left').style.left = '0';
    })

    document.querySelector('.close').addEventListener('click', ()=>{
        document.querySelector('.left').style.left = '-100%';
    })
}

main();
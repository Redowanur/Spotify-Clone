let currentSong = new Audio();

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    // console.log(response);
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
    // let audio = new Audio('/songs/' + track);
    currentSong.src = '/songs/' + track;
    currentSong.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-pause');
}

async function main() {
    

    let songs = await getSongs();
    console.log(songs);

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
}

main();
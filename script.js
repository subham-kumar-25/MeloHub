// To test if the js is working
console.log("Welcome to MeloHub")

// Initialize the Variables
let songIndex = 0                                                               // Song starts from the 1st in the list
let audioElement = new Audio('./songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')                          // Main button to play and pause
let myProgressBar = document.getElementById('myProgressBar')                    // The linear line of the progress
let gif = document.getElementById('gif')
let masterSongName = document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'))

let songs = [
    {songName: "Moonlit Mirage Waltzing Shadows", filePath : "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Echoes of Eternity Harmony Bliss", filePath : "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Whispering Starlight Waltz", filePath : "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Neon Dreams Harmonize", filePath : "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Midnight Serenade Bliss", filePath : "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Velvet Horizon Voyage", filePath : "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Quantum Echoes Unleashed", filePath : "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Sapphire Skies Rhapsody", filePath : "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Three idiot theme", filePath : "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Babmasia", filePath : "songs/10.mp3", coverPath: "covers/10.jpg"}
]

// 

songItems.forEach((element, i)=>{
    // console.log(element, i)
    element.getElementsByTagName("img")[0].src = songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName 
})

// Handle master play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove("fa-circle-play")
        masterPlay.classList.add("fa-circle-pause")
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause()
        masterPlay.classList.add("fa-circle-play")
        masterPlay.classList.remove("fa-circle-pause")
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener("timeupdate", ()=> {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value *  audioElement.duration) / 100
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        // console.log(e.target)
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove("fa-circle-play")
        e.target.classList.add("fa-circle-pause")
        audioElement.src = `songs/${songIndex+1}.mp3`
        masterSongName.innerText = songs[songIndex].songName
        audioElement.currentTime = 0
        audioElement.play()
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
    })
})

// Next Button Functions
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 9)
        songIndex = 0
    else
        songIndex = songIndex + 1; 
    
    audioElement.src = `songs/${songIndex}.mp3`
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})

// Previous Button Functions
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0)
        songIndex = 10
    else
        songIndex = songIndex - 1; 

    audioElement.src = `songs/${songIndex}.mp3`
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})
if(!localStorage.poeng){
    localStorage.poeng = 0
}

let poengBoksEl = document.getElementById("poeng-boks")
poengEl = document.createElement("h1")
poengEl.innerHTML = `Poeng: ${Math.floor(localStorage.poeng)}`

poengBoksEl.appendChild(poengEl)



let pictureEL = document.querySelectorAll('img')
let videoEl = document.querySelectorAll('video')

for (let i = 0; i<pictureEL.length; i++){
pictureEL[i].addEventListener('mouseover', function(){
    videoEl[i].currentTime = 0
    /// CurrentTime
    /// https://stackoverflow.com/questions/8402158/html5-video-javascript-controls-restart-video 

    videoEl[i].play()
    pictureEL[i].style.opacity = 0
    videoEl[i].style.opacity = 1


})
pictureEL[i].addEventListener('mouseout', function(){
    videoEl[i].pause()
    pictureEL[i].style.opacity = 1
    videoEl[i].style.opacity = 0
}) 
} 

console.log(pictureEL[0].alt)


/*
https://www.youtube.com/watch?v=NVy2TO4yL8A/  */


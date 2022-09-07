import Player from '@vimeo/player';
import  throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);


/// перевірка чи є в стореджі запис який задовільняє умови запуску
// з певного моменту
if (localStorage.getItem("videoplayer-current-time") === null) {
player.setCurrentTime(0.01).then((e) => e);    
} else {
player.setCurrentTime(localStorage.getItem("videoplayer-current-time")).then((e) => e);    
}


player.on('timeupdate', throttle( timeupd => { 
      localStorage.setItem("videoplayer-current-time", timeupd.seconds);
    }, 1000)
);
    ///// тести методів
player.setColor('#7FFFD4').then(function(color) {
    // color was successfully set
})

// player.getCurrentTime().then(function (seconds) {
//   console.log('getCurrentTime =', seconds )
//     // seconds = the current playback position
// })
// player.getTextTracks().then(function (tracks) {
//     console.log('getTextTracks =', tracks )

//     // tracks = an array of track objects
// })
 
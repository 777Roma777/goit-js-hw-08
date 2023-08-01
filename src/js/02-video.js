import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const onPlay = function (data) {
  const strigifyData = JSON.stringify(data);
  localStorage.setItem(CURRENT_TIME, strigifyData);
};
player.on('play', throttle(onPlay, 1000));

function playResume() {
  if (JSON.parse(localStorage.getItem(CURRENT_TIME)) === null) {
    return;
  }

  const paused = JSON.parse(localStorage.getItem(CURRENT_TIME))['seconds'];
  if (paused) {
    player
      .setCurrentTime(paused)
      .then(function (seconds) {})
      .catch(function (error) {
        switch (error.name) {
          case 'Error':
            break;
          default:
            break;
        }
      });
  }
}
playResume();

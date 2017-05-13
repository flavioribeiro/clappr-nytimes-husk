import Clappr from 'clappr'
import NYTSpinner from './nyt_spinner'
import NYTControls from './nyt_controls'

let player = new Clappr.Player({
  parent: '.player',
  disableKeyboardShortcuts: true,
  width: '670px',
  height: '376px',
  poster: "https://static01.nyt.com/images/2014/05/14/multimedia/clark-rhubarb-shake/clark-rhubarb-shake-videoSixteenByNine1050-v2.jpg",
  source: "https://vp.nyt.com/video/2017/05/09/72421_1_11bearsears-vid_wg_360p.mp4",
  playInLine: true,
  plugins: {container:[NYTSpinner], core: [NYTControls]}
})

import Clappr from 'clappr'
import NYTSpinner from './spinner'
import NYTControls from './controls'
import NYTPoster from './poster'

let player = new Clappr.Player({
  parent: '.player',
  width: '670px',
  height: '376px',
  source: "https://vp.nyt.com/video/2017/05/09/72421_1_11bearsears-vid_wg_360p.mp4",
  poster: "https://static01.nyt.com/images/2014/05/14/multimedia/clark-rhubarb-shake/clark-rhubarb-shake-videoSixteenByNine1050-v2.jpg",
  plugins: {container:[NYTSpinner, NYTPoster]},
  mediacontrol: {external: NYTControls}
})

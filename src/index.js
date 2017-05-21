import Clappr from 'clappr'
import NYTSpinner from './spinner'
import NYTControls from './controls'
import NYTPoster from './poster'

let player = (options) => {
  let source = getSource(options.id)
  let poster = getPoster(options.id)
  let player = new Clappr.Player({
    parentId: '#' + options.container,
    width: "670px",
    height: "377px",
    source: source,
    poster: poster,
    plugins: {container:[NYTSpinner, NYTPoster]},
    mediacontrol: {external: NYTControls}
  })
}

let getSource = (id) => {
  return "https://vp.nyt.com/video/2017/05/09/72421_1_11bearsears-vid_wg_360p.mp4"
}

let getPoster = (id) => {
  return "https://static01.nyt.com/images/2014/05/14/multimedia/clark-rhubarb-shake/clark-rhubarb-shake-videoSixteenByNine1050-v2.jpg"
}

module.exports = { player }

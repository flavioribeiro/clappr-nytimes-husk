import Clappr from 'clappr'

let player = new Clappr.Player({
  parent: '.player',
  autoPlay: !Clappr.Browser.isMobile,
  disableKeyboardShortcuts: true,
  disableVideoTagContextMenu: true,
  autoSeekFromUrl: false,
  width: '640px',
  height: '360px',
  source: "https://vp.nyt.com/video/2017/05/09/72421_1_11bearsears-vid_wg_360p.mp4",
  playInLine: true,
})

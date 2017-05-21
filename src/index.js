import Clappr from 'clappr'
import xhr from 'tiny-xhr'

import NYTSpinner from './spinner'
import NYTControls from './controls'
import NYTPoster from './poster'

export default class VHS {
  static player(options) {
    let plugins = [NYTSpinner, NYTPoster]
    getInfo(options.id).then(info => {
      this.playerInstance = new Clappr.Player({
        parentId: '#' + options.container,
        width: "670px",
        height: "377px",
        source: getSource(info.renditions).url,
        poster: getPoster(info.images),
        plugins: options.plugins ? plugins.concat(options.plugins) : plugins,
        mediacontrol: {external: NYTControls}
      })
    })
  }
}

let getInfo = (id) => {
  let options = {url: "http://www.nytimes.com/svc/video/api/v3/video/" + id, method: "GET"}
  return xhr(options).then(res => { return res.response })
}

let getSource = (rends) => {
  if (Clappr.HLS.canPlay(".m3u8")) {
    return rends.find(rendition => { return rendition.url.includes(".m3u8") })
  } else {
    return rends.find(rendition => { return rendition.type.includes("720p") })
  }
}

let getPoster = (images) => {
  let image = images.find(image => { return image.url.includes("videoLarge") })
  return image.domain + image.url
}

module.exports = { VHS, Clappr }

import {UICorePlugin, Utils, Events, Styler, template} from 'Clappr'
import controlsHTML from './public/controls.html'
import controlsStyle from './public/controls.scss'

export default class NYTControls extends UICorePlugin {
  get name() { return 'NYTControls' }

  get events() {
    return {
      'click .controls-play': 'togglePlay',
      'mousedown .controls-progress-timeline': 'seekDrag',
      'mousemove .controls-progress-timeline': 'seekDrag',
      'mouseleave .controls-progress-timeline': 'finishSeekDrag'
    }
  }

  togglePlay() { 
    if (this.core.mediaControl.container.isPlaying()) {
      this.core.mediaControl.pause()
    } else {
      this.core.mediaControl.play()
    }
  }

  seekDrag(e) {
    console.log("seek drag", e)
  }

  finishSeekDrag(e) {
    console.log("finish seek drag", e)
  }

  bind() {
    this.ui = {
      play: this.$el.find('.controls-play'),
      progress: this.$el.find('.controls-progress'),
      progressTimeline: this.$el.find('.controls-progress-timeline'),
      progressBuffer: this.$el.find('.controls-progress-buffer'),
      progressTime: this.$el.find('.controls-progress-time'),
      marker: this.$el.find('.controls-progress-marker'),
      duration: this.$el.find('.controls-duration'),
      currentTime: this.$el.find('.controls-current-time'),
    };

    let container = this.core.mediaControl.container
    this.listenTo(container, Events.CONTAINER_PLAY, this.onPlay)
    this.listenTo(container, Events.CONTAINER_PAUSE, this.onPause)
    this.listenTo(container, Events.CONTAINER_TIMEUPDATE, this.onTimeUpdate)
    this.listenTo(container, Events.CONTAINER_SEEK, this.onSeek)
    this.listenTo(container, Events.CONTAINER_ERROR, this.onError)
  }

  onPlay() {
    this.ui.play.addClass('vhs-icon-pause').removeClass('vhs-icon-play')
  }

  onPause() {
    this.ui.play.addClass('vhs-icon-play').removeClass('vhs-icon-pause')
  }

  onTimeUpdate(e) {
    this.ui.duration.text(Utils.formatTime(e.total))
    this.ui.currentTime.text(Utils.formatTime(e.current))

    const percent = this.getSeekPosition(e);
    this.ui.progressTime.css({ width: `${percent}%` });
    this.ui.marker.css({ left: `${percent}%` });
  }

  getSeekPosition(e) {
    const position = (e.current / e.total) * 100;
    const trimmedPosition = Math.max(0, Math.min(position, 100));
    return parseFloat(trimmedPosition.toFixed(2));
  }

  render() {
    this.style = Styler.getStyleFor(controlsStyle)
    this.$el.html(template(controlsHTML)())

    this.core.$el.append(this.$el[0])
    this.core.$el.append(this.style[0])

    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_RENDERED, this.bind)
    return this
  }
}

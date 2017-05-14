import {UICorePlugin, Events, Styler, template} from 'Clappr'
import controlsHTML from './public/controls.html'
import controlsStyle from './public/controls.scss'

export default class NYTControls extends UICorePlugin {
  get name() { return 'NYTControls' }

  get events() {
    return {
      'click .controls-play': 'togglePlay'
    }
  }

  togglePlay() { 
    if (this.core.mediaControl.container.isPlaying()) {
      this.core.mediaControl.pause()
    } else {
      this.core.mediaControl.play()
    }
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

  render() {
    this.style = Styler.getStyleFor(controlsStyle)
    this.template = template(controlsHTML)
    this.$el.html(this.template())

    this.core.$el.append(this.$el[0])
    this.core.$el.append(this.style[0])

    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_RENDERED, this.bind)
    return this
  }
}


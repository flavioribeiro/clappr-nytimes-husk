import {Utils, MediaControl, Styler, template} from 'clappr'
import controlsHTML from './public/controls.html'
import controlsStyle from './public/controls.scss'

export default class NYTControls extends MediaControl {
  get events() {
    return {
      'click .controls-play': 'togglePlayPause',
      'click .controls-fullscreen': 'toggleFullscreen',
      'click .controls-progress-timeline': 'seek',
      'click .controls-volume': 'toggleMute',
      'mousedown .controls-progress-timeline': 'startSeekDrag',
      'mousemove .controls-progress-timeline': 'mousemoveOnSeekBar',
      'mouseleave .controls-progress-timeline': 'mouseleaveOnSeekBar',
    }
  }

  toggleMute() {}

  playerResize() {}

  hide() {
    super.hide()
    this.$layer.addClass('vhs-controls-hidden').removeClass('vhs-controls-active')
  }

  show() {
    super.show()
    this.$layer.addClass('vhs-controls-active').removeClass('vhs-controls-hidden')
  }

  changeTogglePlay() {
    if (this.container && this.container.isPlaying()) {
      this.$playPauseToggle.addClass('vhs-icon-pause').removeClass('vhs-icon-play')
    } else {
      this.$playPauseToggle.addClass('vhs-icon-play').removeClass('vhs-icon-pause')
    }
  }

  toggleFullscreen() {
    super.toggleFullscreen()
    if (Utils.Fullscreen.isFullscreen()) {
      this.$fullscreenToggle.addClass('vhs-icon-resize-default').removeClass('vhs-icon-resize-full')
    } else {
      this.$fullscreenToggle.addClass('vhs-icon-resize-full').removeClass('vhs-icon-resize-default')
    }
  }

  createCachedElements() {
    this.$layer = this.$el.find('.controls')
    this.$duration = this.$layer.find('.controls-duration')
    this.$fullscreenToggle = this.$layer.find('.controls-fullscreen')
    this.$playPauseToggle = this.$layer.find('.controls-play')
    this.$playStopToggle = this.$layer.find('.controls-play')
    this.$position = this.$layer.find('.controls-current-time')
    this.$seekBarContainer = this.$layer.find('.controls-progress-timeline')
    this.$seekBarHover = this.$layer.find('.controls-progress-scrubber')
    this.$seekBarLoaded = this.$layer.find('.controls-progress-buffer')
    this.$seekBarPosition = this.$layer.find('.controls-progress-time')
    this.$seekBarScrubber = this.$layer.find('.controls-progress-marker')
    this.$volumeBarContainer = this.$layer.find('.controls-volume-slider-container')
    this.$volumeContainer = this.$layer.find('.controls-volume')
    this.$volumeIcon = this.$layer.find('.controls-volume')
    this.$volumeBarBackground = this.$el.find('.controls-volume-slider-track')
    this.$volumeBarFill = this.$el.find('.controls-volume-slider-fill')
    this.$volumeBarScrubber = this.$el.find('.controls-volume-slider')
    this.$hdIndicator = this.$el.find('.controls-hd')
  }

  render() {
    super.render()
    this.style = Styler.getStyleFor(controlsStyle)
    this.$el.html(template(controlsHTML)())
    this.$el.append(this.style[0])
    this.createCachedElements()
    return this
  }
}

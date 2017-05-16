import {$, UICorePlugin, Utils, MediaControl, Events, Styler, template} from 'Clappr'
import controlsHTML from './public/controls.html'
import controlsStyle from './public/controls.scss'

export default class NYTControls extends MediaControl {
  get events() {
    return {
      'click .controls-play': 'togglePlayPause',
      //      'click [data-stop]': 'stop',
      //      'click [data-playstop]': 'togglePlayStop',
      //      'click [data-fullscreen]': 'toggleFullscreen',
      //      'click .bar-container[data-seekbar]': 'seek',
      //      'click .bar-container[data-volume]': 'onVolumeClick',
      //      'click .drawer-icon[data-volume]': 'toggleMute',
      //      'click [data-cc-button]': 'toggleClosedCaptions',
      //      'mouseenter .drawer-container[data-volume]': 'showVolumeBar',
      //      'mouseleave .drawer-container[data-volume]': 'hideVolumeBar',
      //      'mousedown .bar-container[data-volume]': 'startVolumeDrag',
      //      'mousemove .bar-container[data-volume]': 'mousemoveOnVolumeBar',
      //      'mousedown .bar-scrubber[data-seekbar]': 'startSeekDrag',
      //      'mousemove .bar-container[data-seekbar]': 'mousemoveOnSeekBar',
      //      'mouseleave .bar-container[data-seekbar]': 'mouseleaveOnSeekBar',
      //      'mouseenter .media-control-layer[data-controls]': 'setUserKeepVisible',
      //      'mouseleave .media-control-layer[data-controls]': 'resetUserKeepVisible'
    }

  }

  changeTogglePlay() {
    if (this.container && this.container.isPlaying()) {
      this.$playPauseToggle.addClass('vhs-icon-pause').removeClass('vhs-icon-play')
    } else {
      this.$playPauseToggle.addClass('vhs-icon-play').removeClass('vhs-icon-pause')
    }
  }

  createCachedElements() {
    const $layer = this.$el.find('.controls')
    console.log("creating cached elements", $layer.length)
    this.$duration = $layer.find('.controls-duration')
    this.$fullscreenToggle = $layer.find('.controls-fullscreen')
    this.$playPauseToggle = $layer.find('.controls-play')
    this.$playStopToggle = $layer.find('.controls-play')
    this.$position = $layer.find('.controls-current-time')
    this.$seekBarContainer = $layer.find('.controls-progress-timeline')
    this.$seekBarHover = $layer.find('.controls-progress-buffer-and-time')
    this.$seekBarLoaded = $layer.find('.controls-progress-buffer')
    this.$seekBarPosition = $layer.find('.controls-progress-marker')
    this.$seekBarScrubber = $layer.find('.controls-progress-scrubber')
    this.$volumeBarContainer = $layer.find('.controls-volume-slider-container')
    this.$volumeContainer = $layer.find('.controls-volume')
    this.$volumeIcon = $layer.find('.controls-volume')
    this.$volumeBarBackground = this.$el.find('.controls-volume-slider-track')
    this.$volumeBarFill = this.$el.find('.controls-volume-slider-fill')
    this.$volumeBarScrubber = this.$el.find('.controls-volume-slider')
    this.$hdIndicator = this.$el.find('.controls-hd')
  }

  // should change the icon if Fullscreen.isFullscreen()
  playerResize() {}

  render() {
    super.render()
    this.style = Styler.getStyleFor(controlsStyle)
    this.$el.html(template(controlsHTML)())
    this.$el.append(this.style[0])
    this.createCachedElements()
    return this
  }
}

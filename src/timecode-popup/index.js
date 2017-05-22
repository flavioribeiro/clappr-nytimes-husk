import {UICorePlugin, Events, Styler, template} from 'clappr'
import timecodePopupHtml from './public/timecode-popup.html'
import timecodePopupStyle from './public/timecode-popup.scss'

export default class NYTTimecodePopup extends UICorePlugin {
  get name() { return 'timecode-popup' }

  constructor(core) {
    super(core)
    console.log("timecode popup rendered")
  }

  _bindEvents() {
		this.listenTo(this.mediaControl, Events.MEDIACONTROL_RENDERED, this.render)
		this.listenTo(this.mediaControl, Events.MEDIACONTROL_MOUSEMOVE_SEEKBAR, this.onMouseMove)
		this.listenTo(this.mediaControl, Events.MEDIACONTROL_MOUSELEAVE_SEEKBAR, this.onMouseLeave)
	}

  onMouseLeave() {
    console.log("mouse leave")
    this.element.hide()
  }

  onMouseMove(time, formattedTime) {
    console.log("mouse move")
    if (this.rendered) {
      const position = this.getBoxPosition(time, this.progressEl)
      this.element.css({ left: `${position}%` });
      this.positionEl.html(formattedTime)
      if (this._player.options.thumbsOnSeek && this.thumbRendition) {
        this.updateThumb(time)
      }
      this.element.show();
    }
  }

  getBoxPosition(time, progressEl) {
    const duration = this._player.store.getState().player.media.duration;
    const deltaEl = (100 * (this.element.width() / 2)) / progressEl.width();
    const initPosition = parseFloat(((time / duration) * 100).toFixed(2));
    return initPosition - deltaEl;
  }

  createCachedElements() {
    this.positionEl = this.$el.find('.nytd-player-timecode-popup-position');
  }

  render() {
    console.log("render!")
    super.render()
    this.$el.html(template(timecodePopupHtml)())
    this.style = Styler.getStyleFor(timecodePopupStyle)
    this.$el.append(this.style[0])
    this.$el.css('display', 'block')
    this.createCachedElements()
    return this
  }
}

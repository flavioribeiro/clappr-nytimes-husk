import {UIContainerPlugin, Events, Styler, template} from 'Clappr'
import spinnerHTML from './public/spinner.html'
import spinnerStyle from './public/spinner.scss'

export default class NYTSpinner extends UIContainerPlugin {
  get name() { return 'spinner' }
  get attributes() {
    return {
      'data-spinner':'',
      'class': 'nyt-buffering-container'
    }
  }

  constructor(container) {
    super(container)
    this.showTimeout = null
    this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERING, this.show)
    this.listenTo(this.container, Events.CONTAINER_STATE_BUFFERFULL, this.hide)
    this.listenTo(this.container, Events.CONTAINER_STOP, this.hide)
    this.listenTo(this.container, Events.CONTAINER_ENDED, this.hide)
    this.listenTo(this.container, Events.CONTAINER_ERROR, this.hide)
    this.render()
  }

  show() {
    if (this.showTimeout === null) {
      this.showTimeout = setTimeout(() => this.$el.show(), 300)
    }
  }

  hide() {
    return
    if (this.showTimeout !== null) {
      clearTimeout(this.showTimeout)
      this.showTimeout = null
    }
    this.$el.hide()
  }

  render() {
    this.template = template(spinnerHTML)
    this.$el.html(this.template())
    const style = Styler.getStyleFor(spinnerStyle)
    this.container.$el.append(this.$el[0])
    this.container.$el.append(style[0])
    this.$el.hide()
    if (this.container.buffering) {
      this.show()
    }
    return this
  }
}

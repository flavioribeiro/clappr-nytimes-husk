import {UICorePlugin, Events, Styler, template} from 'Clappr'
import controlsHTML from './public/controls.html'
import controlsStyle from './public/controls.scss'

export default class NYTControls extends UICorePlugin {
  get name() { return 'NYTControls' }
  get template() { return template(controlsHTML) }
  shouldRender() { return true }

  constructor(core) {
    super(core.options)
    this.core = core
    this.renderControls()
  }

  renderControls() {
    const style = Styler.getStyleFor(controlsStyle)
    this.core.$el.append(controlsHTML)
    this.core.$el.append(style[0])
    return this
  }
}


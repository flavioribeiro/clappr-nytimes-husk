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
    //    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_RENDERED, this.renderControls)
    this.renderControls()
  }

  renderControls() {
    console.log("render called")
    this.$el.html(this.template())
    const style = Styler.getStyleFor(controlsStyle)
    this.core.$el.append(this.$el[0])
    this.core.$el.append(style[0])
    return this
  }
}


import {UIContainerPlugin, Events, Styler, template, $} from 'clappr'
import posterStyle from './public/poster.scss'
import posterHTML from './public/poster.html'

export default class NYTPoster extends UIContainerPlugin {
  get name() { return 'poster' }

  constructor(container) {
    super(container)
    this.render()
  }

  get template() {
    return template(posterHTML)({
      mode: "homepage",
      useUpdatedHomepageCover: false,
      use360Cover: false,
      data: {
        headline: "Testing Clappr",
      },
      isLive: false
    })
  }

  render() {
    const style = Styler.getStyleFor(posterStyle)
    this.$el.html(this.template)
    this.$el.append(style[0])

    this.$el.find('.nytd-player-poster').css({
      'background': 'url(' + this.options.poster + ') center center no-repeat',
      'background-size': 'cover'
    })
    this.container.$el.append(this.$el)
    return this
  }
}

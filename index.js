'use strict'

const yo = require('yo-yo')

const render = require('./render')

const dom = render(0)
document.body.appendChild(dom)

const loop = () => {
	yo.update(dom, render(0))
	requestAnimationFrame(loop)
}
requestAnimationFrame(loop)

'use strict'

const yo = require('yo-yo')

const render = require('./render')

const dom = render(Math.PI/4, 40)
document.body.appendChild(dom)

const loop = () => {
	yo.update(dom, render(Math.PI/4, 40))
	requestAnimationFrame(loop)
}
requestAnimationFrame(loop)

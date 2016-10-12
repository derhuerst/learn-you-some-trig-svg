'use strict'

const yo = require('yo-yo')

const render = require('./render')

const dom = render(0, 40)
document.body.appendChild(dom)

const slider = document.querySelector('#slider')
const update = () => {
	yo.update(dom, render(Math.PI * 2 * slider.value, 40))
}
update()

slider.addEventListener('change', update)
slider.addEventListener('mousedown', () => {
	slider.addEventListener('mousemove', update)
})
slider.addEventListener('mouseup', () => {
	slider.removeEventListener('mousemove', update)
})
